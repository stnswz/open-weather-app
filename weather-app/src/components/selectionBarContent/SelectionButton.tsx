import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { IDayData } from "./../definitions/IDayData";
import { IDayPeriod } from "../definitions/IDayPeriod";
import { setSelectedIndex } from "./../../redux/actions/weatherActions";

interface IState {
    /* empty state */
}
interface IProps {
    dayData?:IDayData,
    selectedIndex?:number,
    index:number,
    setSelectedIndex?: Function;
}

const state = (store:any) => ({
    selectedIndex: store.weatherState.selectedIndex,
});
const operations = (dispatch:any) => ({
    setSelectedIndex: (index:number) => { dispatch( setSelectedIndex(index) ) },
});

@(connect(state, operations) as any)
class SelectionButton extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {}
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick( ev:any ) {
        if(this.props.setSelectedIndex) {
            this.props.setSelectedIndex( this.props.index );
        }
    }

    public render(): ReactElement {

        const buttonClass:string = this.props.index === this.props.selectedIndex ? "selectionButtonSelected" : "selectionButton"

        if( this.props.dayData ) {
            // We use the temperature and weather icon thats shown for noon/afternoon
            const noonPeriod:IDayPeriod = this.props.dayData.dayPeriods[2];
            const iconURL:string = noonPeriod.icon1URL;
            return (
                <div className={buttonClass} onClick={this.onButtonClick}>
                    <div className="selTop">
                        {this.props.dayData.dayShort}  {this.props.dayData.date}
                    </div>
                    <div className="selBottom">
                        <div className="selLeft">
                            <img className="icon" alt="" src={iconURL} />
                        </div>
                        <div className="selRight">
                            <strong>{this.props.dayData.tempMax}&deg;</strong> / {this.props.dayData.tempMin}&deg;
                        </div>
                    </div>
                </div>
            );
        }
        else return (
            <div className="selectionButtonDisabled" ></div>
        );
    }
}

export default SelectionButton;