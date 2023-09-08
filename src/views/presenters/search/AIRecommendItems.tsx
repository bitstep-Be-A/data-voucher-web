import { ID } from "../../../types/common";

interface AIRecommendItemsUx {
  addBookmark: (postId: ID) => void;
  cancelBookmark: (postId: ID) => void;
  seeDetail: (postId: ID) => void;
}

export const AIRecommendItems = (ux: AIRecommendItemsUx) => {
  return (
    <></>
  );
}
