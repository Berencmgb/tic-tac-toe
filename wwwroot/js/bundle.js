"use strict";
class Board {
    constructor(x, y) {
        this.xSize = x;
        this.ySize = y;
    }
    generateBoard() {
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
        }
        var players = document.getElementsByClassName('player');
        var slots = document.getElementsByClassName('slot');
        for (var i = 0; i < players.length; i++) {
            for (var j = 0; j < 5; j++) {
                var slot = document.createElement('board-slot');
                slot.classList.add('slot');
                slot.setAttribute('id', `player-${i}-slot-${j}`);
                players[i].getElementsByClassName('pieces')[0].append(slot);
            }
        }
    }
}

"use strict";
class Piece extends HTMLElement {
    constructor() {
        super();
        this.ondragstart = function (e) {
            var _a, _b;
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", piece.id);
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-size", String(piece.getAttribute('piece-size')));
            console.log(e.dataTransfer);
        };
        this.ondrag = function (e) {
            e.preventDefault();
        };
    }
    connectedCallback() {
        this.innerHTML += '<div class="icon-wrapper"><img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" /><div>';
        this.classList.add('piece');
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
    constructor(board) {
        this.board = board;
    }
    generatePieces(i) {
        var board = document.getElementsByClassName('player')[i].getElementsByClassName('pieces')[0];
        var slots = board.getElementsByClassName('slot');
        for (var j = 0; j < slots.length; j++) {
            var pieceElement = document.createElement('doll-piece');
            slots[j].append(pieceElement);
            var piece = pieceElement;
            piece.board = this.board;
            piece.size = j;
            piece.id = `p${i + 1}-piece-${j + 1}`;
            var img = pieceElement.getElementsByTagName('img')[0];
            // load images here by piece size
            img.style.width = `${j + 1 / slots.length * 100}%`;
        }
    }
}

"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
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
    var player1 = new Player(board);
    var player2 = new Player(board);
    var players = [];
    players.push(player1);
    players.push(player2);
    board.generateBoard();
    for (var i = 0; i < players.length; i++) {
        players[i].generatePieces(i);
    }
}
