class Player{
    started: boolean | undefined;
    remainingPieces: number | undefined;
    constructor(){
    }
    generatePieces(i: number){
        this.remainingPieces = 0;
        var starts = i % 2 == 0;

        this.started = starts;

        var board = document.getElementsByClassName('player')[i].getElementsByClassName('pieces')[0];

        if(!starts)
            board.classList.add('disabled');

        var slots = board.getElementsByClassName('slot');

        for(var j = 0; j < slots.length; j++)
        {
            var pieceElement = document.createElement('doll-piece');
            var piece = pieceElement as Piece;

            slots[j].append(pieceElement);
            pieceElement.setAttribute('id', `p${i}-piece-${j + 1}`);
            piece.setPieceSize(j + 1);
            piece.player = this;
            var img = pieceElement.getElementsByTagName('img')[0];
            this.remainingPieces++;
        }        
    }
}