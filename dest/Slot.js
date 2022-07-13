"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.classList.add("slot");
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function (e) {
            var _a;
            console.log(e.dataTransfer);
            e.preventDefault();
            var pieceId = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("id");
            var pieceElement = document.getElementById(pieceId);
            e.target.appendChild(pieceElement);
        };
    }
}
window.customElements.define('board-slot', Slot);
