//import { RequestApi } from '../../requestApi/requestApi';
import types from './../constants';
import {RequestApi} from "../../requestApi/requestApi";
import {ICurrentWeatherData} from "../../components/definitions/ICurrentWeatherData";
import {IFullDayData} from "../../components/definitions/IFullDayData";
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
            //const currentWeatherData:ICurrentWeatherData = getCurrentWeatherData( data );
            const forcastData: Array<IFullDayData> = getForecastData( data );

            dispatch({
                type: types.WEATHER_DATA_LOADED,
                payload: {
                    currentWeatherData: undefined,
                    forecastData: forcastData,
                }
            });
        }
        catch( e ) {
            console.log(e.message + " " + e.code);
            dispatch({
                type: types.LOADING_ERROR,
            });
        }
    };
}
