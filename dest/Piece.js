"use strict";
class Piece extends HTMLElement {
    constructor(size) {
        super();
        this.size = size;
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
        this.setAttribute('id', 'test-piece-one');
        this.ondragstart = function (e) {
            var _a;
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("id", piece.id);
            console.log(e.dataTransfer);
        };
        this.ondrag = function (e) {
            e.preventDefault();
        };
    }
}
window.customElements.define('doll-piece', Piece);
