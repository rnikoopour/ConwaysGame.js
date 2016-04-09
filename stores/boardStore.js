'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

var rows = 20;
var cols = 20;
var numCells = rows * cols;
var cells = []
var isAnimated = false;

function fillArray() {
    if ((cells.length) == numCells) return;
    
    while (cells.length < numCells) {
	cells.push(false);
    }
    eventEmitter.emit('boardUpdated');
}

function toggleCell(index) {
    cells[index] = !cells[index];
    eventEmitter.emit('boardUpdated');
}

function subscribe(callback) {
    eventEmitter.on('boardUpdated', callback);
}

function getState() {
    var state = {
	rows: rows,
	cols: cols,
	numCells: numCells,
	cells: cells,
	isAnimated: isAnimated
    };
    return state;
}

function isNorthAlive(index) {
    return cells[index-rows];
}

function isNorthEastAlive(index) {
    return cells[index-rows + 1];
}

function isEastAlive(index) {
    return cells[index + 1];
}

function isSouthEastAlive(index) {
    return cells[index + rows + 1];
}

function isSouthAlive(index) {
    return cells[index + rows];
}

function isSouthWestAlive(index) {
    return cells[index + rows - 1];
}

function isWestAlive(index) {
    return cells[index - 1];
}

function isNorthWestAlive(index) {
    return cells[index - rows - 1];
}

function countAllNeighbors(index) {
    var livingNeighbors = 0;

    livingNeighbors += isNorthAlive(index) ? 1 : 0;
    livingNeighbors += isNorthEastAlive(index) ? 1 : 0;
    livingNeighbors += isEastAlive(index) ? 1 : 0;
    livingNeighbors += isSouthEastAlive(index) ? 1 : 0;
    livingNeighbors += isSouthAlive(index) ? 1 : 0;
    livingNeighbors += isSouthWestAlive(index) ? 1 : 0;
    livingNeighbors += isWestAlive(index) ? 1 : 0;
    livingNeighbors += isNorthWestAlive(index) ? 1 : 0;

    return livingNeighbors;
}

function countRightColumn(index) {
    var livingNeighbors = 0;

    livingNeighbors += isNorthAlive(index) ? 1 : 0;
    livingNeighbors += isSouthAlive(index) ? 1 : 0;
    livingNeighbors += isSouthWestAlive(index) ? 1 : 0;
    livingNeighbors += isWestAlive(index) ? 1 : 0;
    livingNeighbors += isNorthWestAlive(index) ? 1 : 0;

    return livingNeighbors;
}

function countLeftColumn(index) {
    var livingNeighbors = 0;
    
    livingNeighbors += isNorthAlive(index) ? 1 : 0;
    livingNeighbors += isNorthEastAlive(index) ? 1 : 0;
    livingNeighbors += isEastAlive(index) ? 1 : 0;
    livingNeighbors += isSouthEastAlive(index) ? 1 : 0;
    livingNeighbors += isSouthAlive(index) ? 1 : 0;

    return livingNeighbors;
}

function countLivingNeighbors(index) {
    var livingNeighbors;

    if (index % rows == 0) {
	livingNeighbors = countLeftColumn(index);
    } else if (index % rows == rows -1) {
	livingNeighbors = countRightColumn(index);
    } else {
	livingNeighbors = countAllNeighbors(index);
    }

    return livingNeighbors;
}

function evolve() {
    var newCellState = []
    cells.forEach(function(cellAlive, index) {
	var livingNeighbors = countLivingNeighbors(index);
	if (cellAlive && (livingNeighbors < 2 ||
			  livingNeighbors > 3)) {
	    newCellState.push(!cellAlive);
	} else if (!cellAlive && livingNeighbors == 3) {
	    newCellState.push(!cellAlive);
	} else {
	    newCellState.push(cellAlive);
	}
    });
    cells = newCellState;
    console.log('updated');
    eventEmitter.emit('boardUpdated');
}

function toggleEvolution() {
    console.log(isAnimated);
    if (!isAnimated) {
	isAnimated = setInterval(evolve, 200);
    } else {
	clearInterval(isAnimated);
	isAnimated = false;
    }
    console.log(isAnimated);
    eventEmitter.emit('boardUpdated');
}

module.exports = {
    getState: getState,
    fillArray: fillArray,
    subscribe: subscribe,
    toggleCell: toggleCell,
    evolve: evolve,
    toggleAnimation: toggleEvolution
}
