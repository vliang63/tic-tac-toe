function findMaxMin (array, maxOrMin) {
  var index = maxOrMin === "max" ? array.length - 1 : 0;
  array.sort(function(x,y) {return x - y;});
  return array[index];
};

function gameOver (board) {
  var fullBoard = "";
  for (var x = 0; x < 3; x++) {
    //check horizontals
    if ((board[x][0]) && (board[x][0] === board[x][1] && board[x][1] === board[x][2])) {
      return [true, board[x][0]];
    }
    //check verticals
    if ((board[0][x]) && (board[0][x] === board[1][x] &&  board[1][x] === board[2][x])) {
      return [true, board[0][x]];
    }
    fullBoard += board[x][0] + board[x][1] + board[x][2];
  }
  //check diagonals
  if ((board[0][0]) && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
    return [true, board[0][0]];
  }
  if ((board[0][2]) && (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
    return [true, board[0][2]];
  }
  // check full board
  if (fullBoard.length === 9) {
    return [true, "Draw"]
  }
  return [false, ""];
}

function getNextMove (board, player) {
  var choice = ""
  function findMaxMin (array, maxOrMin) {
    var index = maxOrMin === "max" ? array.length - 1 : 0;
    array.sort(function(x,y) {return x - y;});
    return array[index];
  };
  function minimax(board, player) {
    var gameOverState = gameOver(board);
    //base cases
    if (gameOverState[0]) {
      if (gameOverState[1] != "Draw") {
        return gameOverState[1] === "X" ? 10 : -10;
      } else {
        return 0;
      }
    }
    
    var scores = [];
    var moves = [];

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          board[i][j] = player;
          scores.push(minimax(board, player === "X" ? "O" : "X"));
          moves.push([i,j])
          board[i][j] = "";
        }
      }
    }

    if (player === "X") {
      var maxScoreIndex = scores.indexOf(findMaxMin(scores, "max"));
      choice = moves[maxScoreIndex] 
      return scores[maxScoreIndex]
    }
    if (player === "O") {
      var minScoreIndex = scores.indexOf(findMaxMin(scores, "min"));
      choice = moves[minScoreIndex]
      return scores[minScoreIndex]
    }
    
  }
  minimax(board, player)
  return choice
}

module.exports = {
  gameOver:gameOver,
  getNextMove: getNextMove
}