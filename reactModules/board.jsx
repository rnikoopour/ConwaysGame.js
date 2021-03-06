'use strict';

var React = require('react');
var Cell = require('./cell.jsx');
var boardActions = require('./../actions/boardActions.js');
var boardStore = require('./../stores/boardStore.js');

var Board = React.createClass({
  getInitialState: function() {
    boardStore.subscribe(this.onBoardChange);
    var state = {
      rows: 0,
      cols:0,
      numCells:0,
      cells: [],
      Cells: [],
      isAnimated: false
    };
    return state;
  },
  onBoardChange: function() {
    var storeState = boardStore.getState();
    this.syncCells(storeState);
  },
  syncCells: function(state) {
    state.Cells = this.state.Cells;

    var xpos = 0;
    var y = 0;
    var ypos = 0;
    
    while (state.Cells.length < state.numCells) {
      var xpos = 20 * (state.Cells.length % state.cols);
      ypos = 20 * (y) + 50;
      
      if (state.cols - 1 == (state.Cells.length % state.rows)) {
	y++;
      }

      var cellid = state.Cells.length;
      state.Cells.push(
	<Cell.Cell x={xpos} y={ypos} id={cellid} key={cellid} toggleCell={boardActions.toggleCell} isAlive={false} />
      );
    }

    state.Cells.forEach(function(cell, index) {
      if (cell.isDead != state.cells[index]) {
	state.Cells[index] = React.cloneElement(cell, {
	  isAlive: state.cells[index]
	});
      }
    });

    this.setState(state);
  },
  componentDidMount: function() {
    boardActions.fillCells();
  },
  evolveBoard: function() {
    boardActions.evolve();
  },
  animate: function() {
    boardActions.toggleAnimation(this.state.isAnimated);
  },
  render: function() {
    return (
      <div>
	<button style={{float:'left'}}type="button" onClick={this.evolveBoard}>Evolve</button>
	<label><input type="checkbox" checked={this.state.isAnimated} onClick={this.animate} />Animate</label>
	<div>
	  {this.state.Cells}
	</div>
      </div>
    );
  }
});

module.exports = {
  Board: Board
}
