var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("#city-list");
var apiKey = "9b20705e8e67b82df7a517c339a67387";

function formatDate() {
  return moment().format("MMM Do YYYY");
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

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

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#city-input").val().trim();
    cities.push(cityName);
    storeCities();
    rendercities();
    getResponseWeather(cityName);
    fiveDay(cityName);
});

$("#search-btn").on("click", function() {
    var city = $("#city-input").val();
    if(cities.indexOf(city) === -1) {
        cities.push(city);
        storeCities();
        rendercities();
    }
});

function getResponseWeather(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;
  $("#today-weather").empty();
  // $("").show();
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var TempNum = parseInt((response.main.temp * 9) / 5 - 459);
    var cityTitle = $("<h3>").text(response.name + " " + formatDate());
    $("#today-weather").append(cityTitle);
    var cityTemp = $("<p>").text("Temperature : " + TempNum + " °F");
    $("#today-weather").append(cityTemp);
    var Humidity = $("<p>").text("Humidity : " + response.main.humidity + " %");
    $("#today-weather").append(Humidity);
    var windSpeed = $("<p>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
    $("#today-weather").append(windSpeed);
    // $("").hide();
  });
}

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

$(document).ready(function () {
  rendercities();
  $("#city-input").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=",
        dataType: "json",
        data: {
          q: request.term,
          appid: apiKey,
          type: "like",
        },
        success: function (data) {
          response(
            data.list.map(function (item) {
              return {
                label: item.name + ", " + item.sys.country,
                value: item.name,
              };
            })
          );
        },
      });
    },
    minLength: 2,
    select: function(event, ui) {
      var city = ui.item.value;
      if (city === "") {
          return;
      }
      cities.push(city);
      storeCities();
      rendercities();
      fiveDay();
    }
  });
  
  $("#add-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    if (city === "") {
      return;
    }
    cities.push(city);
    storeCities();
    rendercities();
    fiveDay();
    localStorage.clear();
  });
});
