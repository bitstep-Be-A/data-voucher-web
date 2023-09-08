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
  dDay: string;
  organization: string;
}

export interface PostRecommendation extends PostBase {
  projectBudget: string;
  isBookmarked: boolean;
  part: string;
  postDate: string | null;
  department: string;
}

export interface PostSummary extends PostBase {
  readCount: number;
  searchTags: string[];
  projectBudget: string;
  isBookmarked: boolean;
}

export interface PostSummaryManager {
  // searchTags 전처리
  organizeKeywords: (keywords: string[]) => string[];  // 공백 제거, 모두 대문자 변환
  removeLocationsFromTags: (searchTags: string[]) => string[];
  removeIncludesNoticeInfo: (searchTags: string[], notice: string) => string[];
  recommendationOrderedFirst: (searchTags: string[]) => string[];
  selectTags: (searchTags: string[]) => string[];  // n개씩만 가져오기
  isKeywordIncludingNotice: (keyword: string, notice: string) => boolean;
}

export interface PostDetailManager {}

export interface PostManager extends PostSummaryManager, PostDetailManager {
  changeDateLeftToDDay: (daysLeft: number) => string;
  bookmarkToggleToBool: (toggle: ToggleType) => boolean;
};

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
  pfi_filename: string;
  pfi_originname: string;
}

export interface SearchFilter {
  locations: Location[];
  targetEnterprises: TargetEnterpriseEnum[];
  excludeClosing: ToggleType;
  bookmarkOnly: ToggleType;
  interestParts: PartCategoryEnum[];
  employeeCount?: number;
  recruitType?: RecruitEnum;
  applyStart?: string;
  applyEnd?: string;
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

export interface SearchFilterOpt {
  keyword: string;
  limit: number;
  offset: number;
}

export interface PostService {
  search: (filter: SearchFilter, options: {
    keyword: string;
    limit: number;
    offset: number;
  }) => Promise<PostSummary[] | void>;
  showDetail: (postId: ID) => Promise<PostDetail | void>;
  saveBookmark: (userId: ID, postId: ID) => void;
  removeBookmark: (userId: ID, postId: ID) => void;
  recommend: (userId: ID) => Promise<PostRecommendation[] | void>;
}
