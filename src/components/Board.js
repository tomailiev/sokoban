import React from 'react';
import getGameContext from '../utils/getGameContext';
import getPosition from '../utils/getPosition';
import setPosition from '../utils/setPosition';
import pics from '../config/pics';
import { singleSquareStyle, boardWrapperStyle, pauseMessageStyle } from '../styles/';
import keyParams from '../config/keyParams';
import VisualController from './VisualController';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            positions: {},
            longest: 0,
            gameOver: false,
            level: [],
            pauseMessage: 'Click here to play'
        };
    }

    componentDidMount() {
        if (this.props.level && this.props.level !== this.state.level) {
            const [objects, positions, longest] = getGameContext(this.props.level);
            this.setState(() => ({ objects, positions, longest, level: this.props.level, gameOver: false }));
        }
    }

    componentDidUpdate() {
        if (this.props.level && this.props.level !== this.state.level) {
            const [objects, positions, longest] = getGameContext(this.props.level);
            this.setState(() => ({ objects, positions, longest, level: this.props.level, gameOver: false }));
        }
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
        let isGameOver;
        const newPosition = setPosition(...newPlayerCoord);
        if (!this.state.positions[newPosition]) { return; }
        if (this.state.positions[newPosition].length > 1) {
            const box = this.state.positions[newPosition].substring(1);
            const newBoxPos = setPosition(...newBoxCoord);
            if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
            this.updateObjectPosition(box, newBoxPos);
            this.updatePositionMap(newPosition, this.state.positions[newPosition].substring(0, 1));
            this.updatePositionMap(newBoxPos, this.state.positions[newBoxPos] + box);
            if (this.state.positions[newBoxPos].startsWith('g')) {
                isGameOver = true;
                Object.entries(this.state.positions)
                    .filter(([key, value]) => value && value[0].startsWith('g') && key !== newBoxPos)
                    .forEach(([_key, value]) => value.length > 1 ? null : isGameOver = false);
            }
        }
        this.updateObjectPosition('player1', newPosition);
        this.props.onMove();
        if (isGameOver) { this.handleGameOver() }
    }

    handleGameOver() {
        this.setState({ gameOver: true });
        this.props.onLevelComplete();
    }

    handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed] || this.state.gameOver) { return; }
        this.props.onStarted();
        const player = this.state.objects.find(x => x.id === 'player1');
        const [posY, posX] = getPosition(player.position);
        this.handleMove(...keyParams[keyPressed](posY, posX));
    }

    render() {
        return (
            <div>
                <div
                    className="game-level-wrapper"
                    style={boardWrapperStyle(this.state.longest, this.props?.level?.length)}
                    tabIndex="-1"
                    onKeyDown={(e) => this.handleKeyPress(e)}
                    onFocus={() => this.setState({ pauseMessage: '' })}
                    onBlur={() => this.setState({ pauseMessage: 'Click here to return to the game' })}
                >
                    {this.state.pauseMessage && !this.props.controller ? <div style={pauseMessageStyle} className="button-oval">{this.state.pauseMessage}</div> : null}
                    {this.state.objects.map(x => {
                        return <img style={singleSquareStyle(x)} src={pics[x.type]} key={x.id} alt="" />;
                    })}
                </div>
                {this.props.controller ? <VisualController onMove={(e) => this.handleKeyPress(e)} /> : null}
            </div>)
    }
}

export default Board;