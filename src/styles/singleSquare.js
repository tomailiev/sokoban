import squareSize from '../config/squareSize';
import getPosition from '../utils/getPosition';

const singleSquareStyle = (obj) => ({
    position: 'absolute',
    width: squareSize,
    height: 'auto',
    top: getPosition(obj.position)[0] * squareSize,
    left: getPosition(obj.position)[1] * squareSize,
    zIndex: obj.static ? 1 : 50,
    background: obj.type === 'goal' 
        ? 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(215,215,215,1) 50%, rgba(255,255,255,1) 100%)' 
        : null,
    transitionProperty: 'left, top',
    transitionDuration: '50ms'
});

export default singleSquareStyle;

// background: rgb(0,212,255);
// background: radial-gradient(circle, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%); 