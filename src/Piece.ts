class Piece extends HTMLElement {
    size: PieceSize;

    constructor(size: PieceSize){
        super()
        this.size = size;

        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
        this.setAttribute('id', 'test-piece-one');
        this.ondragstart = function(e){
            var piece = (this as HTMLElement);

            e.dataTransfer?.setData("id", piece.id);

            console.log(e.dataTransfer)
        }
        this.ondrag = function(e) {
            e.preventDefault();
        };    
    }
}

window.customElements.define('doll-piece', Piece);