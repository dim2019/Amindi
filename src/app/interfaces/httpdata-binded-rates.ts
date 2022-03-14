export interface HTTPdataBindedRates {
    success :boolean
    timestamp: number
    base: string
    date: string
    rates : {
        [propName: string]: number;
      }
}
