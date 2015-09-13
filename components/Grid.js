import React, { Component, PropTypes } from 'react';

function createCellElement(cells, cellIndex, j){
    let cellStyle = {
        backgroundColor: cells[cellIndex].isAlive ? 'green' : 'white',
        height: '10px',
        width: '10px',
        border: '1px solid black'
    };

    return <td style={cellStyle} key={'col_' + j} onClick={() => this.props.clickCell(cells[cellIndex]) }> </td>
}



class Grid extends Component {
  render() {
    const { cells } = this.props;
    
    let rows = [];
    let numbersOfRow = Math.sqrt(cells.length);
    let cellIndex = 0;

    for(let i=0; i< numbersOfRow; i++){
        let cols = [];
        for (let j = 0; j < numbersOfRow; j++) {
            cols.push(createCellElement.call(this, cells, cellIndex, j));
            cellIndex++
        };

        rows.push(<tr key={'row_' + i}> {cols} </tr>)
    }

    return (
        <div className='game'>
            <table className='grid'>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
  }
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired
};

export default Grid;
