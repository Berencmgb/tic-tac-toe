class Player{
    constructor(){
    }
    generatePieces(i: number){
        var board = document.getElementsByClassName('player')[i].getElementsByClassName('pieces')[0];

        var slots = board.getElementsByClassName('slot');

        for(var j = 0; j < slots.length; j++)
        {
            var piece = document.createElement('doll-piece');
            slots[j].append(piece);
            piece.setAttribute('id', `p${i}-piece-${j + 1}`);
            piece.setAttribute('piece-size', `${j + 1}`);
            var img = piece.getElementsByTagName('img')[0];
            // load images here by piece size


            //img.style.width = `${j + 1 / slots.length * 100}%`
        }        
    }
}