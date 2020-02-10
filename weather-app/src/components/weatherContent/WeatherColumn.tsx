import React, { Component, ReactElement } from "react";
//import { connect } from 'react-redux';
import IconBox from "./IconBox";
import { IDayPeriod } from "../definitions/IDayPeriod";

interface IState {
    /* empty state */
}
interface IProps {
    dayPeriod: IDayPeriod;
}
/*
const state = (store:any) => ({
    //loadingError: store.weatherState.loadingError,
});
const operations = (dispatch:any) => ({
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});
@(connect(state, operations) as any)
*/
class WeatherColumn extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        if( !this.props.dayPeriod ) {
            return(
                <div className="column">
                    <div className="colTop"></div>
                    <div className="colBottom"></div>
                </div>
            );
        }

        const dp: IDayPeriod = this.props.dayPeriod;

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
}

export default WeatherColumn;