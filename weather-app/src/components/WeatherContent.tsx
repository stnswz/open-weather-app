import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import WeatherColumn from "./weatherContent/WeatherColumn";
import {IDayData} from "../app/definitions/IDayData";
import { IDayPeriod } from "../app/definitions/IDayPeriod";
import {LangService} from "./../lang/LangService";
import './../css/preloader.css';

interface IState {
    /** empty */
}
interface IProps {
    dataIsLoading?: boolean,
    preloadingStart?: boolean,
    forecastData?: Array<IDayData>,
    selectedIndex?: number,
    country?: string,
    forecastCity?: string,
    loadingError?: boolean,
    errorCode?: string,
    errorMessage?: string,
    responseMessage?: string,
    language?: string,
}

const reduxStore = (store:any) => ({
    dataIsLoading: store.weatherState.dataIsLoading,
    preloadingStart: store.weatherState.preloadingStart,
    forecastData: store.weatherState.forecastData,
    selectedIndex: store.weatherState.selectedIndex,
    country: store.weatherState.country,
    forecastCity: store.weatherState.forecastCity,
    loadingError: store.weatherState.loadingError,
    errorCode: store.weatherState.errorCode,
    errorMessage: store.weatherState.errorMessage,
    responseMessage: store.weatherState.responseMessage,
    language: store.appState.language,
});
const actions = (dispatch:any) => ({
    
});

@(connect(reduxStore, actions) as any)
class WeatherContent extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {}
    }

    public render(): ReactElement {

        const forecastData: Array<IDayData> = this.props.forecastData || [];
        const numberForecastDays:number = forecastData.length;
        const langObj:any = LangService.getLangObject();

        if( this.props.dataIsLoading || this.props.preloadingStart ) {
            // Show preloader.
            return( <div id="preloaderContainer">
                        <div className="preloader">
                            <div></div><div></div>
                            <div></div><div></div>
                            <div></div><div></div>
                            <div></div><div></div>
                            <div></div><div></div>
                            <div></div><div></div>
                        </div>
                    </div> );
        }
        else if( this.props.loadingError ) {
            // Show error message.
            return( 
                <div id="infoContainer">
                    <div className="error">
                        {langObj.ERROR}: <br/>
                        {this.props.errorCode}: {this.props.errorMessage}
                    </div>
                </div> 
            );
        }
        else if( this.props.responseMessage ) {
            // There is not the expected data in json response.
            return( 
                <div id="infoContainer">
                    {this.props.responseMessage}
                </div> 
            );
        }
        else if( numberForecastDays === 0 ) {
            // Nothing to show for now. Lets show an info text.
            return( 
                <div id="infoContainer">
                    {langObj.INFOTEXT}
                </div> 
            );
        }

        const dayData: IDayData = forecastData[ this.props.selectedIndex! ];
        const date: string = dayData.date + dayData.year;
        const dayPeriods: Array<IDayPeriod> = dayData ? dayData.dayPeriods : [];

        return (
            <div id="contentContainer">
                <div className="contentHeader">
                    {langObj.WEATHER_FOR} {this.props.forecastCity} ({this.props.country}) {langObj.AT} {dayData.dayLong}, {date}
                </div>
                <div className="contentMain">
                    { dayPeriods.map( (dayPeriod, index) =>  <WeatherColumn key={date+index} dayPeriod={dayPeriod}/>) }
                </div>
            </div>
        );
    }
}

export default WeatherContent;