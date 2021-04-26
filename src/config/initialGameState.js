import getGameContext from "../utils/getGameContext";

const initialGameState = {
    level: { positions: {}, objects: [], longest: 20 },
    isStarted: false,
    isComplete: false,
    isGameDone: false,
    shouldReset: false,
    hasVisualController: false,
    undo: false,
    undoneObject: [],
    moves: 0,
    time: '0:00',
    theme: 'defaultPics',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'startGame':
            return { ...state, shouldReset: false, isStarted: true };
        case 'toggleUndo':
            return { ...state, undo: !state.undo };
        case 'move':
            return { ...state, moves: state.moves + 1 };
        case 'completeLevel':
            return state.level.index === 50
                ? { ...state, isComplete: true, isStarted: false, isGameDone: true }
                : { ...state, isComplete: true, isStarted: false };
        case 'setUndo':
            return { ...state, undoneObject: action.payload };
        case 'executeUndo':
            return { ...state, moves: state.moves + 1, undoneObject: [] };
        case 'initReset':
            return { ...state, shouldReset: true, moves: 0 }
        case 'reset':
            return { ...state, shouldReset: false, isStarted: false };
        case 'ready':
            return { ...state, isComplete: false };
        case 'toggleController':
            return { ...state, hasVisualController: !state.hasVisualController };
        case 'setLevel':
            return {
                ...state,
                level: Object.assign(action.payload, getGameContext(action.payload.legend)),
                isComplete: false,
                shouldReset: true,
                moves: 0
            };
        case 'changeTheme':
            return { ...state, theme: action.payload };
        case 'setTimer':
            return { ...state, time: action.payload };
        default:
            return state;
    }
}

export { initialGameState, reducer };