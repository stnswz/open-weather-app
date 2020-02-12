import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { loadWeatherData, startPreloading } from "../redux/actions/weatherActions";

interface IState {
    inputValue:string;
}
interface IProps {
    weatherLoading?: boolean,
    loadingError?: boolean;
    loadWeatherData?: Function;
    startPreloading?: Function;
}

const reduxStore = (store:any) => ({
    weatherLoading: store.weatherState.weatherLoading,
    loadingError: store.weatherState.loadingError,
});
const actions = (dispatch:any) => ({
    startPreloading: () => { dispatch( startPreloading() ) },
    loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(reduxStore, actions) as any)
class InputBar extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            inputValue: "",
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.onLangButtonClick = this.onLangButtonClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
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

    private onSearchButtonClick( ev:any ) {
        this.loadWeatherData();
    }

    private onLangButtonClick( ev:any ) {
        if( ev.target.id === "de") {

        }
        else if( ev.target.id === "en") {

        }
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
                <div id="button" onClick={this.onSearchButtonClick}></div>
                {/*
                <div id="langBox">
                    <div id="de" onClick={this.onLangButtonClick} className="langSelected">DE</div>
                    <div id="en" onClick={this.onLangButtonClick} className="lang">EN</div>
                </div> 
                */}
            </div>
        );
    }
}

export default InputBar;