import React, { Component, PropTypes } from 'react';
import Grid from './Grid';

class Gol extends Component {
  render() {
    const { clickCell, clickStartGeneration, newGeneration, generationId, cells} = this.props;
    const golStyle = {

    };
    return (
      <div style={golStyle}>
        <button onClick={() => newGeneration() }> {generationId < 0 ? 'Start' : 'Stop' }</button>
        {' '}
        <Grid cells={this.props.cells} clickCell={clickCell} />
      </div>
    );
  }
}

Gol.propTypes = {
  clickCell: PropTypes.func.isRequired,
  newGeneration: PropTypes.func.isRequired,
  generationId: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired
};

export default Gol;
