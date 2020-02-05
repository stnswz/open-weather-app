interface IAppConfig {
    HOST:string,
    APPID:string,
    ICON_URL:string,
}

export const AppConfig:IAppConfig = {
    HOST: "http://api.openweathermap.org/data/2.5/forecast",
    APPID: "ca58313c1aca8a7d3f65508931f39677",
    ICON_URL: "http://openweathermap.org/img/wn/",
}