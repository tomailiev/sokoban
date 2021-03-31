function transformToSeconds(timeString) {
    const [mins, secs] = timeString.split(':').map(Number);
    return mins * 60 + secs;
}

function transformFromSeconds(time) {
    return `${Math.floor(time / 60)}:${time % 60 > 9 ? time % 60 : '0' + time % 60}`;
}

export { transformToSeconds, transformFromSeconds };