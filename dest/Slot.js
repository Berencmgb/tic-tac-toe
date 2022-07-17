"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.ondragover = e => {
            e.preventDefault();
            var targetElement = e.target;
            if (!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot');
            targetElement.classList.add('dragged-over');
        };
        this.ondragenter = function (e) {
            var targetElement = e.target;
            if (!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot');
            targetElement.classList.add('dragged-over');
        };
        this.ondragleave = function (e) {
            var targetElement = e.target;
            if (!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot');
            targetElement.classList.remove('dragged-over');
        };
        this.ondrop = function (e) {
            var _a, _b, _c, _d, _e, _f;
            e.preventDefault();
            var currentSlotPieceElement = this.getElementsByClassName('piece')[0];
            var currentSlotPiece = currentSlotPieceElement;
            var targetElement = e.target;
            if (!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot');
            targetElement.classList.remove('dragged-over');
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
            var dropTargetElement = e.target;
            if (!dropTargetElement.classList.contains('slot'))
                dropTargetElement = dropTargetElement.closest('.slot');
            dropTargetElement.innerHTML = "";
            dropTargetElement.appendChild(draggedPieceElement);
            draggedPieceElement.setAttribute('draggable', 'false');
            var draggedPiece = draggedPieceElement;
            draggedPiece.setPieceSize(Number((_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.getData('piece-size')));
            draggedPiece.setSlot(this);
            draggedPiece.player.remainingPieces -= 1;
            this.piece = draggedPiece;
            (_d = draggedPieceElement.closest('.slot').board) === null || _d === void 0 ? void 0 : _d.swapPlayer();
            (_e = this.board) === null || _e === void 0 ? void 0 : _e.calculateWinner();
            (_f = e.dataTransfer) === null || _f === void 0 ? void 0 : _f.items.clear();
        };
    }
    connectedCallback() {
        this.classList.add("slot");
    }
    setPiece(piece) {
        this.piece = piece;
    }
}
window.customElements.define('board-slot', Slot);
