export type ID = string | number;
export type ToggleType = 'Y' | 'N';

export type DataStateType<T> = {
  data: T,
  loading: boolean,
  error?: ErrorDetail | null | undefined
}

export type InfoType = {
  name: string;
  message: string;
}

export type ExceptionDetail = InfoType;
export type ErrorDetail = {
  name: string;
  message: string;
  code: number;
};
