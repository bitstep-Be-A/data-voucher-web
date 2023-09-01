import { useQuery } from "@tanstack/react-query";

import type {
  PostSummary,
  PostDetail,
  SearchFilter,
  PostService
} from "../../domain/account/post.interface";

interface PostListProps {
  filters: SearchFilter[];
}

export const PostList: React.FC<PostListProps> = () => {
  return (
    <></>
  );
}
