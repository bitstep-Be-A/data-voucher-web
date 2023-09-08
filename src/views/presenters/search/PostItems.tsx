import styled from "styled-components";
import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";

import { PostSummary } from "../../../domain/search/post.interface";
import { ID } from "../../../types/common";
import { deepGray, deepGreen, lightGray, lightGreen } from "../../../styles/constant";
import { usePostPagination } from "../../../recoil/pageState";

import VisibilityIcon from '@mui/icons-material/Visibility';
import PinDropIcon from '@mui/icons-material/PinDrop';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface PostItemsUx {
  addBookmark: (postId: ID) => void;
  cancelBookmark: (postId: ID) => void;
  clickItem: (postId: ID) => void;
  postContents: PostSummary[];
  selectedPost: ID | null;
}

const Noti = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${deepGray};
`;

export const PostItems: React.FC<PostItemsUx> = (ux) => {
  return (
    <ul className="flex flex-col items-center py-3">
      {
        ux.postContents.map((content) => (
          <li key={content.postId} className="lg:max-w-[465px] max-w-[380px] w-full px-3 py-3 bg-white">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Noti>
                  <PinDropIcon style={{
                    width: 16,
                    height: 16
                  }} />
                  <span>{content.organization}</span>
                </Noti>
                <Noti>
                  <VisibilityIcon style={{
                    width: 16,
                    height: 16
                  }} />
                  <span>조회수 {content.readCount}</span>
                </Noti>
              </div>
              {
                content.isBookmarked ? (
                  <BookmarkIcon style={{
                    color: "#FFE500"
                  }}/>
                ) : (
                  <BookmarkBorderIcon sx={{color: deepGray}} />
                )
              }
            </div>
            <div className="w-full flex flex-row items-center space-x-2 lg:text-base text-sm">
              <span style={{
                backgroundColor: content.dDay.startsWith("D") ? lightGreen : lightGray,
                color: content.dDay.startsWith("D") ? deepGreen : deepGray,
                whiteSpace: "nowrap"
              }}>{content.dDay}</span>
              <p className="truncate">{content.notice}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center lg:space-x-2 space-x-1 text-xs">
                {
                  content.searchTags.map((tag, index) => (
                    <span key={index}>#{tag}</span>
                  ))
                }
              </div>
              <span className="font-bold text-sm">{content.projectBudget}</span>
            </div>
          </li>
        ))
      }
      <PostItemsPagination/>
    </ul>
  )
}

const PostItemsPagination = () => {
  const [searchParams, _] = useSearchParams();
  const { totalPage } = usePostPagination();
  const page = useMemo(() => parseInt(searchParams.get('page') || '1', totalPage), [searchParams, totalPage]);
  return (
    <Pagination
      page={page}
      count={totalPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={item.page === 1 ? '' : `?page=${item.page}`}
          {...item}
        />
      )}
      className="mb-4 mt-4"
    />
  )
}
