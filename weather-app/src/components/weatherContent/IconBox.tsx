import React, { Component, ReactElement, Fragment } from "react";
import { connect } from 'react-redux';

interface IState {
    /* empty state */
}
interface IProps {
    icon1URL: string,
    icon2URL: string,
}

const state = (store:any) => ({
    //loadingError: store.weatherState.loadingError,
});
const operations = (dispatch:any) => ({
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(state, operations) as any)
class IconBox extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): ReactElement {

        const className = this.props.icon2URL ? "iconX2" : "iconBig";
        let icons: ReactElement = <img className={className} alt="" src={this.props.icon1URL} />;
        if( this.props.icon2URL ) {
            icons = <Fragment>
                        <img className={className} alt="" src={this.props.icon1URL} />
                        <img className={className} alt="" src={this.props.icon2URL} />
                    </Fragment>;
        }

        return (
            <div className="iconBox">
                {icons}
            </div>
        );
    }
}

export default IconBox;