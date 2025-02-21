export type RequestPagination = {
  page?: number;
  limit?: number;
};

export type ResponsePagination = {
  totalItems: number;
  totalPages: number;
};
