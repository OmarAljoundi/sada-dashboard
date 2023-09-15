export interface BaseResponse<T> {
  success: boolean;
  message: string;
  result: T;
  results: T[];
  total: number;
}
