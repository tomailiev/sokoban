function createUserScore(gameState, transformedTime) {
    return {
        [gameState.level.index]: {
            time: transformedTime,
            moves: gameState.moves,
            total: transformedTime + gameState.moves
        }
    };
}

export default createUserScore;