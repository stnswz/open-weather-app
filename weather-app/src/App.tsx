import React, { Component, ReactElement } from "react";
import InpuBar from "./components/InputBar";
import WeatherContent from "./components/WeatherContent";
import './css/App.css';

class App extends Component {

    public render(): ReactElement {

        return (
            <div id="mainContent">
                <div id="innerColumn">
                    <div id="innerContent">
                        <InpuBar/>
                        <WeatherContent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
