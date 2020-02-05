import {ICurrentWeatherData} from "../components/definitions/ICurrentWeatherData";
import {IFullDayData} from "./../components/definitions/IFullDayData";
import {IDayPeriod} from "./../components/definitions/IDayPeriod";
import {AppConfig} from "./../config/AppConfig";

interface IHourData {
    date: string,
    hour: number,
    temperature: number,
    description: string,
    clouds: number,
    icon: string,
}

export function getForecastData( data:any ):Array<IFullDayData> {
    /*
    0-3   Nachts
    6-9   Morgens
    12-15 Mittags
    18-21 Abends
    */

    let forecastData:Array<IFullDayData> = new Array<IFullDayData>();

    const parsedHoursData: Array< Array<IHourData> > = getParsedHoursData( data.list ); 
    const hoursToday:Array<IHourData> = parsedHoursData[0];
    const city:string = data.city.name;

    for( let i=1; i<parsedHoursData.length; i++ ) {
        // parsedHourData[0] contains all hours for today
        // parsedHourData[1-n] contains all hours for every other forecast days

        let dayList: Array<IHourData>     = parsedHoursData[i];
        let dayPeriods: Array<IDayPeriod> = new Array<IDayPeriod>();
        let date:string = dayList[0].date;

        for( let b=0; b<dayList.length; b+=2 ) {

            let dayPeriod:IDayPeriod = getDayPeriod(dayList[b], dayList[b+1]);
            dayPeriods.push( dayPeriod );
        }

        let fullDayData:IFullDayData = {
            city: city,
            date: date,
            dayPeriods: dayPeriods
        }

        forecastData.push( fullDayData );

    }

    return forecastData;
}

function getDayPeriod( h1:IHourData, h2:IHourData): IDayPeriod {

    const temp:Array<number>   = sortAscending(h1.temperature, h2.temperature);
    const clouds:Array<number> = sortAscending(h1.clouds, h2.clouds);
    const icons:Array<string>  = getIcons(h1.icon, h2.icon);

    let dayPeriod:IDayPeriod = {
        dayTime: getDayTime( h1.hour ), // Morgens, Mittags, Abends...
        temperature: temp.length === 1 ? temp[0]+" Grad" : temp[0]+ " - " + temp[1]+" Grad",
        description: getDescription( h1.description, h2.description ),
        clouds: clouds.length === 1 ? clouds[0]+" %" : clouds[0]+ " - " + clouds[1]+" %",
        icon1URL: icons[0],
        icon2URL: icons[1],
        isDayTime: h1.icon.charAt(2) === "d", // e.g. 04d@2x.png / 04n@2x.png
        isDayAndNightTime: h1.icon.charAt(2) !== h2.icon.charAt(2),
    }

    return dayPeriod;

    function getDayTime( h:number ): string {
        switch( h ) {
            case 0: 
            case 3: return "Nachts";
            case 6: 
            case 9: return "Morgens";
            case 12: 
            case 15: return "Mittags";
            case 18: 
            case 21: return "Abends";
            default: return "";
        }
    }

    function sortAscending( v1:number, v2:number ): Array<number> {
        if( v1 === v2 ) {
            return [v1];
        }
        else return v1 < v2 ? [v1, v2] : [v2, v1];
    }

    function getDescription( descr1:string, descr2:string ):string {
        return descr1 === descr2 ? descr1 : descr1 + " / " + descr2;
    }

    function getIcons( icon1:string, icon2:string ): Array<string> {
        return icon1 === icon2 ? [AppConfig.ICON_URL + icon1 + ".png", ""] : [AppConfig.ICON_URL+icon1+".png", AppConfig.ICON_URL+icon2+".png"];
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

        let day:string = "" + date.getDate();
        let month = date.getMonth()+1;
        let year  = date.getFullYear();
        let hour  = date.getHours();
        let d = day + "." + month + "." + year; 

        if( i === 0 ) {
            curDay = day;
        }

        const hourData: IHourData = {
            date: d,
            hour: hour,
            temperature: Math.round(listItem.main.temp),
            description:  listItem.weather[0].description,
            clouds: listItem.clouds.all,
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
}