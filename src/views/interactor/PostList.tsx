import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail, PostRecommendation } from "../../domain/search/post.interface";
import { usePostService } from "../../context/post.context";
import { useAuth } from "../../context/auth.context";
import { useSearchFilterModal } from "../../recoil/modalState";
import { useSearchFilter, useSearchFilterOpt } from "../../domain/search/post.impl";
import { DataStateType } from "../../types/common";
import { classNames } from "../../utils";
import { useContainer } from "../../context/base.context";

import { SearchBar } from "../presenters/search/SearchBar";
import { FilterPopup } from "../presenters/search/FilterPopup";
import { PostItems } from "../presenters/search/PostItems";
import { PostItemSlot } from "../presenters/search/PostItemSlot";
import useElementWidth from "../../hooks/useElementWidth";
import Loading from "../../components/Loading";
import { AIRecommendItems } from "../presenters/search/AIRecommendItems";

const PostList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { userId } = useAuth();

  const [summarySnapshot, setSummarySnapshot] = useState<DataStateType<PostSummary[]>>({
    data: [],
    loading: false
  });
  const [detailSnapshot, setDetailSnapshot] = useState<DataStateType<PostDetail | null>>({
    data: null,
    loading: false
  });
  const [recommendSnapshot, setRecommendSnapshot] = useState<DataStateType<PostRecommendation[]>>({
    data: [],
    loading: false
  });

  const {
    search,
    showDetail,
    saveBookmark,
    removeBookmark,
    recommend
  } = usePostService();

  const {searchFilter, setSearchFilter} = useSearchFilter();
  const {searchFilterOpt, setSearchFilterOpt} = useSearchFilterOpt();

  const {setSearchFilterModal} = useSearchFilterModal();

  useEffect(() => {
    setDetailSnapshot({
      data: null,
      loading: false,
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
    if (!slotId) {
      setRecommendSnapshot({data: [], loading: true});
      recommend(userId)
        .then((data) => setRecommendSnapshot({
          data: data!,
          loading: false
        }));
      setDetailSnapshot({
        loading: false,
        data: null
      });
      return;
    }

    setDetailSnapshot({data: null, loading: true});
    showDetail(Number(slotId))
      .then((data) => setDetailSnapshot({
        data: data!,
        loading: false,
      }))
      .catch(() => setDetailSnapshot({
        data: null,
        loading: false,
      }));
  }, [showDetail, userId]);

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
    if (!!detailSnapshot.data) {
      return listWidth > 724 ? ["", ""] : ["hidden", ""];
    }
    return listWidth > 724 ? ["", ""] : ["", "hidden"];
  }, [listWidth, detailSnapshot]);

  const {mainScreenRef} = useContainer();
  useEffect(() => {
    if (mainScreenRef.current)
      mainScreenRef.current.className = "w-full h-full";
    return () => {
      if (mainScreenRef.current)
        mainScreenRef.current.className = "w-full h-full overflow-y-scroll";
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row pb-20" ref={listElementRef}>
      <div className={classNames(
        displayClassName[0],
        "w-full h-full",
        "border-r border-gray-400 overflow-y-scroll"
      )}>
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
        {
          summarySnapshot.loading ? <Loading/> : (
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
          )
        }
      </div>
      <div className={classNames(
        displayClassName[1],
        "w-full h-full flex flex-col items-center py-8",
        "overflow-y-scroll"
      )}>
        {
          (detailSnapshot.loading || recommendSnapshot.loading) && <Loading/>
        }
        {
          detailSnapshot.data ? (
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
          ) : (
            <AIRecommendItems
              postContents={recommendSnapshot.data}
              addBookmark={(postId) => {
                saveBookmark(userId, postId);
              }}
              cancelBookmark={(postId) => {
                removeBookmark(userId, postId);
              }}
              seeDetail={(postId) => {
                searchParams.set("slot", String(postId));
                setSearchParams(searchParams);
              }}
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
