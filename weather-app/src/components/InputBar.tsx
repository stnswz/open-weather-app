import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { loadWeatherData, startPreloading } from "./../redux/actions/weatherActions";
import { setLanguage } from "./../redux/actions/appActions";
import {LangService} from "./../lang/LangService";
import {lang} from "./../constants/lang";

interface IState {
    inputValue:string;
}
interface IProps {
    dataIsLoading?: boolean,
    loadingError?: boolean,
    language?: string,
    loadWeatherData?: Function,
    startPreloading?: Function,
    setLanguage?: Function,
}

const reduxStore = (store:any) => ({
    dataIsLoading: store.weatherState.dataIsLoading,
    loadingError: store.weatherState.loadingError,
    language: store.appState.language,
});
const actions = (dispatch:any) => ({
    startPreloading: () => { dispatch( startPreloading() ) },
    loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
    setLanguage: (lang:string) => { dispatch( setLanguage(lang) ) },
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
        let selectedLang:string = "";
        if( ev.target.id === "de") {
            selectedLang = lang.DE;
        }
        else if( ev.target.id === "en") {
            selectedLang = lang.EN;
        }
        if( selectedLang !== this.props.language && this.props.setLanguage && !this.props.dataIsLoading ) {
            this.props.setLanguage(selectedLang);
        }
    }

    private loadWeatherData() {
        if( this.props.loadWeatherData && this.state.inputValue ) {
            this.props.loadWeatherData( this.state.inputValue );
        }
    }

    public render(): ReactElement {
        
        const classNameDE:string = this.props.language === lang.DE ? "langSelected" : "lang";
        const classNameEN:string = this.props.language === lang.EN ? "langSelected" : "lang";
        const langObj:any = LangService.getLangObject();

        return (
            <div id="inputBar">
                <input id="textInput" 
                       onKeyPress={this.onKeyPress} 
                       onChange={this.onTextChange} 
                       type="text" 
                       value={this.state.inputValue} 
                       placeholder={langObj.INPUT_SEARCHTEXT}
                /> 
                <div id="button" onClick={this.onSearchButtonClick}></div>
                <div id="langBox">
                    <div id="de" onClick={this.onLangButtonClick} className={classNameDE}>DE</div>
                    <div id="en" onClick={this.onLangButtonClick} className={classNameEN}>EN</div>
                </div> 
            </div>
        );
    }
}

export default InputBar;