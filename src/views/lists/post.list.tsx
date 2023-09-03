import { useQuery } from "@tanstack/react-query";

import type {
  PostSummary,
  PostDetail,
  SearchFilter,
  PostService
} from "../../domain/search/post.interface";

interface PostListProps {
  filter: SearchFilter;
}

export const PostList: React.FC<PostListProps> = () => {
  return (
    <></>
  );
}
