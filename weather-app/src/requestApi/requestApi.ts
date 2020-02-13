import {AppConfig} from "../app/config/AppConfig"

export class RequestApi {

    public static getWeatherData( city:string, lang:string = "de" ) {
        const units:string = "metric"; //lang === "de" ? "metric" : "imperial";
        const url: string = AppConfig.HOST + "?q="+city+"&units="+units+"&lang="+lang+"&APPID="+AppConfig.API_KEY;
        return this.request( url, 'GET' );
    }

    private static async request(url:string, method:string) {

        const response:any = await fetch(url, { method:method });

        if( response.status === 200 ) {
            //const { data } = await response.json();
            const data = await response.json();
            return data;
        }
        else if( response.status === 400 || response.status === 404 ) {
            const data = await response.json();
            if( data && ((data.cod === "404" && data.message.toLowerCase() === "city not found") ||
                (data.cod === "400" && data.message.toLowerCase() === "nothing to geocode")) ) {
                return data;
            }
            else if( data && data.cod ) {
                throw Object.assign( new Error(data.message), {code: data.cod} );
            }
            else {
                throw Object.assign( new Error("Loading Error"), {code: response.status} );
            }
        }
        else {
            throw Object.assign( new Error("Loading Error"), {code: response.status} );
        }
    }
}