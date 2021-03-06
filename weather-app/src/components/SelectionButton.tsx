import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { IDayData } from "../app/definitions/IDayData";
import { IDayPeriod } from "../app/definitions/IDayPeriod";
import { setSelectedIndex } from "../redux/actions/weatherActions";

interface IState {
    hasMounted:boolean,
}
interface IProps {
    dayData?:IDayData,
    selectedIndex?:number,
    index:number,
    setSelectedIndex?: Function;
}

const reduxStore = (store:any) => ({
    selectedIndex: store.weatherState.selectedIndex,
});
const actions = (dispatch:any) => ({
    setSelectedIndex: (index:number) => { dispatch( setSelectedIndex(index) ) },
});

@(connect(reduxStore, actions) as any)
class SelectionButton extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            hasMounted: false,
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    public componentDidMount() {
        setTimeout( () => this.setState({hasMounted: true}), 250 );
    }

    private onButtonClick( ev:any ) {
        if(this.props.setSelectedIndex) {
            this.props.setSelectedIndex( this.props.index );
        }
    }

    public render(): ReactElement {

        let buttonClass:string = this.props.index === this.props.selectedIndex ? "selectionButtonSelected" : "selectionButton" 
        if( !this.state.hasMounted && this.props.index !== this.props.selectedIndex ) {
            buttonClass = "selectionButtonAnimated";
        }

        if( this.props.dayData ) {

            const dayPeriods:Array<IDayPeriod> =  this.props.dayData.dayPeriods;
            let periodItem:IDayPeriod;

            // Determine the weather icon thats shown in the SelectionButton. 
            // Ideally we use the icon for noon/afternoon
            if( this.props.index === 0 ) {
                if( dayPeriods.length > 1 ) {
                    periodItem = dayPeriods[ dayPeriods.length-2 ];
                }
                else periodItem = dayPeriods[0];
            }
            else {
                // We use the weather icon shown for noon/afternoon
                periodItem = dayPeriods[2];
            }
            const iconURL:string = periodItem.icon1URL;

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