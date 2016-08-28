'use strict'

const drd = require('definitely-random-data');
const seedrandom = require('seedrandom');
require('./one-of-token');
require('./object-token');
require('./markov-chain-source');

let g = new drd.Generator();

/*
Pass a function that returns a 'random' number between 0 and 1 just like Math.random
*/
g.defaultPrng = function(rngFn) {
    drd.Defaults.defaultRng = new drd.Prng(rngFn);
};

/*
Sets the default prng to a specific seed
*/
g.seedPrng = function(seed) {
    return drd.Defaults.defaultRng = new drd.Prng(seedrandom(seed));
};

module.exports = g;