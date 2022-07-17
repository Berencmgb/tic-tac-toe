mainLoop();

function mainLoop() {
    var board = new Board(3, 3);

    var player1 = new Player();
    var player2 = new Player();
    
    board.generateBoard();
    player1.generatePieces(0);
    player2.generatePieces(1);

    board.playerOne = player1;
    board.playerTwo = player2;
}