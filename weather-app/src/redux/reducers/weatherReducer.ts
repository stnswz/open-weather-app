import types from './../constants';
import {ICurrentWeatherData} from "../../components/definitions/ICurrentWeatherData";
import {IFullDayData} from "../../components/definitions/IFullDayData";

interface IWeatherState {
    dataIsLoading: boolean,
    currentWeatherData: ICurrentWeatherData,
    forecastData: Array<IFullDayData>,
    loadingError: boolean,
    errorCode: string,
}

const initialState:IWeatherState = {
    dataIsLoading: false,
    loadingError: false,
    errorCode: "",
    currentWeatherData: undefined!,
    forecastData: new Array<IFullDayData>(),
}

const reducer = (state:IWeatherState = initialState, action:any) => {
    switch (action.type) {
        case types.WEATHER_DATA_LOADING:
            return { ...state, dataIsLoading: true, loadingError: false, errorCode: "" }
        case types.WEATHER_DATA_LOADED:
            return { ...state, 
                    dataIsLoading: false, 
                    loadingError: false, 
                    errorCode: "",
                    currentWeatherData: action.payload.currentWeatherData,
                    forecastData: action.payload.forecastData,
            }
        case types.LOADING_ERROR:
            return { ...state, dataIsLoading: false, loadingError: true, errorCode: action.payload.errorCode }
        default:
            return state;
    }
}
export default reducer;