export interface IAsset { 
    asset_id: string;
    data_end: Date
    data_orderbook_end: Date;
    data_orderbook_start: Date;
    data_quote_end: Date;
    data_quote_start: Date;
    data_start: Date
    data_symbols_count: number;
    data_trade_end: Date
    data_trade_start: Date
    id_icon: string;
    name: string;
    type_is_crypto: number;
    volume_1day_usd: number;
    volume_1hrs_usd: number;
    volume_1mth_usd: number;
    price_usd?: number;
}