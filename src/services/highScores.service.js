import firebase, { db } from '../utils/firebase';
const highScoresRef = db.collection('highScores');

function getHighScores(level) {
    return highScoresRef.where('level', '==', level)
        .orderBy('total')
        .limit(3)
        .get()
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