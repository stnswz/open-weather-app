import {IDayPeriod} from "./IDayPeriod";

export interface IDayData {
    country: string,
	city: string,
    date: string,
    year: number,
    dayShort: string,
    dayLong: string,
    tempMin: number,
    tempMax: number,
	dayPeriods: Array<IDayPeriod>,
}