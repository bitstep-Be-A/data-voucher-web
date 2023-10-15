import { Axios } from "./axios";
import qs from "qs";

export const docManagementApi = {
  createFolder: async (data: object) => {
    await Axios.post(`/내문서관리/create_folder?${qs.stringify(data)}`);
    return null;
  },
  deleteFolder: async (data: object) => {
    await Axios.delete(`/내문서관리/delete_folder?${qs.stringify(data)}`);
    return null;
  },
  deleteFile: async (data: object) => {
    await Axios.delete(`/내문서관리/delete_file?${qs.stringify(data)}`);
  },
  getDoc: async () => {
    const response = await Axios.get(`/내문서관리/main`);
    return response.data;
  },
  createFile: async (data: any) => {
    const formData = new FormData();
    formData.append("file", data['file']);

    await Axios.post(`/내문서관리/file_upload?${qs.stringify({
      'folder_id': data["folder_id"]
    })}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return null;
  }
}
