import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail } from "../../domain/search/post.interface";
import { usePostService } from "../../context/post.context";
import { useAuth } from "../../context/auth.context";
import { useSearchFilterModal } from "../../recoil/modalState";
import { useSearchFilter, useSearchFilterOpt } from "../../domain/search/post.impl";

import { SearchBar } from "../presenters/search/SearchBar";
import { FilterPopup } from "../presenters/search/FilterPopup";
import { PostItems } from "../presenters/search/PostItems";
import { PostItemSlot } from "../presenters/search/PostItemSlot";
import useElementWidth from "../../hooks/useElementWidth";

const PostList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { userId } = useAuth();

  const [postSummaries, setPostSummaries] = useState<PostSummary[]>([]);
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);

  const {
    search,
    showDetail,
    saveBookmark,
    removeBookmark
  } = usePostService();

  const {searchFilter, setSearchFilter} = useSearchFilter();
  const {searchFilterOpt, setSearchFilterOpt} = useSearchFilterOpt();

  const {setSearchFilterModal} = useSearchFilterModal();

  useEffect(() => {
    search(searchFilter, searchFilterOpt).then(
      (list => setPostSummaries(list!))
    );
  }, [searchFilter, searchFilterOpt, search]);

  const postDetailQueryHandler = useCallback((searchParams: URLSearchParams) => {
    const slotId = searchParams.get("slot") || null;
    if (!slotId) return setPostDetail(null);

    showDetail(Number(slotId))
      .then((data) => setPostDetail(data!))
      .catch(() => setPostDetail(null));
  }, [showDetail]);

  const paginationQueryHandler = useCallback((searchParams: URLSearchParams) => {
    const pageString = searchParams.get("page") || "1";
    setSearchFilterOpt({
      ...searchFilterOpt,
      offset: (parseInt(pageString)-1) * searchFilterOpt.limit
    });
  }, [searchFilterOpt, setSearchFilterOpt]);

  useEffect(() => {
    postDetailQueryHandler(searchParams);
    paginationQueryHandler(searchParams);
  }, [searchParams]);

  const itemsElementRef = useRef<HTMLDivElement>(null);
  const itemElementRef = useRef<HTMLDivElement>(null);

  const itemsWidth = useElementWidth(itemsElementRef);
  console.log(itemsWidth);

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-6" ref={itemsElementRef}>
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
            saveBookmark(userId, postId);
          }}
          cancelBookmark={(postId) => {
            removeBookmark(userId, postId);
          }}
          clickItem={(postId) => {
            searchParams.set("slot", String(postId));
            setSearchParams(searchParams);
          }}
          selectedPost={searchParams.get("slot") || null}
        />
      </div>
      <div className="col-span-4" ref={itemElementRef}>
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
      </div>
      {/* <FilterPopup

      /> */}
    </div>
  );
}

export default PostList;
