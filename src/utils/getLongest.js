function getLongest(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    arr.forEach(x => {
        if (x.length > max) {
            max = x.length
        }
    });

    return max;
}

export default getLongest;