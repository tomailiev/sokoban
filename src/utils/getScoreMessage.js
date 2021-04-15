function getScoreMessage(level) {
    if (level <= 5) {
        return 'Nice';
    } else if (level <= 10) {
        return 'Beginner no more';
    } else if (level <= 15) {
        return 'Heating up';
    } else if (level <= 20) {
        return 'Great job!';
    } else if (level <= 25) {
        return 'Halfway to the top';
    } else if (level <= 30) {
        return 'Definitely a pro';
    } else if (level <= 35) {
        return 'Seriously kicking a$$';
    } else if (level <= 40) {
        return 'Can\'t give up now';
    } else if (level <= 45) {
        return 'Amazing';
    } else if (level < 50) {
        return 'Genius!';
    } 
    return 'You da bomb!';
}

export default getScoreMessage;