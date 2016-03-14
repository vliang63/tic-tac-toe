//Packages
var React = require('react');
var ReactDOM = require('react-DOM');
//Helper Functions
var getNextMove = require('./helpers.js').getNextMove;
var gameOver = require('./helpers.js').gameOver;
//Components
var GameOptions = require('./gameBoardComponents.js').GameOptions;
var ScoreBoard = require('./gameBoardComponents.js').ScoreBoard;
var GameOverAlert = require('./gameBoardComponents.js').GameOverAlert;
var BoardSquare = require('./gameBoardComponents.js').BoardSquare;

var Game = React.createClass({
	render: function () {
		return (
			<div className="container">
				<h3 className="game-title">Tic-Tac-Toe</h3>
				<GameBoard />
			</div>
		)	
	}
});

var GameBoard = React.createClass({
	getInitialState: function() {
		return {
			"boardData": [["","",""],["","",""],["","",""]],
			"currentPlayer":"X",
			"gameOver":false,
			"playerScore":0,
			"opponentScore":0,
			"singlePlayer": "",
			"twoPlayer":"checked",
			"gameStarted": false,
			"winner":""
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
		var addressLoc = address.split(",")
		var boardData = this.state.boardData
		boardData[addressLoc[0]][addressLoc[1]] = this.state.currentPlayer;
		gameOverStatus = gameOver(boardData)
		if (gameOverStatus[0]){
			playerScore = this.state.playerScore;
			opponentScore = this.state.opponentScore;
			if (gameOverStatus[1] === "X"){
				playerScore+=1
			}else{
				opponentScore+=1;
			}
			this.setState({boardData:boardData, winner: gameOverStatus[1], gameOver:true, playerScore:playerScore, opponentScore:opponentScore})
			return;
		}
		var nextPlayer = this.state.currentPlayer === "X" ? "O" : "X";
		var newGameBoardState = {
			"boardData": boardData,
			"currentPlayer": nextPlayer,
		};
		if (this.state.gameStarted === false) {
			newGameBoardState["gameStarted"] = true;
		}
		this.setState(newGameBoardState)		
	},
	componentDidUpdate: function() {
		if (this.state.singlePlayer) {
			if(this.state.currentPlayer === "O") {
				setTimeout(function(){this.handlePieceMove(getNextMove(this.state.boardData))}.bind(this),100)
			}
		}
	},
	handleAlertClose: function() {
		var initialState = this.getInitialState();
		initialState['playerScore'] = this.state.playerScore;
		initialState['opponentScore'] = this.state.opponentScore;
		initialState['singlePlayer'] = this.state.singlePlayer;
		initialState['twoPlayer'] = this.state.twoPlayer;
		this.setState(initialState);
	},
	render: function() {
		return (
			<div className="game-board">
				<GameOverAlert winner={this.state.winner} isOpen={this.state.gameOver} handleAlertClose={this.handleAlertClose} transitionName="modal-anim">
					<div>asdf</div>
				</GameOverAlert>
				<GameOptions gameStarted = {this.state.gameStarted} singlePlayer = {this.state.singlePlayer} twoPlayer={this.state.twoPlayer} handlePlayModeChange = {this.handlePlayModeChange} />
				<ScoreBoard playerScore={this.state.playerScore} opponentScore={this.state.opponentScore} />
				<div className="row">
					<table className="game-board-table col s8 offset-s2">
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
			</div>
		)
	}
});

ReactDOM.render(
	<Game />,
	document.getElementById('content')
);
