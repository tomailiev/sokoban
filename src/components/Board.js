import React from 'react';
import getSquares from '../utils/getSquares';
import getPosition from '../utils/getPosition';
import setPosition from '../utils/setPosition';
import pics from '../config/pics';
import squareSize from '../config/squareSize';
import allowedKeys from '../config/allowedKeys';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            positions: {},
            player: {},
            longest: 0
        };
    }

    componentDidMount() {
        const [objects, positions, player, longest] = getSquares(this.props.level);
        this.setState(() => ({ objects, positions, player, longest }));
    }

    handleMove(e) {
        const keyPressed = e.key;
        if (!allowedKeys.includes(keyPressed)) { return; }
        const player = this.state.player
        const [posY, posX] = getPosition(player.position);
        switch (keyPressed) {
            case 'ArrowUp': {
                const newPosition = setPosition(posY - 1, posX); 
                if (!this.state.positions[newPosition]) { return; }
                if (this.state.positions[newPosition].length > 1) {
                    const box = this.state.positions[newPosition].find(x => !x.static);
                    const newBoxPos = setPosition(posY - 2, posX);
                    if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
                    console.log('move possible');
                    this.setState(prevState => ({
                        objects: prevState.objects.map(a => {
                            if (a.id !== box.id) return a;
                            return {
                                ...a,
                                position: newBoxPos
                            };
                        }),
                    }))
                }
                player.position = newPosition;
            }
            break;
            case 'ArrowDown': {
                const newPosition = setPosition(posY + 1, posX) 
                if (!this.state.positions[newPosition]) { return; }
                if (this.state.positions[newPosition].length > 1) {
                    const box = this.state.positions[newPosition].find(x => !x.static);
                    const newBoxPos = setPosition(posY + 2, posX);
                    if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
                    console.log('move possible');
                }
                player.position = newPosition;
            }
            break;
            case 'ArrowLeft': {
                const newPosition = setPosition(posY, posX - 1);
                if (!this.state.positions[newPosition]) { return; }
                if (this.state.positions[newPosition].length > 1) {
                    const box = this.state.positions[newPosition].find(x => !x.static);
                    const newBoxPos = setPosition(posY, posX - 2);
                    if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
                    console.log('move possible');
                }
                player.position = newPosition;
            }
            break;
            case 'ArrowRight': {
                const newPosition = setPosition(posY, posX + 1) 
                if (!this.state.positions[newPosition]) { return; }
                if (this.state.positions[newPosition].length > 1) {
                    const box = this.state.positions[newPosition].find(x => !x.static);
                    const newBoxPos = setPosition(posY, posX + 2);
                    if (!this.state.positions[newBoxPos] || this.state.positions[newBoxPos].length > 1) { return; }
                    console.log('move possible');
                }
                player.position = newPosition;
            }
            break;
        }
        
        this.setState({player});
    }


    render() {
        const styleImg = (pos) => ({
            position: 'absolute',
            width: squareSize,
            height: 'auto',
            top: getPosition(pos)[0] * squareSize,
            left: getPosition(pos)[1] * squareSize
        });

        const styleWrapper = {
            position: 'relative',
            width: this.state.longest * squareSize,
            margin: '50px auto'
        };
        return <div className="wrapper" style={styleWrapper} tabIndex="-1" onKeyDown={(e) => this.handleMove(e)}>
            {this.state.objects.map(x => {
                return <img style={styleImg(x.position)} src={pics[x.type]} key={x.id} alt="" />;
            })}
            {this.state.player.position
                ? <img style={styleImg(this.state.player.position)} src={pics[this.state.player.type]} alt="" />
                : ''
            }
        </div>
    }
}

export default Board;