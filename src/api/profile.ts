import { Axios } from "./axios"

export const profileApi = {
  infoProfile: async () => {
    const response = await Axios.post("/프로필 업데이트/info_profile");
    return response.data;
  },
  updateProfile: async (data: object) => {
    await Axios.post("/프로필 업데이트/update_profile", data);
    return null;
  }
}
