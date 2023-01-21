var cities = JSON.parse(localStorage.getItem(cities)) || [];
var cityList = $("city-list");
var apiKey = "9b20705e8e67b82df7a517c339a67387";

function formatDate() {
    return moment().format("MMM Do YYY")
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    
}

function rendercities() {
    cityList.empty();
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = $("<li>").text(city);
        li.attr("id", "listC");
        li.attr("data-city", city);
        li.attr("class", "list-group-item");
        cityList.append(li);
    }
    
    if (!cities[0]) {
        return
    }
    else {
        getResponseWeather(cities[0])
    };
}

function getResponseWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    $("#today-weather").empty();
    $("").show();
    $.ajax({
        url: queryURL.
        method:"GET"
    }).then(function(response) {
        var TempNum = parseInt((response.main.temp)* 9/5 - 459);
    })
}