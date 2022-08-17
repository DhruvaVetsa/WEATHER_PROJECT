const axios = require('axios').default;
const { generalErr } = require('./errContoller');

exports.getHome = (req, res, next) => {
    res.render('index', { pageTitle: 'Weather App', weatherData: null });
}

exports.postSearchClimate = (req, res, next) => {
    var city = req.body.city_name_TB;
    var api = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city + "?unitGroup=us&key=PZ83CLGNN93URM84K9YDC9T93&contentType=json";
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${req.body.city_name_TB}?unitGroup=us&key=PZ83CLGNN93URM84K9YDC9T93&contentType=json`).then((data) => {
        var finalData = data.data;
        if (finalData.address == undefined) {
            res.render('index', {
                pageTitle: 'Weather App',
                weatherData: null
            });
        }
        else {
            finalData.days[0].temp = f_to_c(finalData.days[0].temp);
            finalData.days[0].tempmax = f_to_c(finalData.days[0].tempmax);
            finalData.days[0].tempmin = f_to_c(finalData.days[0].tempmin);
            finalData.days[0].feelslikemax = f_to_c(finalData.days[0].feelslikemax);
            finalData.days[0].feelslikemin = f_to_c(finalData.days[0].feelslikemin);
            if (finalData.latitude == 0) {
                // Do nothing
            } else if (finalData.latitude < 0) {
                finalData.latitude = Math.abs(finalData.latitude) + "° S";
            } else if (finalData.latitude > 0) {
                finalData.latitude = Math.abs(finalData.latitude) + "° N";
            }

            if (finalData.longitude == 0 || finalData.longitude == 180) {
                // Do nothing
            } else if (finalData.longitude < 0) {
                finalData.longitude = Math.abs(finalData.longitude) + "° W";
            } else if (finalData.longitude > 0) {
                finalData.longitude = Math.abs(finalData.longitude) + "° E";
            }

            if (finalData.tzoffset == 0) {
                finalData.tzoffset = "UTC";
            } else if (finalData.tzoffset > 0) {
                finalData.tzoffset = `+${time_zone_change(finalData.tzoffset)} UTC`;
            } else if (finalData.tzoffset < 0) {
                finalData.tzoffset = `${time_zone_change(finalData.tzoffset)} UTC`;
            }
            res.render('index', {
                pageTitle: 'Weather App',
                weatherData: finalData
            });
        }
    }).catch(generalErr);
}

var f_to_c = f => ((5 * (f - 32)) / 9).toFixed(2);
var time_zone_change = tz => { 
    var b = tz / 0.5;
    return ((b % 2) == 1) ? `${Math.floor(tz)}:30` : `${tz}:00`;
}

// OPEN WEATHER API
// https://api.openweathermap.org/data/3.0/onecall?city={}&appid=10ce751831e78719691f19e828d2c3a1 ==> Mine Modified
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} ==> Given
// http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a0e78d3b449db7059df0a38abd3952f8 ==> Maam's
// 10ce751831e78719691f19e828d2c3a1 ==> API Key mine

// VISUAL CROSSING
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${req.body.city_name_TB}?unitGroup=us&key=PZ83CLGNN93URM84K9YDC9T93&contentType=json
// PZ83CLGNN93URM84K9YDC9T93 - API Key