import { profileApi } from "../api/profile";
import { Profile } from "../domain/account/profile.interface";
import { CompanySizeEnum, CompanyTypeEnum } from "../policies/company.policy";
import AbstractDriver from "./AbstractDriver";

class ProfileManager {
  get() {
    return new ProfileDriver({
      method: "get"
    });
  }
  update(data: Profile) {
    return new ProfileDriver({
      method: "update",
      data
    })
  }
}

export default class ProfileDriver extends AbstractDriver<Profile> {
  static manager = new ProfileManager();

  async query() {
    if (this.action.method === 'get') {
      const payload = await profileApi.infoProfile();
      const profileInfo = payload["profileInfo"];
      return {
        companyAddress: profileInfo["companyAddress"] as string,
        companySize: profileInfo["companySize"] as CompanySizeEnum,
        companyType: profileInfo["companyType"] as CompanyTypeEnum,
        employCount: profileInfo["employCount"] as number,
        interestKeywords: profileInfo["interestKeywords"] as string,
        agreeMarketingSMS: !!profileInfo["agreeMarketingSMS"],
        agreeMarketingMail: !!profileInfo["agreeMarketingMail"]
      }
    }
    throw Error("INVALID_METHOD");
  }

  async save() {
    if (this.action.method === 'update') {
      const data = this.action.data as Profile;
      await profileApi.updateProfile({
        "CompanyAddress": data.companyAddress,
        "CompanySize": data.companySize,
        "CompanyType": data.companyType,
        "EmployeeCount": data.employCount,
        "InterestKeywords": data.interestKeywords,
        "AgreeMarketingSMS": data.agreeMarketingSMS,
        "AgreeMarketingMail": data.agreeMarketingMail
      });
      return;
    }
    throw Error("INVALID_METHOD");
  }
}
