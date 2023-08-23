export const EMAIL_MAX_LENGTH = 254;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;

export const NAME_MAX_LENGTH = 254;

export const PHONE_NUMBER_MAX_LENGTH = 12;
export const PHONE_NUMBER_REGEX = /^01([0|1|6|7|8|9])-\d{3,4}-\d{4}$/;

export const REGISTRATION_NUMBER_MAX_LENGTH = 25;

export const EMPLOY_MAX_LENGTH = 7;

export const MAX_INTEREST_KEYWORD_COUNT = 3;

export enum CompanySizeEnum {
  SB = '소상공인',
  SME = '중소기업',
  MC = '중견기업',
  LC = '대기업',
  ETC = '기타'
}

export enum CompanyTypeEnum {
  VE = '벤처기업',
  WOB = '여성기업',
  SE = '사회적기업',
  DIB = '장애인 기업',
  NA = '해당없음'
}
