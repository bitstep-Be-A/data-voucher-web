import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { PostSummary, PostDetail, PostRecommendation } from "../../domain/search/post.interface";
import { usePostService } from "../../context/post.context";
import { useAuth } from "../../context/auth.context";
import { useSearchFilterModal } from "../../recoil/modalState";
import { useSearchFilter, usePostListOption } from "../../domain/search/post.impl";
import { DataStateType, ID } from "../../types/common";
import { classNames } from "../../utils";
import { useContainer } from "../../context/base.context";
import { SearchBar } from "../presenters/search/SearchBar";
import { PostTabBar } from "../presenters/search/PostTabBar";
// import { FilterPopup } from "../presenters/search/FilterPopup";
import { PostItems, PostItemsSkeleton } from "../presenters/search/PostItems";
import { PostItemSlot } from "../presenters/search/PostItemSlot";
import useElementWidth from "../../hooks/useElementWidth";
import Loading from "../../components/Loading";
import { AIRecommendItems } from "../presenters/search/AIRecommendItems";
import { Resizable } from "re-resizable";
import { routes } from "../../routes/path";

const PostList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const { userId } = useAuth();

  // service로 fetch 하여 가져온 데이터 snapshot
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

  // 북마크 reactive하게 조정하기 위한 state
  const [summaryBookmarkList, setSummaryBookmarkList] = useState<ID[]>([]);
  const [recommendBookmarkList, setRecommendBookmarkList] = useState<ID[]>([]);

  // 주입받은 post service
  const {
    search,
    showDetail,
    saveBookmark,
    removeBookmark,
    recommend
  } = usePostService();

  // search 시 필요한 parameter
  const {searchFilter, setSearchFilter} = useSearchFilter();
  const {postListOption, setPostListOption} = usePostListOption();

  const {setSearchFilterModal} = useSearchFilterModal();

  useEffect(() => {
    if (routes.bookmark.re.test(pathname) && !(searchFilter.bookmarkOnly === 'Y')) {
      setSearchFilter({
        ...searchFilter,
        bookmarkOnly: "Y"
      });
      return;
    }
    else if (routes.search.re.test(pathname) && !(searchFilter.bookmarkOnly === 'N')) {
      setSearchFilter({
        ...searchFilter,
        bookmarkOnly: "N"
      });
      return;
    }

    setDetailSnapshot({
      data: null,
      loading: false,
    });
    setSummarySnapshot({
      data: [],
      loading: true,
    });
    
    search(searchFilter, postListOption).then(
      (data => {
        setSummarySnapshot({
          data: data!,
          loading: false,
        });
        setSummaryBookmarkList(data!.filter((v) => v.isBookmarked).map(v => v.postId));
      })
    );
  }, [
    searchFilter,
    postListOption,
    search,
    pathname
  ]);

  const postDetailQueryHandler = useCallback((searchParams: URLSearchParams) => {
    const slotId = searchParams.get("slot") || null;
    if (!slotId) {
      setRecommendSnapshot({data: [], loading: true});
      recommend(userId)
        .then((data) => {
          setRecommendSnapshot({
            data: data!,
            loading: false
          });
          setRecommendBookmarkList(data!.filter((v) => v.isBookmarked).map(v => v.postId));
        });
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
    setPostListOption({
      ...postListOption,
      offset: (parseInt(pageString)-1) * postListOption.limit
    });
  }, [postListOption, setPostListOption]);

  useEffect(() => {
    if (userId) {
      postDetailQueryHandler(searchParams);
    }
    paginationQueryHandler(searchParams);
  }, [searchParams, userId]);

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
    <div className="w-full h-full flex flex-row pt-2 pb-20" ref={listElementRef}>
      <div className={classNames(
          displayClassName[0],
          "w-full h-full",
          "border-r border-gray-400 overflow-y-scroll"
        )}
      >
        <SearchBar
          clickFilter={() => {
            setSearchFilterModal(true);
          }}
          writeDown={_.debounce((value: string) => {
            setPostListOption({
              ...postListOption,
              keyword: value
            });
          }, 1200)}
        />
        <div className="lg:max-w-[465px] max-w-[380px] w-full mx-auto">
          <PostTabBar/>
          {
            summarySnapshot.loading ? <PostItemsSkeleton/> : (
              <PostItems
                postContents={summarySnapshot.data}
                addBookmark={(postId) => {
                  saveBookmark(userId, postId);
                  setSummaryBookmarkList([...summaryBookmarkList, postId]);
                }}
                cancelBookmark={(postId) => {
                  removeBookmark(userId, postId);
                  setSummaryBookmarkList(summaryBookmarkList.filter(v => v !== postId));
                }}
                clickItem={(postId) => {
                  searchParams.set("slot", String(postId));
                  setSearchParams(searchParams);
                }}
                selectedPost={Number(searchParams.get("slot")) || null}
                bookmarkList={summaryBookmarkList}
              />
            )
          }
        </div>
      </div>
      <Resizable className={classNames(
          displayClassName[1],
          "w-full h-full flex flex-col items-center py-8 mx-auto",
          "overflow-y-scroll"
        )}
        enable={{
          left: true
        }}
        minWidth={350}
        maxWidth={780}
      >
        {
          searchParams.get("slot") ? (detailSnapshot.data && !detailSnapshot.loading) ? (
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
          ) : <Loading className="h-full flex items-center"/> : !recommendSnapshot.loading ? (
            <AIRecommendItems
              postContents={recommendSnapshot.data}
              addBookmark={(postId) => {
                saveBookmark(userId, postId);
                setRecommendBookmarkList([...recommendBookmarkList, postId]);
              }}
              cancelBookmark={(postId) => {
                removeBookmark(userId, postId);
                setRecommendBookmarkList(recommendBookmarkList.filter(v => v !== postId));
              }}
              seeDetail={(postId) => {
                searchParams.set("slot", String(postId));
                setSearchParams(searchParams);
              }}
              bookmarkList={recommendBookmarkList}
            />
          ) : <Loading className="h-full flex items-center"/>
        }
      </Resizable>
      {/* <FilterPopup

      /> */}
    </div>
  );
}

export default PostList;
