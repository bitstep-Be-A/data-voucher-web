import type { DocFolderId } from "../domain/doc-management/docs.interface";
import { Axios } from "./axios";

export const docManagementApi = {
  createFolder: async (data: object) => {
    await Axios.post(`/내문서관리/create_folder`, data);
    return null;
  },
  deleteFolder: async (data: object) => {
    await Axios.delete(`/내문서관리/delete_folder`, {data});
    return null;
  },
  getDoc: async () => {
    const response = await Axios.get(`/내문서관리/main`);
    return response.data;
  }
}
