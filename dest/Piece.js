"use strict";
class Piece extends HTMLElement {
    constructor() {
        super();
        this.ondragstart = function (e) {
            var _a, _b;
            if (this.getAttribute('draggable') == 'false') {
                e.preventDefault();
                return;
            }
            if (this.closest('.disabled') != undefined) {
                e.preventDefault();
                return;
            }
            var pieceElement = this;
            var piece = pieceElement;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", pieceElement.id);
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-size", String(piece.size));
            console.log(e.dataTransfer);
        };
        this.hasImage = false;
        this.ondrag = function (e) {
            e.preventDefault();
        };
    }
    connectedCallback() {
        if (this.hasImage)
            return;
        this.hasImage = true;
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
    }
    setId(id) {
        this.id = `piece-${id}`;
    }
    setPieceSize(size) {
        this.size = size;
        var htmlElement = this;
        var imageElement = htmlElement.getElementsByTagName('img')[0];
        imageElement.style.width = `${size / 5 * 100}%`;
    }
}
window.customElements.define('doll-piece', Piece);
