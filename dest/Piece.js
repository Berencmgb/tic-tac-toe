"use strict";
class Piece extends HTMLElement {
    constructor() {
        super();
        this.ondragstart = function (e) {
            var _a, _b;
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", piece.id);
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-size", String(piece.getAttribute('piece-size')));
            console.log(e.dataTransfer);
        };
        this.ondrag = function (e) {
            e.preventDefault();
        };
        this.setId = function (id) {
            this.setId(id);
        };
    }
    connectedCallback() {
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
    }
    setId(id) {
        this.id = `piece-${id}`;
    }
}
window.customElements.define('doll-piece', Piece);
