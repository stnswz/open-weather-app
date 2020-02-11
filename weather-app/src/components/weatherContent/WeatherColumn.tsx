import React, { ReactElement } from "react";
import IconBox from "./IconBox";
import { IDayPeriod } from "../definitions/IDayPeriod";

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

    return (
        <div className="column">
            <div className="colTop">
                <div className="dayTime">{dp.dayTime}</div>
                <IconBox icon1URL={dp.icon1URL} icon2URL={dp.icon2URL}/>
                <div className="temp">{dp.temperature}</div>
                <div className="desc">{dp.description}</div>
            </div>
            <div className="colBottom">
                <div className="clouds" title={"Wolken: " + dp.clouds}>{dp.clouds}</div>
                <div className="wind" title={"Wind um " + dp.wind}>{dp.wind}</div>
                <div className="feels" title={"Temperatur gefühlt wie " + dp.feelsLike}>{dp.feelsLike}</div>
                <div className="rain" title={"Niederschlagsmenge " + dp.rain}>{dp.rain}</div>
                <div className="humidity" title={"Luftfeuchtigkeit " + dp.humidity}>{dp.humidity}</div>
                <div className="pressure">Luftdruck {dp.pressure}</div>
            </div> 
        </div>
    );
}

export default WeatherColumn;