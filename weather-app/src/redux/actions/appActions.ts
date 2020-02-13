import types from './types';
import {loadWeatherData} from "./weatherActions";

export function setLanguage( lang:string ) {
    return async (dispatch:any, getState:any) => {

        const weatherState:any = getState().weatherState;

        dispatch({
            type: types.SET_LANG,
            payload: {
                language: lang,
            }
        });

        if( weatherState.searchedCity ) {
            await loadWeatherData( weatherState.searchedCity, true )(dispatch, getState);
        }
    };
}
