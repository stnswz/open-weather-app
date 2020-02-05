interface IAppConfig {
    HOST:string,
    API_KEY:string,
    ICON_URL:string,
}

export const AppConfig:IAppConfig = {
    HOST: "http://api.openweathermap.org/data/2.5/forecast",
    API_KEY: "ca58313c1aca8a7d3f65508931f39677", // Get your own API key on https://openweathermap.org/guide#how
    ICON_URL: "http://openweathermap.org/img/wn/",
}