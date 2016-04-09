'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();
var boardStore = require('./../stores/boardStore.js');

function fillCells() {
    boardStore.fillArray();
}

function toggleCell(index) {
    boardStore.toggleCell(index);
}

module.exports = {
    fillCells: fillCells,
    toggleCell: toggleCell
}
