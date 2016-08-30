'use strict'

const drd = require('definitely-random-data');
require('./markov-chain-source');
module.exports = new drd.Generator();