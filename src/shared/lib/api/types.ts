export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/** Normalized error for UI */
export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};
