import {IDayPeriod} from "./IDayPeriod";

export interface IFullDayData {
	city: string,
	date: string,
	dayPeriods: Array<IDayPeriod>,
}