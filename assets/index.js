var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("city-list");
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
    li.attr("id", "listC");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    cityList.append(li);
  }

  if (!cities[0]) {
    return;
  } else {
    getResponseWeather(cities[0]);
  }
}

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
    response.list.slice(7, 41, 8).forEach(({ dt, weather, main }) => {
      const date = new Date(dt * 1000);
      const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const $cardEl = $("<div>").addClass("card col-xl 2 mx4");
      const $cardTitle = $("<h5>")
        .addClass("card-title")
        .text(date.toLocaleDateString("default"));
      const $cardBody = $("<div>").addClass("card-body");
      const $fiveDayIcon = $("<img>")
        .attr("src", iconUrl)
        .attr("alt", "weather condition icon");

      const $fiveDayTemp = $("<li>").text("Temperature: " + TempNum + " °F");
      const $fiveDayWind = $("<li>").text("Wind: " + windSpeed + " MPH");
      const $fiveDayHumid = $("<li>").text("Humidity: " + humidity + " %");
      const $fiveDayList = $("<ul>").addClass("card-text-list-unstyled").append($fiveDayTemp, $fiveDayWind, $fiveDayHumid);
      $cardTitle.append($fiveDayIcon);
      $cardBody.append($cardTitle, $fiveDayList);
      $cardEl.append($cardBody)
      $("card-container").append($cardEl)
    });
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
  });
});
