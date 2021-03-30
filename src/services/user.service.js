import { db } from '../utils/firebase';
const usersRef = db.collection('users');

function createUser(id) {
    return usersRef.doc(id).set({
        bestLevel: 1,
        scores: {}
    });
}

function updateUser(id, item = {}) {
    const update = {};
    if (item.scores) {
        const level = Object.keys(item.scores)[0];
        const scores = `scores.${level}`;
        update[scores] =  item.scores[level];
    }
    if (item.bestLevel) {
        update.bestLevel = item.bestLevel;
    }
    return usersRef.doc(id).update(update);
}

function getUserData(id) {
    return usersRef.doc(id)
        .get()
        .then(u => u.data())
        .catch(console.log);
}

export { createUser, updateUser, getUserData };