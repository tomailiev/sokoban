import firebase, { db } from '../utils/firebase';
import { transformToSeconds } from '../utils/transformToSeconds';
const usersRef = db.collection('users');

function createUser(id) {
    return usersRef.doc(id).set({
        bestLevel: 1,
        scores: []
    });
}

function updateUser(id, item = {}) {
    if (item.scores) {
        const { time, moves, level } = item.scores;
        return usersRef.doc(id).update({
            ...item,
            scores: firebase.firestore.FieldValue.arrayUnion({ moves, level, time: transformToSeconds(time) })
        });
    }
    return usersRef.doc(id).update(item);
}

function getUserData(id) {
    return usersRef.doc(id)
        .get()
        .then(u => u.data())
        .catch(console.log);
}

export { createUser, updateUser, getUserData };