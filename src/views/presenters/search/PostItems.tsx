import { PostSummary } from "../../../domain/search/post.interface";
import { ID } from "../../../types/common";

interface PostItemsUx {
  addBookmark: (postId: ID) => void;
  cancelBookmark: (postId: ID) => void;
  clickItem: (postId: ID) => void;
  postContents: PostSummary[];
  selectedPost: ID | null;
}

export const PostItems: React.FC<PostItemsUx> = (ux) => {
  return (
    <ul>
      {
        ux.postContents.map((content) => (
          <li key={content.postId}>
            <p>{content.notice}</p>
            <div>{content.dDay}</div>
            <div>{content.readCount}명 읽음</div>
            {
              content.searchTags.map((tag, index) => (
                <div key={index}>{tag}</div>
              ))
            }
          </li>
        ))
      }
    </ul>
  )
}
