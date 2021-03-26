import { db } from '../utils/firebase';
const usersRef = db.collection('users');

function createUser(id) {
    return usersRef.doc(id).set({
        bestLevel: 1,
        scores: []
    });
}

function updateUser(id, item = {}) {
    return usersRef.doc(id).update(item);
}

function getUserData(id) {
    return usersRef.doc(id)
        .get()
        .then(u => u.data())
        .catch(console.log);
}

export { createUser, updateUser, getUserData };