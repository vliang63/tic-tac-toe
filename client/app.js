var React = require('react');
var ReactDOM = require('react-DOM');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// var nextChoice = require('./helpers.js')

// alert to refresh and replay game
//To Do: Make Player Scores
//Toggle auto Play vs Minimax
//disable playmode during game duration
//Style


var Game = React.createClass({
	render: function () {
		return (
			<div className="container">
				<h1 className="game-title">Tic-Tac-Toe</h1>
				<GameBoard />
			</div>
		)	
	}
});

var ScoreBoard = React.createClass({
	render: function () {
		return (
			<table className="score-board striped centered">
				<thead><tr><th>Player (X)</th><th>Opponent (O)</th></tr></thead>
				<tbody>
					<tr><td>{this.props.playerScore}</td><td>{this.props.opponentScore}</td></tr>
				</tbody>
			</table>
		)
	}
});

var TogglePlay = React.createClass({
	handlePlayModeChange: function(e){
		console.log(e.target.name)
		this.props.handlePlayModeChange(e.target.name);
	},
	render: function() {
		return (
			<form className="player-mode-choice">
				<input onClick={this.handlePlayModeChange} checked={this.props.singlePlayer} name="singlePlayer" type="radio" id="singlePlayer" />
      			<label htmlFor="singlePlayer">Single Player</label>
				<input onClick={this.handlePlayModeChange} checked={this.props.twoPlayer} name="twoPlayer" type="radio" id="twoPlayer" />
      			<label htmlFor="twoPlayer">Two Player</label>
			</form>

		)
	}	

});

var GameBoard = React.createClass({
	getInitialState: function() {
		console.log('getting initial state')
		return {
			"boardData": [["","",""],["","",""],["","",""]],
			"currentPlayer":"X",
			"gameOver":false,
			"playerScore":0,
			"opponentScore":0,
			"singlePlayer": "checked",
			"twoPlayer":""
		}
	},
	handlePlayModeChange: function(value){
		var singlePlayer = "";
		var twoPlayer = "";
		if (value === "singlePlayer"){
			singlePlayer = "checked";
		}else{
			twoPlayer = "checked";
		}

		this.setState({
			singlePlayer: singlePlayer,
			twoPlayer: twoPlayer
		});
	},
	handlePieceMove: function(address){
		console.log('handling piece move')
		var addressLoc = address.split(",")
		var boardData = this.state.boardData
		boardData[addressLoc[0]][addressLoc[1]] = this.state.currentPlayer;
		gameOverStatus = gameOver(boardData)
		if (gameOverStatus[0]){
			console.log('game over')
			console.log(gameOverStatus[1])
			playerScore = this.state.playerScore;
			opponentScore = this.state.opponentScore;
			if (gameOverStatus[1] === "X"){
				playerScore+=1
			}else{
				opponentScore+=1;
			}
			this.setState({boardData:boardData, gameOver:true, playerScore:playerScore, opponentScore:opponentScore})
			return;
		}
		var nextPlayer = this.state.currentPlayer === "X" ? "O" : "X";
		this.setState({
			"boardData": boardData,
			"currentPlayer": nextPlayer
		})		
	},
	componentDidUpdate: function() {
		if (this.state.singlePlayer) {
			console.log('componenetdidupdate')
			console.log(this.state.currentPlayer)
			if(this.state.currentPlayer === "O") {
				console.log('handling move')
				setTimeout(function(){this.handlePieceMove(getNextMove(this.state.boardData, this.state.currentPlayer).join(","))}.bind(this),1000)
			}
		}
	},
	handleAlertClose: function() {
		console.log('handling alert close')
		var initialState = this.getInitialState();
		initialState['playerScore'] = this.state.playerScore;
		initialState['opponentScore'] = this.state.opponentScore;
		initialState['playMode'] = this.state.playMode;
		this.setState(initialState);
	},
	render: function() {
		return (
			<div className="game-board">
				<GameOverAlert isOpen={this.state.gameOver} handleAlertClose={this.handleAlertClose} transitionName="modal-anim">
					<div>asdf</div>
				</GameOverAlert>
				<TogglePlay singlePlayer = {this.state.singlePlayer} twoPlayer={this.state.twoPlayer} handlePlayModeChange = {this.handlePlayModeChange} />
				<ScoreBoard playerScore={this.state.playerScore} opponentScore={this.state.opponentScore} />
				<table className="game-board-table">
					<tbody>
						<tr className="row-1">
							<BoardSquare address="0,0" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[0][0]}/>
							<BoardSquare address="0,1" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[0][1]}/>
							<BoardSquare address="0,2" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[0][2]}/>
						</tr>
						<tr className="row-2">
							<BoardSquare address="1,0" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[1][0]}/>
							<BoardSquare address="1,1" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[1][1]}/>
							<BoardSquare address="1,2" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[1][2]}/>
						</tr>
						<tr className="row-3">
							<BoardSquare address="2,0" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[2][0]}/>
							<BoardSquare address="2,1" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[2][1]}/>
							<BoardSquare address="2,2" player={this.state.currentPlayer} handlePieceMove={this.handlePieceMove} status={this.state.boardData[2][2]}/>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
});

var GameOverAlert = React.createClass({
	render: function() {
		console.log(this.props.isOpen)
		if (this.props.isOpen){
			return (
				<ReactCSSTransitionGroup transitionName={this.props.transitionName}>
					<div className="game-over-alert ">
						<div className="none">
							<h1>Game Over</h1>
							<button onClick={this.props.handleAlertClose} className="waves-effect waves-light btn">Play Again</button>
						</div>
					</div>
				</ReactCSSTransitionGroup>
			)
		}else{
			return <div></div>
		}
	}
	
});

var BoardSquare = React.createClass({
	handlePieceMove: function() {
		if (!this.props.status && this.props.status !== this.props.player){
			console.log('moving piece')
			this.props.handlePieceMove(this.props.address)
		}		
	},
	render: function () {
		return (
			<td address={this.props.address} onClick={this.handlePieceMove} className="board-square">{this.props.status}</td>
		)
	}
});

/// Functions here to be moved out of file eventually and required.///

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



ReactDOM.render(
	<Game />,
	document.getElementById('content')
);
