import { useRecoilState } from "recoil";

import { PostContext } from "../../context/post.context";
import {
  SearchFilterSerializer,
  PostSummaryModel,
  postManager,
  PostDetailModel,
  PostRecommendationModel,
} from "../../domain/search/post.impl";
import type { PostSummary } from "../../domain/search/post.interface";
import { useAuth } from "../../context/auth.context";
import { postApi } from "../../api/search";
import { postTotalItemsState } from "../../recoil/pageState";

const PostServiceProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const { userId, logout } = useAuth();

  const [_, setPostTotalItems] = useRecoilState(postTotalItemsState);

  return (
    <PostContext.Provider value={{
      search: async (filter, options) => {
        const serializer = new SearchFilterSerializer(filter, userId);
        const requestData = serializer.toEntity();

        let payload;
        try {
          payload = await postApi.searchList(requestData);
        } catch { logout(); return }
        let postSummaries: PostSummary[] = payload.documents.map((v: any) => new PostSummaryModel(v));
        setPostTotalItems(payload.meta["total_count"]);
        
        if (!!options.keyword) {
          postSummaries = postSummaries.filter((item) => postManager.isKeywordIncludingNotice(options.keyword, item.notice));
        }
        postSummaries = postSummaries.slice(options.offset, options.offset + options.limit);
        return postSummaries;
      },
      showDetail: async (postId) => {
        let payload;
        try {
          payload = await postApi.searchDetail(postId);
        } catch { logout(); return }
        return new PostDetailModel(payload.document);
      },
      saveBookmark(userId, postId) {
        try {
          postApi.insertBookmark(userId, postId);
        } catch { logout(); }
      },
      removeBookmark(userId, postId) {
        try {
          postApi.deleteBookmark(userId, postId);
        } catch { logout(); }
      },
      recommend: async (userId) => {
        let payload
        try {
          payload = await postApi.recommendPosts(userId);
        } catch (e) { 
          console.log(e);
          return;
         }
        return payload.documents.map((v: any) => new PostRecommendationModel(v));
      },
    }}>
      {children}
    </PostContext.Provider>
  )
}

const PostContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <PostServiceProvider>
      {children}
    </PostServiceProvider>
  );
}

export default PostContainer;
