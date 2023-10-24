import { atom, selector, useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";

import ProfileDriver from "../../driver/ProfileDriver";

export type ProfileQuery$data = {
  companyAddress: string;
  companySize: string;
  companyType: string;
  employCount: number;
  interestKeywords: string[];
  agreeMarketingSMS: boolean;
  agreeMarketingMail: boolean;
}

type ProfileRequest = {
  init: boolean;
}

const profileQuery_request = atom<ProfileRequest>({
  key: "recoil/app/ProfileQuery/request",
  default: {
    init: true,
  }
});

export const profileState = selector<ProfileQuery$data>({
  key: "recoil/app/ProfileQuery",
  get: async () => {
    // const req = get(profileQuery_request);
    const data = await ProfileDriver.manager.get().query();
    return {
      ...data,
      interestKeywords: data.interestKeywords.split('|')
    }
  },
  set: ({set}) => set(profileQuery_request, {
    init: false,
  })
})

export const useProfileQuery = () => {
  const setReq = useSetRecoilState(profileQuery_request);

  return {
    query: () => setReq({init: true}),
    refresh: useRecoilRefresher_UNSTABLE(profileState)
  }
}
