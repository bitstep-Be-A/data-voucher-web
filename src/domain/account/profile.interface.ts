import { CompanySizeEnum, CompanyTypeEnum } from "../../policies/company.policy";

export interface Profile {
  companyAddress: string;
  companySize: CompanySizeEnum;
  companyType: CompanyTypeEnum;
  employCount: number;
  interestKeywords: string;
  agreeMarketingSMS: boolean;
  agreeMarketingMail: boolean;
}
