interface IAppConfig {
    HOST:string,
    API_KEY:string,
    ICON_URL:string,
}

export const AppConfig:IAppConfig = {
    HOST: "https://api.openweathermap.org/data/2.5/forecast",
    API_KEY: "", // Get your own API key on https://openweathermap.org/guide#how
    ICON_URL: "./svg/",
}