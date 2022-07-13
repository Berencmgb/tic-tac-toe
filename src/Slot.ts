class Slot extends HTMLElement{

    constructor(slotNumber: number){
        super();
        this.classList.add("slot");
        this.ondragover = e => { e.preventDefault(); };
        this.ondrop = function(e) {
            console.log(e.dataTransfer);
            e.preventDefault();

            var pieceId = e.dataTransfer?.getData("id");
            var pieceElement = document.getElementById(pieceId !) as HTMLElement;
            (e.target as HTMLElement).appendChild(pieceElement);
        }    
    }
}


window.customElements.define('board-slot', Slot);