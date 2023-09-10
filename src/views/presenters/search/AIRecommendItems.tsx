import { ID } from "../../../types/common";

import { PostRecommendation } from "../../../domain/search/post.interface";
import { deepGray } from "../../../styles/constant";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';

interface AIRecommendItemsUx {
  addBookmark: (postId: ID) => void;
  cancelBookmark: (postId: ID) => void;
  seeDetail: (postId: ID) => void;
  postContents: PostRecommendation[];
  bookmarkList: ID[];
}

export const AIRecommendItems = (ux: AIRecommendItemsUx) => {
  return (
    <>
    <h3 className="mb-4 font-bold lg:text-base text-sm text-deepGray">AI 맞춤 추천 공고</h3>
    <ul className="w-[350px] flex flex-col items-center px-6 space-y-5 lg:text-base text-sm">
      {
        ux.postContents.map((content, index) => (
          <li className="w-full flex flex-col py-2 px-3 rounded-lg bg-zinc-100 text-deepGray" key={index}>
            <div className="w-full flex flex-row justify-between items-center mb-3">
              <span>{content.dDay}</span>
              {
                ux.bookmarkList.includes(content.postId) ? (
                  <IconButton onClick={() => ux.cancelBookmark(content.postId)}>
                    <BookmarkIcon style={{
                      color: "#FFE500"
                    }}/>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => ux.addBookmark(content.postId)}>
                    <BookmarkBorderIcon sx={{color: deepGray}} />
                  </IconButton>
                )
              }
            </div>
            <span>{content.notice}</span>
            <hr className="px-2 my-2" />
            <div className="w-full grid gap-y-3 grid-cols-7">
              <span className="col-span-2 font-bold">
                분야
              </span>
              <span className="col-end-8 col-span-4">
                {content.part}
              </span>
              <span className="col-span-2 font-bold">
                소관부처
              </span>
              <span className="col-end-8 col-span-4">
                {content.department}
              </span>
              <span className="col-span-2 font-bold">
                수행기관
              </span>
              <span className="col-end-8 col-span-4">
                {content.organization}
              </span>
              <span className="col-span-2 font-bold">
                게시일시
              </span>
              <span className="col-end-8 col-span-4">
                {content.postDate}
              </span>
              <span className="col-span-2 font-bold">
                지원규모
              </span>
              <span className="col-end-8 col-span-4">
                {content.projectBudget}
              </span>
            </div>
            <button className="w-full lg:py-3 py-2 rounded-md bg-lightGray text-white mt-3"
              onClick={() => ux.seeDetail(content.postId)}
            >상세 보기</button>
          </li>
        ))
      }
    </ul>
    </>
  );
}
