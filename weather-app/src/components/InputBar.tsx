import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { loadWeatherData } from "../redux/actions/weatherActions";

interface IState {
    inputValue:string;
}
interface IProps {
    weatherLoading?: boolean,
    loadingError?: boolean;
    loadWeatherData?: Function;
}

const state = (store:any) => ({
    weatherLoading: store.weatherState.weatherLoading,
    loadingError: store.weatherState.loadingError,
});
const operations = (dispatch:any) => ({
    loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(state, operations) as any)
class InputBar extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            inputValue: "",
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    private onTextChange( ev:any ) {
        this.setState({inputValue:ev.value});
    }

    private onButtonClick( ev:any ) {
        alert("button click");
    }

    public render(): ReactElement {

        return (
            <div id="inputBar">
                <input id="textInput" onChange={this.onTextChange} type="text" value={this.state.inputValue} placeholder="Das Wetter in..."/> 
                <div id="button" onClick={this.onButtonClick}>Anzeigen</div>
            </div>
        );
    }
}

export default InputBar;