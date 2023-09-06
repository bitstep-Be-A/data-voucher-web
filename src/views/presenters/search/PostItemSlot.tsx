import { PostDetail } from "../../../domain/search/post.interface";

interface PostItemSlotUx {
  closeSlot: () => void;
  saveFile: (filePosition: number) => void;
  visitWebsite: (url?: string) => void;
  content: PostDetail;
}

export const PostItemSlot: React.FC<PostItemSlotUx> = (ux) => {
  return (
    <></>
  );
}
