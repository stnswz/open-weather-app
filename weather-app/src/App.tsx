import React, { Component, ReactElement } from "react";
import InpuBar from "./components/InputBar";
import SelectionBar from "./components/SelectionBar";
import WeatherContent from "./components/WeatherContent";
import './css/App.css';

class App extends Component {

    public render(): ReactElement {

        return (
            <div id="mainContent">
                <div id="innerColumn">
                    <div id="innerContent">

                        <div id="topContainer">
                            <InpuBar/>
                            <SelectionBar/>
                        </div>

                        <div id="contentContainer">
                            <WeatherContent/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
