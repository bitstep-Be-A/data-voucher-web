import styled from "styled-components";

import { PostSummary } from "../../../domain/search/post.interface";
import { ID } from "../../../types/common";

import VisibilityIcon from '@mui/icons-material/Visibility';
import PinDropIcon from '@mui/icons-material/PinDrop';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
  gap: 4px;
  font-size: 12px;
  color: #6C6C6C;
`;

export const PostItems: React.FC<PostItemsUx> = (ux) => {
  return (
    <ul className="w-full h-full flex flex-col items-center">
      {
        ux.postContents.map((content) => (
          <li key={content.postId} className="lg:w-[465px] max-w-[380px] w-full px-3 py-3">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Noti>
                  <PinDropIcon className="w-5 h-5" />
                  <span>{content.organization}</span>
                </Noti>
                <Noti>
                  <VisibilityIcon className="w-5 h-5" />
                  <span>조회수 {content.readCount}</span>
                </Noti>
              </div>
              <BookmarkIcon className="w-6 h-6"/>
            </div>
            <div className="w-full flex flex-row items-center space-x-2 lg:text-base text-sm">
              <span style={{backgroundColor: "#E9FFE9"}}>{content.dDay}</span>
              <p className="truncate">{content.notice}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center lg:space-x-2 space-x-1 text-xs">
                {
                  content.searchTags.map((tag, index) => (
                    <div className="border rounded-md px-4 py-2" key={index}>#{tag}</div>
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
