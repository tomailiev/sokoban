const legend = {
    //static
    '#': (posY, posX) => ({ type: 'brick', static: true, id: `brick${posY}.${posX}`, position: `${posY}.${posX}` }),
    ' ': (posY, posX) => ({ type: 'path', static: true, id: `path${posY}.${posX}`, position: `${posY}.${posX}` }),
    '.': (posY, posX) => ({ type: 'goal', static: true, id: `goal${posY}.${posX}`, position: `${posY}.${posX}` }),
    //non-static
    '@': (posY, posX) => ({ type: 'player', static: false, id: `player1`, position: `${posY}.${posX}`, onGoal: false }),
    '+': (posY, posX) => ({ type: 'player', static: false, id: `player1`, position: `${posY}.${posX}`, onGoal: true }),
    '$': (posY, posX) => ({ type: 'box', static: false, id: `box${posY}.${posX}`, position: `${posY}.${posX}`, onGoal: false }),
    '*': (posY, posX) => ({ type: 'box', static: false, id: `box${posY}.${posX}`, position: `${posY}.${posX}`, onGoal: true }),
}

function getSquares(arr = []) {
    const positions = {};
    const objects = [];
    let player = {};
    let longest = Number.MIN_SAFE_INTEGER;

    arr.forEach((line, iY) => {
        if (line.length > longest) { longest = line.length }
        Array.from(line).forEach((char, iX) => {
            const pos = `${iY}.${iX}`;
            const currentSquare = legend[char](iY, iX);
            if (currentSquare.type === 'brick') {
                positions[pos] = null;
                objects.push(currentSquare);
            } else if (currentSquare.type === 'player') {
                let secondLayer;
                if (currentSquare.onGoal) {
                    secondLayer = legend['.'](iY, iX);
                } else {
                    secondLayer = legend[' '](iY, iX);
                }
                positions[pos] = [
                    secondLayer,
                    // currentSquare
                ];
                objects.push(secondLayer);
                player = currentSquare;
            } else if (currentSquare.type === 'box') {
                let secondLayer;
                if (currentSquare.onGoal) {
                    secondLayer = legend['.'](iY, iX);
                } else {
                    secondLayer = legend[' '](iY, iX);
                }
                positions[pos] = [
                    secondLayer,
                    currentSquare
                ];
                objects.push(secondLayer, currentSquare);
            } else {
                positions[pos] = [currentSquare];
                objects.push(currentSquare);
            }
        });
    });

    return [
        objects,
        positions,
        player,
        longest
    ];
}

export default getSquares;