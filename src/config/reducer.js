import getGameContext from "../utils/getGameContext";

const reducer = (state, action) => {
    switch (action.type) {
        case 'startGame':
            return { ...state, isStarted: true };
        case 'completeLevel':
            return state.level.index === 50
                ? { ...state, isComplete: true, isStarted: false, isGameDone: true }
                : { ...state, isComplete: true, isStarted: false };
        case 'reset':
            return { ...state, isStarted: false, moves: 0, currentObjects: state.level.objects, time: '0:00' };
        case 'toggleController':
            return { ...state, hasVisualController: !state.hasVisualController };
        case 'setLevel':
            const level = getGameContext(action.payload.legend);
            return {
                ...state,
                level: Object.assign(action.payload, level),
                isComplete: false,
                moves: 0,
                currentObjects: level.objects,
                pauseMessage: 'Click to play!'
            };
        case 'changeTheme':
            return { ...state, theme: action.payload };
        case 'setTimer':
            return { ...state, time: action.payload };
        case 'undo':
            const lastUndone = state.undoneObject.slice();
            return lastUndone.length
                ? { ...state, currentObjects: lastUndone, moves: state.moves + 1, undoneObject: [] }
                : state;
        case 'playerMove':
            const isPlayer = action.payload.object.id === 'player1';
            return {
                ...state,
                moves: isPlayer ? state.moves + 1 : state.moves,
                undoneObject: action.payload.isBox ? state.undoneObject : state.currentObjects,
                currentObjects: state.currentObjects.map(x => x.id !== action.payload.object.id
                    ? x
                    : {
                        ...x,
                        position: action.payload.newPosition,
                        onGoal: state.level.positions[action.payload.newPosition] === 'goal'
                    }
                )
            };
        case 'setMessage':
            return { ...state, pauseMessage: action.payload };
        default:
            return state;
    }
}

export default reducer;