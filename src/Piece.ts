class Piece extends HTMLElement {
    size: PieceSize | undefined;

    constructor(){
        super()

        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
        this.ondragstart = function(e){
            var piece = (this as HTMLElement);

            e.dataTransfer?.setData("piece-id", piece.id);
            e.dataTransfer?.setData("piece-size", String(piece.getAttribute('piece-size')));

            console.log(e.dataTransfer)
        }
        this.ondrag = function(e) {
            e.preventDefault();
        };   
        this.setId = function(id){
            this.setId(id);
        }

    }
    setId(id: number){
        this.id = `piece-${id}`;
    }
    setPieceSize(size: PieceSize){
        this.size = size;
    }
}

window.customElements.define('doll-piece', Piece);