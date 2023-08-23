import type { ExceptionDetail } from "../utils/exceptions";
import type {
  CompanySizeEnum,
  CompanyTypeEnum
} from "../policies/auth.policy";

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
  companyLocation: string;
  companyType: CompanyTypeEnum;
  employeeCount: number;
  interestKeywords?: string;
}

export interface CompanyInfo extends CompanyRegisterInfo, CompanyDetailInfo {}

export interface SignupinfoRequest extends JoinAgreement, MyInfo, CompanyInfo {}

export interface SignupService {
  // 약관동의
  checkRequiredAgreement: (agreement: JoinAgreement) => boolean;
  submitAgreement: (agreement: JoinAgreement) => void;
  // 정보입력
  checkValidEmail: (email: string) => boolean;
  checkDuplicatedEmail: (email: string) => Promise<boolean>;
  checkValidPassword: (password: string) => boolean;
  checkPasswordConfirmed: (password: string, confirmPassword: string) => boolean;
  checkValidPhoneNumber: (phoneNumber: string) => boolean;
  submitMyInfo: (my: MyInfo) => Promise<void>;
  // 가입완료
  submitCompanyInfo: (company: CompanyInfo) => void;
}

export interface SignupExceptionMap {
  POLICY_AGREE_REQUIRED: ExceptionDetail;
  INVALID_EMAIL_FORMAT: ExceptionDetail;
  EMAIL_DUPLICATED: ExceptionDetail;
  INVALID_PASSWORD_FORMAT: ExceptionDetail;
  UNMATCHED_PASSWORD: ExceptionDetail;
  INVALID_PHONE_NUMBER_FORMAT: ExceptionDetail;
}
