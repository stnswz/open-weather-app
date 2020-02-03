import React, { Component, ReactElement, Fragment } from "react";
import WeatherToday from "./weatherContent/WeatherToday";
import WeatherForecast from "./weatherContent/WeatherForecast";

interface IState {
    /** empty state */
}
interface IProps {
    /** empty props */
}

class WeatherContent extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        return (
            <Fragment>
                <WeatherToday/>
                <WeatherForecast/>
            </Fragment>
        );
    }
}

export default WeatherContent;