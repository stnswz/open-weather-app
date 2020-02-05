export interface IDayPeriod {
	dayTime: string, // Morgens, Mittags, Abends...
	temperature: string,
	description: string,
	clouds: string,
	icon1URL: string,
	icon2URL: string,
	isDayTime: boolean,
	isDayAndNightTime: boolean,
}