//import { RequestApi } from '../../requestApi/requestApi';
import types from './../constants';
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

            const data:any = await RequestApi.getWeatherData( city );
            const forcastData: Array<IDayData> = getForecastData( data );

            dispatch({
                type: types.WEATHER_DATA_LOADED,
                payload: {
                    forecastData: forcastData,
                    city: forcastData[0].city,
                    country: forcastData[0].country,
                }
            });
        }
        catch( e ) {
            console.log(e.message + " " + e.code);
            dispatch({
                type: types.LOADING_ERROR,
                payload: {
                    errorCode: e.message,
                    errorMessage: e.code,
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
