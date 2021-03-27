const initialGameState = {
    level: { positions: {}, objects: [], longest: 1 },
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
    squareSize: 1
};

export default initialGameState;