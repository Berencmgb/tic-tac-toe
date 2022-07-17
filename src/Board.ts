class Board {
    xSize: number;
    ySize: number;
    boardSlots : Array<Slot>;
    playerOne: Player | undefined;
    playerTwo: Player | undefined;
    winConditions: [
        number[],
        number[],
        number[],
        number[],
        number[],
        number[],
        number[],
        number[],
    ]
    
    constructor(x: number, y: number){
        this.xSize = x;
        this.ySize = y;
        
        this.boardSlots = [];
        this.winConditions = [
    //     // Left to rigt
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        
    //     // up to down
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

    //     // diagonal
            [0, 4, 8],
            [2, 4, 6]
        ]
    }
    generateBoard(){
        document.body.innerHTML += `<div class="game-wrapper">
        <div id="player-one-pieces-wrapper" class="player">
            <div class="pieces">

            </div>
        </div>
        <div class="game">
            <div class="border top-border">

            </div>
            <div class="board-wrapper">
                <div class="board">
                </div>
            </div>
            <div class="border bottom-border">

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
    calculateWinner() {
        // get all the object ints with player one
        // get all object ints with player two

        var playerOnePieces: Number[] = [];
        var playerTwoPieces: Number[] = [];

        this.boardSlots.forEach(slot => {
            if(slot.piece != null){
                if(slot.piece?.player?.started) {
                    playerOnePieces.push(this.boardSlots.indexOf(slot));
                }
                if(!slot.piece?.player?.started){
                    playerTwoPieces.push(this.boardSlots.indexOf(slot));
                }
            }
        });

        var compareArrays = (currentArray: Number[], targetArray: Number[]) => targetArray.every(v => currentArray.includes(v));
        var playerWon = false;
        var topElement = document.getElementsByClassName('top-border')[0];
        var winButton = document.createElement('button');
        winButton.setAttribute('onclick', 'window.location.reload()');
        winButton.innerHTML = 'Reset Game';

        this.winConditions!.forEach(condition => {
            if(compareArrays(playerOnePieces, condition)){
                playerWon = true;
                topElement.append('Player 1 Wins!');
            }
            else if(compareArrays(playerTwoPieces, condition)){
                playerWon = true;
                topElement.append('Player 2 wins!');
            }
        });

        if(!playerWon)
        {
            if(this.playerOne?.remainingPieces == 0 && this.playerTwo?.remainingPieces == 0){
                topElement.append('Draw!');
                topElement.append(winButton);
            }
        }
        else {
            var pieceSlots = document.getElementsByClassName('pieces');

            for(var i = 0; i < pieceSlots.length; i++)
            {
                pieceSlots[i].classList.add('disabled');
            }
            topElement.append(winButton);
        }
    }

}