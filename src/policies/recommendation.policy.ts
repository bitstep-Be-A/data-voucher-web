export enum RecruitEnum {
  NORMAL = "일반지원",
  YOUNG = "청년지원",
  WOMEN = "여성지원",
  DISABLED = "장애인지원"
}

export enum TargetEnterpriseEnum {
  SME = "중소기업",
  DIB = "장애인기업",
  SE = "사회적기업",
  SB = "소상공인",
  CA = "협동조합",
  WOB = "여성기업",
  VC = "마을기업",
  VE = "창업벤처"
}

export enum PartCategoryEnum {
  FINANCE = "금융",
  TECH = "기술",
  HR = "인력",
  EXPORT = "수출",
  DOMESTIC = "내수",
  STARTUP = "창업",
  BUSINESS = "경영",
  EDU = "교육",
  ETC = "기타"
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
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 2,
    keyword: 'AI',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 3,
    keyword: 'EAP심리검사',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 4,
    keyword: 'e-SCM',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 5,
    keyword: 'ESG경영',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 6,
    keyword: 'e-러닝',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 7,
    keyword: 'HACCP',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 8,
    keyword: 'ICT',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 9,
    keyword: 'IP',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 10,
    keyword: 'IT',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 11,
    keyword: 'NEP',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 12,
    keyword: 'OJT',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.EDU,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 13,
    keyword: 'R&D',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 14,
    keyword: 'SCM',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 15,
    keyword: 'SW',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 16,
    keyword: 'SW개발',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 17,
    keyword: 'UX디자이너',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 18,
    keyword: 'UX디자인',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 19,
    keyword: '가공상품',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 20,
    keyword: '가전',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 21,
    keyword: '건강검진',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 22,
    keyword: '건설업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.HR,
      PartCategoryEnum.FINANCE,
    ]
  },
  {
    id: 23,
    keyword: '게임산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 24,
    keyword: '공모전',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 25,
    keyword: '공방',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 26,
    keyword: '공예',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 27,
    keyword: '공유경제',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.FINANCE,
      PartCategoryEnum.STARTUP,
    ]
  },
  {
    id: 28,
    keyword: '공장',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 29,
    keyword: '관광사업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.DOMESTIC
    ]
  },
  {
    id: 30,
    keyword: '광업',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 31,
    keyword: '교육',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 32,
    keyword: '그린산업분야',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 33,
    keyword: '근로환경개선',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 34,
    keyword: '금속',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 35,
    keyword: '금융',
    categories: [
      PartCategoryEnum.FINANCE,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 36,
    keyword: '기계',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 37,
    keyword: '기업설명회',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EDU,
      PartCategoryEnum.HR
    ]
  },
  {
    id: 38,
    keyword: '기후환경',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 39,
    keyword: '네트워킹',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 40,
    keyword: '농산물',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 41,
    keyword: '농식품',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 42,
    keyword: '농식품가공',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 43,
    keyword: '데이터',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 44,
    keyword: '디자이너',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.TECH
    ]
  },
  {
    id: 45,
    keyword: '디지털',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 46,
    keyword: '디지털치의학산업',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.STARTUP
    ]
  },
  {
    id: 47,
    keyword: '마케팅',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.BUSINESS,
    ]
  },
  {
    id: 48,
    keyword: '만화',
    categories: [
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 49,
    keyword: '메타버스',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.FINANCE
    ]
  },
  {
    id: 50,
    keyword: '멘토링',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.HR,
      PartCategoryEnum.STARTUP
    ]
  },
  {
    id: 51,
    keyword: '무역',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.FINANCE
    ]
  },
  {
    id: 52,
    keyword: '문화콘텐츠산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.DOMESTIC
    ]
  },
  {
    id: 53,
    keyword: '물류',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 54,
    keyword: '미래신산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.FINANCE
    ]
  },
  {
    id: 55,
    keyword: '바이오',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 56,
    keyword: '바이오헬스',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 57,
    keyword: '박람회',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP,
    ]
  },
  {
    id: 58,
    keyword: '반도체',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.DOMESTIC
    ]
  },
  {
    id: 59,
    keyword: '방송',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 60,
    keyword: '방역',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 61,
    keyword: '법률',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 62,
    keyword: '보건품목',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 63,
    keyword: '보트건조업',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 64,
    keyword: '복지',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 65,
    keyword: '봉제',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 66,
    keyword: '부품',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 67,
    keyword: '빅데이터',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC,
    ]
  },
  {
    id: 68,
    keyword: '사육농가',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 69,
    keyword: '생체의료',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 70,
    keyword: '서비스',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 71,
    keyword: '선박건조업',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 72,
    keyword: '섬유',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 73,
    keyword: '세라믹기술',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 74,
    keyword: '소방시설업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 75,
    keyword: '소재부품산업',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 76,
    keyword: '소재부품장비',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 77,
    keyword: '솔루션',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 78,
    keyword: '수출',
    categories: [
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 79,
    keyword: '스마트IT산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.TECH,
      PartCategoryEnum.STARTUP
    ]
  },
  {
    id: 80,
    keyword: '스마트공장',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 81,
    keyword: '스마트그린융합',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 82,
    keyword: '스마트시티',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 83,
    keyword: '스마트안전장비',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 84,
    keyword: '스마트제조+',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 85,
    keyword: '스마트휴먼바이오',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 86,
    keyword: '스타트업',
    categories: [
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 87,
    keyword: '스포츠기업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 88,
    keyword: '스포츠산업체',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 89,
    keyword: '시설개선',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 90,
    keyword: '시설환경개선',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 91,
    keyword: '시제품제작',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 92,
    keyword: '식품외식산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 93,
    keyword: '신성장산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.DOMESTIC
    ]
  },
  {
    id: 94,
    keyword: '신재생에너지',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 95,
    keyword: '심리상담',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 96,
    keyword: '아카데미',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 97,
    keyword: '안전교육',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 98,
    keyword: '안전품목',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 99,
    keyword: '애니메이션',
    categories: [
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 100,
    keyword: '양성기관',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.EDU,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 101,
    keyword: '양자정보과학',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 102,
    keyword: '어업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 103,
    keyword: '에너지분야',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 104,
    keyword: '역량강화교육',
    categories: [
      PartCategoryEnum.EDU,
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 105,
    keyword: '영상기술',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 106,
    keyword: '영양군',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 107,
    keyword: '영화',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 108,
    keyword: '영화제작',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 109,
    keyword: '온라인',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 110,
    keyword: '외식기업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 111,
    keyword: '원자력',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 112,
    keyword: '웹툰',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 113,
    keyword: '위생시설',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 114,
    keyword: '응급의료',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 115,
    keyword: '의료',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 116,
    keyword: '의류',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 117,
    keyword: '의약',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 118,
    keyword: '인공지능',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 119,
    keyword: '인력매칭',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 120,
    keyword: '인재검색',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 121,
    keyword: '인재양성',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.EDU,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 122,
    keyword: '일자리사업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 123,
    keyword: '임업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 124,
    keyword: '자동차산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 125,
    keyword: '자동화',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 126,
    keyword: '전기차',
    categories: [
      PartCategoryEnum.TECH,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 127,
    keyword: '전자상거래',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.TECH
    ]
  },
  {
    id: 128,
    keyword: '정보통신공사업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 129,
    keyword: '제조업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT
    ]
  },
  {
    id: 130,
    keyword: '조선',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.DOMESTIC
    ]
  },
  {
    id: 131,
    keyword: '조선소',
    categories: [
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 132,
    keyword: '지역화폐',
    categories: [
      PartCategoryEnum.FINANCE,
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 133,
    keyword: '직무교육',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.EDU,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 134,
    keyword: '창업',
    categories: [
      PartCategoryEnum.STARTUP,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 135,
    keyword: '채용',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.STARTUP
    ]
  },
  {
    id: 136,
    keyword: '채용박람회',
    categories: [
      PartCategoryEnum.HR,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 137,
    keyword: '철강',
    categories: [
      PartCategoryEnum.DOMESTIC,
      PartCategoryEnum.EXPORT,
      PartCategoryEnum.BUSINESS
    ]
  },
  {
    id: 138,
    keyword: '축산업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 139,
    keyword: '출판업',
    categories: [
      PartCategoryEnum.BUSINESS,
      PartCategoryEnum.ETC
    ]
  },
  {
    id: 140,
    keyword: '치료비',
    categories: [
      PartCategoryEnum.ETC
    ]
  }
];
