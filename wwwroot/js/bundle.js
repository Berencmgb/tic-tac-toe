"use strict";
class Board {
    constructor(x, y) {
        this.xSize = x;
        this.ySize = y;
        this.boardSlots = [];
        this.winConditions = [
            //     // Left to rigt
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            //     // up to down
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            //     // diagonal
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
    generateBoard() {
        var _a;
        document.body.innerHTML += `<div class="game-wrapper">
        <div id="player-one-pieces-wrapper" class="player">
            <div class="pieces">

            </div>
        </div>
        <div class="game">
            <div class="border top-border">

            </div>
            <div class="board-wrapper">
                <div class="board">
                </div>
            </div>
            <div class="border bottom-border">

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
    calculateWinner() {
        // get all the object ints with player one
        // get all object ints with player two
        var _a, _b;
        var playerOnePieces = [];
        var playerTwoPieces = [];
        this.boardSlots.forEach(slot => {
            var _a, _b, _c, _d;
            if (slot.piece != null) {
                if ((_b = (_a = slot.piece) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.started) {
                    playerOnePieces.push(this.boardSlots.indexOf(slot));
                }
                if (!((_d = (_c = slot.piece) === null || _c === void 0 ? void 0 : _c.player) === null || _d === void 0 ? void 0 : _d.started)) {
                    playerTwoPieces.push(this.boardSlots.indexOf(slot));
                }
            }
        });
        var compareArrays = (currentArray, targetArray) => targetArray.every(v => currentArray.includes(v));
        var playerWon = false;
        var topElement = document.getElementsByClassName('top-border')[0];
        var winButton = document.createElement('button');
        winButton.setAttribute('onclick', 'window.location.reload()');
        winButton.innerHTML = 'Reset Game';
        this.winConditions.forEach(condition => {
            if (compareArrays(playerOnePieces, condition)) {
                playerWon = true;
                topElement.append('Player 1 Wins!');
            }
            else if (compareArrays(playerTwoPieces, condition)) {
                playerWon = true;
                topElement.append('Player 2 wins!');
            }
        });
        if (!playerWon) {
            if (((_a = this.playerOne) === null || _a === void 0 ? void 0 : _a.remainingPieces) == 0 && ((_b = this.playerTwo) === null || _b === void 0 ? void 0 : _b.remainingPieces) == 0) {
                topElement.append('Draw!');
                topElement.append(winButton);
            }
        }
        else {
            var pieceSlots = document.getElementsByClassName('pieces');
            for (var i = 0; i < pieceSlots.length; i++) {
                pieceSlots[i].classList.add('disabled');
            }
            topElement.append(winButton);
        }
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
    setSlot(pieceSlot) {
        this.pieceSlot = pieceSlot;
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
        this.remainingPieces = 0;
        var starts = i % 2 == 0;
        this.started = starts;
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
            this.remainingPieces++;
        }
    }
}

"use strict";
class Slot extends HTMLElement {
    constructor(slotNumber) {
        super();
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function (e) {
            var _a, _b, _c, _d, _e, _f;
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
    board.playerOne = player1;
    board.playerTwo = player2;
}
