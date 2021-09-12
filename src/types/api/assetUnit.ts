export type AssetUnit = {
  Detail: Detail[]
  Category: Category[]
};

export type Detail = {
  AssetName: string;
  TotalUnit: number;
  TotalBuyPrice: number;
  PresentValue: number;
  AvaregeUnitPrice: number;
};

export type Category = {
  AssetCode: string;
  AssetName: string;
  TotalUnit: number;
  TotalBuyPrice: number;
  PresentValue: number;
};