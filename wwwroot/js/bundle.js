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
            var _a, _b, _c;
            if (this.getAttribute('draggable') == 'false') {
                e.preventDefault();
                return;
            }
            if (this.closest('.disabled') != undefined) {
                e.preventDefault();
                return;
            }
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", piece.id);
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-width", piece.style.width);
            (_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.setData("piece-size", String(piece.getAttribute('piece-size')));
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
            var piece = document.createElement('doll-piece');
            slots[j].append(piece);
            piece.setAttribute('id', `p${i}-piece-${j + 1}`);
            piece.setAttribute('piece-size', `${j + 1}`);
            var img = piece.getElementsByTagName('img')[0];
            // load images here by piece size
            console.log((j + 1) / slots.length * 100);
            img.style.width = `${(j + 1) / slots.length * 100}%`;
        }
    }
}

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
