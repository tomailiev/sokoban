const keyParams = {
    ArrowUp: (posY, posX) => [[posY - 1, posX], [posY - 2, posX]],
    ArrowRight: (posY, posX) => [[posY, posX + 1], [posY, posX + 2]],
    ArrowDown: (posY, posX) => [[posY + 1, posX], [posY + 2, posX]],
    ArrowLeft: (posY, posX) => [[posY, posX - 1], [posY, posX - 2]],
}

export default keyParams;