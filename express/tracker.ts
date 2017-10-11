import { MOVING_AVERAGE, movingAverage } from './indicators';

var data = [];
var indicatorArray = [];

export function addEntry(entry) {
    data.push(entry);

    indicatorArray.forEach((ind) => {
        var value = ind.run(data);
        ind.data.push(value);
        console.log(ind.name, ind.value);
    });
}

export function addIndicator(name, ...param) {
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