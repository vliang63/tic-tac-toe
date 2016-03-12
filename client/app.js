var React = require('react');
var ReactDOM = require('react-DOM');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Modal = require('react-modal');
var getNextMove = require('./helpers.js').getNextMove;
var gameOver = require('./helpers.js').gameOver;

var customModalStyle = {
"display":"none",
"position":"fixed",
"left":"0",
"right":"0",
"background-color":"#fafafa",
"padding":"0",
"height":"20%",
"max-height":"70%",
"width":"55%",
"margin":"auto",
"overflow-y":"auto",
"border-radius":"2px",
"will-change":"top, opacity"
};

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
		var disabled = this.props.gameStarted ? "disabled" : "";
		return (
			<form className="player-mode-choice">
				<input disabled={disabled} onClick={this.handlePlayModeChange} checked={this.props.singlePlayer} name="singlePlayer" type="radio" id="singlePlayer" />
      			<label htmlFor="singlePlayer">Single Player</label>
				<input disabled={disabled} onClick={this.handlePlayModeChange} checked={this.props.twoPlayer} name="twoPlayer" type="radio" id="twoPlayer" />
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
			"twoPlayer":"",
			"gameStarted": false
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
		initialState['singlePlayer'] = this.state.singlePlayer;
		initialState['twoPlayer'] = this.state.twoPlayer;
		this.setState(initialState);
	},
	render: function() {
		return (
			<div className="game-board">
				<GameOverAlert isOpen={this.state.gameOver} handleAlertClose={this.handleAlertClose} transitionName="modal-anim">
					<div>asdf</div>
				</GameOverAlert>
				<div className="row">
					<TogglePlay className="col-s4" gameStarted = {this.state.gameStarted} singlePlayer = {this.state.singlePlayer} twoPlayer={this.state.twoPlayer} handlePlayModeChange = {this.handlePlayModeChange} />
					<ScoreBoard className="col-s4" playerScore={this.state.playerScore} opponentScore={this.state.opponentScore} />
				</div>
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
				<Modal isOpen={true} onRequestClose={this.props.handleAlertClose} style={customModalStyle}>
					Game Over
					<button className="btn waves-effect waves-light" onClick={this.props.handleAlertClose}>close</button>
				</Modal>
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

ReactDOM.render(
	<Game />,
	document.getElementById('content')
);
