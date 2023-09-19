import styled from "styled-components";
import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";

import { PostSummary } from "../../../domain/search/post.interface";
import { ID } from "../../../types/common";
import { deepGray, deepGreen, lightGreen, tailwindGray } from "../../../styles/constant";
import { usePostPagination } from "../../../recoil/pageState";
import { classNames } from "../../../utils";

import VisibilityIcon from '@mui/icons-material/Visibility';
import PinDropIcon from '@mui/icons-material/PinDrop';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

interface PostItemsUx {
  addBookmark: (postId: ID) => void;
  cancelBookmark: (postId: ID) => void;
  clickItem: (postId: ID) => void;
  postContents: PostSummary[];
  selectedPost: ID | null;
  bookmarkList: ID[];
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
    <Stack className="flex flex-col items-center py-3" spacing={2}>
      {
        ux.postContents.map((content) => (
          <Card key={content.postId} className={classNames(
              "lg:max-w-[465px] max-w-[380px] w-full px-3 py-3 bg-white hover:bg-neutral-50 hover:opacity-80 cursor-pointer rounded-md",
              ux.selectedPost === content.postId ? "border-2 border-gray-500" : ""
            )}
            onClick={() => ux.clickItem(content.postId)}
          >
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
                ux.bookmarkList.includes(content.postId) ? (
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    ux.cancelBookmark(content.postId);
                  }}>
                    <BookmarkIcon style={{
                      color: "#FFE500"
                    }}/>
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    ux.addBookmark(content.postId);
                  }}>
                    <BookmarkBorderIcon sx={{color: deepGray}} />
                  </IconButton>
                )
              }
            </div>
            <div className="w-full flex flex-row items-center space-x-2 lg:text-base text-sm">
              <span style={{
                backgroundColor: content.dDay.startsWith("D") ? lightGreen : tailwindGray[200],
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
          </Card>
        ))
      }
      <PostItemsPagination/>
    </Stack>
  )
}

export const PostItemsSkeleton = () => {
  return (
    <Stack className="mx-auto lg:max-w-[465px] max-w-[380px] py-3">
      {
        [1,2,3,4,5,6].map((_, index) => (
          <Stack className="w-full px-3 py-3" spacing={2} key={index}>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Skeleton variant="text" sx={{fontSize: '0.75rem'}} width={80}/>
                <Skeleton variant="text" sx={{fontSize: '0.75rem'}} width={80}/>
              </div>
              <Skeleton variant={"rectangular"} width={12} height={16} />
            </div>
            <div className="w-full flex flex-row items-center space-x-2 lg:text-base text-sm">
              <Skeleton variant={"rectangular"} width={60} />
              <Skeleton variant={"rectangular"} width={"100%"} />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center lg:space-x-2 space-x-1 text-xs">
                <Skeleton variant="text" width={40} />
                <Skeleton variant="text" width={40} />
                <Skeleton variant="text" width={40} />
              </div>
              <Skeleton variant={"text"} width={120} />
            </div>
          </Stack>
        ))
      }
    </Stack>
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
