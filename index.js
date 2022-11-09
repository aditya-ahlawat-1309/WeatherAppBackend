const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "8a7b579b2234232325cbd1702285bc1c";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherDataString = JSON.parse(data);
      const temperature = weatherDataString.main.temp;
      const weatherDescription = weatherDataString.weather[0].description;
      console.log(temperature + " " + weatherDescription);

      const icon = weatherDataString.weather[0].icon;
      res.send(
          temperature
      );
    });
  });
});


app.listen(8000, function () {
  console.log("Server has Started at 8000");
});
