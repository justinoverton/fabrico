# fabrico

> **fabrico** [latin] _āvī, ātus, āre_ VERB build/construct/fashion/forge/shape

Content generation for world-building, RPGs, stories, and more.


## installation

    npm install fabrico
    
## usage

See [fantasy.js](./blob/master/modules/fantasy.js) for in-depth details.

```javascript

var fantasy = require('fabrico/dist/fantasy');
console.log(fantasy.character.get());

```
Outputs something similar to

```json
{
    "name":"Marel",
    "race":"half-elf",
    "gender":"male",
    "eyes":"blue",
    "hair":"gray",
    "profession":"carpenter",
    "inventory":["dagger","ring"]
}
```