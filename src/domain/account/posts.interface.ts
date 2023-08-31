import { Location } from "../../policies/global.policy";
import type { ID } from "../../types/common";

export interface PostSummary {}
export interface PostDetail {
  logo?: string;
  notice: string;
  daysLeft: number;  // +일 경우 접수마감
  part: string;  // 분야
  purpose: string;
  department: string;  // 소관부처
  organization: string;
  postDate: string | null;  // 게시일
  applyStart: string;  // 접수시작일
  applyEnd: string;  // 접수마감일
  connectWith?: string;
  standardPriceMethod?: string;  // 예가방법
}

export type RecruitType = "일반 지원" | "청년 지원" | "여성 지원" | "장애인 지원"

export interface SearchFilter {
  locations?: Location[];
  targetEnterprises?: string[];
  employeeCount?: number;
  recruitType?: RecruitType;
  interestParts?: string[];
  applyStart?: string;
  applyEnd?: string;
  excludeClosing?: 'Y' | 'N';
  // budgetRange: [number, number];
}

export interface PostService {
  search: (filter: SearchFilter) => Promise<PostSummary[]>;
  showDetail: (postId: ID) => Promise<PostDetail>;
  saveBookmark: (postId: ID, userId: ID) => Promise<void>;
}
