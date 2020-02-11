import React, { ReactElement, Fragment } from "react";

interface IProps {
    icon1URL: string,
    icon2URL: string,
}

function IconBox(props:IProps): ReactElement {

    const className = props.icon2URL ? "iconX2" : "iconBig";
    let icons: ReactElement = <img className={className} alt="" src={props.icon1URL} />;
    
    if( props.icon2URL ) {
        icons = <Fragment>
                    <img className={className} alt="" src={props.icon1URL} />
                    <img className={className} alt="" src={props.icon2URL} />
                </Fragment>;
    }

    return (
        <div className="iconBox">
            {icons}
        </div>
    );
    
}

export default IconBox;