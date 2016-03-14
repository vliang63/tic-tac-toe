var React = require('react');
var ReactDOM = require('react-DOM');
var Modal = require('react-modal');
var getNextMove = require('./helpers.js').getNextMove;
var gameOver = require('./helpers.js').gameOver;

var customModalStyle = {
	content: {
		position:"fixed",
		left:"0",
		right:"0",
		backgroundColor:"#fafafa",
		padding:"0",
		height: "25%",
		width:"55%",
		margin:"auto",
		borderRadius:"2px"
	}
};

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

var BoardSquare = React.createClass({
	handlePieceMove: function() {
		if (!this.props.status && this.props.status !== this.props.player){
			this.props.handlePieceMove(this.props.address)
		}		
	},
	render: function () {
		return (
			<td address={this.props.address} onClick={this.handlePieceMove} className="board-square">{this.props.status}</td>
		)
	}
});

var GameOverAlert = React.createClass({
	render: function() {
		if (this.props.isOpen){
			return (
				<Modal isOpen={true} onRequestClose={this.props.handleAlertClose} style={customModalStyle}>	
						<h4 className="modal-header"> Game Over </h4>
						<h6 className="modal-body"> Player {this.props.winner} has won! </h6>	
						<div className="modal-close">
							<button className="btn" onClick={this.props.handleAlertClose}>Click here to play again</button>
						</div>
				</Modal>
			)
		}else{
			return <div></div>
		}
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
		this.props.handlePlayModeChange(e.target.name);
	},
	render: function() {
		var disabled = this.props.gameStarted ? "disabled" : "";
		var showLevel = this.props.singlePlayer === "checked" ? "false" : "true";
		return (
			<form className="col s4 player-mode-choice">
				<input disabled={disabled} onChange={this.handlePlayModeChange} checked={this.props.singlePlayer} name="singlePlayer" type="radio" id="singlePlayer" />
      			<label htmlFor="singlePlayer">Single Player</label>
				<input disabled={disabled} onChange={this.handlePlayModeChange} checked={this.props.twoPlayer} name="twoPlayer" type="radio" id="twoPlayer" />
      			<label htmlFor="twoPlayer">Two Player</label>
				<br></br>
				<input hidden={showLevel} disabled checked="checked" name="singlePlayerEasy" type="radio" id="singlePlayerEasy" />
      			<label hidden={showLevel} htmlFor="singlePlayerEasy">Easy</label>
			</form>
		)
	}	
});

var SinglePlayerLevel = React.createClass({
	render: function() {
		return (
			<form className="single-player-level">
					<input disabled checked="checked" name="singlePlayerEasy" type="radio" id="singlePlayerEasy" />
	      			<label htmlFor="singlePlayerEasy">Easy</label>
			</form>
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
				<TogglePlay gameStarted = {this.state.gameStarted} singlePlayer = {this.state.singlePlayer} twoPlayer={this.state.twoPlayer} handlePlayModeChange = {this.handlePlayModeChange} />
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
