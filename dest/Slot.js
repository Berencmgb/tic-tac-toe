"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.classList.add("slot");
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function (e) {
            var _a, _b;
            e.preventDefault();
            var piece = this.getElementsByClassName('piece')[0];
            if (piece != null) {
                if (Number(piece.getAttribute('piece-size')) >= Number((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('piece-size')))
                    return;
            }
            var pieceId = (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.getData("piece-id");
            var pieceElement = document.getElementById(pieceId);
            e.target.appendChild(pieceElement);
        };
    }
}
window.customElements.define('board-slot', Slot);
