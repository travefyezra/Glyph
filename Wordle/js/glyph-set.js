const Glyph = require('./glyph.js')

class GlyphSet {
    constructor(glyphList, gridRows, gridCols) {
        this.glyphList = glyphList;
        this.gridRows = gridRows;
        this.gridCols = gridCols;

        this.grid = [];
        this.setupGrid();

        let confirmed = this.confirmUniqueIds();
        console.log(confirmed);
    
        // document.getElementById('mydiv').className = 'newclass';
    }

    setupGrid() {
        let grid = [];
        for (let i = 0; i < this.gridRows; i++) {
            let row = [];
            for (let j = 0; j < this.gridCols; j++) {
                let g = new Glyph("x", "CORRECT", i+1, j+1);
                row.push(g.toString());
                this.glyphList.push(g);
            }
            grid.push(row);
        }
        this.grid = grid;
    }

    confirmUniqueIds() {
        let ids = [];
        for (let i = 0; i < this.glyphList.length; i++) {
            ids.push(this.glyphList.id);
        }
        console.log(ids);
        return (ids.length == (new Set(ids)).size);
    }
}

let gs = new GlyphSet([], 3, 3);
console.log(gs);