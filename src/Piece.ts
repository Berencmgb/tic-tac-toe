class Piece extends HTMLElement {
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
        this.setId = function(id){
            this.setId(id);
        }

    }
    connectedCallback(){
        this.innerHTML += '<img class="icon" src="https://static.vecteezy.com/system/resources/previews/001/192/291/original/circle-png.png" />';
        this.classList.add('piece');
    }
    setId(id: number){
        this.id = `piece-${id}`;
    }
}

window.customElements.define('doll-piece', Piece);