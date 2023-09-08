import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail } from "../../domain/search/post.interface";
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
    if (!slotId) return setDetailSnapshot({
      loading: false,
      data: null
    });

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

  const listElementRef = useRef<HTMLDivElement>(null);

  const listWidth = useElementWidth(listElementRef);

  const displayClassName = useMemo(() => {
    if (listWidth === null) return ["hidden", "hidden"];
    if (!!detailSnapshot.data) {
      return listWidth > 700 ? ["w-full h-full", "w-full h-full flex flex-col"] : ["hidden", "w-full h-full flex flex-col"];
    }
    return listWidth > 700 ? ["w-full h-full", "w-full h-full flex flex-col"] : ["w-full h-full", "hidden"];
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
    <div className="w-full h-full flex flex-row" ref={listElementRef}>
      <div className={classNames(
        displayClassName[0],
        "border-r border-gray-400 overflow-y-scroll pb-20"
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
      <div className={displayClassName[1]}>
        {
          detailSnapshot.loading && <Loading/>
        }
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
