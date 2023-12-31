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
  VE = '벤처기업', // Venture Enterprise
  WOB = '여성기업',  // Women owned business
  SE = '사회적기업',  // Social Enterprise
  DIB = '장애인기업',  // Disabled owned business
  SB = '소상공인',  // Small Business
  CA = '협동조합',  // Cooperative Association
  VC = '마을기업',  // Village Company
  NA = '해당없음'
}

export const REGISTRATION_NUMBER_REGEX = /^\d{10}$/;
export const ESTABLISH_DATE_REGEX = /^\d{8}$/;
