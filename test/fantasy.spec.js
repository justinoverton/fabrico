'use strict'

require('should');
const fabrico = require('../dist/fabrico');
const fantasy = require('../dist/fantasy');

describe('Fantasy Tests', function() {

    it('generates characters', function() {
        
        const seed = 500;
        //override PRNG with a known seeded one
        fabrico.seedPrng(seed);
        
        let c = fantasy.character.get();
        let str = JSON.stringify(c);
        
        str.should.equal('{"name":"Ganelusarc Veriust","race":"human","gender":"female","eyes":"blue","hair":"white","profession":"carpenter","inventory":["necklace"]}');
        
    });

});