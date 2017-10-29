var moment = require('moment');
var yahooApi = require('./yahoo-api');

module.exports.yahoo = function(from, to, callback) {
    setInterval(() => {
        yahooApi.getJSON("BTC", "USD", (statusCode, result) => {
            let resp = onYahoo(statusCode, result);
            if(resp.err) {
                console.log(resp.err);
                return;
            }
            callback(resp);
        });
    }, 1000);
}

function onYahoo(statusCode, result) {
    if(!result || !result.query || !result.query.results) return {err: "No result or no query"};
    var rate = result.query.results.rate.Rate;
    var time = moment().valueOf();
    return {rate: rate, time: time};
    // todos.get('rates').get(time).put(rate);
    // todos.get('times').get(time%10).put(time);
  }