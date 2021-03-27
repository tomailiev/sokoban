import { db } from '../utils/firebase';
const originalLevelsRef = db.collection('originalLevels');

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

function getSingleLevel(query) {
    return originalLevelsRef
        .where('levelIndex', '==', query)
        .get()
        .then(snapshot =>  {
            const level = {};
            snapshot.forEach(x => {
                const data = x.data();
                level.index = data.levelIndex;
                level.legend = data.legend;
            });
            return level;
        });
}

function addLevel(levelIndex, legend) {
    return originalLevelsRef.doc().set({
        levelIndex,
        legend
    });
}


export { addLevel, getAllOriginalLevels, getSingleLevel };