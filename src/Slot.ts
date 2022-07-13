class Slot extends HTMLElement{

    constructor(slotNumber: number){
        super();
        this.classList.add("slot");
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function(e) {
            e.preventDefault();

            var piece = (this as HTMLElement).getElementsByClassName('piece')[0];

            if(piece != null)
            {
                if(Number(piece.getAttribute('piece-size')) >= Number(e.dataTransfer?.getData('piece-size')))
                    return;
            }
            
            var pieceId = e.dataTransfer?.getData("piece-id");
            var pieceElement = document.getElementById(pieceId !) as HTMLElement;
            (e.target as HTMLElement).appendChild(pieceElement);
        }    
    }
}


window.customElements.define('board-slot', Slot);