function getPosition(posString) {
    return [
        Number(posString.substring(0, posString.indexOf('.'))),
        Number(posString.substring(posString.indexOf('.') + 1))
    ] ;
}

export default getPosition;