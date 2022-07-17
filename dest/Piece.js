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
        var image = this.player.started ? 'blue' : 'red';
        this.innerHTML += `<img class="icon" src="/wwwroot/images/${image}.png" />`;
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
    setSlot(pieceSlot) {
        this.pieceSlot = pieceSlot;
    }
}
window.customElements.define('doll-piece', Piece);
