import React, { ReactElement } from "react";
import {IDayPeriod} from "./../definitions/IDayPeriod";

interface IProps {
    dayPeriod: IDayPeriod,
}

function DayPeriodBox(props:IProps): ReactElement {

    const isDayTime:boolean = props.dayPeriod.isDayTime;
    const isDayAndNightTime:boolean = props.dayPeriod.isDayAndNightTime;
    const boxClassName:string = isDayTime ||  isDayAndNightTime ? "hourBox" : "hourBoxNight";


    return (
        <div className="hourBoxWrap">
            <div className={boxClassName}>
                <div className="hourImage">
                    <img className="icon" alt="" src={props.dayPeriod.icon1URL} /><br/>
                    {props.dayPeriod.icon2URL ? <img className="icon2" alt="" src={props.dayPeriod.icon2URL} /> : ""}
                </div>
                <div className="hourOutput">
                    <strong className="time">{props.dayPeriod.dayTime}</strong><br/><br/>
                    {props.dayPeriod.temperature}<br/>
                    {props.dayPeriod.description}<br/>
                    Wolken: {props.dayPeriod.clouds}
                </div>
            </div>
        </div>
    );

}

export default DayPeriodBox;