export interface ChartTransactionItem {
  date: string;
  tx_count: number;
}

export interface ChartUpdateItem {
  timestamp: string;
  daily_updates: number;
}

export interface ChartMarketItem {
  date: string;
  closing_price: string;
  market_cap?: string;
  tvl?: string | null;
}

export interface ChartTransactionResponse {
  chart_data: Array<ChartTransactionItem>;
}

export interface ChartMarketResponse {
  available_supply: string;
  chart_data: Array<ChartMarketItem>;
}

export interface ChartUpdateResponse {
  chart_data: Array<ChartUpdateItem>;
}
