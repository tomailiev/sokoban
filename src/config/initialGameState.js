const initialGameState = {
    level: { positions: {}, objects: [], longest: 20 },
    currentObjects: [],
    isStarted: false,
    isComplete: false,
    isGameDone: false,
    hasVisualController: false,
    undoneObject: [],
    moves: 0,
    time: '0:00',
    theme: 'defaultPics',
    pauseMessage: 'Select level above'
};


export default initialGameState;