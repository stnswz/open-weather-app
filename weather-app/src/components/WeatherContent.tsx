import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import WeatherColumn from "./weatherContent/WeatherColumn";
import {IDayData} from "./../components/definitions/IDayData";
import { IDayPeriod } from "./definitions/IDayPeriod";

interface IState {
    /** empty */
}
interface IProps {
    dataIsLoading?: boolean,
    forecastData?: Array<IDayData>,
    selectedIndex?: number,
    country?: string,
    city?: string,
    loadingError?: boolean,
    errorCode?: string,
    errorMessage?: string,
    responseMessage?: string,
}

const reduxStore = (store:any) => ({
    dataIsLoading: store.weatherState.dataIsLoading,
    forecastData: store.weatherState.forecastData,
    selectedIndex: store.weatherState.selectedIndex,
    country: store.weatherState.country,
    city: store.weatherState.city,
    loadingError: store.weatherState.loadingError,
    errorCode: store.weatherState.errorCode,
    errorMessage: store.weatherState.errorMessage,
    responseMessage: store.weatherState.responseMessage,
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

        if( this.props.dataIsLoading ) {
            // Show preloader.
            return( <div></div> );
        }
        else if( this.props.loadingError ) {
            // Show error message.
            return( 
                <div id="infoContainer">
                    <div className="error">
                        Es ist ein Fehler aufgetreten: <br/>
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
                    Beispielanwendung zur Wettervorhersage auf Basis einer frei verfügbaren API von openweathermap.com. 
                    Für die Anzeige von Wetterinformationen einfach im Suchfeld oben einen Ort bzw. Stadtnamen eingeben.
                </div> 
            );
        }

        const dayData: IDayData = forecastData[ this.props.selectedIndex! ];
        const date: string = dayData.date + dayData.year;
        const dayPeriods: Array<IDayPeriod> = dayData ? dayData.dayPeriods : [];

        return (
            <div id="contentContainer">
                <div className="contentHeader">
                    Das Wetter für {this.props.city} ({this.props.country}) am {dayData.dayLong}, {date}
                </div>
                <div className="contentMain">
                    { dayPeriods.map( (dayPeriod, index) =>  <WeatherColumn key={date+index} dayPeriod={dayPeriod}/>) }
                </div>
            </div>
        );
    }
}

export default WeatherContent;