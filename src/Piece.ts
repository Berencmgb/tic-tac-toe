class Piece extends HTMLElement {
    hasImage: boolean;
    size: number | undefined;
    player: Player | undefined;

    constructor(){
        super()
        this.ondragstart = function(e){
            if((this as HTMLElement).getAttribute('draggable') == 'false')
            {
                e.preventDefault();
                return;
            }

            if((this as HTMLElement).closest('.disabled') != undefined)
            {
                e.preventDefault();
                return;
            }

            var pieceElement = (this as HTMLElement);
            var piece = pieceElement as Piece;

            e.dataTransfer?.setData("piece-id", pieceElement.id);
            e.dataTransfer?.setData("piece-size", String(piece.size));

            console.log(e.dataTransfer)
        }
        this.hasImage = false;
        this.ondrag = function(e) {
            e.preventDefault();
        };
    }
    connectedCallback(){
        if(this.hasImage)
            return;
        
        this.hasImage = true;
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
    }
    setId(id: number){
        this.id = `piece-${id}`;
    }
    setPieceSize(size: number) {
        this.size = size;
        
        var htmlElement = this as HTMLElement;
        var imageElement = htmlElement.getElementsByTagName('img')[0];
        imageElement.style.width = `${size / 5 * 100}%`;
    }
}

window.customElements.define('doll-piece', Piece);