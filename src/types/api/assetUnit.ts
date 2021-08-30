export type AssetUnit = {
  Detail: Detail[]
  Category:{
    PresentValue: number[];
    TotalBuyPrice: number[];
  }
};

export type Detail = {
  AssetName: string;
  TotalUnit: number;
  TotalBuyPrice: number;
  PresentValue: number;
  AvaregeUnitPrice: number;
};
