import types from './types';
import {RequestApi} from "../../requestApi/requestApi";
import {IDayData} from "../../components/definitions/IDayData";
import {getForecastData} from "../../utils/parseFunctions";
import {LangService} from "./../../lang/LangService";

export function loadWeatherData(city:string) {

    return async (dispatch:any, getState:any) => {

        dispatch({
            type: types.WEATHER_DATA_LOADING,
        });

        try {
            // Ok:  {"cod":"200","message":0, "cnt":40}
            // City not found:  {"cod":"404","message":"city not found"}
            // City no city was given: {"cod":"400","message":"Nothing to geocode"}

            const language:string = LangService.getLang();
            const langObj:any     = LangService.getLangObject();
            const data:any    = await RequestApi.getWeatherData( city, language.toLowerCase() );
            const code:string = data.cod as string;
            let responseMessage:string = "";
            let forecastData: Array<IDayData> = new Array<IDayData>();
            let forecastCity: string = "";
            let country: string  = "";

            if( code === "200" ) {
                forecastData = getForecastData( data );
                forecastCity = forecastData[0].city;
                country = forecastData[0].country;
            }
            else if( code === "400" || code === "404" ) {
                responseMessage = langObj.NOTHING_FOUND;
            }
            else {
                responseMessage = "Code "+data.cod+": " + data.message;
            }

            dispatch({
                type: types.WEATHER_DATA_LOADED,
                payload: {
                    forecastData: forecastData,
                    forecastCity: forecastCity,
                    searchedCity: city,
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
