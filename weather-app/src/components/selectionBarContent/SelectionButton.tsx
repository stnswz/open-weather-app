import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
//import { loadWeatherData } from "../redux/actions/weatherActions";

interface IState {
    /* empty state */
}
interface IProps {
    selectionIndex:number;
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
class SelectionButton extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        const buttonClass:string = this.props.selectionIndex === 0 ? "selectionButtonSelected" : "selectionButton"

        return (
            <div className={buttonClass}>
                <div className="selTop">
                    So 09.02
                </div>
                <div className="selBottom">
                    <div className="selLeft">
                        <img className="icon" src="http://openweathermap.org/img/wn/03d@2x.png" />
                    </div>
                    <div className="selRight">
                        6&deg; - 8&deg;
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectionButton;