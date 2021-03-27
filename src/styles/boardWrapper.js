// import squareSize from '../config/squareSize';

const boardWrapperStyle = (width = 1, height = 1, squareSize) => ({
    position: 'relative',
    width: width * squareSize,
    height: height * squareSize,
    maxWidth: '100vw',
    margin: '50px auto 20px auto',
    userSelect: 'none'
});

export default boardWrapperStyle;