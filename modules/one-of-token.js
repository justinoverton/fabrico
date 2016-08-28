'use strict'

let drd = require('definitely-random-data');

class OneOfTokenSource extends drd.AbstractSource {
    constructor(tokens) {
        super();
        this.tokens = tokens;
    }
    
    getItem(rng) {
        rng = rng || drd.Defaults.defaultRng;
        let idx = rng.getRandomInt(0, this.tokens.length);
        
        let token = this.tokens[idx];
        
        if(token instanceof drd.AbstractSource) {
          return token.getItem();
        } else {
          return token;
        }
    }
}

exports.OneOfTokenSource = OneOfTokenSource;

/*
Extend DRD to have a one-of source
*/
drd.Generator.prototype.oneOf = function() {
    let arr = Array.prototype.slice.call(arguments, 0);
    return new OneOfTokenSource(arr);
};
 