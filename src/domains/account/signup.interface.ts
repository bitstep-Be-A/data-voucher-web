import type { ExceptionDetail } from "../../utils/exceptions";
import type {
  CompanySizeEnum,
  CompanyTypeEnum
} from "../../policies/company.policy";

export interface JoinAgreement {
  isAgreeService: boolean;
  isAgreePrivacy: boolean;
  isAgreeMarketing: boolean;
}

export interface CredentialInfo {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface ProfileInfo {
  name: string;
}

export interface MyInfo extends CredentialInfo, ProfileInfo {}

export interface CompanyRegisterInfo {
  businessRegistrationNumber: string;
  CEO: string;
  establishDate: string;
  companySize: CompanySizeEnum;
}

export interface CompanyDetailInfo {
  targetAreas: string[];
  companyType: CompanyTypeEnum;
  employeeCount: number;
  interestKeywords?: string;
}

export interface CompanyInfo extends CompanyRegisterInfo, CompanyDetailInfo {}

export interface SignupinfoRequest extends JoinAgreement, MyInfo, CompanyInfo {}

export interface SignupValidator {
  checkRequiredAgreement: (agreement: JoinAgreement) => boolean;
  checkValidEmail: (email: string) => boolean;
  checkDuplicatedEmail: (email: string) => Promise<boolean>;
  checkValidPassword: (password: string) => boolean;
  checkPasswordConfirmed: (password: string, confirmPassword: string) => boolean;
  checkValidPhoneNumber: (phoneNumber: string) => boolean;
}

export interface SignupService {
  submitAgreement: (agreement: JoinAgreement) => void;
  submitMyInfo: (my: MyInfo) => Promise<void>;
  submitCompanyInfo: (company: CompanyInfo) => void;
  verifyEmail: () => Promise<void>;
  verifyCompany: () => Promise<void>;
}

export interface SignupExceptionMap {
  REQUIRED_AGREEMENT_UNCHECKED: ExceptionDetail;
  INVALID_EMAIL_FORMAT: ExceptionDetail;
  EMAIL_DUPLICATED: ExceptionDetail;
  INVALID_PASSWORD_FORMAT: ExceptionDetail;
  UNMATCHED_PASSWORD: ExceptionDetail;
  INVALID_PHONE_NUMBER_FORMAT: ExceptionDetail;
  COMPANY_NOT_VERIFIED: ExceptionDetail;
  INVALID_NAME: ExceptionDetail;
  COMPANY_SIZE_NOT_SELECTED: ExceptionDetail;
  COMPANY_TYPE_NOT_SELECTED: ExceptionDetail;
  COMPANY_TARGET_AREA_NOT_SELECTED: ExceptionDetail;
}
