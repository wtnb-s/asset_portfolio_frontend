export type AssetUnit = {
  Detail: Detail[]
  Category: Category[]
};

export type Detail = {
  AssetCode: string;
  AssetName: string;
  PresentValue: number;
  PresentValueDayBeforeProfit: number;
  TotalUnit: number;
  StockPrice: number;
  StockPriceDayBeforeProfit: number;
  StockPriceDayBeforeProfitRate: number;
  TotalBuyPrice: number;
  AvaregeUnitPrice: number;
};

export type Category = {
  AssetCode: string;
  AssetName: string;
  PresentValue: number;
  TotalUnit: number;
  TotalBuyPrice: number;
};