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
