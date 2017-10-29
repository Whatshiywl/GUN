var MOVING_AVERAGE = require('./indicators.ts').MOVING_AVERAGE;
var movingAverage = require('./indicators.ts').movingAverage;

var data = [];
var indicatorArray = [];

module.exports.addEntry = function(entry) {
    console.log("New entry:", entry);
    data.push(entry.rate);

    indicatorArray.forEach((ind) => {
        var value = ind.run(data);
        ind.data.push(value);
        console.log(ind.name, value);
    });
}

module.exports.addIndicator = function(name, ...param) {
    console.log("adding", name, param);
    var run;
    switch(name) {
    case MOVING_AVERAGE: 
        run = movingAverage(param);
        break;
    }
    var indicator = {
        name: name,
        param: param,
        run: run,
        data: []
    }
    indicatorArray.push(indicator);
}