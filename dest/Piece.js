"use strict";
class Piece extends HTMLElement {
    constructor() {
        super();
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
        this.ondragstart = function (e) {
            var _a, _b, _c;
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", piece.id);
            //.dataTransfer?.setData("piece-size", String(piece.getAttribute('piece-size')));
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-size", String(piece.size));
            console.log((_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.getData('piece-size'));
        };
        this.ondrag = function (e) {
            e.preventDefault();
        };
        this.setId = function (id) {
            this.setId(id);
        };
    }
    setId(id) {
        this.id = `piece-${id}`;
    }
    setPieceSize(size) {
        this.size = size;
    }
}
window.customElements.define('doll-piece', Piece);
