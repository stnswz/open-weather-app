import types from './../actions/types/';
import {lang} from '../../constants/lang';

interface IAppState {
    language:string,
}

const initialState:IAppState = {
    language: lang.DE,
}

const reducer = (state:IAppState = initialState, action:any) => {
    switch (action.type) {
        case types.SET_LANG:
            return { ...initialState, language: action.payload.language}
        default:
            return state;
    }
}
export default reducer;