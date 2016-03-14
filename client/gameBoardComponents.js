var React = require('react');
var Modal = require('react-modal');

// npm package used to build modal
// Styling established here and passed through in Modal declaration
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

//Sets single/two player mode
var GameOptions = React.createClass({
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

//Keeps track of score within session
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

//Handles moves for game board squares
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

//Modal that allows for replay of the game on game end
var GameOverAlert = React.createClass({
	render: function() {
		if (this.props.isOpen){
			return (
				<Modal isOpen={true} onRequestClose={this.props.handleAlertClose} style={customModalStyle}>	
						<h4 className="modal-header">Game Over</h4>
						<h6 className="modal-body">Player {this.props.winner} has won!</h6>	
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

module.exports = {
	GameOptions: GameOptions,
	ScoreBoard: ScoreBoard,
	BoardSquare: BoardSquare,
	GameOverAlert: GameOverAlert
}