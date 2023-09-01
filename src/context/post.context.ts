import { createContext, useContext } from "react";

import type { PostService } from "../domain/account/post.interface";

export const PostContext = createContext<PostService | undefined>(undefined);

export const usePost = (): PostService => {
  const context = useContext(PostContext);
  return context!;
}
