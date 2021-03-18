const keyParams = {
    ArrowUp: (posY, posX) => [[posY - 1, posX], [posY - 2, posX], [posY, posX]],
    ArrowRight: (posY, posX) => [[posY, posX + 1], [posY, posX + 2], [posY, posX]],
    ArrowDown: (posY, posX) => [[posY + 1, posX], [posY + 2, posX], [posY, posX]],
    ArrowLeft: (posY, posX) => [[posY, posX - 1], [posY, posX - 2], [posY, posX]],
}

export default keyParams;