export interface IDayPeriod {
	dayTime: string, // Morgens, Mittags, Abends...
    temperature: string,
    feelsLike: string,
    clouds: string,
    wind: string,
    rain: string,
    description: string,
    humidity: string,
    pressure: string,
	icon1URL: string,
	icon2URL: string,
	isDayTime: boolean,
}