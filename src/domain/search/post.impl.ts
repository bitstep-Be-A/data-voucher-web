import type {
  PostSummary,
  PostSummaryManager,
  PostDetail,
  Attachment
} from "./post.interface";
import { ID } from "../../types/common";
import { locations } from "../../policies/global.policy";
import * as recommendation from "../../policies/recommendation.policy";

export class PostDetailModel implements PostDetail {
  public postId: ID;
  public logo?: string;
  public notice: string;
  public daysLeft: number;
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
    this.daysLeft = entity["days_left"];
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
  removeIncludesNoticeInfo(searchTags, notice) {
    let filteredNotice = notice.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97Fa-zA-Z0-9\s]/g, '');
    filteredNotice = filteredNotice.toUpperCase().replace(/\s/g, '');

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
      if (filteredNotice.includes(v)) {
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
  public daysLeft: number;
  public organization: string;
  public projectAmount: string;
  public readCount: number;
  private _searchTags: string[];

  constructor(entity: any) {
    this.postId = entity['PostID'];
    this.logo = undefined;
    this.notice = entity['notice'];
    this.daysLeft = entity['days_left'];
    this.organization = entity['organization'];
    this.projectAmount = entity['budget'];
    this.readCount = entity['views'];

    this._searchTags = entity['tag'].split(',');
    this._searchTags = postSummaryManager.organizeKeywords(this._searchTags);
    this._searchTags = postSummaryManager.removeLocationsFromTags(this._searchTags);
    this._searchTags = postSummaryManager.recommendationOrderedFirst(this._searchTags);
    this._searchTags = postSummaryManager.selectTags(this._searchTags);
  }

  get searchTags(): string[] {
    return this._searchTags;
  }
}
