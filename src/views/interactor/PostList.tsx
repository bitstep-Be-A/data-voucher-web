import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail } from "../../domain/search/post.interface";
import { usePostService } from "../../context/post.context";
import { useAuth } from "../../context/auth.context";
import { useSearchFilterModal } from "../../recoil/modalState";
import { useSearchFilter, useSearchFilterOpt } from "../../domain/search/post.impl";
import { DataStateType } from "../../types/common";

import { SearchBar } from "../presenters/search/SearchBar";
import { FilterPopup } from "../presenters/search/FilterPopup";
import { PostItems } from "../presenters/search/PostItems";
import { PostItemSlot } from "../presenters/search/PostItemSlot";
import useElementWidth from "../../hooks/useElementWidth";

const PostList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { userId } = useAuth();

  const [summarySnapshot, setSummarySnapshot] = useState<DataStateType<PostSummary[]>>({
    data: [],
    loading: false,
    error: null
  });
  const [detailSnapshot, setDetailSnapshot] = useState<DataStateType<PostDetail | null>>({
    data: null,
    loading: false,
    error: null
  });

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
    setDetailSnapshot({
      data: null,
      loading: true,
    })
    search(searchFilter, searchFilterOpt).then(
      (list => setSummarySnapshot({
        data: list!,
        loading: false,
      }))
    );
  }, [searchFilter, searchFilterOpt, search]);

  const postDetailQueryHandler = useCallback((searchParams: URLSearchParams) => {
    const slotId = searchParams.get("slot") || null;
    if (!slotId) return setDetailSnapshot({
      ...detailSnapshot,
      data: null
    });

    setDetailSnapshot({...detailSnapshot, loading: true});
    showDetail(Number(slotId))
      .then((data) => setDetailSnapshot({
        data: data!,
        loading: false,
      }))
      .catch(() => setDetailSnapshot({
        data: null,
        loading: false,
      }));
  }, [showDetail, detailSnapshot]);

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

  const listElementRef = useRef<HTMLDivElement>(null);

  const listWidth = useElementWidth(listElementRef);

  const displayClassName = useMemo(() => {
    if (listWidth === null) return ["hidden", "hidden"];
    if (!!detailSnapshot) {
      return listWidth > 700 ? ["col-span-6", "col-span-4"] : ["hidden", "col-span-10"];
    }
    return listWidth > 700 ? ["col-span-6", "col-span-4"] : ["col-span-10", "hidden"];
  }, [listWidth, detailSnapshot]);

  return (
    <div className="grid grid-cols-10" ref={listElementRef}>
      <div className={displayClassName[0]}>
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
          postContents={summarySnapshot.data}
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
      <div className={displayClassName[1]}>
        {
          detailSnapshot.data && (
            <PostItemSlot
              closeSlot={() => {
                searchParams.delete("slot");
                setSearchParams(searchParams);
              }}
              saveFile={(filePosition) => {
                const path = process.env.REACT_APP_SERVER_URL! + detailSnapshot.data?.attachments[filePosition].pfi_filename;
                window.open(path, '_blank');
              }}
              visitWebsite={(url) => {
                if (!url) return;
                const w = window.open(url, '_blank');
                w?.focus();
              }}
              content={detailSnapshot.data}
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
