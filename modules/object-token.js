'use strict'

let drd = require('definitely-random-data');
let util = require('util');

class ObjectTokenSource extends drd.AbstractSource {
    constructor(obj) {
        super();
        this.obj = obj;
    }
    
    getItem() {
        return this.resolveValue(this.obj);
    }
    
    resolveValue(token, parent) {
        
        if(token === null)
            return null;
        
        if(util.isUndefined(token))
            return undefined;
        
        if(token instanceof drd.AbstractSource) {
          return token.getItem();
        } else if(util.isArray(token)) {
            let ret = [];
            
            for(let o of token) {
                ret.push(this.resolveValue(o, parent || ret));
            }
            
            return ret;
        } else if(util.isFunction(token)) {
            return token(parent);  
        } else if(util.isObject(token)) {
            let ret = {};
            
            for (let key of Object.keys(token)) {
                ret[key] = this.resolveValue(token[key], parent || ret);
            }
            
            return ret;
        }
        
        return token;
    };
}

exports.ObjectTokenSource = ObjectTokenSource;

/*
Extend DRD
*/
drd.Generator.prototype.map = function(obj) {
    return new ObjectTokenSource(obj);
};
