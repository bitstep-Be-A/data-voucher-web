import _ from 'lodash';
import { useRef } from "react";

import type { ExceptionDetail } from "../../utils/exceptions";
import {
  Serializer
} from "../../utils/serializer";
import type {
  CompanyInfo,
  JoinAgreement,
  MyInfo,
  SignupService,
  SignupinfoRequest,
  SignupExceptionMap,
  SignupValidator,
} from "./signup.interface";
import {
  CompanySizeEnum,
  CompanyTypeEnum
} from "../../policies/company.policy";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX
} from "../../policies/signup.policy";

export const signupExceptionMap: SignupExceptionMap = {
  REQUIRED_AGREEMENT_UNCHECKED: {
    name: 'REQUIRED_AGREEMENT_UNCHECKED',
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
  },
  COMPANY_NOT_VERIFIED: {
    name: 'COMPANY_INFO_NOT_VERIFIED',
    message: '등록되지 않은 회사입니다. 사업자 등록번호를 확인해주세요.'
  },
  INVALID_NAME: {
    name: 'INVALID_NAME',
    message: '이름을 올바르게 입력해주세요.'
  },
  COMPANY_SIZE_NOT_SELECTED: {
    name: 'COMPANY_SIZE_NOT_SELECTED',
    message: '기업 규모를 선택해주세요.'
  },
  COMPANY_TYPE_NOT_SELECTED: {
    name: 'COMPANY_TYPE_NOT_SELECTED',
    message: '기업 형태를 선택해주세요.'
  },
  COMPANY_TARGET_AREA_NOT_SELECTED: {
    name: 'COMPANY_TARGET_AREA_NOT_SELECTED',
    message: '기업소재지 또는 관심지역을 적어도 하나 설정해주세요.'
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
  targetAreas: [],
  establishDate: '',
  CEO: '',
  companySize: CompanySizeEnum.ETC,
  companyType: CompanyTypeEnum.NA,
  employeeCount: 0,
  interestKeywords: ''
}

export const signupValidator: SignupValidator = {
  checkRequiredAgreement: function (agreement: JoinAgreement) {
    return (
      agreement.isAgreeService &&
      agreement.isAgreePrivacy
    );
  },
  checkValidEmail: function (email: string) {
    return EMAIL_REGEX.test(email);
  },
  checkDuplicatedEmail: async function (email: string) {
    return true;
  },
  checkValidPassword: function (password: string) {
    return PASSWORD_REGEX.test(password);
  },
  checkPasswordConfirmed: function (password: string, confirmPassword: string) {
    return password === confirmPassword;
  },
  checkValidPhoneNumber: function (phoneNumber: string) {
    return PHONE_NUMBER_REGEX.test(phoneNumber);
  }
}

export interface SignupSerializer extends Serializer<SignupinfoRequest>, SignupService {};

export function useSignupSerializer(): SignupSerializer {
  const exceptionsRef = useRef<ExceptionDetail[]>([]);
  const dataRef = useRef<SignupinfoRequest>(_.cloneDeep(defaultSignupinfoRequest));

  function toObject() {
    return {}
  }

  function toData() {
    return dataRef.current;
  }

  function isValid() {
    return !exceptionsRef.current.length;
  }

  function getExceptions() {
    const value = exceptionsRef.current;
    exceptionsRef.current = [];
    return value;
  }

  async function verifyEmail() {}

  async function verifyCompany() {}

  function submitAgreement(agreement: JoinAgreement) {
    exceptionsRef.current = [];
    if (signupValidator.checkRequiredAgreement(agreement)) {
      dataRef.current = {
        ...dataRef.current,
        ...agreement
      }
      return;
    };
    exceptionsRef.current.push(signupExceptionMap.REQUIRED_AGREEMENT_UNCHECKED);
  }

  async function submitMyInfo(my: MyInfo) {
    if (
      !signupValidator.checkValidEmail(my.email)
    ) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_EMAIL_FORMAT);
    }
    if (
      !signupValidator.checkValidPassword(my.password)
    ) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_PASSWORD_FORMAT);
    }
    if (
      !signupValidator.checkPasswordConfirmed(my.password, my.confirmPassword)
    ) {
      exceptionsRef.current.push(signupExceptionMap.UNMATCHED_PASSWORD);
    }
    if (
      !signupValidator.checkValidPhoneNumber(my.phoneNumber)
    ) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_PHONE_NUMBER_FORMAT);
    }

    if (isValid()) {
      dataRef.current = {
        ...dataRef.current,
        ...my
      }
    }
  }

  function submitCompanyInfo(company: CompanyInfo) {
    dataRef.current = {
      ...dataRef.current,
      ...company
    }
  }

  return {
    toObject,
    toData,
    isValid,
    verifyEmail,
    verifyCompany,
    submitAgreement,
    submitMyInfo,
    submitCompanyInfo,
    getExceptions
  }
}
