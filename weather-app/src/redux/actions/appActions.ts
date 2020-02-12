//import { RequestApi } from '../../requestApi/requestApi';
import types from './types';

export function setLanguage( lang:string ) {
    return (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_LANG,
            payload: {
                language: lang,
            }
        });
    };
}
