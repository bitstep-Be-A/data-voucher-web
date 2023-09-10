import { atom, useRecoilState } from "recoil";

import {
  PostSummary,
  PostManager,
  PostDetail,
  Attachment,
  SearchFilter,
  PostListOption,
  PostRecommendation,
} from "./post.interface";
import { ID } from "../../types/common";
import { locations } from "../../policies/global.policy";
import * as recommendation from "../../policies/recommendation.policy";
import { POST_SEARCH_LIMIT } from "../../policies/search.policy";

export const defaultSearchFilter: SearchFilter = {
  locations: [],
  targetEnterprises: [],
  recruitType: undefined,
  interestParts: [],
  applyStart: undefined,
  applyEnd: undefined,
  excludeClosing: 'Y',
  bookmarkOnly: 'N'
}

const searchFilterState = atom<SearchFilter>({
  key: "search/post/SearchFilter",
  default: defaultSearchFilter
});

export const useSearchFilter = () => {
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
  return {
    searchFilter,
    setSearchFilter
  }
}

const postListOptionState = atom<PostListOption>({
  key: "search/post/SearchFilterOpt",
  default: {
    keyword: "",
    limit: POST_SEARCH_LIMIT,
    offset: 0
  }
});

export const usePostListOption = () => {
  const [postListOption, setPostListOption] = useRecoilState(postListOptionState);
  return {
    postListOption,
    setPostListOption
  }
}

export class SearchFilterSerializer {
  private filter: SearchFilter;
  private userId: ID;

  constructor(filter: SearchFilter, userId: ID) {
    this.filter = filter;
    this.userId = userId;
  }

  toEntity() {
    return {
      "MemberNo": this.userId,
      "department": this.filter.locations.map((v) => v.sidoName),
      "company": this.filter.targetEnterprises,
      "supportType": this.filter.recruitType ?? "",
      "part": this.filter.interestParts,
      "postDateYN": "N",
      "startDate": this.filter.applyStart,
      "endDate": this.filter.applyEnd,
      "registerClosingYN": this.filter.excludeClosing,
      "bookmarkPageYN": this.filter.bookmarkOnly
    }
  }
}

export class PostRecommendationModel implements PostRecommendation {
  public postId: ID;
  public logo?: string | undefined;
  public notice: string;
  public dDay: string;
  public organization: string;
  public part: string;
  public projectBudget: string;
  public postDate: string | null;
  public department: string;
  public isBookmarked: boolean;

  constructor(entity: any) {
    this.postId = entity["PostID"];
    this.isBookmarked = postManager.bookmarkToggleToBool(entity["bookmarkYN"]);
    this.projectBudget = entity["budget"];
    this.dDay = postManager.changeDateLeftToDDay(entity["days_left"]);
    this.postDate = entity["post_date"];
    this.notice = entity["notice"];
    this.organization = entity["organization"];
    this.part = entity["part"];
    this.department = entity["department"];
  }
}

export class PostDetailModel implements PostDetail {
  public postId: ID;
  public logo?: string;
  public notice: string;
  public dDay: string;
  public organization: string;
  public part: string;
  public purpose?: string | undefined;
  public department: string;
  public postDate: string | null;
  public applyStart: string;
  public applyEnd: string;
  public connectWith?: string | undefined;
  public standardPriceMethod?: string | undefined;
  public overview: string;
  public budget?: string | undefined;
  public attachments: Attachment[];

  constructor(entity: any) {
    this.postId = entity["PostID"];
    this.applyEnd = entity["apply_end"];
    this.applyStart = entity["apply_start"];
    this.attachments = entity["attachments"];
    this.budget = entity["budget"];
    this.dDay = postManager.changeDateLeftToDDay(entity["days_left"]);
    this.department = entity["department"];
    this.notice = entity["notice"];
    this.purpose = entity["object"];
    this.organization = entity["organization"];
    this.overview = entity["overview"];
    this.part = entity["part"];
    this.postDate = entity["post_date"];
  }
}

export const postManager: PostManager = {
  bookmarkToggleToBool(toggle) {
    if (toggle === "Y") {
      return true;
    } else if (toggle === "N") {
      return false;
    } else { return false }
  },
  changeDateLeftToDDay(daysLeft) {
    if (daysLeft === 0) {
      return "D-day"
    } else if (daysLeft < 0) {
      return `D${daysLeft}`;
    } else {
      return `접수마감`;
    }
  },
  organizeKeywords(keywords) {
    return keywords.map((v) => v.toUpperCase().replace(/(\s*)/g, ""));
  },
  removeLocationsFromTags(searchTags) {
    const locationKeywords: string[] = [];
    locations.forEach((v) => {
      locationKeywords.push(v.name);
      locationKeywords.push(v.sidoName);
    })
    const locationNames = this.organizeKeywords(locationKeywords);
    return searchTags.filter((v) => !locationNames.includes(v));
  },
  isKeywordIncludingNotice(keyword, notice) {
    const organizedKeyword = this.organizeKeywords([keyword])[0];
    const organizedNotice = this.organizeKeywords([notice.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97Fa-zA-Z0-9\s]/g, '')])[0];
    return organizedNotice.includes(organizedKeyword);
  },
  removeIncludesNoticeInfo(searchTags, notice) {
    const _stack: string[] = [];
    const searchTagStatus: {[key: number]: {
      value: string;
      isActive: boolean;
    }} = {};
    searchTags.forEach((v, i) => {
      searchTagStatus[i] = {
        value: v,
        isActive: true
      }
    });
    searchTags.forEach((v, i) => {
      if (this.isKeywordIncludingNotice(v, notice)) {
        _stack.push(v);
        searchTagStatus[i].isActive = false;
      }
    });
    return Object.values(searchTagStatus).filter(v => v.isActive).map(v => v.value);
  },
  recommendationOrderedFirst(searchTags) {
    const recommendations = this.organizeKeywords([
      ...Object.values(recommendation.PartCategoryEnum),
      ...Object.values(recommendation.RecruitEnum),
      ...Object.values(recommendation.TargetEnterpriseEnum),
      ...recommendation.interestTags.map(v => v.keyword)
    ]);
    const _stack: string[] = [];
    const searchTagStatus: {[key: number]: {
      value: string;
      isActive: boolean;
    }} = {};
    searchTags.forEach((v, i) => {
      searchTagStatus[i] = {
        value: v,
        isActive: true
      }
    });
    // scan
    searchTags.forEach((v, i) => {
      if (recommendations.includes(v)) {
        _stack.push(v);
        searchTagStatus[i].isActive = false;
      }
    });
    return [
      ..._stack,
      ...Object.values(searchTagStatus).filter(v => v.isActive).map(v => v.value)
    ];
  },
  selectTags(searchTags) {
    return searchTags.slice(0, 3);
  },
}

export class PostSummaryModel implements PostSummary {
  public postId: ID;
  public logo?: string;
  public notice: string;
  public dDay: string;
  public organization: string;
  public projectBudget: string;
  public readCount: number;
  private _searchTags: string[];
  public isBookmarked: boolean;

  constructor(entity: any) {
    this.postId = entity['PostID'];
    this.logo = undefined;
    this.notice = entity['notice'];
    this.dDay = postManager.changeDateLeftToDDay(entity["apply_end"]);
    this.organization = entity['organization'];
    this.projectBudget = entity['budget'];
    this.readCount = entity['views'];

    this._searchTags = entity['tag'].split(',');
    this._searchTags = postManager.organizeKeywords(this._searchTags);
    this._searchTags = postManager.removeLocationsFromTags(this._searchTags);
    this._searchTags = postManager.recommendationOrderedFirst(this._searchTags);
    this._searchTags = postManager.selectTags(this._searchTags);

    this.isBookmarked = postManager.bookmarkToggleToBool(entity["bookmarkYN"]);
  }

  get searchTags(): string[] {
    return this._searchTags;
  }
}
