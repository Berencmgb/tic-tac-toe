"use strict";
class Board {
    constructor(x, y) {
        this.xSize = x;
        this.ySize = y;
    }
    generateBoard() {
        document.body.innerHTML += `<div class="game-wrapper">
        <div class="player-one-pieces player">
            
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
            <div class="player-two-pieces player">

            </div>
        </div>`;
        var board = document.getElementsByClassName('board')[0];
        if (board == null)
            return;
        // generate slots
        for (var i = 0; i < 9; i++) {
            // if(i == 0 || i == 1)
            //     board.innerHTML += `<board-slot id="slot-${i + 1}"><doll-piece></doll-piece></board-slot>`;
            // else
            board.innerHTML += `<board-slot class="slot" id="slot-${i + 1}"> </board-slot>`;
        }
        var slots = document.getElementsByClassName('slot');
        for (var i = 0; i < 2; i++) {
            var piece = document.createElement('doll-piece');
            slots[i].append(piece);
            piece.setAttribute('id', `piece-${i + 1}`);
            piece.setAttribute('piece-size', `${i + 1}`);
            console.log(piece.id);
        }
        for (var i = 0; i < 2; i++) {
            var piece = document.createElement('doll-piece');
            slots[i + 3].append(piece);
            piece.setAttribute('id', `piece-${i + 3}`);
            piece.setAttribute('piece-size', `${i + 3}`);
            console.log(piece.id);
        }
    }
}

"use strict";
mainLoop();
function mainLoop() {
    var board = new Board(3, 3);
    board.generateBoard();
}

"use strict";
class Piece extends HTMLElement {
    constructor() {
        super();
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
        this.ondragstart = function (e) {
            var _a, _b, _c;
            var piece = this;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("piece-id", piece.id);
            //.dataTransfer?.setData("piece-size", String(piece.getAttribute('piece-size')));
            (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setData("piece-size", String(piece.size));
            console.log((_c = e.dataTransfer) === null || _c === void 0 ? void 0 : _c.getData('piece-size'));
        };
        this.ondrag = function (e) {
            e.preventDefault();
        };
        this.setId = function (id) {
            this.setId(id);
        };
    }
    setId(id) {
        this.id = `piece-${id}`;
    }
    setPieceSize(size) {
        this.size = size;
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

"use strict";
class Printer {
    constructor(message) {
        this.storedMessage = message;
    }
    sayMessege() {
        return console.log(this.storedMessage);
    }
}
