mainLoop();

function mainLoop() {
    var board = new Board(3, 3);

    var player1 = new Player(board);
    var player2 = new Player(board);

    var players = [];

    players.push(player1);
    players.push(player2);
    
    board.generateBoard();

    for(var i = 0; i < players.length; i++)
    {
        players[i].generatePieces(i);
    }
}