export type Total = {
  confirmed: number;
  death: number;
  recovered: number;
  active: number;
};

export type TimelineData = {
  date: string;
  confirmed: number;
  death: number;
  recovered: number;
};

export type CaseTypeData = {
  [district: string]: number;
};
