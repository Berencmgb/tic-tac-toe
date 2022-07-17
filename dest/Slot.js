"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function (e) {
            var _a, _b, _c, _d, _e;
            e.preventDefault();
            var currentSlotPieceElement = this.getElementsByClassName('piece')[0];
            var currentSlotPiece = currentSlotPieceElement;
            if (currentSlotPieceElement != null) {
                if (currentSlotPiece.size >= Number((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('piece-size')))
                    return;
                if (currentSlotPieceElement.closest('.pieces') != undefined)
                    return;
            }
            if (e.target.closest('.pieces') != undefined)
                return;
            var draggedPieceId = (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.getData("piece-id");
            var draggedPieceElement = document.getElementById(draggedPieceId);
            (_c = draggedPieceElement.closest('.slot').board) === null || _c === void 0 ? void 0 : _c.swapPlayer();
            var dropTargetElement = e.target;
            if (!dropTargetElement.classList.contains('slot'))
                dropTargetElement = dropTargetElement.closest('.slot');
            dropTargetElement.innerHTML = "";
            dropTargetElement.appendChild(draggedPieceElement);
            draggedPieceElement.setAttribute('draggable', 'false');
            var draggedPiece = draggedPieceElement;
            draggedPiece.setPieceSize(Number((_d = e.dataTransfer) === null || _d === void 0 ? void 0 : _d.getData('piece-size')));
            console.log(`Item index: ${e.target.board}`);
            (_e = e.dataTransfer) === null || _e === void 0 ? void 0 : _e.items.clear();
        };
    }
    connectedCallback() {
        this.classList.add("slot");
    }
}
window.customElements.define('board-slot', Slot);
