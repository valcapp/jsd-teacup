
Model.prototype.eq = {} // the original equations to calculate the var
Model.prototype.f = {} // the wrapper functions to check if the value of var has already been calculated
Model.prototype.data = {} // the data object storing results during run. Before and after run it is an empty object

function Model(Variables=null){
    this.eq = Variables instanceof Function? Variables() : 
        Variables instanceof Object? Variables :
            {}
    this.f = {}
    this.data = {}   
    this.init();
}


Model.prototype.init = function(){
    for (let varb in this.eq){
        this.f[varb] = (t=0) => {
            if (typeof this.data[varb][t] === 'undefined'){
                this.data[varb][t] = this.eq[varb].call(this.f, t);
            }
            return this.data[varb][t] ;
        }
    };
}

Model.prototype.run = function(params){
    let data = {}
    for (let varb in this.eq){
        data[varb] = [];
    }
    this.data = data

    this.setClock(params)

    for (let param in params){
        if(data.hasOwnProperty(param)) {
            data[param] = new Array(data.step.length).fill(params[param]);
        }
    }

    for (let varb in this.eq){
        // for (let t=0; t < nSteps ; t++){
        //     this.f[varb](t)
        // }
        data.step.map( t => this.f[varb](t) )    
    }
    
    this.data = {}
    return data
}

Model.prototype.setClock = function(params){
    let clock = {
        initialTime: this.eq.initialTime(),
        finalTime:  this.eq.finalTime(),
        timeStep: this.eq.timeStep()
    }
    if (params){
        Object.keys(clock).filter( key => params.hasOwnProperty(key)).map( key => clock[key] = params[key])
    }

    let nSteps = Math.floor( ( clock.finalTime - clock.initialTime ) / clock.timeStep )

    this.data.step = [...Array(Number(nSteps)).keys()]
    Object.keys(clock).map( key => this.data[key] = new Array(nSteps).fill(clock[key]) )
    this.data.time = this.data.step.map( t => clock.initialTime + t*clock.timeStep )
}

Model.prototype.include = function(){
    for (let i=0; i < arguments.length; i++){
        this.eq = {
            ...this.eq,
            ...arguments[i]()
        }
    }
    this.init()
    return this
}


if (typeof process === 'object'){
    module.exports = { Model }
}

// function Run(model,params){
//     this.f = {}
//     this.data = {}

//     for (let varb in model.eq){
//         this.data[varb] = [];
//         this.f[varb] = t => {
//             if (!this.data[varb][t]){
//                 this.data[varb][t] = model.eq[varb].call(this.f, t);
//             }
//             return this.data[varb][t] ;
//         }
//     };

//     this.steps = Math.floor( (model.eq.finalTime() - model.eq.initialTime() ) / model.eq.timeStep() );


//     for (let param in params){
//         this.data[param] = new Array(this.steps).fill(params[param])
//     }

//     for (let varb in this.data){
//         for (let t=0; t < this.steps ; t++){
//             this.f[varb](t)
//         }    
//     }
    
//     this.series = varb => timeSeries(this.data, varb)

// }

// const timeSeries = (run,varName) => {
//     return run[varName].map((value,i)=>{
//         return{
//             x: run.time[i],
//             y: value
//         };
//     });
// }
