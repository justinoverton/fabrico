'use strict'

const fabrico = require('./fabrico');

let name = exports.name = fabrico.markov(require('./names/roman-name'));
let gender = exports.gender = fabrico.list(['male', 'female']);

let humanEyes = fabrico.list(['brown', 'blue', 'green', 'hazel']);
let elfEyes = fabrico.list(['brown', 'blue', 'green', 'white', 'silver', 'black']);
let halfElfEyes = fabrico.oneOf(humanEyes, elfEyes);
let dwarfEyes = fabrico.list(['brown', 'dark brown', 'black']);
let gnomeEyes = fabrico.list(['blue', 'green', 'red', 'orange']);

//I'm lazy
let hair = fabrico.list(['brown', 'blonde', 'red', 'gray', 'white', 'silver']);

let adventurer = fabrico.list('wizard', 'fighter', 'rogue');
let profession = fabrico.oneOf('baker', 'smith', 'carpenter', 'elder', 'councilman', 'peasant', 'drunkard', 'commoner', 'noble', adventurer);

let commonInventory = fabrico.list(['dagger', 'necklace', 'ring']).repeat(0, 3);
let professionInventory = {
    drunkard: fabrico.list(['beer', 'ale', 'whiskey']),
    wizard: fabrico.tokens('spellbook', 
                           fabrico.literal('scrollcase').repeat(0, 1),
                           fabrico.list(['quarterstaff', 'wand', 'crossbow'])),
    fighter: fabrico.tokens('armor', 
                       fabrico.literal('shield').repeat(0, 1),
                       fabrico.list(['sword', 'dagger', 'crossbow', 'bow', 'axe'])),
    rogue: fabrico.tokens('lock picks', 
                           fabrico.literal('contraband').repeat(0, 1),
                           fabrico.list(['disguise kit', 'dagger', 'bow']))
};

let inventory = function(char) {
    
    let ret = commonInventory.getItem();
    let prof = char.profession;
    if(!prof)
        return ret;
    
    let other = professionInventory[prof];
    if(!other)
        return ret;
    
    return ret.concat(other.getItem());
};

let human = exports.human = fabrico.map({name: name, race: 'human', gender: gender, eyes: humanEyes, hair: hair, profession: profession, inventory: inventory});
let elf = exports.elf = fabrico.map({name: name, race: 'elf', gender: gender, eyes: elfEyes, hair: hair, profession: profession, inventory: inventory });
let halfElf = exports.helfElf =fabrico.map({name: name, race: 'half-elf', gender: gender, eyes: halfElfEyes, hair: hair, profession: profession, inventory: inventory });
let dwarf = exports.dwarf = fabrico.map({name: name, race: 'dwarf', gender: gender, eyes: dwarfEyes, hair: hair, profession: profession, inventory: inventory });
let gnome = exports.gnome = fabrico.map({name: name, race: 'gnome', gender: gender, eyes: gnomeEyes, hair: hair, profession: profession, inventory: inventory });

let character = exports.character = fabrico.oneOf(human, elf, dwarf, gnome, halfElf);
