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
