class Slot extends HTMLElement{    
    board: Board | undefined;

    constructor(slotNumber: number){
        super();
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function(e) {
            e.preventDefault();

            var currentSlotPieceElement = (this as HTMLElement).getElementsByClassName('piece')[0];
            var currentSlotPiece = currentSlotPieceElement as Piece;

            if(currentSlotPieceElement != null)
            {
                if(currentSlotPiece.size! >= Number(e.dataTransfer?.getData('piece-size')))
                    return;

                if(currentSlotPieceElement.closest('.pieces') != undefined)
                    return;
            }

            if((e.target as HTMLElement).closest('.pieces') != undefined)
                return;           

            var draggedPieceId = e.dataTransfer?.getData("piece-id");
            var draggedPieceElement = document.getElementById(draggedPieceId !) as HTMLElement;

            ((draggedPieceElement as HTMLElement).closest('.slot') as Slot).board?.swapPlayer();

            var dropTargetElement = e.target as HTMLElement;
            
            if(!dropTargetElement.classList.contains('slot'))
                dropTargetElement = dropTargetElement.closest('.slot')!;

            dropTargetElement.innerHTML = "";
            dropTargetElement.appendChild(draggedPieceElement);
            draggedPieceElement.setAttribute('draggable', 'false');

            var draggedPiece = draggedPieceElement as Piece;
            draggedPiece.setPieceSize(Number(e.dataTransfer?.getData('piece-size')));

            console.log(`Item index: ${(e.target as Slot).board}`);
            e.dataTransfer?.items.clear();
        }    
    }
    connectedCallback(){
        this.classList.add("slot");
    }
}


window.customElements.define('board-slot', Slot);