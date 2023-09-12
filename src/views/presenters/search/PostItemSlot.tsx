import { PostDetail } from "../../../domain/search/post.interface";
import { classNames } from "../../../utils";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AttachmentIcon from '@mui/icons-material/Attachment';

interface PostItemSlotUx {
  closeSlot: () => void;
  saveFile: (filePosition: number) => void;
  visitWebsite: (url?: string) => void;
  content: PostDetail;
}

const responsiveHeaderText = "lg:text-base text-sm";
const responsiveBodyText = "lg:text-sm text-xs";
const responsiveHeaderMarginY = "lg:my-4 my-3";
const responsiveBodyMarginY = "lg:my-3 my-2.5";

export const PostItemSlot: React.FC<PostItemSlotUx> = (ux) => {
  return (
    <div className="w-full flex flex-col items-center text-deepGray">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-2 h-2 bg-transparent" />
        <h3 className={classNames(
          responsiveHeaderMarginY,
          responsiveHeaderText
        )}>공고상세</h3>
        <IconButton onClick={ux.closeSlot} className="lg:w-5 lg:h-5 w-4 h-4 relative right-4">
          <CloseIcon/>
        </IconButton>
      </div>
      <hr className="w-full" />
      <div className="w-full px-8">
        <div className={classNames(
          responsiveHeaderText,
          "px-8 lg:mt-4 mt-3"
        )}>{ux.content.notice}</div>
        <hr className={responsiveHeaderMarginY} />
        <div className={classNames(
          "w-full grid gap-y-3 grid-cols-7",
          responsiveBodyText
        )}>
          <span className="col-span-2 font-bold">
            마감일
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.dDay}
          </span>
          <span className="col-span-2 font-bold">
            분야
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.part}
          </span>
          <span className="col-span-2 font-bold">
            사업목적
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.purpose}
          </span>
          <span className="col-span-2 font-bold">
            소관부처
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.department}
          </span>
          <span className="col-span-2 font-bold">
            수행기관
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.organization}
          </span>
          <span className="col-span-2 font-bold">
            게시일시
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.postDate}
          </span>
          <span className="col-span-2 font-bold">
            접수기간
          </span>
          <span className="col-end-8 col-span-4">
            <p>{ux.content.applyStartDate} ~</p>
            <p>{ux.content.applyEndDate}</p>
          </span>
          <span className="col-span-2 font-bold">
            지원규모
          </span>
          <span className="col-end-8 col-span-4">
            {ux.content.budget}
          </span>
        </div>
        <hr className={responsiveBodyMarginY} />
        <div className={classNames(
          responsiveBodyText,
        )}>
          <h5 className="font-bold lg:mb-3 mb-2.5">사업안내</h5>
          <span>{ux.content.overview}</span>
        </div>
        <hr className={responsiveBodyMarginY} />
        {
          ux.content.attachments.map((attachment, index) => (
            <div className="flex flex-row space-x-3" key={index}>
              <AttachmentIcon/>
              <span className={classNames(
                "underline cursor-pointer",
                responsiveBodyText
              )} onClick={() => ux.visitWebsite(
                process.env.REACT_APP_SERVER_URL + attachment.pfi_filename
              )}>
                { attachment.pfi_filename }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
