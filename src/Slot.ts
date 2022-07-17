class Slot extends HTMLElement{    
    board: Board | undefined;
    piece: Piece | undefined;

    constructor(slotNumber: number){
        super();
        this.ondragover = e => { 
            e.preventDefault();

            var targetElement = e.target as HTMLElement;

            if(!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot') as HTMLElement;

            targetElement.classList.add('dragged-over');

         };
        this.ondragenter = function(e){
            var targetElement = e.target as HTMLElement;

            if(!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot') as HTMLElement;

            targetElement.classList.add('dragged-over');
        }
        this.ondragleave = function(e) {
            var targetElement = e.target as HTMLElement;

            if(!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot') as HTMLElement;

            targetElement.classList.remove('dragged-over');
        }
        this.ondrop = function(e) {
            e.preventDefault();

            var currentSlotPieceElement = (this as HTMLElement).getElementsByClassName('piece')[0];
            var currentSlotPiece = currentSlotPieceElement as Piece;

            var targetElement = e.target as HTMLElement;

            if(!targetElement.classList.contains('slot'))
                targetElement = targetElement.closest('.slot') as HTMLElement;

            targetElement.classList.remove('dragged-over');

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
            
            var dropTargetElement = e.target as HTMLElement;            
            if(!dropTargetElement.classList.contains('slot'))
                dropTargetElement = dropTargetElement.closest('.slot')!;
            
            dropTargetElement.innerHTML = "";
            dropTargetElement.appendChild(draggedPieceElement);
            draggedPieceElement.setAttribute('draggable', 'false');
            
            var draggedPiece = draggedPieceElement as Piece;
            draggedPiece.setPieceSize(Number(e.dataTransfer?.getData('piece-size')));
            draggedPiece.setSlot(this as Slot);
            draggedPiece.player!.remainingPieces! -= 1;
            (this as Slot).piece = draggedPiece;

            
            ((draggedPieceElement as HTMLElement).closest('.slot') as Slot).board?.swapPlayer();
            (this as Slot).board?.calculateWinner();
            e.dataTransfer?.items.clear();
        }    
    }
    connectedCallback(){
        this.classList.add("slot");
    }
    setPiece(piece: Piece){
        this.piece = piece;
    }
}


window.customElements.define('board-slot', Slot);