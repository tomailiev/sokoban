import squareSize from '../config/squareSize';

const boardWrapperStyle = (width, height = 1) => ({
    position: 'relative',
    width: width * squareSize,
    height: height * squareSize,
    margin: '50px auto'
});

export default boardWrapperStyle;