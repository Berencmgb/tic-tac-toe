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
