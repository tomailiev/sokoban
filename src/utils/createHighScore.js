function createHighScore(gameState, user, transformedTime) {
    return {
        name: user.displayName || user.email.substring(0, user.email.indexOf('@')),
        total: transformedTime + gameState.moves,
        level: gameState.level.index,
        time: gameState.time,
        moves: gameState.moves
    };
}

export default createHighScore