import setPosition from "./setPosition";

const legend = {
    //static
    '#': (pos) => ({ type: 'brick', static: true, id: `brick${pos}`, position: pos }),
    ' ': (pos) => ({ type: 'path', static: true, id: `path${pos}`, position: pos }),
    '.': (pos) => ({ type: 'goal', static: true, id: `goal${pos}`, position: pos }),
    //non-static
    '@': (pos) => ({ type: 'player', static: false, id: `player1`, position: pos, onGoal: false }),
    '+': (pos) => ({ type: 'player', static: false, id: `player1`, position: pos, onGoal: true }),
    '$': (pos) => ({ type: 'box', static: false, id: `box${pos}`, position: pos, onGoal: false }),
    '*': (pos) => ({ type: 'box', static: false, id: `box${pos}`, position: pos, onGoal: true }),
}
//build grid
const positionValues = {
    brick: () => null,
    player: (obj) => obj.onGoal ? 'g' : 'p',
    box: (obj) => obj.onGoal ? `g${obj.id}` : `p${obj.id}`,
    path: () => 'p',
    goal: () => 'g' 
};
//add tile under non-static objects
function createExtraObject(obj) {
    return obj.onGoal
        ? legend['.'](obj.position)
        : legend[' '](obj.position);
}

function getGameContext(arr = []) {
    const positions = {};
    const objects = [];
    let longest = Number.MIN_SAFE_INTEGER;

    arr.forEach((line, iY) => {
        if (line.length > longest) { longest = line.length }
        const trimmedStart = line.indexOf('#');
        Array.from(line.trimStart()).forEach((char, iX) => {
            const pos = setPosition(iY, (iX + trimmedStart));
            const currentSquare = legend[char](pos);
            positions[pos] = positionValues[currentSquare.type](currentSquare);
            if (!currentSquare.static) {
                const extraObject = createExtraObject(currentSquare);
                objects.push(extraObject);
            }
            objects.push(currentSquare);
        });
    });

    return [
        objects,
        positions,
        longest
    ];
}

export default getGameContext;