'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

var rows = 10;
var cols = 10;
var numCells = rows * cols;
var cells = []

function fillArray() {
    if ((cells.length) == numCells) return;
    
    while (cells.length < numCells) {
	cells.push(true);
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
	cells: cells
    };
    return state;
}

module.exports = {
    getState: getState,
    fillArray: fillArray,
    subscribe: subscribe,
    toggleCell: toggleCell
}
