function getWeatherText(data) {
    const text = "Aktuell: " + Math.round(data.main.temp) + " Grad<br>" +
                 "Min: " + Math.round(data.main.temp_min) + " Grad<br>" +
                 "Max: " + Math.round(data.main.temp_max) + " Grad<br><br>" +
                 data.weather[0].description + "<br>" +
                 "Wolken: " + data.clouds.all + " %<br><br>";

    return text;
}

function getIconSource(data) {
    const icon = data.weather[0].icon;
    return "http://openweathermap.org/img/wn/"+icon+"@2x.png";
}