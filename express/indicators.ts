import * as _ from 'lodash';

export const MOVING_AVERAGE = "MA";
export const RSI = "RSI";

export function movingAverage(...param) {
    var period = param[0][0];
    var type = param[0][1];

    console.log("Creating", type, "moving average with period", period);

    var iter = function(acc, val, i, col) {
        console.log(acc);
        var n = col.length;
        var sum;
        switch(type) {
        case "simple": 
            sum = val/n;
            break;
        case "weight":
            sum = 2*(i+1)*val/(n*(n+1));
            break;
        case "exp":
            // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
            var a = 0.3; // alpha coeff
            var m = n-i-1; // n-1 < m < 0
            sum = Math.pow((1-a), m)/a;
            break;
        }
        return acc + sum;
    }

    return function(history) {
        var sample = _.slice(history, history.length-period);
        console.log("sample is", sample);
        var result = _.reduce(sample, iter);
        console.log("result is", result);
        return result;
    }
}
