import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import SelectionButton from "./selectionBarContent/SelectionButton";
//import { loadWeatherData } from "../redux/actions/weatherActions";

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
class SelectionBar extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        return (
            <div id="selectionBar">
                <SelectionButton selectionIndex={0} />
                <SelectionButton selectionIndex={1} />
                <SelectionButton selectionIndex={2} />
                <SelectionButton selectionIndex={3} />
                <SelectionButton selectionIndex={4} />
            </div>
        );
    }
}

export default SelectionBar;