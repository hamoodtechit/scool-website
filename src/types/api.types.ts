export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  // Common pagination fields if applicable
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
