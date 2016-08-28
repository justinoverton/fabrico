'use strict'

let drd = require('definitely-random-data');

class MarkovChainSource extends drd.AbstractSource {
    constructor(list) {
        super();
        this.list = list;
        this.chain = null;
    }
    
    getItem(rng) {
        
        if(this.chain === null) {
            this.chain = construct_chain(this.list);
        }
        
        return markov_name(this.chain, rng || drd.Defaults.defaultRng);
    }
    
}

exports.MarkovChainSource = MarkovChainSource;

/*
Extend DRD to have a markov source
*/
drd.Generator.prototype.markov = function(list) {
    return new MarkovChainSource(list);
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// name_generator.js
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/
// https://donjon.bin.sh/code/name/name_generator.js

  var name_set = {};
  var chain_cache = {};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generator function

  function generate_name (type) {
    var chain; if (chain = markov_chain(type)) {
      return markov_name(chain);
    }
    return '';
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// get markov chain by type

  function markov_chain (type) {
    var chain; if (chain = chain_cache[type]) {
      return chain;
    } else {
      var list; if (list = name_set[type]) {
        var chain; if (chain = construct_chain(list)) {
          chain_cache[type] = chain;
          return chain;
        }
      }
    }
    return false;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct markov chain from list of names

  function construct_chain (list) {
    var chain = {};

    var i; for (i = 0; i < list.length; i++) {
      var names = list[i].split(/\s+/);
      chain = incr_chain(chain,'parts',names.length);

      var j; for (j = 0; j < names.length; j++) {
        var name = names[j];
        chain = incr_chain(chain,'name_len',name.length);

        var c = name.substr(0,1);
        chain = incr_chain(chain,'initial',c);

        var string = name.substr(1);
        var last_c = c;

        while (string.length > 0) {
          var c = string.substr(0,1);
          chain = incr_chain(chain,last_c,c);

          string = string.substr(1);
          last_c = c;
        }
      }
    }
    return scale_chain(chain);
  }
  function incr_chain (chain, key, token) {
    if (chain[key]) {
      if (chain[key][token]) {
        chain[key][token]++;
      } else {
        chain[key][token] = 1;
      }
    } else {
      chain[key] = {};
      chain[key][token] = 1;
    }
    return chain;
  }
  function scale_chain (chain) {
    var table_len = {};

    var key; for (key in chain) {
      table_len[key] = 0;

      var token; for (token in chain[key]) {
        var count = chain[key][token];
        var weighted = Math.floor(Math.pow(count,1.3));

        chain[key][token] = weighted;
        table_len[key] += weighted;
      }
    }
    chain['table_len'] = table_len;
    return chain;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct name from markov chain

  function markov_name (chain, rng) {
    var parts = select_link(chain,'parts', rng);
    var names = [];

    var i; for (i = 0; i < parts; i++) {
      var name_len = select_link(chain,'name_len', rng);
      var c = select_link(chain,'initial', rng);
      var name = c;
      var last_c = c;

      while (name.length < name_len) {
        c = select_link(chain,last_c, rng);
        name += c;
        last_c = c;
      }
      names.push(name);
    }
    return names.join(' ');
  }
  function select_link (chain, key, rng) {
    var len = chain['table_len'][key];
    var idx = (rng) ? rng.getRandomInt(0, len) : Math.floor(Math.random() * len);

    var t = 0; for (let token in chain[key]) {
      t += chain[key][token];
      if (idx < t) { return token; }
    }
    return '-';
  }
