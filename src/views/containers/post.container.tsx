import { PostContext } from "../../context/post.context";
import {
  SearchFilterSerializer,
  PostSummaryModel,
  postSummaryManager,
  PostDetailModel,
} from "../../domain/search/post.impl";
import type { PostSummary } from "../../domain/search/post.interface";
import { useAuth } from "../../context/auth.context";
import { postApi } from "../../api/search";

const PostServiceProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const { userIdRef, logout } = useAuth();

  return (
    <PostContext.Provider value={{
      search: async (filter, options) => {
        const serializer = new SearchFilterSerializer(filter, userIdRef.current);
        const requestData = serializer.toEntity();

        let payload;
        try {
          payload = await postApi.searchList(requestData);
        } catch { logout(); return }
        let postSummaries: PostSummary[] = payload.documents.map((v: any) => new PostSummaryModel(v));
        
        if (!!options.keyword) {
          postSummaries = postSummaries.filter((item) => postSummaryManager.isKeywordIncludingNotice(options.keyword, item.notice));
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
      }
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
