'use strict';

var fabrico = require('./fabrico');
var name = exports.name = fabrico.markov(require('./data/names/roman-name'));
var gender = exports.gender = fabrico.list(['male', 'female']);

var humanEyes = fabrico.list(['brown', 'blue', 'green', 'hazel']);
var elfEyes = fabrico.list(['brown', 'blue', 'green', 'white', 'silver', 'black']);
var halfElfEyes = fabrico.oneOf(humanEyes, elfEyes);
var dwarfEyes = fabrico.list(['brown', 'dark brown', 'black']);
var gnomeEyes = fabrico.list(['blue', 'green', 'red', 'orange']);

//I'm lazy
var hair = fabrico.list(['brown', 'blonde', 'red', 'gray', 'white', 'silver']);

var adventurer = fabrico.list('wizard', 'fighter', 'rogue');
var profession = fabrico.oneOf('baker', 'smith', 'carpenter', 'elder', 'councilman', 'peasant', 'drunkard', 'commoner', 'noble', adventurer);

var commonInventory = fabrico.list(['dagger', 'necklace', 'ring']).repeat(0, 3);
var professionInventory = {
    drunkard: fabrico.list(['beer', 'ale', 'whiskey']),
    wizard: fabrico.tokens('spellbook', fabrico.literal('scrollcase').flip(), fabrico.list(['quarterstaff', 'wand', 'crossbow'])),
    fighter: fabrico.tokens('armor', fabrico.literal('shield').repeat(0, 1), fabrico.list(['sword', 'dagger', 'crossbow', 'bow', 'axe'])),
    rogue: fabrico.tokens('lock picks', fabrico.literal('contraband').repeat(0, 1), fabrico.list(['disguise kit', 'dagger', 'bow']))
};

var inventory = function inventory(char) {

    var ret = commonInventory.get();
    var prof = char.profession;
    if (!prof) return ret;

    var other = professionInventory[prof];
    if (!other) return ret;

    return ret.concat(other.get());
};

var human = exports.human = fabrico.map({ name: name, race: 'human', gender: gender, eyes: humanEyes, hair: hair, profession: profession, inventory: inventory });
var elf = exports.elf = fabrico.map({ name: name, race: 'elf', gender: gender, eyes: elfEyes, hair: hair, profession: profession, inventory: inventory });
var halfElf = exports.helfElf = fabrico.map({ name: name, race: 'half-elf', gender: gender, eyes: halfElfEyes, hair: hair, profession: profession, inventory: inventory });
var dwarf = exports.dwarf = fabrico.map({ name: name, race: 'dwarf', gender: gender, eyes: dwarfEyes, hair: hair, profession: profession, inventory: inventory });
var gnome = exports.gnome = fabrico.map({ name: name, race: 'gnome', gender: gender, eyes: gnomeEyes, hair: hair, profession: profession, inventory: inventory });

var character = exports.character = fabrico.oneOf(human, elf, dwarf, gnome, halfElf);
//# sourceMappingURL=fantasy.js.map
