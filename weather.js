const url = 'https://localhost:5001/WeatherForecast';

function getWeatherXMLRequest(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = () => {
        let responseJsonArray = JSON.parse(request.response);

        addWeatherDataToList(responseJsonArray);

        console.log(request.response);
    }
}

async function getWeatherFetch(url) {
    const response = await fetch(url);

    const responseJsonArray = await response.json();

    addWeatherDataToList(responseJsonArray);

    console.log(responseJsonArray);
}

function addWeatherDataToList(jsonArray) {
    jsonArray.forEach(element => {
        let childElement = document.createElement("p");

        childElement.className = "border rounded bg-success text-white p-2";

        childElement.innerText = "date: " + element.date
            + "\ntemperatureC: " + element.temperatureC
            + "\ntemperatureF: " + element.temperatureF
            + "\nsummary: " + element.summary;

        document.getElementById("container").appendChild(childElement);
    });
}

getWeatherFetch(url);
