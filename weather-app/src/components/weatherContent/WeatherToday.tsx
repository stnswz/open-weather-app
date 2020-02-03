import React, { Component, ReactElement, Fragment } from "react";

interface IState {
    /** empty state */
}
interface IProps {
    /** empty props */
}

class WeatherToday extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        return (
            <Fragment>
                <div className="dayBox">
                    <h3 className="dayBoxTitle">Wetter aktuell für Berlin</h3>

                    <div className="dayFlexBox">
                        
                        <div className="weatherTodayBox">
                            <div className="hourImageBig">
                                <img className="iconBig" alt="" src="http://openweathermap.org/img/wn/02n@2x.png" />
                            </div>
                            <div className="weatherTodayText">
                                Aktuell: 8 Grad<br/>
                                Min: 7 Grad<br/>
                                Max: 9 Grad<br/><br/>
                                
                                Überwiegend bewölkt<br/>
                                Wolken: 75 %
                            </div>
                        </div>

                    </div>
                </div>

                <div className="dayBoxBorder"></div>
            </Fragment>
        );
    }
}

export default WeatherToday;