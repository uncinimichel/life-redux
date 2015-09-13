import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import Immutable from 'immutable';

const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

function createCells(cols, rows){
	var cell = {
		col  : -1,
		row : -1,
		isAlive : false
	};
	var cells = [];
	for (var j = 0; j < cols; j++) {
		for (var i = 0; i < rows; i++) {
			cells.push(Object.assign({}, cell, {
					col: j, 
					row: i, isAlive: false}));
		};
	};
	return cells;
}

const store = configureStore({ gol : Immutable.Map({generationId:-1, cells: createCells(10, 10)})});

window.gol = {
	store : store
}

React.render(
	<div>
		<Provider store={store}>
		{() => <App />}
		</Provider>
	</div>
  ,
  document.getElementById('root')
);
