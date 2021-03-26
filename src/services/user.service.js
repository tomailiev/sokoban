import { db } from '../utils/firebase';
const usersRef = db.collection('users');

function createUser(id) {
    return usersRef.doc(id).set({
        bestLevel: 1
    });
}

function updateUser(id, level) {
    return usersRef.doc(id).update({
        bestLevel: level
    });
}

export {createUser, updateUser};