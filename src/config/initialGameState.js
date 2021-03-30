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

export default initialGameState;