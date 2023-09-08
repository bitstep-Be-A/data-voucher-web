import { atom, selector, useRecoilValue } from "recoil";

import { POST_SEARCH_LIMIT } from "../policies/search.policy";

export const postTotalItemsState = atom({
  key: "pageState/postTotalItems",
  default: 0
});

const postPageState = selector({
  key: "pageState/postPage",
  get: ({ get }) => {
    const totalCount = get(postTotalItemsState);
    return {
      totalPage: Math.ceil(totalCount / POST_SEARCH_LIMIT)
    };
  }
});

export const usePostPagination = () => useRecoilValue(postPageState);
