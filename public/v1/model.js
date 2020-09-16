if(typeof process === 'object'){
    Series = require('./sd').Series

    params = {
        roomTemperature: 20,
        coolingTime: 40,
        cupTemperature: 70
    }
}

function run(params){
    nSteps = params.finalTime || 100
    tStep = 1; 

    let roomTemperature = new Series(
        () => params.roomTemperature || 20
    );

    let coolingTime = new Series(
        () => params.coolingTime || 40
    );

    let initialCupTemperature = new Series(
        () => params.initialCupTemperature || 70
    );

    let cupTemperature = new Series(
        t => cupTemperature.f(t-1) + temperatureChange.f(t-1) * tStep,
        f0 = initialCupTemperature.f()
    );

    let temperatureChange = new Series(
        t => temperatureGap.f(t) / coolingTime.f(t)
    );

    let temperatureGap = new Series(
        t => roomTemperature.f(t) - cupTemperature.f(t)
    )

    const steps = [...Array(Number(nSteps)).keys()];

    return {
        time: steps.map(t=>t*tStep),
        roomTemperature: steps.map( t => roomTemperature.f(t) ),
        cupTemperature: steps.map( t => cupTemperature.f(t) ),
        temperatureChange: steps.map( t => temperatureChange.f(t) )
        // ,series: function (varName){timeSeries(this,varName);}
    }
}

if (typeof process === 'object') {
    exports.run = run;
}



