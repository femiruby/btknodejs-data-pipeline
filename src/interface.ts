
export interface Price {
    h: Currency,
    l: Currency,
    o: Currency,
    c: Currency
}

export interface Currency {
    str: string,
    num: number,
}

export interface Candle {
    time: string,
    complete: boolean,
    volume: number,
    bid: Price,
    mid: Price,
    ask: Price,
}

export interface ForexData {
    instrument: string,
    candles: Candle[],
    granularity: string,
    frame: number
}

export enum Frame {
    D1= "D1",
    H1 = "H1",
    H4 = "H4",
    M5 = "M5",
    ALL_FRAMES = "ALL_FRAMES"
}

export enum FileType {
    Data = "Data"
}

export type FileId = string


export enum InstrumentName {
        "GBP_CAD" ="GBP_CAD" ,
        "NZD_CAD"="NZD_CAD",
        "EUR_CAD"="EUR_CAD",
        "AUD_CAD"="AUD_CAD",
        "USD_CAD"="USD_CAD",
        "CAD_JPY"="CAD_JPY",
        "CAD_CHF"="CAD_CHF",
        "EUR_AUD"="EUR_AUD",
        "GBP_AUD"="GBP_AUD",
        "AUD_NZD"="AUD_NZD",
        "AUD_CHF"="AUD_CHF",
        "AUD_USD"="AUD_USD",
        "AUD_JPY"="AUD_JPY",
        "USD_JPY"="USD_JPY",
        "EUR_USD"="EUR_USD",
        "GBP_USD"="GBP_USD",
        "NZD_USD"="NZD_USD",
        "USD_CHF"="USD_CHF",
        "GBP_NZD"="GBP_NZD",
        "EUR_GBP"="EUR_GBP",
        "GBP_JPY"="GBP_JPY",
        "GBP_CHF"="GBP_CHF",
        "EUR_JPY"="EUR_JPY",
        "NZD_JPY"="NZD_JPY",
        "CHF_JPY"="CHF_JPY",
        "EUR_CHF"="EUR_CHF",
        "EUR_NZD"="EUR_NZD",
        "NZD_CHF"="NZD_CHF",
        "GBP_HKD"="GBP_HKD",
        "NZD_HKD"="NZD_HKD",
        "AUD_HKD"="AUD_HKD",
        "CAD_HKD"="CAD_HKD",
        "EUR_HKD"="EUR_HKD",
        "HKD_JPY"="HKD_JPY",
        "USD_HKD"="USD_HKD",
        "CHF_HKD"="CHF_HKD",
        "SGD_HKD"="SGD_HKD",
        "GBP_SGD"="GBP_SGD",
        "EUR_SGD"="EUR_SGD",
        "SGD_CHF"="SGD_CHF",
        "AUD_SGD"="AUD_SGD",
        "NZD_SGD"="NZD_SGD",
        "CAD_SGD"="CAD_SGD",
        "USD_SGD"="USD_SGD",
        "SGD_JPY"="SGD_JPY"
}

export enum Cmd {
    Run,
    Force
}


