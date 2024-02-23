class Glyph {
    constructor(character, mood, rowPosition = -1, colPosition = -1) {
        this.character = character;
        this.mood = mood;
        this.rowPosition = rowPosition;
        this.colPosition = colPosition;
        this.id = this.generateUniqueId();

        // document.getElementById('mydiv').className = 'newclass';
    }

    generateUniqueId() {
        return Math.round((Math.random() * 10E9));
    }

    toString() {
        return this.character + "    " + this.mood + "    " + this.rowPosition + "    " + this.colPosition + "    " + this.id;
    }
}

let g = new Glyph("G", "MOOD");
console.log(g.toString());

module.exports = Glyph;