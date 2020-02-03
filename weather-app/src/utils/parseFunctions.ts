import {ICurrentWeatherData} from "../components/definitions/ICurrentWeatherData";
import {IFullDayData} from "../components/definitions/IFullDayData";
import {IDayPeriod} from "../components/definitions/IDayPeriod";

export function getForecastData( data:any ):Array<IFullDayData> {
    /*
    0-3   Nachts
    6-9   Morgens
    12-15 Mittags
    18-21 Abends
    */
    let fullDayParts = new Array();
    let dayList   = new Array();

    let fullDayData:IFullDayData = undefined!;
    let curDay:string = "";

    const fullList = data.list;
    for( let i=0; i<fullList.length; i++ ) {

        let listItem = fullList[i];
        let dt   = listItem.dt_txt;
        let date = new Date(dt);

        let day:string = "" + date.getDate();
        let month = date.getMonth()+1;
        let year  = date.getFullYear();
        let hour  = date.getHours();
        let d = day + "." + month + "." + year; 

        if( i == 0 ) {
            curDay = day;
        }

        const timePartObj = {
            date: d,
            hour: hour,
            temperatur: Math.round(listItem.main.temp),
            description:  listItem.weather[0].description,
            clouds: listItem.clouds.all,
            icon: listItem.weather[0].icon
        }

        if( curDay !== day ) {
            // Day changed, we need a new dayList Array.
            fullDayParts.push(dayList);
            dayList   = new Array();
            curDay = day;
        }

        dayList.push(timePartObj);
    }
    return fullDayParts;
}