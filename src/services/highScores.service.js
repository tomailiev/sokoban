import firebase, { db } from '../utils/firebase';
const highScoresRef = db.collection('highScores');

function getHighScores() {
    return highScoresRef
        .orderBy('level', 'desc')
        .orderBy('total')
        .limit(12)
        .get()
        .then(snaps => {
            const scores = [];
            snaps.forEach(x => scores.push(Object.assign(x.data(), { id: x.id })));
            return scores;
        });
}

function addHighScore(score) {
    if (!score) {
        return Promise.resolve(null);
    }
    return highScoresRef.doc().set({
        ...score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export { getHighScores, addHighScore };