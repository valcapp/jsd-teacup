if(typeof process === 'object') {
    Model = require('./sd').Model;
}

function Clock(){
    return {
        initialTime: () => 0,
        finalTime: () => 100,
        timeStep: () => 1
    }
}

// Here is the definition of Variables object, that defines (some of) the equations of the running model
function TeaCup(){
    return {
        roomTemperature: () => 20,

        coolingTime: () => 40,

        initialCupTemperature: () => 70,
            
        cupTemperature: function(t) {
            return t===0?
                this.initialCupTemperature():
                this.cupTemperature(t-1) + this.temperatureChange(t-1) * this.timeStep()       
        },
        
        temperatureChange: function(t) {
            return this.temperatureGap(t) / this.coolingTime(t)
        },
        
        temperatureGap: function(t) {
            return this.roomTemperature(t) - this.cupTemperature(t)
        }   
        // time : [...Array(Number(steps)).keys()]
    }
}

// // To instantiate the model
myTeaCup = new Model(TeaCup).include(Clock)

// // To add equations from other Variables Object (extending the model with additional models)
// myTeaCup = new Model(TeaCup)
// myTeaCup.include.apply(myTeaCup,[TeaCup,Clock]);


if(typeof process === 'object') {
    exports.model = myTeaCup
}

myRun = myTeaCup.run();
console.dir(myRun)
