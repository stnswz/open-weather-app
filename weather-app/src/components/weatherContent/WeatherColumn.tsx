import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import IconBox from "./IconBox";

interface IState {
    /* empty state */
}
interface IProps {
    //loadingError?: boolean;
    //loadWeatherData?: Function;
}

const state = (store:any) => ({
    //loadingError: store.weatherState.loadingError,
});
const operations = (dispatch:any) => ({
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(state, operations) as any)
class WeatherColumn extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        return (
            <div className="column">
                <div className="colTop">
                    <div className="dayTime">Morgens</div>
                    <IconBox />
                    <div className="temp">5&deg; - 6&deg;</div>
                    <div className="desc">Überwiegend bewölkt bis Sonnig</div>
                </div>
                <div className="colBottom">
                    <div className="clouds" title="Wolken 75 - 90 %"> 75 - 90 %</div>
                    <div className="wind" title="Wind um 20 Km/h"> W 20 Km/h</div>
                    <div className="feels" title="Temperatur gefühlt wie 2 - 3 &deg;C">wie 2 - 3 &deg;C</div>
                    <div className="rain" title="Niederschlagsmenge 1.25 - 0.65 mm">1.25 - 0.65 mm</div>
                    <div className="humidity" title="Luftfeuchtigkeit 82 - 85 %">82 - 85 %</div>
                    <div className="pressure">Luftdruck 1020 hPa</div>
                </div> 
            </div>
        );
    }
}

export default WeatherColumn;