import React, { Component, ReactElement, Fragment } from "react";

interface IState {
    /** empty state */
}
interface IProps {
    /** empty props */
}

class WeatherForecast extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

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
    }
}

export default WeatherForecast;