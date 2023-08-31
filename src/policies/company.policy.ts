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
  DIB = '장애인 기업',  // Disabled owned business
  SB = '소상공인',  // Small Business
  CA = '협동 조합',  // Cooperative Association
  VC = '마을 기업',  // Village Company
  NA = '해당없음'
}

export const partCategoryMap = {
  FINANCE: "금융",
  TECH: "기술",
  HR: "인력",
  EXPORT: "수출",
  DOMESTIC: "내수",
  STARTUP: "창업",
  BUSINESS: "경영",
  EDU: "교육",
  ETC: "기타"
}

export interface InterestTag {
  id: number;
  keyword: string;
  categories: string[];
}

export const interestTags: InterestTag[] = [
  {
    id: 1,
    keyword: '4차산업',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 2,
    keyword: 'AI',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 3,
    keyword: 'EAP심리검사',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 4,
    keyword: 'e-SCM',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 5,
    keyword: 'ESG경영',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 6,
    keyword: 'e-러닝',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 7,
    keyword: 'HACCP',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.ETC
    ]
  },
  {
    id: 8,
    keyword: 'ICT',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 9,
    keyword: 'IP',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 10,
    keyword: 'IT',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.ETC
    ]
  },
  {
    id: 11,
    keyword: 'NEP',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 12,
    keyword: 'OJT',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.EDU,
      partCategoryMap.ETC
    ]
  },
  {
    id: 13,
    keyword: 'R&D',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 14,
    keyword: 'SCM',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.ETC
    ]
  },
  {
    id: 15,
    keyword: 'SW',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.ETC
    ]
  },
  {
    id: 16,
    keyword: 'SW개발',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.ETC
    ]
  },
  {
    id: 17,
    keyword: 'UX디자이너',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.ETC
    ]
  },
  {
    id: 18,
    keyword: 'UX디자인',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.ETC
    ]
  },
  {
    id: 19,
    keyword: '가공상품',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 20,
    keyword: '가전',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 21,
    keyword: '건강검진',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 22,
    keyword: '건설업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.HR,
      partCategoryMap.FINANCE,
    ]
  },
  {
    id: 23,
    keyword: '게임산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 24,
    keyword: '공모전',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 25,
    keyword: '공방',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 26,
    keyword: '공예',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 27,
    keyword: '공유경제',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.FINANCE,
      partCategoryMap.STARTUP,
    ]
  },
  {
    id: 28,
    keyword: '공장',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 29,
    keyword: '관광사업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EXPORT,
      partCategoryMap.DOMESTIC
    ]
  },
  {
    id: 30,
    keyword: '광업',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 31,
    keyword: '교육',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.ETC
    ]
  },
  {
    id: 32,
    keyword: '그린산업분야',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 33,
    keyword: '근로환경개선',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 34,
    keyword: '금속',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 35,
    keyword: '금융',
    categories: [
      partCategoryMap.FINANCE,
      partCategoryMap.ETC
    ]
  },
  {
    id: 36,
    keyword: '기계',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 37,
    keyword: '기업설명회',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EDU,
      partCategoryMap.HR
    ]
  },
  {
    id: 38,
    keyword: '기후환경',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 39,
    keyword: '네트워킹',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 40,
    keyword: '농산물',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 41,
    keyword: '농식품',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 42,
    keyword: '농식품가공',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 43,
    keyword: '데이터',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 44,
    keyword: '디자이너',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.STARTUP,
      partCategoryMap.TECH
    ]
  },
  {
    id: 45,
    keyword: '디지털',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 46,
    keyword: '디지털치의학산업',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.BUSINESS,
      partCategoryMap.STARTUP
    ]
  },
  {
    id: 47,
    keyword: '마케팅',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.STARTUP,
      partCategoryMap.BUSINESS,
    ]
  },
  {
    id: 48,
    keyword: '만화',
    categories: [
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 49,
    keyword: '메타버스',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
      partCategoryMap.FINANCE
    ]
  },
  {
    id: 50,
    keyword: '멘토링',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.HR,
      partCategoryMap.STARTUP
    ]
  },
  {
    id: 51,
    keyword: '무역',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EXPORT,
      partCategoryMap.FINANCE
    ]
  },
  {
    id: 52,
    keyword: '문화콘텐츠산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EXPORT,
      partCategoryMap.DOMESTIC
    ]
  },
  {
    id: 53,
    keyword: '물류',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 54,
    keyword: '미래신산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.STARTUP,
      partCategoryMap.FINANCE
    ]
  },
  {
    id: 55,
    keyword: '바이오',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 56,
    keyword: '바이오헬스',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 57,
    keyword: '박람회',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.TECH,
      partCategoryMap.STARTUP,
    ]
  },
  {
    id: 58,
    keyword: '반도체',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.EXPORT,
      partCategoryMap.DOMESTIC
    ]
  },
  {
    id: 59,
    keyword: '방송',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 60,
    keyword: '방역',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 61,
    keyword: '법률',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 62,
    keyword: '보건품목',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 63,
    keyword: '보트건조업',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 64,
    keyword: '복지',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 65,
    keyword: '봉제',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 66,
    keyword: '부품',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 67,
    keyword: '빅데이터',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC,
    ]
  },
  {
    id: 68,
    keyword: '사육농가',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 69,
    keyword: '생체의료',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 70,
    keyword: '서비스',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 71,
    keyword: '선박건조업',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 72,
    keyword: '섬유',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 73,
    keyword: '세라믹기술',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 74,
    keyword: '소방시설업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 75,
    keyword: '소재부품산업',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 76,
    keyword: '소재부품장비',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 77,
    keyword: '솔루션',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 78,
    keyword: '수출',
    categories: [
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 79,
    keyword: '스마트IT산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.TECH,
      partCategoryMap.STARTUP
    ]
  },
  {
    id: 80,
    keyword: '스마트공장',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 81,
    keyword: '스마트그린융합',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 82,
    keyword: '스마트시티',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 83,
    keyword: '스마트안전장비',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 84,
    keyword: '스마트제조+',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 85,
    keyword: '스마트휴먼바이오',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 86,
    keyword: '스타트업',
    categories: [
      partCategoryMap.STARTUP,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 87,
    keyword: '스포츠기업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 88,
    keyword: '스포츠산업체',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 89,
    keyword: '시설개선',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 90,
    keyword: '시설환경개선',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 91,
    keyword: '시제품제작',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 92,
    keyword: '식품외식산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.ETC
    ]
  },
  {
    id: 93,
    keyword: '신성장산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.STARTUP,
      partCategoryMap.DOMESTIC
    ]
  },
  {
    id: 94,
    keyword: '신재생에너지',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 95,
    keyword: '심리상담',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 96,
    keyword: '아카데미',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.ETC
    ]
  },
  {
    id: 97,
    keyword: '안전교육',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.ETC
    ]
  },
  {
    id: 98,
    keyword: '안전품목',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 99,
    keyword: '애니메이션',
    categories: [
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 100,
    keyword: '양성기관',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.EDU,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 101,
    keyword: '양자정보과학',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 102,
    keyword: '어업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 103,
    keyword: '에너지분야',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 104,
    keyword: '역량강화교육',
    categories: [
      partCategoryMap.EDU,
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 105,
    keyword: '영상기술',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 106,
    keyword: '영양군',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 107,
    keyword: '영화',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 108,
    keyword: '영화제작',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 109,
    keyword: '온라인',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 110,
    keyword: '외식기업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.ETC
    ]
  },
  {
    id: 111,
    keyword: '원자력',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 112,
    keyword: '웹툰',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 113,
    keyword: '위생시설',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 114,
    keyword: '응급의료',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 115,
    keyword: '의료',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 116,
    keyword: '의류',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 117,
    keyword: '의약',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 118,
    keyword: '인공지능',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 119,
    keyword: '인력매칭',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 120,
    keyword: '인재검색',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 121,
    keyword: '인재양성',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.EDU,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 122,
    keyword: '일자리사업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 123,
    keyword: '임업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 124,
    keyword: '자동차산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 125,
    keyword: '자동화',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.ETC
    ]
  },
  {
    id: 126,
    keyword: '전기차',
    categories: [
      partCategoryMap.TECH,
      partCategoryMap.EXPORT,
      partCategoryMap.ETC
    ]
  },
  {
    id: 127,
    keyword: '전자상거래',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.TECH
    ]
  },
  {
    id: 128,
    keyword: '정보통신공사업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 129,
    keyword: '제조업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT
    ]
  },
  {
    id: 130,
    keyword: '조선',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.EXPORT,
      partCategoryMap.DOMESTIC
    ]
  },
  {
    id: 131,
    keyword: '조선소',
    categories: [
      partCategoryMap.ETC
    ]
  },
  {
    id: 132,
    keyword: '지역화폐',
    categories: [
      partCategoryMap.FINANCE,
      partCategoryMap.DOMESTIC,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 133,
    keyword: '직무교육',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.EDU,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 134,
    keyword: '창업',
    categories: [
      partCategoryMap.STARTUP,
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 135,
    keyword: '채용',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.BUSINESS,
      partCategoryMap.STARTUP
    ]
  },
  {
    id: 136,
    keyword: '채용박람회',
    categories: [
      partCategoryMap.HR,
      partCategoryMap.ETC
    ]
  },
  {
    id: 137,
    keyword: '철강',
    categories: [
      partCategoryMap.DOMESTIC,
      partCategoryMap.EXPORT,
      partCategoryMap.BUSINESS
    ]
  },
  {
    id: 138,
    keyword: '축산업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 139,
    keyword: '출판업',
    categories: [
      partCategoryMap.BUSINESS,
      partCategoryMap.ETC
    ]
  },
  {
    id: 140,
    keyword: '치료비',
    categories: [
      partCategoryMap.ETC
    ]
  }
];
