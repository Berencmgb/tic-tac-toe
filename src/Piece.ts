class Piece extends HTMLElement {
    board: Board | undefined;
    size: PieceSize | undefined;
    constructor(){
        super()
        this.ondragstart = function(e){
            var piece = (this as HTMLElement);

            e.dataTransfer?.setData("piece-id", piece.id);
            e.dataTransfer?.setData("piece-size", String(piece.getAttribute('piece-size')));

            console.log(e.dataTransfer)
        }
        this.ondrag = function(e) {
            e.preventDefault();
        };

    }
    connectedCallback(){
        this.innerHTML += '<div class="icon-wrapper"><img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" /><div>';
        this.classList.add('piece');
    }
}

window.customElements.define('doll-piece', Piece);