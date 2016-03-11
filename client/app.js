var React = require('react');
var ReactDOM = require('react-DOM');
// var nextChoice = require('./helpers.js')

var Game = React.createClass({
	render: function () {
		return (
			<div className="container">
				<Title />
				<GameBoard />
			</div>
		)	
	}
});

var Title = React.createClass({
	render: function () {
		return (
			<h1 className="game-title">Tic-Tac-Toe</h1>
		)
	}
});

var GameBoard = React.createClass({
	getInitialState: function() {
		return {
			"boardData": [["X","","O"],["","",""],["","",""]],
			"currentPlayer":"X"
		}
	},
	handlePieceMove: function(address){
		console.log('click heard')
		console.log(address)
		console.log(this.state.currentPlayer)
		var addressLoc = address.split(",")
		var boardData = this.state.boardData
		boardData[addressLoc[0]][addressLoc[1]] = this.state.currentPlayer;
		console.log(boardData[addressLoc[0]][addressLoc[1]])
		var nextPlayer = this.state.currentPlayer === "X" ? "O" : "X";
		this.setState({
			"boardData": boardData,
			"currentPlayer": nextPlayer
		})
	},
	render: function() {
		return (
			<table className="game-board">
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
		)
	}
});

var BoardSquare = React.createClass({
	handlePieceMove: function() {
		console.log('status')
		console.log(this.props.status)
		console.log(this.props.player)
		console.log(this.props.status !== this.props.player)
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

var PlayerPiece = React.createClass({
	render: function () {
	}
});

var OpponentPiece = React.createClass({
	render: function () {
	}
});


ReactDOM.render(
	<Game />,
	document.getElementById('content')
);
