import _ from 'lodash';
import { useCallback, useRef, useState } from "react";

import type { ExceptionDetail } from "../../types/common";
import {
  Serializer
} from "../../utils/serializer";
import {
  JoinAgreement,
  MyInfo,
  SignupService,
  SignupinfoRequest,
  SignupExceptionMap,
  SignupValidator,
  CompanyRegisterInfo,
  CompanyDetailInfo,
} from "./signup.interface";
import {
  CompanySizeEnum,
  ESTABLISH_DATE_REGEX,
  MAX_INTEREST_KEYWORD_COUNT,
  REGISTRATION_NUMBER_REGEX
} from "../../policies/company.policy";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX
} from "../../policies/signup.policy";
import { signupApi } from '../../api/account';

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
    message: '등록되지 않은 회사입니다. 기업 정보를 올바르게 입력해주세요.'
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
  },
  INVALID_ESTABLISH_DATE: {
    name: "INVALID_ESTABLISH_DATE",
    message: '설립일자를 올바르게 입력해주세요.'
  },
  INVALID_REGISTRATION_NUMBER: {
    name: 'INVALID_REGISTRATION_NUMBER',
    message: '사업자등록번호를 올바르게 입력해주세요.'
  },
  INVALID_CEO: {
    name: 'INVALID_CEO',
    message: '대표자명을 입력해주세요.'
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
  companyTypes: [],
  employeeCount: 0,
  interestKeywords: []
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
  checkVerifiedEmail: function () {
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
  },
  checkValidName: function (name: string) {
    return NAME_REGEX.test(name);
  },
  checkVerifiedCompany: function () {
    return true;
  },
  checkValidCompanySize: function (value: string) {
    return JSON.parse(value).length === 1;
  },
  checkValidCompanyType: function (value: string) {
    return JSON.parse(value).length >= 0;
  },
  checkValidTargetAreas: function (value: string) {
    return JSON.parse(value).length >= 1;
  },
  checkValidInterestKeywords: function (value: string) {
    return JSON.parse(value).length <= MAX_INTEREST_KEYWORD_COUNT;
  },
  checkValidRegistrationNumber: function (value) {
    return REGISTRATION_NUMBER_REGEX.test(value);
  },
  checkValidEstablishDate: function (value) {
    return ESTABLISH_DATE_REGEX.test(value);
  },
}

export interface SignupSerializer extends Serializer<SignupinfoRequest>, SignupService {};

export function useSignupSerializer(): SignupSerializer {
  const exceptionsRef = useRef<ExceptionDetail[]>([]);
  const dataRef = useRef<SignupinfoRequest>(_.cloneDeep(defaultSignupinfoRequest));

  function toEntity() {
    const data = dataRef.current;
    const obj = {
      "AgreeService": data.isAgreeService,
      "AgreePrivacy": data.isAgreePrivacy,
      "AgreeMarketing": data.isAgreeMarketing,
      "Email_ID": data.email,
      "Name": data.name,
      "Password": data.password,
      "ConfirmPassword": data.confirmPassword,
      "PhoneNumber": data.phoneNumber,
      "BusinessRegistrationNumber": data.businessRegistrationNumber,
      "CompanyAddress": data.targetAreas.join('|'),
      "EstablishedDate": data.establishDate,
      "CEO": data.CEO,
      "CompanySize": data.companySize,
      "CompanyType": data.companyTypes.join('|'),
      "EmployeeCount": data.employeeCount,
      "InterestKeywords": data.interestKeywords.join('|')
    }
    return obj;
  }

  function getData() {
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

  async function verifyCompany(data: CompanyRegisterInfo) {
    try {
      await signupApi.companyCheck({
        "BusinessRegistrationNumber": data.businessRegistrationNumber,
        "EstablishedDate": data.establishDate,
        "CEO": data.CEO
      });
      return true;
    } catch(e) {
      return false;
    }
  }

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
      !signupValidator.checkValidName(my.name)
    ) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_NAME);
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

  const submitCompanyRegisterInfo = async (company: CompanyRegisterInfo) => {
    if (!signupValidator.checkValidRegistrationNumber(company.businessRegistrationNumber)) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_REGISTRATION_NUMBER);
    }
    if (!company.CEO) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_CEO);
    }
    if (!signupValidator.checkValidEstablishDate(company.establishDate)) {
      exceptionsRef.current.push(signupExceptionMap.INVALID_ESTABLISH_DATE);
    }
    if (company.companySize === CompanySizeEnum.ETC) {
      exceptionsRef.current.push(signupExceptionMap.COMPANY_SIZE_NOT_SELECTED);
    }

    const isVerified = await verifyCompany(company);
    if (!isVerified) {
      exceptionsRef.current.push(signupExceptionMap.COMPANY_NOT_VERIFIED);
    }

    if (isValid()) {
      dataRef.current = {
        ...dataRef.current,
        ...company
      }
    }
  };

  function submitCompanyDetailInfo(company: CompanyDetailInfo) {
    if (
      !company.companyTypes.length
    ) {
      exceptionsRef.current.push(signupExceptionMap.COMPANY_TYPE_NOT_SELECTED);
    }
    if (
      !company.targetAreas.length
    ) {
      exceptionsRef.current.push(signupExceptionMap.COMPANY_TARGET_AREA_NOT_SELECTED);
    }
    if (isValid()) {
      dataRef.current = {
        ...dataRef.current,
        ...company
      }
    }
  }

  return {
    toEntity,
    getData,
    isValid,
    verifyCompany,
    submitAgreement,
    submitMyInfo,
    submitCompanyDetailInfo,
    submitCompanyRegisterInfo,
    getExceptions
  }
}
