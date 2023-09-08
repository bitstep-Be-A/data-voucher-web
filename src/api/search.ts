import { Axios } from "./axios";

import { ID } from "../types/common";

export const postApi = {
  searchList: async (data: object) => {
    const response = await Axios.post(`/검색/post/lists/search`, data);
    return response.data;
  },
  searchDetail: async (postId: ID) => {
    const response = await Axios.get(`/공고상세보기/post/lists/${postId}`);
    return response.data;
  },
  insertBookmark: (userId: ID, postId: ID) => {
    Axios.post(`/즐겨찾기추가/post/bookmark/insert`, {
      "MemberNo": userId,
      "PostID": postId
    });
    return null;
  },
  deleteBookmark: (userId: ID, postId: ID) => {
    Axios.delete(`/즐겨찾기삭제/post/bookmark/delete`, {data: {
      "MemberNo": userId,
      "PostID": postId
    }});
    return null;
  },
  recommendPosts: async (userId: ID) => {
    const response = await Axios.post(`/AI맞춤추천공고/post/lists/recommend`, {'MemberNo': userId});
    return response.data;
  }
}
