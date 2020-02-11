import React, { Component, ReactElement } from "react";
import InpuBar from "./components/InputBar";
import SelectionBar from "./components/SelectionBar";
import WeatherContent from "./components/WeatherContent";
import './css/App.css';


interface IState {
    height: number,
}
interface IProps {
    /** empty */
}

class App extends Component<IProps, IState>  {

    constructor(props:IProps) {
        super(props);
        this.state = {
            height: 0,
        }
    }

    public componentDidMount() {
        window.addEventListener('resize', (ev:any) => this.setState({height: window.innerHeight}) );
    }

    public render(): ReactElement {

        let heightStyle = this.state.height !== 0 ? {height:this.state.height+"px"} : {};

        return (
            <div id="mainContent" style={heightStyle}>
                <div id="innerColumn">
                    <div id="innerContent">

                        <div id="topContainer">
                            <InpuBar/>
                            <SelectionBar/>
                        </div>

                        <WeatherContent/>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
