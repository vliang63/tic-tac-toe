var React = require('react');
var ReactDOM = require('react-DOM');

var GameBoard = React.createClass({
	render: function() {
		return (
			<h1>Hello Val again</h1>
		)
	}
});

ReactDOM.render(
	<GameBoard />,
	document.getElementById('content')
);