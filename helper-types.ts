export type SearchQuery = {
  FilterByOptions: FilterByOptions[];
  OrderByOptions: OrderByOptions[];
  PageSize: number;
  PageIndex: number;
  Select?: string;
  Table?: string;
};

export type FilterByOptions = {
  MemberName: string;
  FilterOperator: eFilterOperator;
  FilterFor: any;
};

export type OrderByOptions = {
  MemberName: string;
  SortOrder: Order;
};

export enum Order {
  ASC = 1,
  DESC = 2,
}

export enum eFilterOperator {
  EqualsTo = 1,
  NotEqualsTo = 2,
  BeginsWith = 3,
  Contains = 4,
  GreaterThan = 5,
  GreaterThanOrEquals = 6,
  LessThan = 7,
  LessThanOrEquals = 8,
  EqualsToList = 9,
  NotEqualsToList = 10,
  NotBeginsWith = 11,
  NotContains = 12,
  ListEqualToList = 13,
}

type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "not.is"
  | "in"
  | "cs"
  | "cd"
  | "sl"
  | "sr"
  | "nxl"
  | "nxr"
  | "adj"
  | "ov"
  | "fts"
  | "plfts"
  | "phfts"
  | "wfts";

export function getEqOperator(op: eFilterOperator): FilterOperator {
  switch (op) {
    case eFilterOperator.BeginsWith:
      return "not.is";
    case eFilterOperator.Contains:
      return "ilike";

    case eFilterOperator.EqualsTo:
      return "eq";
    case eFilterOperator.EqualsToList:
      return "in";
    case eFilterOperator.ListEqualToList:
      return "cs";

    case eFilterOperator.GreaterThanOrEquals:
      return "gte";
    case eFilterOperator.GreaterThan:
      return "gt";
    case eFilterOperator.LessThan:
      return "lt";
    case eFilterOperator.LessThanOrEquals:
      return "lte";

    default:
      return "eq";
  }
}
