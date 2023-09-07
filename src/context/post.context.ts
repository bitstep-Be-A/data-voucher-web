import { createContext, useContext } from "react";

import type { PostService } from "../domain/search/post.interface";

export const PostContext = createContext<PostService | undefined>(undefined);

export const usePostService = (): PostService => {
  const context = useContext(PostContext);
  return context!;
}
