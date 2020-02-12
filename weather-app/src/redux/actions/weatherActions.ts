//import { RequestApi } from '../../requestApi/requestApi';
import types from './types';
import {RequestApi} from "../../requestApi/requestApi";
import {IDayData} from "../../components/definitions/IDayData";
import {getForecastData} from "../../utils/parseFunctions";

export function loadWeatherData(city:string) {

    return async (dispatch:any, getState:any) => {

        dispatch({
            type: types.WEATHER_DATA_LOADING,
        });

        try {
            // Alles Ok:  {"cod":"200","message":0, "cnt":40}
            // City nicht gefunden:  {"cod":"404","message":"city not found"}
            // City nicht angegeben: {"cod":"400","message":"Nothing to geocode"}

            const data:any    = await RequestApi.getWeatherData( city );
            const code:string = data.cod as string;
            let responseMessage:string = "";
            let forcastData: Array<IDayData> = new Array<IDayData>();
            let castCity: string = "";
            let country: string  = "";

            if( code === "200" ) {
                forcastData = getForecastData( data );
                castCity = forcastData[0].city;
                country = forcastData[0].country;
            }
            else if( code === "400" || code === "404" ) {
                responseMessage = "Zur Sucheingabe konnte nichts gefunden werden.";
            }
            else {
                responseMessage = "Code "+data.cod+": " + data.message;
            }

            dispatch({
                type: types.WEATHER_DATA_LOADED,
                payload: {
                    forecastData: forcastData,
                    city: castCity,
                    country: country,
                    responseMessage: responseMessage,
                }
            });
        }
        catch( e ) {
            console.log(e.message + " " + e.code);
            dispatch({
                type: types.LOADING_ERROR,
                payload: {
                    errorCode: e.code,
                    errorMessage: e.message,
                }
            });
        }
    };
}

export function setSelectedIndex(index:number) {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_SELECTED_INDEX,
            payload: {
                index: index,
            }
        });
    };
}

export function startPreloading() {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.PRELOADING_START,
        });
    };
}
