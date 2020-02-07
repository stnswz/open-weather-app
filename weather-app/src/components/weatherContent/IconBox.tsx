import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';

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
class IconBox extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        return (
            <div className="iconBox">
                <img className="iconBig" src="http://openweathermap.org/img/wn/10d@2x.png" />
                {/*<img className="iconX2" src="http://openweathermap.org/img/wn/10d@2x.png" />
                <img className="iconX2" src="http://openweathermap.org/img/wn/09d@2x.png" />*/}
            </div>
        );
    }
}

export default IconBox;