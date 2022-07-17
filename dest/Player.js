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
            piece.size = j + 1;
            piece.player = this;
            var img = pieceElement.getElementsByTagName('img')[0];
            img.style.width = `${(j + 1) / slots.length * 100}%`;
            console.log(pieceElement.size);
        }
    }
}
