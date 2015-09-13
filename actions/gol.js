export const CLICK_CELL = 'CLICK_CELL';
export const START_GENERATION = 'START_GENERATION';
export const STOP_GENERATION = 'STOP_GENERATION';
export const NEW_GENERATION = 'NEW_GENERATION';

export function clickCell(cell){
    return {
        type: CLICK_CELL,
        cell: cell
    }
}

export function startGeneration(id){
    return {
        type: START_GENERATION,
        generationId: id
    }
}

export function stopGeneration(id){
    return {
        type: STOP_GENERATION,
        generationId: id
    }
}

function aGeneration(){
    return {
        type: NEW_GENERATION
    }
}

export function newGeneration(){
    return (dispatch, getState) => {
        const { generationId } = getState().gol.toJS();
        if (generationId < 0){
            var id = setInterval(()=> dispatch(aGeneration()), 20);
            dispatch(startGeneration(id));
        } else {
            clearInterval(generationId);
            dispatch(stopGeneration(generationId));
        }
        
    }
}