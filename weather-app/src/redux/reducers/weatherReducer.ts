import types from './../constants';
import {IDayData} from "../../components/definitions/IDayData";

interface IWeatherState {
    dataIsLoading: boolean,
    forecastData: Array<IDayData>,
    country: string,
    city: string,
    selectedIndex:number,
    loadingError: boolean,
    errorCode: string,
    errorMessage: string,
    responseMessage: string,
}

const initialState:IWeatherState = {
    dataIsLoading: false,
    loadingError: false,
    selectedIndex: 0,
    country: "",
    city: "",
    errorCode: "",
    errorMessage: "",
    responseMessage: "",
    forecastData: new Array<IDayData>(),
}

const reducer = (state:IWeatherState = initialState, action:any) => {
    switch (action.type) {
        case types.WEATHER_DATA_LOADING:
            return { ...initialState, dataIsLoading: true}
        case types.WEATHER_DATA_LOADED:
            return { ...state, 
                    dataIsLoading: false, 
                    loadingError: false, 
                    errorCode: "",
                    selectedIndex: 0,
                    forecastData: action.payload.forecastData,
                    city: action.payload.city,
                    country: action.payload.country,
                    responseMessage: action.payload.responseMessage,
            }
        case types.LOADING_ERROR:
            return { ...state, 
                    dataIsLoading: false, 
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