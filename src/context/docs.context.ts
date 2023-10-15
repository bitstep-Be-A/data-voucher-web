import { createContext } from "react";
import { DocNode } from "../recoil/app/DocNodeQuery";

interface DocsContextValue {
  docNode?: DocNode;
  isLoading: boolean;
}

export const DocsContext = createContext<DocsContextValue | undefined>(undefined);
