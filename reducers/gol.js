import { 
			CLICK_CELL, 
			START_GENERATION, 
			STOP_GENERATION, 
			NEW_GENERATION 
		} from '../actions/gol';

import Immutable from 'immutable';

function updateCell(cells, row, col, fnUpdate){
	return cells.map(cell => {
		if(cell.col === col && cell.row === row){
			return fnUpdate(cell);
		} else {
			return cell;
		}
	})	
}

function clickCell(state = {}, action){
	switch (action.type){
		case CLICK_CELL:
			let fnUpdate = (cell) => Object.assign({}, cell, {
				isAlive : !cell.isAlive
			});
			return updateCell(state, action.cell.row, action.cell.col, fnUpdate);
		default:
			return state;
	}
}

function getCellByRowAndCol(cells, col, row){
	if (row < 0 || col < 0){
		return;
	}
	return cells.find(cell => cell.row === row && cell.col === col);
}

function isCellAlive(cell){
	return cell && cell.isAlive;
}

function cellAliveNeighbours(cells, cell){
	var col = cell.col;
	var row = cell.row;

	const leftCell      = getCellByRowAndCol(cells, col - 1, row);
	const rightCell     = getCellByRowAndCol(cells, col + 1, row);
	const upCell        = getCellByRowAndCol(cells, col, row - 1);
	const downCell      = getCellByRowAndCol(cells, col, row + 1);
	const upLeftCell    = getCellByRowAndCol(cells, col - 1, row - 1);
	const upRightCell   = getCellByRowAndCol(cells, col + 1, row - 1);
	const downLeftCell  = getCellByRowAndCol(cells, col - 1, row + 1);
	const downRightCell = getCellByRowAndCol(cells, col + 1, row + 1);

	let numberOfAliveCell = 0;
	numberOfAliveCell = isCellAlive(leftCell)      ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(rightCell)     ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(upCell)        ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(downCell)      ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(upLeftCell)    ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(upRightCell)   ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(downLeftCell)  ? numberOfAliveCell + 1 : numberOfAliveCell;
	numberOfAliveCell = isCellAlive(downRightCell) ? numberOfAliveCell + 1 : numberOfAliveCell;

	return numberOfAliveCell;

}

function newGeneration(state = {}, action){
	switch (action.type){
		case NEW_GENERATION:
			return state.map((cell) =>{
				var numberOfAliveCell = cellAliveNeighbours(state, cell);
				switch (numberOfAliveCell){
					case 0:
					case 1:
						return Object.assign({}, cell, {
								isAlive : false
							});
					case 2:
					case 3:
						return Object.assign({}, cell, {
								isAlive : cell.isAlive
							});
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
						return Object.assign({}, cell, {
								isAlive : false
							});

				}
			});
		default:
			return state;
	}
}

export default function gof(state = {}, action) {
	switch (action.type) {
		case CLICK_CELL:	
			return state.set('cells', clickCell(state.get('cells'), action));
		case START_GENERATION:
			return state.set('generationId', action.generationId)
		case STOP_GENERATION:
			return state.set('generationId', -1);
		case NEW_GENERATION:
			return state.set('cells', newGeneration(state.get('cells'), action));
		default:
			return state;
  }
}
