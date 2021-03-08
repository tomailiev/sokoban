import React from 'react';
import './Board.css';
import { fabric } from 'fabric';
import getLongest from '../utils/getLongest';
import fillLines from '../utils/fillLines';
import dude from '../assets/dude.svg';

const pieces = {
    '#': (posX, posY) => ({
        fill: '#C3C7CB',
        width: 28,
        height: 28,
        strokeWidth: 2,
        stroke: '#868A8E',
        left: posX,
        top: posY
    }),
    // ' ': (posX, posY) => ({
    //     fill: 'transparent',
    //     width: 30,
    //     height: 30,
    //     left: posX,
    //     top: posY
    // }),
    ' ': (posX, posY) => ({
        fill: '#00FFFF',
        width: 30,
        height: 30,
        left: posX,
        top: posY
    }),
    '$': (posX, posY) => ({
        fill: '#FFFF00',
        width: 25,
        height: 25,
        left: posX,
        top: posY,
        strokeWidth: 5,
        stroke: '#FF0000'
    }),
    '.': (posX, posY) => ({
        fill: '#000000',
        width: 30,
        height: 30,
        left: posX,
        top: posY,
    })
};

const allowedKeys = {
    ArrowUp: (pl, fn, options) => fn.call(pl, 'top', '-=30', options),
    ArrowDown: (pl, fn, options) => fn.call(pl, 'top', '+=30', options),
    ArrowRight: (pl, fn, options) => fn.call(pl, 'left', '+=30', options),
    ArrowLeft: (pl, fn, options) => fn.call(pl, 'left', '-=30', options)
};



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: props.level, canvas: {}, player: {} };
    }

    componentDidMount() {
        const canvas = new fabric.StaticCanvas('board');
        canvas.setWidth(1000);
        canvas.setHeight(500);

        let posX = 0;
        let posY = 0;

        const longest = getLongest(this.state.level);

        this.state.level.forEach(x => {
            fillLines(x, longest).forEach(char => {
                if (char === '@') {
                    const playerX = posX + 5;
                    const playerY = posY
                    canvas.add(new fabric.Rect(pieces[' '](posX, posY)));
                    fabric.loadSVGFromURL(dude, (obj, options) => {
                        const player = obj[0];
                        player.set({
                            left: playerX,
                            top: playerY,
                        });
                        player.scaleToHeight(30);
                        // player.toObject = (function (toObject) {
                        //     return function () {
                        //         return fabric.util.object.extend(toObject.call(this), { name: this.name });
                        //     };
                        // })(player.toObject);
                        // player.name = 'player';
                        canvas.add(player);
                        this.setState({ player: player });
                    })
                } else {
                    canvas.add(new fabric.Rect(pieces[char](posX, posY)));
                }
                posX += 30;
            });
            posY += 30;
            posX = 0;
        });
        setInterval(() => {
            this.setState({ canvas: canvas });
        }, 0);
    }

    componentWillUnmount() {

    }



    updatePos(e) {
        if (!allowedKeys[e.key]) { return; }
        const options = {
            onChange: this.state.canvas.renderAll.bind(this.state.canvas),
            duration: 1
        };
        const fn = this.state.player.animate;

        allowedKeys[e.key](this.state.player, fn, options);
        // this.state.player.animate('left', '+=30', {
        //     onChange: this.state.canvas.renderAll.bind(this.state.canvas),
        //     duration: 30
        // });
    }

    render() {
        return (
            <div className='canvas-wrapper' tabIndex="-1" onKeyDown={(e) => this.updatePos(e)}>
                <canvas id="board"></canvas>
            </div>
        )
    }
}

export default Board;