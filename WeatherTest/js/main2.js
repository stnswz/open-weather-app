
async function getWeather() {
    const city = document.getElementById("textInput").value;

    const response = await fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&lang=de&APPID=ca58313c1aca8a7d3f65508931f39677");
    //const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&lang=de&APPID=ca58313c1aca8a7d3f65508931f39677");
    
    const data = await response.json();
    //console.dir(data);

    const output = document.getElementById("output");
    //output.innerHTML = getTimeParts( data );

    const timeParts = getTimePartsByDay( data );
    const text = test( timeParts );
    output.innerHTML = text;

    //const output = document.getElementById("content2");
    //output.innerHTML = getTimePartWeatherBox( data );

    /*const title  = document.getElementById("title");
    const output = document.getElementById("output");

    const iconSource = getIconSource(data);
    const text       = getWeatherText( data );
    
    title.innerHTML  = "Das aktuelle Wetter für " + data.name;
    output.innerHTML = text;

    document.getElementById("icon").src = iconSource;*/
}

function test( timeParts ) {
    var output = "";
    for( let i=0; i<timeParts.length; i++ ) {
        const dayParts = timeParts[i];
        output += "<hr>";
        output += dayParts[0].date + "<br><br>";

        for( let b=0; b<dayParts.length; b++ ) {
            output += dayParts[b].hour + " Uhr: <br>";
            output += dayParts[b].description + "<br>";
            output += dayParts[b].temperatur + " Grad<br><br>";
        }
    }
    return output;
}

function getTimePartsByDay( data ) {
    var timeParts = new Array();
    var dayList   = new Array();
    var curDay = "";

    const fullList = data.list;
    for( let i=0; i<fullList.length; i++ ) {

        let listItem = fullList[i];
        let dt   = listItem.dt_txt;
        let date = new Date(dt);

        let day = date.getDate();
        let month = date.getMonth()+1;
        let year  = date.getFullYear();
        let hour  = date.getHours();
        let d = day + "." + month + "." + year; 

        if( i == 0 ) {
            curDay = day;
        }

        const timePartObj = {
            date: d,
            hour: hour,
            temperatur: Math.round(listItem.main.temp),
            description:  listItem.weather[0].description,
            clouds: listItem.clouds.all,
            icon: listItem.weather[0].icon
        }

        if( curDay !== day ) {
            // Day changed, we need a new dayList Array.
            timeParts.push(dayList);
            dayList   = new Array();
            curDay = day;
        }

        dayList.push(timePartObj);
    }
    return timeParts;
}

function getTimeParts( data ) {
    var timeParts = "";
    const arr = data.list;
    for( let i=0; i<arr.length; i++ ) {
        let dt   = arr[i].dt_txt;
        let date = new Date(dt);

        let day = date.getDate();
        let month = date.getMonth()+1;
        let hour  = date.getHours();

        timeParts += day + "." + month + ": Stunde " + hour + "<br>";
        //timeParts += dt + "<br>";

    }
    return timeParts;
}

function getTimePartWeatherBox( data ) {
    const html = '<h3 id="title" class="title">Das aktuelle Wetter für '+data.name+'</h3>' +
    '<div class="imagebox"><img id="icon" src="'+getIconSource(data)+'" /></div>' +
    '<div id="output" class="output">'+getWeatherText( data )+'</div>';

    return html;
}