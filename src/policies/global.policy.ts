export interface Location {
  code: number;
  label: string;
  name: string;
}

export const locations: Location[] = [
  {
    code: 11,
    label: 'Seoul',
    name: '서울'
  },
  {
    code: 21,
    label: 'Busan',
    name: '부산'
  },
  {
    code: 22,
    label: 'Daegu',
    name: '대구'
  },
  {
    code: 23,
    label: 'Incheon',
    name: '인천'
  },
  {
    code: 24,
    label: 'Gwangju',
    name: '광주'
  },
  {
    code: 25,
    label: 'Daejeon',
    name: '대전'
  },
  {
    code: 26,
    label: 'Ulsan',
    name: '울산'
  },
  {
    code: 29,
    label: 'Sejong',
    name: '세종'
  },
  {
    code: 31,
    label: 'Gyeonggi',
    name: '경기'
  },
  {
    code: 32,
    label: 'Gangwon',
    name: '강원'
  },
  {
    code: 33,
    label: 'ChoongBuk',
    name: '충북'
  },
  {
    code: 34,
    label: 'ChoongNam',
    name: '충남'
  },
  {
    code: 35,
    label: 'JeonBuk',
    name: '전북'
  },
  {
    code: 36,
    label: 'JeonNam',
    name: '전남'
  },
  {
    code: 37,
    label: 'GyeongBuk',
    name: '경북'
  },
  {
    code: 38,
    label: 'GyeongNam',
    name: '경남'
  },
  {
    code: 39,
    label: 'Jeju',
    name: '제주'
  }
];

export interface InterestTag {
  id: number;
  keyword: string;
  category: string | null;
}

export const interestTags: InterestTag[] = [
  {
    id: 1,
    keyword: '4차산업',
    category: null
  },
  {
    id: 2,
    keyword: 'AI',
    category: null
  },
  {
    id: 3,
    keyword: 'EAP심리검사',
    category: null
  },
  {
    id: 4,
    keyword: 'e-SCM',
    category: null
  },
  {
    id: 5,
    keyword: 'ESG경영',
    category: null
  },
  {
    id: 6,
    keyword: 'e-러닝',
    category: null
  },
  {
    id: 7,
    keyword: 'HACCP',
    category: null
  },
  {
    id: 8,
    keyword: 'ICT',
    category: null
  },
  {
    id: 9,
    keyword: 'IP',
    category: null
  },
  {
    id: 10,
    keyword: 'IT',
    category: null
  },
  {
    id: 11,
    keyword: 'NEP',
    category: null
  },
  {
    id: 12,
    keyword: 'OJT',
    category: null
  },
  {
    id: 13,
    keyword: 'R&D',
    category: null
  },
  {
    id: 14,
    keyword: 'SCM',
    category: null
  },
  {
    id: 15,
    keyword: 'SW',
    category: null
  },
  {
    id: 16,
    keyword: 'SW개발',
    category: null
  },
  {
    id: 17,
    keyword: 'UX디자이너',
    category: null
  },
  {
    id: 18,
    keyword: 'UX디자인',
    category: null
  },
  {
    id: 19,
    keyword: '가공상품',
    category: null
  },
  {
    id: 20,
    keyword: '가전',
    category: null
  },
  {
    id: 21,
    keyword: '건강검진',
    category: null
  },
  {
    id: 22,
    keyword: '건설업',
    category: null
  },
  {
    id: 23,
    keyword: '게임산업',
    category: null
  },
  {
    id: 24,
    keyword: '공모전',
    category: null
  },
  {
    id: 25,
    keyword: '공방',
    category: null
  },
  {
    id: 26,
    keyword: '공예',
    category: null
  },
  {
    id: 27,
    keyword: '공유경제',
    category: null
  },
  {
    id: 28,
    keyword: '공장',
    category: null
  },
  {
    id: 29,
    keyword: '관광사업',
    category: null
  },
  {
    id: 30,
    keyword: '광업',
    category: null
  },
  {
    id: 31,
    keyword: '교육',
    category: null
  },
  {
    id: 32,
    keyword: '그린산업분야',
    category: null
  },
  {
    id: 33,
    keyword: '근로환경개선',
    category: null
  },
  {
    id: 34,
    keyword: '금속',
    category: null
  },
  {
    id: 35,
    keyword: '금융',
    category: null
  },
  {
    id: 36,
    keyword: '기계',
    category: null
  },
  {
    id: 37,
    keyword: '기업설명회',
    category: null
  },
  {
    id: 38,
    keyword: '기후환경',
    category: null
  },
  {
    id: 39,
    keyword: '네트워킹',
    category: null
  },
  {
    id: 40,
    keyword: '농산물',
    category: null
  },
  {
    id: 41,
    keyword: '농식품',
    category: null
  },
  {
    id: 42,
    keyword: '농식품가공',
    category: null
  },
  {
    id: 43,
    keyword: '데이터',
    category: null
  },
  {
    id: 44,
    keyword: '디자이너',
    category: null
  },
  {
    id: 45,
    keyword: '디지털',
    category: null
  },
  {
    id: 46,
    keyword: '디지털치의학산업',
    category: null
  },
  {
    id: 47,
    keyword: '마케팅',
    category: null
  },
  {
    id: 48,
    keyword: '만화',
    category: null
  },
  {
    id: 49,
    keyword: '메타버스',
    category: null
  },
  {
    id: 50,
    keyword: '멘토링',
    category: null
  },
  {
    id: 51,
    keyword: '무역',
    category: null
  },
  {
    id: 52,
    keyword: '문화콘텐츠산업',
    category: null
  },
  {
    id: 53,
    keyword: '물류',
    category: null
  },
  {
    id: 54,
    keyword: '미래신산업',
    category: null
  },
  {
    id: 55,
    keyword: '바이오',
    category: null
  },
  {
    id: 56,
    keyword: '바이오헬스',
    category: null
  },
  {
    id: 57,
    keyword: '박람회',
    category: null
  },
  {
    id: 58,
    keyword: '반도체',
    category: null
  },
  {
    id: 59,
    keyword: '방송',
    category: null
  },
  {
    id: 60,
    keyword: '방역',
    category: null
  },
  {
    id: 61,
    keyword: '법률',
    category: null
  },
  {
    id: 62,
    keyword: '보건품목',
    category: null
  },
  {
    id: 63,
    keyword: '보트건조업',
    category: null
  },
  {
    id: 64,
    keyword: '복지',
    category: null
  },
  {
    id: 65,
    keyword: '봉제',
    category: null
  },
  {
    id: 66,
    keyword: '부품',
    category: null
  },
  {
    id: 67,
    keyword: '빅데이터',
    category: null
  },
  {
    id: 68,
    keyword: '사육농가',
    category: null
  },
  {
    id: 69,
    keyword: '생체의료',
    category: null
  },
  {
    id: 70,
    keyword: '서비스',
    category: null
  },
  {
    id: 71,
    keyword: '선박건조업',
    category: null
  },
  {
    id: 72,
    keyword: '섬유',
    category: null
  },
  {
    id: 73,
    keyword: '세라믹기술',
    category: null
  },
  {
    id: 74,
    keyword: '소방시설업',
    category: null
  },
  {
    id: 75,
    keyword: '소재부품산업',
    category: null
  },
  {
    id: 76,
    keyword: '소재부품장비',
    category: null
  },
  {
    id: 77,
    keyword: '솔루션',
    category: null
  },
  {
    id: 78,
    keyword: '수출',
    category: null
  },
  {
    id: 79,
    keyword: '스마트IT산업',
    category: null
  },
  {
    id: 80,
    keyword: '스마트공장',
    category: null
  },
  {
    id: 81,
    keyword: '스마트그린융합',
    category: null
  },
  {
    id: 82,
    keyword: '스마트시티',
    category: null
  },
  {
    id: 83,
    keyword: '스마트안전장비',
    category: null
  },
  {
    id: 84,
    keyword: '스마트제조+',
    category: null
  },
  {
    id: 85,
    keyword: '스마트휴먼바이오',
    category: null
  },
  {
    id: 86,
    keyword: '스타트업',
    category: null
  },
  {
    id: 87,
    keyword: '스포츠기업',
    category: null
  },
  {
    id: 88,
    keyword: '스포츠산업체',
    category: null
  },
  {
    id: 89,
    keyword: '시설개선',
    category: null
  },
  {
    id: 90,
    keyword: '시설환경개선',
    category: null
  },
  {
    id: 91,
    keyword: '시제품제작',
    category: null
  },
  {
    id: 92,
    keyword: '식품외식산업',
    category: null
  },
  {
    id: 93,
    keyword: '신성장산업',
    category: null
  },
  {
    id: 94,
    keyword: '신재생에너지',
    category: null
  },
  {
    id: 95,
    keyword: '심리상담',
    category: null
  },
  {
    id: 96,
    keyword: '아카데미',
    category: null
  },
  {
    id: 97,
    keyword: '안전교육',
    category: null
  },
  {
    id: 98,
    keyword: '안전품목',
    category: null
  },
  {
    id: 99,
    keyword: '애니메이션',
    category: null
  },
  {
    id: 100,
    keyword: '양성기관',
    category: null
  },
  {
    id: 101,
    keyword: '양자정보과학',
    category: null
  },
  {
    id: 102,
    keyword: '어업',
    category: null
  },
  {
    id: 103,
    keyword: '에너지분야',
    category: null
  },
  {
    id: 104,
    keyword: '역량강화교육',
    category: null
  },
  {
    id: 105,
    keyword: '영상기술',
    category: null
  },
  {
    id: 106,
    keyword: '영양군',
    category: null
  },
  {
    id: 107,
    keyword: '영화',
    category: null
  },
  {
    id: 108,
    keyword: '영화제작',
    category: null
  },
  {
    id: 109,
    keyword: '온라인',
    category: null
  },
  {
    id: 110,
    keyword: '외식기업',
    category: null
  },
  {
    id: 111,
    keyword: '원자력',
    category: null
  },
  {
    id: 112,
    keyword: '웹툰',
    category: null
  },
  {
    id: 113,
    keyword: '위생시설',
    category: null
  },
  {
    id: 114,
    keyword: '응급의료',
    category: null
  },
  {
    id: 115,
    keyword: '의료',
    category: null
  },
  {
    id: 116,
    keyword: '의류',
    category: null
  },
  {
    id: 117,
    keyword: '의약',
    category: null
  },
  {
    id: 118,
    keyword: '인공지능',
    category: null
  },
  {
    id: 119,
    keyword: '인력매칭',
    category: null
  },
  {
    id: 120,
    keyword: '인재검색',
    category: null
  },
  {
    id: 121,
    keyword: '인재양성',
    category: null
  },
  {
    id: 122,
    keyword: '일자리사업',
    category: null
  },
  {
    id: 123,
    keyword: '임업',
    category: null
  },
  {
    id: 124,
    keyword: '자동차산업',
    category: null
  },
  {
    id: 125,
    keyword: '자동화',
    category: null
  },
  {
    id: 126,
    keyword: '전기차',
    category: null
  },
  {
    id: 127,
    keyword: '전자상거래',
    category: null
  },
  {
    id: 128,
    keyword: '정보통신공사업',
    category: null
  },
  {
    id: 129,
    keyword: '제조업',
    category: null
  },
  {
    id: 130,
    keyword: '조선',
    category: null
  },
  {
    id: 131,
    keyword: '조선소',
    category: null
  },
  {
    id: 132,
    keyword: '지역화폐',
    category: null
  },
  {
    id: 133,
    keyword: '직무교육',
    category: null
  },
  {
    id: 134,
    keyword: '창업',
    category: null
  },
  {
    id: 135,
    keyword: '채용',
    category: null
  },
  {
    id: 136,
    keyword: '채용박람회',
    category: null
  },
  {
    id: 137,
    keyword: '철강',
    category: null
  },
  {
    id: 138,
    keyword: '축산업',
    category: null
  },
  {
    id: 139,
    keyword: '출판업',
    category: null
  },
  {
    id: 140,
    keyword: '치료비',
    category: null
  }
];
