import { atom, useRecoilState } from "recoil";

import {
  PostSummary,
  PostSummaryManager,
  PostDetail,
  Attachment,
  SearchFilter,
  SearchFilterOpt,
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

const searchFilterOptState = atom<SearchFilterOpt>({
  key: "search/post/SearchFilterOpt",
  default: {
    keyword: "",
    limit: POST_SEARCH_LIMIT,
    offset: 0
  }
});

export const useSearchFilterOpt = () => {
  const [searchFilterOpt, setSearchFilterOpt] = useRecoilState(searchFilterOptState);
  return {
    searchFilterOpt,
    setSearchFilterOpt
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
      "MemberNo": Number(this.userId),
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
    const daysLeft = entity["days_left"];
    if (daysLeft === 0) {
      this.dDay = "D-day"
    } else if (daysLeft < 0) {
      this.dDay = `D${daysLeft}`;
    } else {
      this.dDay = `접수마감`;
    }
    this.department = entity["department"];
    this.notice = entity["notice"];
    this.purpose = entity["object"];
    this.organization = entity["organization"];
    this.overview = entity["overview"];
    this.part = entity["part"];
    this.postDate = entity["post_date"];
  }
}

export const postSummaryManager: PostSummaryManager = {
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
  public projectAmount: string;
  public readCount: number;
  private _searchTags: string[];
  public isBookmarked: boolean;

  constructor(entity: any) {
    this.postId = entity['PostID'];
    this.logo = undefined;
    this.notice = entity['notice'];
    const daysLeft = entity["apply_end"];
    if (daysLeft === 0) {
      this.dDay = "D-day"
    } else if (daysLeft < 0) {
      this.dDay = `D${daysLeft}`;
    } else {
      this.dDay = `접수마감`;
    }
    this.organization = entity['organization'];
    this.projectAmount = entity['budget'];
    this.readCount = entity['views'];

    this._searchTags = entity['tag'].split(',');
    this._searchTags = postSummaryManager.organizeKeywords(this._searchTags);
    this._searchTags = postSummaryManager.removeLocationsFromTags(this._searchTags);
    this._searchTags = postSummaryManager.recommendationOrderedFirst(this._searchTags);
    this._searchTags = postSummaryManager.selectTags(this._searchTags);

    const bookmarkYN = entity["bookmarkYN"];
    if (bookmarkYN === "Y") {
      this.isBookmarked = true;
    } else if (bookmarkYN === "N") {
      this.isBookmarked = false;
    } else { throw new Error("bookmark에는 Y, N만 허용됩니다.") }
  }

  get searchTags(): string[] {
    return this._searchTags;
  }
}
