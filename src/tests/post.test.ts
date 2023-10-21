import {
  PostSummaryModel,
  postManager,
  PostDetailModel
} from "../domain/search/post.impl";
import {
  FilterTag,
  SearchFilter,
  PostDetail,
  PostSummary
} from "../domain/search/post.interface";
import { locations } from "../policies/global.policy";
import { PartCategoryEnum, TargetEnterpriseEnum } from "../policies/recommendation.policy";

describe('공고검색', () => {
  let postSummaryModels: PostSummary[];
  let postDetailModel: PostDetail;

  beforeEach(() => {
    postSummaryModels = postSummaryEntities.map((v) => new PostSummaryModel(v));
    postDetailModel = new PostDetailModel(postDetailEntity);
  });

  it('공고 제목에 검색 키워드에 해당하는 단어가 있는지 검토합니다.', () => {
    const notice = "[세종] 전문인력 지원사업(신규 및 재심사)(2023년 2차 (예비)신성장산업(ICTㆍ바이오)";
    const includedKeywords = [
      "세종",
      "전문인력",
      "지원사업",
      "신규",
      "재심사",
      "2023",
      "예비",
      "성장",
      "사업",
      "산업",
      "ICt",
      "바이오"
    ];
    const unIncludedKeywords = [
      "충남",
      "2022",
      "it",
      "3차",
      "1차",
    ];
    includedKeywords.forEach((keyword) => {
      expect(postManager.isKeywordIncludingNotice(keyword, notice)).toBe(true);
    });
    unIncludedKeywords.forEach((keyword) => {
      expect(postManager.isKeywordIncludingNotice(keyword, notice)).toBe(false);
    })
  });

  it('필터의 key와 필터 태그의 filterKey가 동일한지 여부를 검토합니다.', () => {
    const filter: SearchFilter = {
      locations: [
        locations.find(v => v.code === '29')!
      ],
      targetEnterprises: [
        TargetEnterpriseEnum.SE
      ],
      interestParts: [
        PartCategoryEnum.HR
      ],
      employeeCount: undefined,
      recruitType: undefined,
      applyStartDate: "2023-01-01",
      applyEndDate: "2023-12-31",
      excludeClosing: "N",
      bookmarkOnly: "N",
      searchKeyword: ""
    }
    const filterTags: FilterTag[] = [
      {id: '1', name: 'name1', filterKey: 'locations'},
      {id: '2', name: 'name2', filterKey: 'targetEnterprises'},
      {id: '3', name: 'name3', filterKey: 'employeeCount'},
      {id: '4', name: 'name4', filterKey: 'recruitType'},
      {id: '5', name: 'name5', filterKey: 'interestParts'},
      {id: '6', name: 'name6', filterKey: 'applyStartDate'},
      {id: '7', name: 'name7', filterKey: 'applyEndDate'},
      {id: '8', name: 'name8', filterKey: 'excludeClosing'}
    ];
    filterTags.forEach((v) => {
      expect(Object.keys(filter).includes(v.filterKey)).toBe(true);
    })
  });

  it('검색 태그가 규칙에 맞게 보이는지 검토합니다.', () => {
    const unOrganizedKeywordSet = [
      ["인력 ,충북, 중소 기업,충청북도", "인력,충북,중소기업,충청북도"],
      ["ict,기업,충청북도,aI", "ICT,기업,충청북도,AI"],  // 대문자
      ["인력, ict, 기업,충청북도", "인력,ICT,기업,충청북도"]  // 공백 존재, 대문자
    ]
    unOrganizedKeywordSet.forEach((v) => {
      const received = postManager.organizeKeywords(
        v[0].split(',')
      );
      expect(received).toStrictEqual(v[1].split(','));
    });
    
    const applyRemovedLocationSet = [
      [["세종", "인력", "사회적기업", "인건비"], ["인력", "사회적기업", "인건비"]],
      [["세종특별자치시", "인건비", "전문인력"], ["인건비", "전문인력"]]
    ];
    applyRemovedLocationSet.forEach((v) => {
      const received = postManager.removeLocationsFromTags(v[0]);
      expect(received).toStrictEqual(v[1]);
    });

    const applyRemovedIncludesNoticeInfoSet = [
      {
        notice: "[세종] 전문인력 지원사업(신규 및 재심사)(2023년 2차 (예비)사회적기업 지정 및 재정지원 공고)",
        tag: ["인력","세종","사회적기업","예비사회적기업","직접수행","세종특별자치시","인건비","전문인력","인증사회적기업","2023","지역형","부처형","재심사"],
        expect: ["직접수행","세종특별자치시","인건비","인증사회적기업","지역형","부처형"]
      },
      {
        notice: "[충남] 2023년 장애인고용우수기업 지원사업 공고",
        tag: ["인력", "충남", "직접수행", "충청남도", "인센티브", "인증서", "2023", "장애인고용", "노동환경개선금", "장애인상시노동자"],
        expect: ["인력", "직접수행", "충청남도", "인센티브", "인증서", "노동환경개선금", "장애인상시노동자"]
      }
    ];
    applyRemovedIncludesNoticeInfoSet.forEach((v) => {
      const received = postManager.removeIncludesNoticeInfo(v.tag, v.notice);
      expect(received).toStrictEqual(v.expect);
    });

    const recommendationOrderedSet = [
      [
        ["인력","경남","중소기업","제조업","청년","경상남도"],
        ["인력","중소기업","제조업","경남","청년","경상남도"]
      ],
      [
        ["인력","경북","중소기업","R&D","제조업","경상북도","구미시","연구소"],
        ["인력","중소기업","R&D","제조업","경북","경상북도","구미시","연구소"]
      ]
    ];
    recommendationOrderedSet.forEach((v) => {
      const received = postManager.recommendationOrderedFirst(v[0]);
      expect(received).toStrictEqual(v[1]);
    });
  });
});

const postSummaryEntities = [
  {
    "PostID": 1,
    "bookmarkYN": "N",
    "budget": "1인당 월 250만원 /최대 2명",
    "days_left": 83,
    "notice": "[세종] 전문인력 지원사업(신규 및 재심사)(2023년 2차 (예비)사회적기업 지정 및 재정지원 공고)",
    "organization": "직접수행",
    "tag": "인력,세종,사회적기업,예비사회적기업,직접수행,세종특별자치시,인건비,전문인력,인증사회적기업,2023,지역형,부처형,재심사",
    "views": 10
  },
  {
    "PostID": 2,
    "bookmarkYN": "N",
    "budget": "지원금",
    "days_left": 83,
    "notice": "[세종] 일자리창출 사업(신규 및 재심사)(2023년 2차 (예비)사회적기업 지정 및 재정지원 공고)",
    "organization": "직접수행",
    "tag": "인력,경영,세종,사회적기업,예비사회적기업,직접수행,세종특별자치시,일자리창출,인건비,신규,2023,지역형,부처형,재심사,고용노동부인증",
    "views": 7
  },
  {
    "PostID": 3,
    "bookmarkYN": "N",
    "budget": "월 30만원 /최대 2명",
    "days_left": 83,
    "notice": "[경북] 구미시 2023년 2차 제조업 경쟁력 강화 핵심인재 지원 사업 모집 공고",
    "organization": "구미상공회의소",
    "tag": "인력,경북,중소기업,R&D,제조업,경상북도,구미시,연구소,구미상공회의소,임차료,근로자,연구개발전담부서,2023,구미산단",
    "views": 0
  },
  {
    "PostID": 4,
    "bookmarkYN": "N",
    "budget": "1인당 180만원 /최대 3명",
    "days_left": 91,
    "notice": "[경남] 2023년 신산업 기업체 청년 현장실습비 지원사업 신규 참여기업 추가모집 공고(신산업 연계 청년일자리 창출사업)",
    "organization": "창원산업진흥원",
    "tag": "인력,경남,중소기업,제조업,청년,경상남도,창원시,창원산업진흥원,인건비,정보통신업,일자리으뜸기업,신산업,청년친화기업,현장실습,2023,장애인고용기업,정규직전환,전문과학,기술서비스업",
    "views": 0
  },
  {
    "PostID": 5,
    "bookmarkYN": "N",
    "budget": "800만원 /최대 5명",
    "days_left": 0,
    "notice": "[충북] 청주시ㆍ진천군ㆍ음성군 2023년 신성장산업(ICTㆍ바이오) 고용활성화 채용장려금 지원사업 시행 추가공고",
    "organization": "청주상공회의소",
    "tag": "인력,충북,중소기업,충청북도,바이오,ICT,중견,청주상공회의소,신성장산업,채용장려금,청주시,음성군,진천군,2023,스마트IT산업",
    "views": 0
  },
  {
    "PostID": 6,
    "bookmarkYN": "N",
    "budget": "10백만원",
    "days_left": 79,
    "notice": "2023년 인공지능(AI) 학습용데이터 제작사업 지원기업 모집 공고",
    "organization": "대전테크노파크",
    "tag": "기술,인력,경영,서울,부산,대구,인천,광주,대전,울산,세종,경기,강원,충북,충남,전북,전남,경북,경남,제주,대전테크노파크,대전광역시,AI,인공지능,일자리창출,학습데이터,연계,융합,2023,소재지이전,데이터라벨러",
    "views": 0
  },
  {
    "PostID": 7,
    "bookmarkYN": "N",
    "budget": "2,250백만원",
    "days_left": 70,
    "notice": "2023년 지역기업-청년 희망이음 지원사업 공고",
    "organization": "한국산업기술진흥원",
    "tag": "인력,부산,대구,인천,광주,대전,울산,세종,경기,강원,충북,충남,전북,전남,경북,경남,제주,한국산업기술진흥원,산업통상자원부,청년,컨소시엄,비영리기관,인센티브,지역혁신기관,프로그램,취업연계,2023,지역기업,인식개선,기업탐방,희망이음,국비지원",
    "views": 0
  },
  {
    "PostID": 8,
    "bookmarkYN": "N",
    "budget": "10백만원",
    "days_left": 0,
    "notice": "[전북] 익산시 2023년 다이로움 일자리 기업(일자리 우수기업) 인증사업 참여기업 모집 공고",
    "organization": "캠틱종합기술원",
    "tag": "인력,전북,교육,전라북도,재직자,입주기업,복지,개선,캠틱종합기술원,근무환경,2023,익산시,편의시설,100인미만,다이로움,출퇴근,쉼터",
    "views": 0
  },
  {
    "PostID": 9,
    "bookmarkYN": "N",
    "budget": "20백만원",
    "days_left": 83,
    "notice": "[충남] 2023년 장애인고용우수기업 지원사업 공고",
    "organization": "직접수행",
    "tag": "인력,충남,직접수행,충청남도,인센티브,인증서,2023,장애인고용,노동환경개선금,장애인상시노동자",
    "views": 0
  },
  {
    "PostID": 10,
    "bookmarkYN": "N",
    "budget": "20백만원",
    "days_left": 83,
    "notice": "[충남] 2023년 고용우수기업 지원사업 공고",
    "organization": "직접수행",
    "tag": "인력,충남,직접수행,충청남도,인센티브,인증서,2023,상용노동자고용,신규채용기업,노동환경개선금",
    "views": 0
  }
];

const postDetailEntity = {
  "PostID": 1,
  "apply_end": "2023-06-09",
  "apply_start": "2023-05-26",
  "attachments": [
      {
          "pfi_filename": "첨부파일_테스트_3aee00.txt",
          "pfi_originname": "첨부파일_테스트.txt"
      },
      {
          "pfi_filename": "첨부파일_테스트_6e13bf.txt",
          "pfi_originname": "첨부파일_테스트2.txt"
      }
  ],
  "budget": "1인당 월 250만원 /최대 2명",
  "days_left": 84,
  "department": "세종특별자치시",
  "notice": "[세종] 전문인력 지원사업(신규 및 재심사)(2023년 2차 (예비)사회적기업 지정 및 재정지원 공고)",
  "object": "국내전문인력",
  "organization": "직접수행",
  "overview": "「세종특별자치시 사회적경제 육성 지원에 관한 조례」및「고용노동부 사회적기업 재정지원사업 지침」에 따라 2023년도 (예비)사회적기업 지정 및 재정지원사업(일자리창출, 전문인력, 사업개발비)을 다음과 같이 공고합니다.☞ 세종시 소재 유급근로자 1명 이상 고용한 고용노동부 인증 사회적기업 및 예비사회적기업(지역형, 부처형)☞ 1인당 월 250만원 한도 내 인건비 일부를 지원(인증사회적기업 기업당 최대 2명, 예비사회적기업 기업당 최대 1명)",
  "part": "인력",
  "post_date": "2023-08-09"
};

const searchFilterEntity = {
  "MemberNo": 66,
  "department": [
    "세종특별자치시"
  ],
  "company": [
    "사회적기업"
  ],
  "supportType": "일반 지원",
  "part": [
    "인력"
  ],
  "postDateYN": "Y",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "registerClosingYN": "N",
  "bookmarkPageYN": "N"
}
