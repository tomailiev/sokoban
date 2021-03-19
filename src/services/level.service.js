import { db } from '../utils/firebase';
const originalLevelsRef = db.collection('originalLevels');
const promoLevelsRef = db.collection('promoLevels');

function getPromoLevels() {
    return promoLevelsRef
        .orderBy('levelIndex')
        .limit(1)
        .get()
        .then(snapshot => {
            let newLevels = [];
            snapshot.forEach(x => {
                const data = x.data();
                newLevels.push({ index: data.levelIndex, legend: data.legend });
            });
            return newLevels;
        })
}

function getAllOriginalLevels(limit = 10) {
    return originalLevelsRef
        .orderBy('levelIndex')
        .limit(limit)
        .get()
        .then(snapshot => {
            let newLevels = [];
            snapshot.forEach(x => {
                const data = x.data();
                newLevels.push({ index: data.levelIndex, legend: data.legend });
            });
            return newLevels;
        })
}

function addLevel(levelIndex, legend) {
    return originalLevelsRef.doc().set({
        levelIndex,
        legend
    });
}


export { addLevel, getAllOriginalLevels, getPromoLevels };