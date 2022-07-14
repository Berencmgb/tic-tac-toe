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
