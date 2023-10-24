import { atom, selector } from "recoil";

import ProfileDriver from "../../driver/ProfileDriver";
import { CompanySizeEnum, CompanyTypeEnum } from "../../policies/company.policy";
import { getAxiosResponse } from "../../api/axios";

export type ProfileMutation$data = {
  companyAddress: string;
  companySize: string;
  companyType: string;
  employCount: number;
  interestKeywords: string[];
  agreeMarketingSMS: boolean;
  agreeMarketingMail: boolean;
}

export const profileUpdateRequestState = atom<ProfileMutation$data | undefined>({
  key: "recoil/schema/ProfileRequest",
  default: undefined
});

export const profileMutation_update = selector({
  key: "recoil/app/ProfileMutation/update",
  get: async ({get}) => {
    const req = get(profileUpdateRequestState);
    if (!req) return 0;
    
    try {
      await ProfileDriver.manager.update({
        companyAddress: req.companyAddress,
        companySize: req.companySize as CompanySizeEnum,
        companyType: req.companyType as CompanyTypeEnum,
        employCount: req.employCount,
        interestKeywords: req.interestKeywords.join('|'),
        agreeMarketingSMS: req.agreeMarketingSMS,
        agreeMarketingMail: req.agreeMarketingMail
      }).save();
      return 1;
    } catch(e) {
      const detail = getAxiosResponse(e);
      throw detail;
    }
  },
  set: ({set}) => set(profileUpdateRequestState, undefined)
});
