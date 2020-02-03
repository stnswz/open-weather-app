export interface IDayPeriod {
	dayTime: string, // Morgens, Mittags, Abends...
	temperature: string,
	description: string,
	clouds: string,
	icon1: string,
	icon2: string,
	isDayTime: boolean,
	isNightTime: boolean,
}