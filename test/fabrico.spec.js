'use strict'

require('should');
const fabrico = require('../dist/fabrico');

describe('Markov Chain Source', function() {

    it('generates names', function() {

        let names = [
            'Titus Accius',
            'Gaius Acilius',
            'Claudia Acte',
            'Claudius Aelianus',
            'Sextus Aelius',
            'Lucius Aelius',
            'Aemilia Scaura',
            'Marcus Aemilius',
            'Flavius Aetius',
            'Gnaeus Domitius',
            'Lucius Afranius',
            'Julius Africanus',
            'Sextus Caecilius',
            'Claudius Agathinus',
            'Gnaeus Julius Agricola',
            'Sextus Calpurnius Agricola',
            'Marcus Julius Agrippa',
            'Marcus Vipsanius Agrippa',
            'Marcus Vipsanius Agrippa Postumus',
            'Vipsania Agrippina',
            'Agrippina Major',
            'Agrippina Minor',
            'Gaius Servilius',
            'Ahenobarbus',
            'Aius Locutius',
            'Albinovanus Pedo'
        ];
        
        const seed = 500;
        //override PRNG with a known seeded one
        fabrico.seedPrng(seed);
        
        let src = fabrico.markov(names);
        
        src.getItem().should.equal('Polippsa Claeri');
        src.getItem().should.equal('Acusan Gnipps');
        src.getItem().should.equal('Viudobi Agrius');
        src.getItem().should.equal('Clarva Actusa');
    });

});