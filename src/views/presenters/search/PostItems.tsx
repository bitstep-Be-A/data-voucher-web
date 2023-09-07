import styled from "styled-components";

import { PostSummary } from "../../../domain/search/post.interface";
import { ID } from "../../../types/common";

import VisibilityIcon from '@mui/icons-material/Visibility';
import PinDropIcon from '@mui/icons-material/PinDrop';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

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
  color: #6C6C6C;
`;

export const PostItems: React.FC<PostItemsUx> = (ux) => {
  return (
    <ul className="w-full h-full flex flex-col items-center py-3">
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
                  <BookmarkBorderIcon />
                )
              }
            </div>
            <div className="w-full flex flex-row items-center space-x-2 lg:text-base text-sm">
              <span style={{
                backgroundColor: "#E9FFE9",
                color: "#009A2B",
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
              <span className="font-bold text-sm">{content.projectAmount}</span>
            </div>
          </li>
        ))
      }
    </ul>
  )
}
