
async function getWeather() {
    const city = document.getElementById("textInput").value;

    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&lang=de&APPID=ca58313c1aca8a7d3f65508931f39677");
    const data = await response.json();

    const title  = document.getElementById("title");
    const output = document.getElementById("output");

    const iconSource = getIconSource(data);
    const text       = getWeatherText( data );
    
    title.innerHTML  = "Das aktuelle Wetter für " + data.name;
    output.innerHTML = text;

    document.getElementById("icon").src = iconSource;
}

async function test() {
    testRequest().then((json) => {
        console.dir(json);
    });
}

async function testRequest() {
    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=berlin&units=metric&lang=de&APPID=ca58313c1aca8a7d3f65508931f39677");
    const json = await response.json();
    return json;
}

/*function sendRequest( city ) {
    const url = "http://api.openweathermap.org/data/2.5/weather?q=berlin&units=metric&lang=de&APPID=ca58313c1aca8a7d3f65508931f39677"
    const response = await fetch(url);
    console.dir(response.json());

    if( response.status === 200 ) {
        const { data } = await response.json();
        return data;
    } 
    else {
        //throw Object.assign( new Error("Loading Error"), {code: response.status} );
        alert("Error: status for request: " + response.status);
    }
}*/