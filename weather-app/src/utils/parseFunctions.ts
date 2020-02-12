import {IDayData} from "../components/definitions/IDayData";
import {IDayPeriod} from "./../components/definitions/IDayPeriod";
import {AppConfig} from "./../config/AppConfig";
import {LangService} from "./../lang/LangService";
import {lang} from "./../constants/lang"
import {dayMapDE, dayMapEN} from "./../lang/dayMap";

interface IHourData {
    date: string,
    year:number,
    hour: number,
    weekDay: number,
    temperature: number,
    feelsLike: number,
    description: string,
    clouds: number,
    wind: number,
    rain: number,
    humidity: number,
    pressure: number,
    icon: string,
}

const iconMap:any = {
    "01d" : "d_4",
    "02d" : "d_1",
    "03d" : "d_2",
    "04d" : "d_3",
    "09d" : "d_65",
    "10d" : "d_55",
    "11d" : "d_9",
    "13d" : "d_7",
    "50d" : "mist",
    "01n" : "n_4",
    "02n" : "n_1",
    "03n" : "n_2",
    "04n" : "n_3",
    "09n" : "n_65",
    "10n" : "n_55",
    "11n" : "n_9",
    "13n" : "n_7",
    "50n" : "mist",
    "" : "",
}

export function getForecastData( data:any ):Array<IDayData> {

    let forecastData:Array<IDayData> = new Array<IDayData>();
    if( !data || data.cod !== "200" ) {
        return forecastData;
    }

    const parsedHoursData: Array< Array<IHourData> > = getParsedHoursData( data.list );
    const city:string = data.city.name;
    const country:string = data.city.country;

    for( let i=0; i<parsedHoursData.length; i++ ) {
        // parsedHourData[0] contains all hours for today
        // parsedHourData[1-n] contains all hours for every other forecast days

        let dayPeriods: Array<IDayPeriod> = new Array<IDayPeriod>();
        let dayList: Array<IHourData>     = parsedHoursData[i];
        let date:string = dayList[0].date;
        let year:number = dayList[0].year;

        if( i === 0 && dayList.length % 2 === 1) {
            // Special step for the first data array (= todays data array), it's length 
            // can be uneven since it doesn't must contain all 8 hours of a day.
            const hourData: IHourData = dayList.length > 1 ? dayList.shift()! : dayList[0];
            let dayPeriod:IDayPeriod = getDayPeriod( hourData, undefined );
            dayPeriods.push( dayPeriod );
        }

        for( let b=0; b<dayList.length && dayList.length>1; b+=2 ) {
            // The API has send us 8 hour for one day. We bind following 2 hours together to one day period:
            // 0h-3h Night / 6h-9h Morning / 12h-15h Noon / 18h-21h Evening
            let dayPeriod:IDayPeriod = getDayPeriod(dayList[b], dayList[b+1]);
            dayPeriods.push( dayPeriod );
        }

        // Determine the related week day.
        const hData:IHourData = dayList[0];
        const day:number = hData.weekDay;

        // Determine the min/max temperature for a day.
        const minMaxTemp:Array<number> = getMinMaxTemperature( dayList );
        const tempMin: number = minMaxTemp[0]; 
        const tempMax: number = minMaxTemp[1];

        const dayMap:any = getDayMap();

        let dayData:IDayData = {
            country: country,
            city: city,
            date: date,
            year: year,
            dayShort: dayMap[day][0],
            dayLong: dayMap[day][1],
            tempMin: tempMin,
            tempMax: tempMax,
            dayPeriods: dayPeriods, 
        }

        forecastData.push( dayData );

    }

    return forecastData;
}

function getDayPeriod( h1:IHourData, h2:IHourData | undefined): IDayPeriod {

    const temp:Array<number>   = sortAscending(h1.temperature, h2 ? h2.temperature : undefined);
    const tempF:Array<number>   = sortAscending(h1.feelsLike, h2 ? h2.feelsLike : undefined);
    const clouds:Array<number> = sortAscending(h1.clouds, h2 ? h2.clouds : undefined);
    const wind:Array<number> = sortAscending(h1.wind, h2 ? h2.wind : undefined);
    const rain:Array<number> = sortAscending(h1.rain, h2 ? h2.rain : undefined);
    const humidity:Array<number> = sortAscending(h1.humidity, h2 ? h2.humidity : undefined);
    const icons:Array<string>  = getIcons(h1.icon, h2 ? h2.icon : "");

    let dayPeriod:IDayPeriod = {
        dayTime: getDayTime( h1.hour ), // Morning, Noon, Evenings...
        temperature: temp.length === 1 ? temp[0]+" °C" : temp[0]+ " bis " + temp[1]+" °C",
        feelsLike: tempF.length === 1 ? tempF[0]+" °C" : tempF[0]+ " bis " + tempF[1]+" °C",
        description: getDescription( h1.description, h2 ? h2.description : "" ),
        clouds: clouds.length === 1 ? clouds[0]+" %" : clouds[0]+ " - " + clouds[1]+" %",
        wind: wind.length === 1 ? wind[0]+" Km/h" : wind[0]+ " - " + wind[1]+" Km/h",
        rain: rain.length === 1 ? rain[0]+" mm" : rain[0]+ " - " + rain[1]+" mm",
        humidity: humidity.length === 1 ? humidity[0]+" %" : humidity[0]+ " - " + humidity[1]+" %",
        pressure: h1.pressure + " hPa",
        icon1URL: icons[0],
        icon2URL: icons[1],
        isDayTime: h1.icon.charAt(2) === "d", // e.g. 04d@2x.png / 04n@2x.png
    }

    return dayPeriod;

    function getDayTime( h:number ): string {
        const langObj: any = LangService.getLangObject();
        switch( h ) {
            case 0: 
            case 3: return langObj.NIGHT;
            case 6: 
            case 9: return langObj.MORNING;
            case 12: 
            case 15: return langObj.NOON;
            case 18: 
            case 21: return langObj.EVENING;
            default: return "";
        }
    }

    function sortAscending( v1:number, v2:number | undefined ): Array<number> {
        if( v1 === v2 || v2 === undefined ) {
            return [v1];
        }
        else return v1 < v2 ? [v1, v2] : [v2, v1];
    }

    function getDescription( descr1:string, descr2:string ):string {
        return descr1 === descr2 || !descr2 ? descr1 : descr1 + " / " + descr2;
    }

    function getIcons( icon1:string, icon2:string ): Array<string> {
        const i1:string = iconMap[icon1];
        const i2:string = iconMap[icon2];
        return i1 === i2 || !icon2 ? [AppConfig.ICON_URL + i1 + ".svg", ""] : [AppConfig.ICON_URL + i1 + ".svg", AppConfig.ICON_URL + i2 + ".svg"];
    }
}

function getParsedHoursData( weatherList: Array<any> ): Array< Array<IHourData> > {

    let curDay:string = "";
    let dayList: Array<IHourData> = new Array<IHourData>();
    let allDaysList:Array< Array<IHourData> > = new Array< Array<IHourData> >();

    for( let i=0; i<weatherList.length; i++ ) {

        let listItem = weatherList[i];
        let dt   = listItem.dt_txt;
        let date = new Date(dt);

        let day:string   = "" + date.getDate();
        let weekDay:number = date.getDay();
        let month:number = date.getMonth()+1;
        let year:number  = date.getFullYear();
        let hour:number  = date.getHours();
        let d:string     = day + "." + month + "."; 

        if( i === 0 ) {
            curDay = day;
        }

        const hourData: IHourData = {
            date: d,
            year: year,
            hour: hour,
            weekDay: weekDay,
            temperature: Math.round(listItem.main.temp),
            feelsLike: Math.round(listItem.main.feels_like),
            description:  listItem.weather[0].description,
            clouds: listItem.clouds.all,
            wind: getWindSpeed( listItem.wind.speed ),
            rain: listItem.rain ? listItem.rain["3h"] : 0,
            humidity: listItem.main.humidity,
            pressure: listItem.main.pressure,
            icon: listItem.weather[0].icon
        }

        if( curDay !== day ) {
            // Day changed, we need a new dayList Array.
            allDaysList.push(dayList);
            dayList   = new Array<IHourData>();
            curDay = day;
        }

        dayList.push(hourData);
    }
    return allDaysList;

    function getWindSpeed( n:number ):number {
        if( !n ) {
            return 0;
        }
        return Math.round(n * 3.6);
    }
}

function getDayMap():any {
    const selectedLang: string = LangService.getLang();
    return selectedLang === lang.DE ? dayMapDE : dayMapEN;
}

function getMinMaxTemperature(dayList:Array<IHourData>): Array<number> {
    let numbers: Array<number> = new Array<number>();
    for( let i=0; i<dayList.length; i++ ) {
        numbers.push( dayList[i].temperature );
    }
    numbers.sort();

    return [ numbers[0], numbers[numbers.length-1] ];
}