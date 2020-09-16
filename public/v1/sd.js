// console.log('core.js connected')

// class Series{
//     constructor(func,f0=null){
//         this.value = [f0];
        // this.f = t => {
        //     if (!this.value[t]){
        //         this.value[t] = func(t);
        //     }
        //     return this.value[t] ;
        // }
//     }
// }

function Series(func,f0=null){
    this.data = [];
    if (f0){this.data[0]=f0;}
    this.f = function(t) {
        if (!this.data[t]){
            this.data[t] = func(t);
        }
        return this.data[t] ;
    }
}

const timeSeries = (run,varName) => {
    return run[varName].map((value,i)=>{
        return{
            x: run.time[i],
            y: value
        };
    });
}

if (typeof window === 'undefined'){
    module.exports = {Series}
}

// function Var(eq, clock ,f0=none){
//     this.val = f0;
//     this.eq = eq;
//     this.clock = clock;
//     this.time = -1;

//     this.f = () => {
//         if (this.time < this.clock.time ) {
//             this.val = this.eq();
//             this.time += 1;
//         }
//         return this.val;
//     }

// }



// function Model(){
//     this.run = (steps,vars) => {
//         let time = 0;


//     }
// }

// class Clock {
    

//     step = () => {
//     }
// }

// class Var {
//     val = none;
//     eq = none;

//     constructor(name,clock){
//         this.name = name;
//         this.clock = clock;
//         this.time = -1;
//     }

//     get f(){
//         if (this.time < this.clock.time){this.calc();}
//         return this.val;
//     }
// }

// class Dot extends Var {
//     calc = () => {
//         this.val = this.eq();
//         this.time += 1;        
//     }
// }

// class Box extends Var {
//     calc = ()=>{
//         this.val += this.eq();
//         this.time += 1; 
//     }
// }