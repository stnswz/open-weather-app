import types from '../actions/types';
import {IDayData} from "../../app/definitions/IDayData";

interface IWeatherState {
    dataIsLoading: boolean,
    preloadingStart: boolean,
    forecastData: Array<IDayData>,
    country: string,
    forecastCity: string,
    searchedCity: string,
    selectedIndex:number,
    loadingError: boolean,
    errorCode: string,
    errorMessage: string,
    responseMessage: string,
}

const initialState:IWeatherState = {
    dataIsLoading: false,
    preloadingStart: false,
    loadingError: false,
    selectedIndex: 0,
    country: "",
    forecastCity: "",
    searchedCity: "",
    errorCode: "",
    errorMessage: "",
    responseMessage: "",
    forecastData: new Array<IDayData>(),
}

const reducer = (state:IWeatherState = initialState, action:any) => {
    switch (action.type) {
        case types.WEATHER_DATA_LOADING:
            return { ...initialState, selectedIndex: state.selectedIndex, dataIsLoading: true, preloadingStart: false}
        case types.PRELOADING_START:
            return { ...initialState, preloadingStart: true, dataIsLoading: false}
        case types.WEATHER_DATA_LOADED: 
            return { ...state, 
                    dataIsLoading: false, 
                    loadingError: false, 
                    errorCode: "",
                    selectedIndex: action.payload.selectedIndex,
                    forecastData: action.payload.forecastData,
                    forecastCity: action.payload.forecastCity,
                    searchedCity: action.payload.searchedCity,
                    country: action.payload.country,
                    responseMessage: action.payload.responseMessage,
            }
        case types.LOADING_ERROR:
            return { ...initialState, 
                    loadingError: true, 
                    errorCode: action.payload.errorCode, 
                    errorMessage: action.payload.errorMessage,
            }
        case types.SET_SELECTED_INDEX:
            return { ...state, selectedIndex: action.payload.index,
            }
        default:
            return state;
    }
}
export default reducer;