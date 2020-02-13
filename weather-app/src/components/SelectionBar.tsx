import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import SelectionButton from "./SelectionButton";
import {IDayData} from "../app/definitions/IDayData";

interface IState {
    /* empty */
}
interface IProps {
    forecastData?: Array<IDayData>,
}

const reduxStore = (store:any) => ({
    forecastData: store.weatherState.forecastData,
});
const actions = (dispatch:any) => ({

});

@(connect(reduxStore, actions) as any)
class SelectionBar extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    private getDefaultButtons():Array<ReactElement> {
        const buttons: Array<ReactElement> = new Array<ReactElement>();
        for( let i=0; i<5; i++ ) {
            const button:ReactElement = <SelectionButton key={i} dayData={null!} index={i} />
            buttons.push(button);
        }
        return buttons; 
    }

    public render(): ReactElement {

        const forecastData: Array<IDayData> = this.props.forecastData || new Array<IDayData>();
        const numberForecastDays:number = forecastData.length;

        return (
            <div id="selectionBar">
                {
                    numberForecastDays ? 
                    forecastData.map( (dayData, index) => <SelectionButton key={dayData.date+index} dayData={dayData} index={index} /> ) : 
                    this.getDefaultButtons()
                }
            </div>
        );
    }
}

export default SelectionBar;