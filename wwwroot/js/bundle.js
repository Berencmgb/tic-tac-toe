"use strict";
class Board {
    constructor(x, y) {
        this.xSize = x;
        this.ySize = y;
        this.boardSlots = [];
    }
    generateBoard() {
        var _a;
        document.body.innerHTML += `<div class="game-wrapper">
        <div id="player-one-pieces-wrapper" class="player">
            <div class="pieces">

            </div>
        </div>
        <div class="game">
            <div class="border">

            </div>
            <div class="board-wrapper">
                <div class="board">
                </div>
            </div>
            <div class="border">

            </div>
            </div>
            <div id="player-two-pieces-wrapper" class="player">
                <div class="pieces">

                </div>  
            </div>
        </div>`;
        var board = document.getElementsByClassName('board')[0];
        if (board == null)
            return;
        // generate slots
        for (var i = 0; i < 9; i++) {
            var slot = document.createElement('board-slot');
            board.append(slot);
            slot.setAttribute('id', `slot-${i + 1}`);
            slot.classList.add('slot');
            slot.board = this;
            (_a = this.boardSlots) === null || _a === void 0 ? void 0 : _a.push(slot);
        }
        console.log(this.boardSlots);
        var players = document.getElementsByClassName('player');
        var slots = document.getElementsByClassName('slot');
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < 5; j++) {
                var slot = document.createElement('board-slot');
                slot.board = this;
                slot.classList.add('slot');
                slot.setAttribute('id', `player-${i}-slot-${j}`);
                players[i].getElementsByClassName('pieces')[0].append(slot);
            }
        }
    }
    swapPlayer() {
        var currentPlayer = document.querySelector('.pieces:not(.disabled)');
        var swapTo = document.querySelector('.pieces.disabled');
        currentPlayer === null || currentPlayer === void 0 ? void 0 : currentPlayer.classList.add('disabled');
        swapTo === null || swapTo === void 0 ? void 0 : swapTo.classList.remove('disabled');
    }
}

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

"use strict";
var PieceSize;
(function (PieceSize) {
    PieceSize[PieceSize["SizeOne"] = 0] = "SizeOne";
    PieceSize[PieceSize["SizeTwo"] = 1] = "SizeTwo";
    PieceSize[PieceSize["SizeThree"] = 2] = "SizeThree";
    PieceSize[PieceSize["SizeFour"] = 3] = "SizeFour";
    PieceSize[PieceSize["SizeFive"] = 4] = "SizeFive";
})(PieceSize || (PieceSize = {}));

"use strict";
class Player {
    constructor() {
    }
    generatePieces(i) {
        var starts = i % 2 == 0;
        var board = document.getElementsByClassName('player')[i].getElementsByClassName('pieces')[0];
        if (!starts)
            board.classList.add('disabled');
        var slots = board.getElementsByClassName('slot');
        for (var j = 0; j < slots.length; j++) {
            var pieceElement = document.createElement('doll-piece');
            var piece = pieceElement;
            slots[j].append(pieceElement);
            pieceElement.setAttribute('id', `p${i}-piece-${j + 1}`);
            piece.setPieceSize(j + 1);
            piece.player = this;
            var img = pieceElement.getElementsByTagName('img')[0];
        }
    }
}

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

"use strict";
class Printer {
    constructor(message) {
        this.storedMessage = message;
    }
    sayMessege() {
        return console.log(this.storedMessage);
    }
}

"use strict";
mainLoop();
function mainLoop() {
    var board = new Board(3, 3);
    var player1 = new Player();
    var player2 = new Player();
    board.generateBoard();
    player1.generatePieces(0);
    player2.generatePieces(1);
}
