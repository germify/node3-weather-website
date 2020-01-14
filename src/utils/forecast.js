const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/afd6a00cb27c0c5d872ab04565e3aae4/' +
    encodeURIComponent(longitude) +
    ',' +
    encodeURIComponent(latitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location!');
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} 
        The high today is ${body.daily.data[0].temperatureMax} and the low today is ${body.daily.data[0].temperatureMin}.
        It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
