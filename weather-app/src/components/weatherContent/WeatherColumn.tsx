import React, { ReactElement } from "react";
import IconBox from "./IconBox";
import { IDayPeriod } from "../../app/definitions/IDayPeriod";
import {LangService} from "./../../lang/LangService";

interface IProps {
    dayPeriod: IDayPeriod;
}

function WeatherColumn(props:IProps): ReactElement {

    if( !props.dayPeriod ) {
        return(
            <div className="column">
                <div className="colTop"></div>
                <div className="colBottom"></div>
            </div>
        );
    }

    const dp: IDayPeriod = props.dayPeriod;
    const langObj:any = LangService.getLangObject();

    return (
        <div className="column">
            <div className="colTop">
                <div className="dayTime">{dp.dayTime}</div>
                <IconBox icon1URL={dp.icon1URL} icon2URL={dp.icon2URL}/>
                <div className="temp">{dp.temperature}</div>
                <div className="desc">{dp.description}</div>
            </div>
            <div className="colBottom">
                <div className="clouds" title={langObj.CLOUDS_TTP + ": " + dp.clouds}>{dp.clouds}</div>
                <div className="wind" title={langObj.WIND_TTP + " " + dp.wind}>{dp.wind}</div>
                <div className="feels" title={langObj.FEELS_LIKE_TTP + " " + dp.feelsLike}>{dp.feelsLike}</div>
                <div className="rain" title={langObj.RAIN_TTP + " " + dp.rain}>{dp.rain}</div>
                <div className="humidity" title={langObj.HUMIDITY_TTP + " " + dp.humidity}>{dp.humidity}</div>
                <div className="pressure">{langObj.PRESSURE} {dp.pressure}</div>
            </div> 
        </div>
    );
}

export default WeatherColumn;