class Piece extends HTMLElement {
    hasImage: boolean;
    size: number | undefined;

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

            var piece = (this as HTMLElement);

            e.dataTransfer?.setData("piece-id", piece.id);
            e.dataTransfer?.setData("piece-width", piece.style.width);
            e.dataTransfer?.setData("piece-size", String(piece.getAttribute('piece-size')));

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
}

window.customElements.define('doll-piece', Piece);