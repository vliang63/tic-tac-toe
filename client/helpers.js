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

function getNextMoveRandom (board) {
  var boardCoordinates = [[0,0], [0,2], [2,0], [2,2], [1,1], [0,1],[1,0],[1,2],[2,1]];
  for (var i = 0; i < boardCoordinates.length; i++) {
      if(!board[boardCoordinates[i][0]][boardCoordinates[i][1]]){
        return boardCoordinates[i].join(",")
      }
  }
}

module.exports = {
  gameOver:gameOver,
  getNextMove: getNextMoveRandom
}