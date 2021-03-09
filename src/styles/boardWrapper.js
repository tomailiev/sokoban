import squareSize from '../config/squareSize';

const boardWrapperStyle = (longest) => ({
    position: 'relative',
    width: longest * squareSize,
    margin: '50px auto'
});

export default boardWrapperStyle;