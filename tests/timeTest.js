const path = require('path')

const v1 = require(path.join(__dirname, '../public/v1/runTest.js'))
const v2 = require( path.join(__dirname, '../public/v2/runTest.js'))

const timeit = (name,func) => {
    const iterations = 10000
    console.time(name);
    for (let i=0; i<iterations; i++){
        func()
    }
    console.timeEnd(name);
}

console.log(`\n------------------------`)
console.log(`Timing 10K iterations of test functions:`)
timeit('v1',v1.test)
timeit('v2',v2.test)
console.log(`------------------------\n`)


