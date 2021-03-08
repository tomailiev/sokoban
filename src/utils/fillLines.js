function fillLines (str, length) {
    const arr = Array.from(str);
    const firstIndex = arr.indexOf('#');
    const lastIndex = arr.lastIndexOf('#');
    arr.fill('#', 0, firstIndex);
    for (let i = lastIndex; i < length - 1; i++) {
        arr.push('#');
    }

    return arr;
}

export default fillLines;