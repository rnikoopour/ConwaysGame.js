'use stric';

var React = require('react');
var ReactDOM = require('react-dom');

var Board = require('./../../reactModules/board.jsx');

var App = React.createClass({
  render: function() {
    return (
      <Board.Board />
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
