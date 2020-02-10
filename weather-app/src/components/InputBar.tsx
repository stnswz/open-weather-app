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

        this.onTextChange  = this.onTextChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onKeyPress    = this.onKeyPress.bind(this);
        this.loadWeatherData = this.loadWeatherData.bind(this);
    }

    private onTextChange( ev:any ) {
        this.setState({inputValue:ev.target.value});
    }

    private onKeyPress( ev:any ) {
        if( ev.key === "Enter") {
            this.loadWeatherData();
        }
    }

    private onButtonClick( ev:any ) {
        this.loadWeatherData();
    }

    private loadWeatherData() {
        if( this.props.loadWeatherData && this.state.inputValue ) {
            this.props.loadWeatherData( this.state.inputValue );
        }
    }

    public render(): ReactElement {

        return (
            <div id="inputBar">
                <input id="textInput" onKeyPress={this.onKeyPress} onChange={this.onTextChange} type="text" value={this.state.inputValue} placeholder="Suche nach Ort..."/> 
                <div id="button" onClick={this.onButtonClick}></div>
            </div>
        );
    }
}

export default InputBar;