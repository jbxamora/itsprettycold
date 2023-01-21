# itsprettycold

A basic weather application that takes in user input and displays weather information about the city they input. This app displays the weather for the current time in their city and also a five day forecast which includes temperature, wind speed, and humidity. 

*NOTE* THIS APP IS INCOMPLETE WILL RETURN TO FIX UNDERLYING BUGS
- I ADDED A CLEAR LOCALSTORAGE CALL AT THE END IN ORDER TO AVOID THE ARRAYS FILLING UP
- THE AUTO COMPLETE FEATURE IS BROKEN ATM
- MY BUTTONS DONT DO WHAT THEY WERE DESIGNED TO DO
- NEED TO FIX MY API CALL STRUCTURE

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Installation

No Install Needed. You can access the webpage through the link below.

https://jbxamora.github.io/itsprettycold/

![Picture of Deployed App](./images/weatherapp.mov)

## Code Snippets

### API Call || Gather Data for 5 Day Forecast || Append 

```js
function fiveDay(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey;
  $("#five-day-forecast").empty();
  // $("").show();
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

  var data = response.list;
    for (var i = 0; i < data.length; i += 8) {
      var TempNum = parseInt((data[i].main.temp - 273.15)* 9/ 5 + 32);
      var windSpeed = data[i].wind.speed;
      var humidity = data[i].main.humidity;
      var date = new Date(data[i].dt * 1000);
      var iconUrl = `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;
      var $cardEl = $("<div>").addClass("card bg-dark text-white border-white col-xl ");
      var $cardTitle = $("<h5>")
        .addClass("card-title")
        .text(date.toLocaleDateString());
      var $cardBody = $("<div>").addClass("card-body ");
      var $fiveDayIcon = $("<img>")
        .attr("src", iconUrl)
        .attr("alt", "weather condition icon");

      var $fiveDayTemp = $("<li>").text("Temperature: " + TempNum + " °F");
      var $fiveDayWind = $("<li>").text("Wind: " + windSpeed + " MPH");
      var $fiveDayHumid = $("<li>").text("Humidity: " + humidity + " %");
      var $fiveDayList = $("<ul>").addClass("card-text-list-unstyled").append($fiveDayTemp, $fiveDayWind, $fiveDayHumid);
      $cardBody.append($fiveDayIcon, $fiveDayTemp, $fiveDayWind, $fiveDayHumid);
      $cardEl.append( $cardTitle, $cardBody)
      $("#five-day-forecast").append($cardEl)
    };
  });
}
```

### Render Cities Function

```js
function rendercities() {
  cityList.empty();
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var li = $("<li>").text(city);
    li.attr("id", "city-list");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    li.on("click", function() {
        getResponseWeather($(this).attr("data-city"))
        fiveDay($(this).attr("data-city"))
    });
    cityList.append(li);
  }

  if (!cities[0]) {
    return;
  } else {
    getResponseWeather(cities[0]);
    fiveDay(city);
  }
}

```

## License

MIT License

Copyright (c) [2022] [Jorge Zamora]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

<a href=”https://www.linkedin.com/in/jorge-zamora-786945250/”>
<img src='https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue'>

![badmath](https://img.shields.io/github/followers/jbxamora?label=JBXAMORA&logoColor=%23fd2423&style=social)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. If the issue goes unresolved for more than a week feel free to contact me at any of the links listed below. Be sure to add me on LinkedIn and Follow me on GitHub to view my course progression. You can also visit the deployed site and sent a messafe through the contact form.

[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/jbxamora) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' alt='linkedin' height='40'>](https://www.linkedin.com/in/jorge-zamora-786945250//) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg' alt='instagram' height='40'>](https://www.instagram.com/jbxamora/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg' alt='stackoverflow' height='40'>](https://stackoverflow.com/users/20023706/jbxamora)
