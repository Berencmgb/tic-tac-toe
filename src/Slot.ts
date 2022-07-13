class Slot extends HTMLElement{    
    board: Board | undefined;

    constructor(slotNumber: number){
        super();
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function(e) {
            e.preventDefault();

            var piece = (this as HTMLElement).getElementsByClassName('piece')[0];

            if(piece != null)
            {
                if(Number(piece.getAttribute('piece-size')) >= Number(e.dataTransfer?.getData('piece-size')))
                    return;

                if(piece.closest('.pieces') != undefined)
                    return;
            }

            if((e.target as HTMLElement).closest('.pieces') != undefined)
                return;           

            //(e.target as Slot).board?.swapPlayer();
            var pieceId = e.dataTransfer?.getData("piece-id");
            var pieceElement = document.getElementById(pieceId !) as HTMLElement;
            pieceElement.setAttribute('draggable', 'false');
            pieceElement.setAttribute('piece-size', String(e.dataTransfer?.getData('piece-size')));
            pieceElement.style.width = String(e.dataTransfer?.getData("piece-width"));
            ((pieceElement as HTMLElement).closest('.slot') as Slot).board?.swapPlayer();
            (e.target as HTMLElement).innerHTML = "";
            (e.target as HTMLElement).appendChild(pieceElement);

            console.log(`Item index: ${(e.target as Slot).board?.boardSlots.indexOf(e.target as Slot)}`);
            e.dataTransfer?.items.clear();
        }    
    }
    connectedCallback(){
        this.classList.add("slot");
        console.log(this.board);
    }
}


window.customElements.define('board-slot', Slot);