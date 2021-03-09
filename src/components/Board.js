import React from 'react';
import getSquares from '../utils/getSquares';
import getPosition from '../utils/getPosition';
import setPosition from '../utils/setPosition';
import pics from '../config/pics';
import { singleSquareStyle, boardWrapperStyle } from '../styles/';

const keyParams = {
    ArrowUp: (posY, posX) => [[posY - 1, posX], [posY - 2, posX]],
    ArrowRight: (posY, posX) => [[posY, posX + 1], [posY, posX + 2]],
    ArrowDown: (posY, posX) => [[posY + 1, posX], [posY + 2, posX]],
    ArrowLeft: (posY, posX) => [[posY, posX - 1], [posY, posX - 2]],
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            positions: {},
            longest: 0
        };

    }

    updateObjectPosition(id, newPosition) {
        this.setState(prevState => ({
            objects: prevState.objects.map(a => {
                if (a.id !== id) return a;
                return {
                    ...a,
                    position: newPosition
                };
            }),
        }))
    }

    updatePositionMap(pos, newValue) {
        this.setState(prevState => ({
            positions: {
                ...prevState.positions,
                [pos]: newValue
            }
        }));
    };

    handleMove(newPlayerCoord, newBoxCoord) {
        const newPosition = setPosition(...newPlayerCoord);
        if (!this.state.positions[newPosition]) { return; }
        if (this.state.positions[newPosition].length > 1) {
            const box = this.state.positions[newPosition].substring(1);
            const newBoxPos = setPosition(...newBoxCoord);
            if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
            this.updateObjectPosition(box, newBoxPos);
            this.updatePositionMap(newPosition, this.state.positions[newPosition].substring(0, 1));
            this.updatePositionMap(newBoxPos, this.state.positions[newBoxPos] + box);
        }
        this.updateObjectPosition('player1', newPosition);
    }

    componentDidMount() {
        const [objects, positions, longest] = getSquares(this.props.level);
        this.setState(() => ({ objects, positions, longest }));
    }

    handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed]) { return; }
        const player = this.state.objects.find(x => x.id === 'player1');
        const [posY, posX] = getPosition(player.position);
        this.handleMove(...keyParams[keyPressed](posY, posX));
    }


    render() {
        return <div className="wrapper" style={boardWrapperStyle(this.state.longest)} tabIndex="-1" onKeyDown={(e) => this.handleKeyPress(e)}>
            {this.state.objects.map(x => {
                return <img style={singleSquareStyle(x)} src={pics[x.type]} key={x.id} alt="" />;
            })}
        </div>
    }
}

export default Board;