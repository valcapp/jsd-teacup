const { timeStamp } = require('console')

run = require('./model').run

exports.test = () => run(100)