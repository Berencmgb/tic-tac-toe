"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function (e) {
            var _a, _b, _c, _d, _e, _f, _g;
            e.preventDefault();
            var piece = this.getElementsByClassName('piece')[0];
            if (piece != null) {
                if (Number(piece.getAttribute('piece-size')) >= Number((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('piece-size')))
                    return;
                if (piece.closest('.pieces') != undefined)
                    return;
            }
            if (e.target.closest('.pieces') != undefined)
                return;
            //(e.target as Slot).board?.swapPlayer();
            var pieceId = (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.getData("piece-id");
            var pieceElement = document.getElementById(pieceId);
            pieceElement.setAttribute('draggable', 'false');
            pieceElement.setAttribute('piece-size', String((_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.getData('piece-size')));
            pieceElement.style.width = String((_d = e.dataTransfer) === null || _d === void 0 ? void 0 : _d.getData("piece-width"));
            (_e = pieceElement.closest('.slot').board) === null || _e === void 0 ? void 0 : _e.swapPlayer();
            e.target.innerHTML = "";
            e.target.appendChild(pieceElement);
            console.log(`Item index: ${(_f = e.target.board) === null || _f === void 0 ? void 0 : _f.boardSlots.indexOf(e.target)}`);
            (_g = e.dataTransfer) === null || _g === void 0 ? void 0 : _g.items.clear();
        };
    }
    connectedCallback() {
        this.classList.add("slot");
        console.log(this.board);
    }
}
window.customElements.define('board-slot', Slot);
