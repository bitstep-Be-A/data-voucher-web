import _ from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail } from "../../domain/search/post.interface";
import { usePost } from "../../context/post.context";
import { useAuth } from "../../context/auth.context";
import { useSearchFilterModal } from "../../recoil/modalState";
import { useSearchFilter, useSearchFilterOpt } from "../../domain/search/post.impl";

import { SearchBar } from "../presenters/search/SearchBar";
import { FilterPopup } from "../presenters/search/FilterPopup";
import { PostItems } from "../presenters/search/PostItems";
import { PostItemSlot } from "../presenters/search/PostItemSlot";

const PostList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { userIdRef } = useAuth();

  const [postSummaries, setPostSummaries] = useState<PostSummary[]>([]);
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);

  const {
    search,
    showDetail,
    saveBookmark,
    removeBookmark
  } = usePost();

  const {searchFilter, setSearchFilter} = useSearchFilter();
  const {searchFilterOpt, setSearchFilterOpt} = useSearchFilterOpt();

  useEffect(() => {
    search(searchFilter, searchFilterOpt).then(
      (list => setPostSummaries(list!))
    );
  }, [searchFilter, searchFilterOpt, search]);

  useEffect(() => {
    const slotId = searchParams.get("slot") || null;
    if (!slotId) return setPostDetail(null);

    showDetail(Number(slotId))
      .then((data) => setPostDetail(data!))
      .catch(() => setPostDetail(null));
  }, [searchParams, showDetail]);

  const {setSearchFilterModal} = useSearchFilterModal();

  return (
    <>
    <SearchBar
      clickFilter={() => {
        setSearchFilterModal(true);        
      }}
      writeDown={_.debounce((value: string) => {
        setSearchFilterOpt({
          ...searchFilterOpt,
          keyword: value
        });
      }, 1200)}
    />
    <PostItems
      postContents={postSummaries}
      addBookmark={(postId) => {
        saveBookmark(userIdRef.current, postId)
      }}
      cancelBookmark={(postId) => {
        removeBookmark(userIdRef.current, postId);
      }}
      clickItem={(postId) => {
        searchParams.set("slot", String(postId));
        setSearchParams(searchParams);
      }}
      selectedPost={searchParams.get("slot") || null}
    />
    {
      postDetail && (
        <PostItemSlot
          closeSlot={() => {
            searchParams.delete("slot");
            setSearchParams(searchParams);
          }}
          saveFile={(filePosition) => {
            const path = process.env.REACT_APP_SERVER_URL! + postDetail?.attachments[filePosition].pfi_filename;
            window.open(path, '_blank');
          }}
          visitWebsite={(url) => {
            if (!url) return;
            const w = window.open(url, '_blank');
            w?.focus();
          }}
          content={postDetail}
        />
      )
    }
    {/* <FilterPopup

    /> */}
    </>
  );
}

export default PostList;
