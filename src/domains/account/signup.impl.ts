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
  VerificationType
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

  async function verify(eventType: VerificationType) {}

  function submitAgreement(agreement: JoinAgreement) {
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
    dataRef.current = {
      ...dataRef.current,
      ...my
    }
  }

  function submitCompanyInfo(company: CompanyInfo) {}

  return {
    toObject,
    toData,
    isValid,
    verify,
    submitAgreement,
    submitMyInfo,
    submitCompanyInfo,
    getExceptions
  }
}
