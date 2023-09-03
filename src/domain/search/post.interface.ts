import type { Location } from "../../policies/global.policy";
import type { ID, ToggleType } from "../../types/common";
import type {
  RecruitEnum,
  TargetEnterpriseEnum,
  PartCategoryEnum
} from "../../policies/recommendation.policy";

export interface PostBase {
  postId: ID;
  logo?: string;
  notice: string;
  daysLeft: number;
  organization: string;
}

export interface PostSummary extends PostBase {
  readCount: number;
  searchTags: string[];
  projectAmount: string;
}

export interface PostSummaryManager {
  // searchTags 전처리
  organizeKeywords: (keywords: string[]) => string[];  // 공백 제거, 모두 대문자 변환
  removeLocationsFromTags: (searchTags: string[]) => string[];
  removeIncludesNoticeInfo: (searchTags: string[], notice: string) => string[];
  recommendationOrderedFirst: (searchTags: string[]) => string[];
  selectTags: (searchTags: string[]) => string[];  // n개씩만 가져오기
}

export interface PostDetail extends PostBase {
  part: string;  // 분야
  purpose?: string;
  department: string;  // 소관부처
  postDate: string | null;  // 게시일
  applyStart: string;  // 접수시작일
  applyEnd: string;  // 접수마감일
  connectWith?: string;
  standardPriceMethod?: string;  // 예가방법
  overview: string;
  budget?: string;
  attachments: Attachment[];
}

export interface Attachment {
  pfi_filname: string;
  pfi_originname: string;
}

export interface SearchFilter {
  locations?: Location[];
  targetEnterprises?: TargetEnterpriseEnum[];
  employeeCount?: number;
  recruitType?: RecruitEnum;
  interestParts?: PartCategoryEnum[];
  applyStart?: string;
  applyEnd?: string;
  excludeClosing?: ToggleType;
}

export interface FilterTag {
  id: string;
  name: string;
  filterKey: |
    'locations' |
    'targetEnterprises' |
    'employeeCount' |
    'recruitType' |
    'interestParts' |
    'applyStart' |
    'applyEnd' |
    'excludeClosing';
}

export interface PostService {
  search: (filter: SearchFilter, options: {
    keyword: string;
    limit: number;
    offset: number;
  }) => PostSummary[];
  showDetail: (postId: ID) => PostDetail;
  saveBookmark: (postId: ID, userId: ID) => void;
  removeFilter: (tagId: number) => void;
}
