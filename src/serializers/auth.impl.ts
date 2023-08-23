import {
  BaseSerializer
} from "../utils/serializer";
import type {
  CompanyInfo,
  JoinPolicy,
  MyInfo,
  SignupService,
  SignupinfoRequest,
  SignupExceptionMap
} from "./auth.interface";
import {
  CompanySizeEnum,
  CompanyTypeEnum,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX
} from "../policies/auth.policy";
import _ from 'lodash';

export const signupExceptionMap: SignupExceptionMap = {
  POLICY_AGREE_REQUIRED: {
    name: 'POLICY_AGREE_REQUIRED',
    message: '필수 약관에 동의해주세요'
  },
  INVALID_EMAIL_FORMAT: {
    name: 'INVALID_EMAIL_FORMAT',
    message: '이메일 형식을 올바르게 입력해주세요'
  },
  EMAIL_DUPLICATED: {
    name: 'EMAIL_DUPLICATED',
    message: '이미 가입된 이메일입니다'
  },
  INVALID_PASSWORD_FORMAT: {
    name: 'INVALID_PASSWORD_FORMAT',
    message: '비밀번호 형식이 올바르지 않습니다'
  },
  UNMATCHED_PASSWORD: {
    name: 'UNMATCHED_PASSWORD',
    message: '비밀번호가 일치하지 않습니다. 다시 확인해주세요'
  },
  INVALID_PHONE_NUMBER_FORMAT: {
    name: 'INVALID_PHONE_NUMBER_FORMAT',
    message: '올바르지 않은 전화번호 형식입니다'
  }
}

export const defaultSignupinfoRequest: SignupinfoRequest = {
  isAgreeService: false,
  isAgreePrivacy: false,
  isAgreeMarketing: false,
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  name: '',
  businessRegistrationNumber: '',
  companyLocation: '',
  establishDate: '',
  CEO: '',
  companySize: CompanySizeEnum.ETC,
  companyType: CompanyTypeEnum.NA,
  employeeCount: 0,
  interestKeywords: ''
}

export class SignupSerializer extends BaseSerializer<SignupinfoRequest> implements SignupService {
  private data: SignupinfoRequest;

  constructor() {
    super();
    this.data = _.cloneDeep(defaultSignupinfoRequest);
  }

  convert() {
    return {}
  }

  checkRequiredPolicy(policy: JoinPolicy) {
    return (
      policy.isAgreeService &&
      policy.isAgreePrivacy
    );
  };

  submitPolicy(policy: JoinPolicy) {
    if (this.checkRequiredPolicy(policy)) {
      this.data = {
        ...this.data,
        ...policy
      }
      return;
    };
    this.exceptions.push(signupExceptionMap.POLICY_AGREE_REQUIRED);
  }

  checkValidEmail(email: string) {
    return EMAIL_REGEX.test(email);
  }

  // API 혹은 SDK가 필요합니다
  async checkDuplicatedEmail(email: string) {
    return true;
  };

  checkValidPassword(password: string) {
    return PASSWORD_REGEX.test(password);
  }

  checkPasswordConfirmed(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  checkValidPhoneNumber(phoneNumber: string) {
    return PHONE_NUMBER_REGEX.test(phoneNumber);
  };

  async submitMyInfo(my: MyInfo) {
    if (!this.checkValidEmail(my.email)) {
      this.exceptions.push(signupExceptionMap.INVALID_EMAIL_FORMAT);
    }
    if (!this.checkValidPassword(my.password)) {
      this.exceptions.push(signupExceptionMap.INVALID_PASSWORD_FORMAT);
    }
    if (!this.checkPasswordConfirmed(my.password, my.confirmPassword)) {
      this.exceptions.push(signupExceptionMap.UNMATCHED_PASSWORD);
    }
    if (!this.checkValidPhoneNumber(my.phoneNumber)) {
      this.exceptions.push(signupExceptionMap.INVALID_PHONE_NUMBER_FORMAT);
    }

    if (!this.hasException()) {
      this.data = {
        ...this.data,
        ...my
      }
    }
  }

  submitCompanyInfo(company: CompanyInfo) {}
}
