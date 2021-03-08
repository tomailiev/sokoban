import React from 'react';
import getSquares from '../utils/getSquares';
import box from '../assets/box.jpg';
import player from '../assets/player.png';
import path from '../assets/path.png';
import goal from '../assets/goal.png';
import brick from '../assets/brick.jpg';

const pics = {
    box,
    player,
    path,
    goal,
    brick
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            positions: {}
        };
    }

    componentDidMount() {
        const [objects, positions] = getSquares(this.props.level);
        this.setState(() => ({ objects, positions }));
    }


    render() {
        const styleImg = (pos) => ({
            position: 'absolute',
            width: 40,
            height: 'auto',
            top: Number(pos.substring(0, pos.indexOf('.'))) * 40,
            left: Number(pos.substring(pos.indexOf('.') + 1)) * 40
        });

        const styleWrapper = {
            position: 'relative',
            width: '90%',
            margin: '50px auto'
        };
        console.log(this.state.objects);
        return <div className="wrapper" style={styleWrapper}>
            {this.state.objects.map(x => {
                return <img style={styleImg(x.position)} src={pics[x.type]} key={x.id} alt="" />;
            })}
        </div>
    }
}

export default Board;