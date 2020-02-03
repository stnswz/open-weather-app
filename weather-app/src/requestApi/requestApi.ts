export class RequestApi {

    private static HOST: string  = "http://api.openweathermap.org/data/2.5/forecast";
    private static APPID: String = "ca58313c1aca8a7d3f65508931f39677";

    public static getWeatherData( city:string, lang:string = "de" ) {
        const url: string = this.HOST + "?q="+city+"&units=metric&lang="+lang+"&APPID="+this.APPID;
        return this.request( url, 'GET' );
    }

    private static async request(url:string, method:string) {

        const response:any = await fetch(url, { method:method });

        if( response.status === 200 ) {
            const { data } = await response.json();
            return data;
        } 
        else {
            throw Object.assign( new Error("Loading Error"), {code: response.status} );
        }
    }
}