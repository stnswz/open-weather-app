import {AppConfig} from "./../config/AppConfig"

export class RequestApi {

    public static getWeatherData( city:string, lang:string = "de" ) {
        const url: string = AppConfig.HOST + "?q="+city+"&units=metric&lang="+lang+"&APPID="+AppConfig.API_KEY;
        return this.request( url, 'GET' );
    }

    private static async request(url:string, method:string) {

        const response:any = await fetch(url, { method:method });

        if( response.status === 200 ) {
            //const { data } = await response.json();
            const data = await response.json();
            return data;
        } 
        else {
            throw Object.assign( new Error("Loading Error"), {code: response.status} );
        }
    }
}