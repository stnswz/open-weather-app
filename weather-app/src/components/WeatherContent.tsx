import React, { Component, ReactElement, Fragment } from "react";
import WeatherColumn from "./weatherContent/WeatherColumn";

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
                <div className="contentHeader">
                    Das Wetter für Berlin am Donnerstag, 06.02.2020
                </div>
                <div className="contentMain">
                    <WeatherColumn />
                    <WeatherColumn />
                    <WeatherColumn />
                    <WeatherColumn />
                </div>
            </Fragment>
        );
    }
}

export default WeatherContent;