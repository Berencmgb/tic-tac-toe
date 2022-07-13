class Board {
    xSize: number;
    ySize: number;
    boardSlots : Array<Slot>;

    
    constructor(x: number, y: number){
        this.xSize = x;
        this.ySize = y;
        
        this.boardSlots = [];
    }
    generateBoard(){
        document.body.innerHTML += `<div class="game-wrapper">
        <div id="player-one-pieces-wrapper" class="player">
            <div class="pieces">

            </div>
        </div>
        <div class="game">
            <div class="border">

            </div>
            <div class="board-wrapper">
                <div class="board">
                </div>
            </div>
            <div class="border">

            </div>
            </div>
            <div id="player-two-pieces-wrapper" class="player">
                <div class="pieces">

                </div>  
            </div>
        </div>`;

        var board = document.getElementsByClassName('board')[0] as HTMLElement;

        if(board == null)
            return;

        // generate slots

        for(var i = 0; i < 9; i++){
            var slot = document.createElement('board-slot');
            board.append(slot);
            slot.setAttribute('id', `slot-${i+1}`);
            slot.classList.add('slot');
            
            (slot as Slot).board = this;
            this.boardSlots?.push(slot as Slot);
        }

        console.log(this.boardSlots);

        var players = document.getElementsByClassName('player');

        var slots = document.getElementsByClassName('slot');

        for(var i = 0; i < players.length; i++) {
            for(var j = 0; j < 5; j++) {
                var slot = document.createElement('board-slot');
                (slot as Slot).board = this;
                slot.classList.add('slot');
                slot.setAttribute('id', `player-${i}-slot-${j}`);
                players[i].getElementsByClassName('pieces')[0].append(slot);
            }
        }
    }
    swapPlayer() {
        var currentPlayer = document.querySelector('.pieces:not(.disabled)');
        var swapTo = document.querySelector('.pieces.disabled');

        currentPlayer?.classList.add('disabled');
        swapTo?.classList.remove('disabled');
    }
}