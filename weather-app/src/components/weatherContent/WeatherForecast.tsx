import React, { Component, ReactElement, Fragment } from "react";
import { connect } from 'react-redux';
import DayPeriodBox from "./DayPeriodBox";
import {IFullDayData} from "./../../components/definitions/IFullDayData";
import {IDayPeriod} from "./../../components/definitions/IDayPeriod";

interface IState {
    /** empty state */
}
interface IProps {
    forecastData?: Array<IFullDayData>,
}

const state = (store:any) => ({
    forecastData: store.weatherState.forecastData,
});
const operations = (dispatch:any) => ({
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(state, operations) as any)
class WeatherForecast extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
        this.getDayPeriods = this.getDayPeriods.bind( this );
    }

    private getDayPeriods( dayPeriods:Array<IDayPeriod> ): Array<ReactElement> {
        return dayPeriods.map( (dayPeriod, index) => <DayPeriodBox key={index+dayPeriod.dayTime} dayPeriod={dayPeriod} />);
    }

    public render(): ReactElement {

        const forecastData: Array<IFullDayData> = this.props.forecastData || [];
        const numberForecastDays:number = forecastData.length;

        return (
            <Fragment>

                {
                    numberForecastDays ? forecastData.map( (fullDayData) => 
                        <div className="dayBox" key={fullDayData.date}>
                            <h3 className="dayBoxTitle">Wetter für {fullDayData.city} am {fullDayData.date}</h3>
                            <div className="dayFlexBox">
                                {this.getDayPeriods(fullDayData.dayPeriods)}
                            </div>
                        </div>) : ""
                }

            </Fragment>
        );

        /*
        return (
            
            <Fragment>
                <div className="dayBox">
                    <h3 className="dayBoxTitle">Wetter für Berlin am 29.1.2020</h3>
                    <div className="dayFlexBox">

                        <div className="hourBoxWrap">
                            <div className="hourBox">
                                <div className="hourImage">
                                    <img className="icon" alt="" src="http://openweathermap.org/img/wn/10d@2x.png" /><br/>
                                    <img className="icon2" alt="" src="http://openweathermap.org/img/wn/09d@2x.png" />
                                </div>
                                <div className="hourOutput">
                                    <strong className="time">Morgens</strong><br/><br/>
                                    5 Grad<br/>
                                    Überwiegend bewölkt<br/>
                                    Wolken: 75 %
                                </div>
                            </div>
                        </div>

                        <div className="hourBoxWrap">
                            <div className="hourBox">
                                <div className="hourImage">
                                    <img className="icon" alt="" src="http://openweathermap.org/img/wn/01d@2x.png" />
                                </div>
                                <div className="hourOutput">
                                    <strong className="time">Mittags</strong><br/><br/>
                                    5 Grad<br/>
                                    Überwiegend<br/>
                                    Wolken: 75 %
                                </div>
                            </div>
                        </div>

                        <div className="hourBoxWrap">
                            <div className="hourBox">
                                <div className="hourImage">
                                    <img className="icon" alt="" src="http://openweathermap.org/img/wn/04n@2x.png" />
                                </div>
                                <div className="hourOutput">
                                    <strong className="time">Abends</strong><br/><br/>
                                    5 Grad<br/>
                                    Überwiegend bewölkt<br/>
                                    Wolken: 75 %
                                </div>
                            </div>
                        </div>

                        <div className="hourBoxWrap">
                            <div className="hourBoxNight">
                                <div className="hourImage">
                                    <img className="icon" alt="" src="http://openweathermap.org/img/wn/03n@2x.png" />
                                </div>
                                <div className="hourOutput">
                                    <strong className="time">Nachts</strong><br/><br/>
                                    5 Grad<br/>
                                    Überwiegend bewölkt<br/>
                                    Wolken: 75 %
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
            
        );
        */
    }
}

export default WeatherForecast;