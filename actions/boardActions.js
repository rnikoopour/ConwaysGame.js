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

function evolve() {
    boardStore.evolve();
}

function toggleAnimation(isAnimated) {
    if (isAnimated) {
	boardStore.toggleAnimation(false);
    } else {
	boardStore.toggleAnimation(true);
    }
}

module.exports = {
    fillCells: fillCells,
    toggleCell: toggleCell,
    evolve: evolve,
    toggleAnimation: toggleAnimation
}
