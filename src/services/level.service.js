import { db } from '../utils/firebase';
const originalLevelsRef = db.collection('originalLevels');

function getAllOriginalLevels() {
    return originalLevelsRef
        .orderBy('levelIndex')
        .limit(10)
        .get()
}

function addLevel(levelIndex, legend) {
    return originalLevelsRef.doc().set({
        levelIndex,
        legend
    });
}

const levels = [
    [
        '    #####',
        '    #   #',
        '    #$  #',
        '  ###  $##',
        '  #  $ $ #',
        '### # ## #   ######',
        '#   # ## #####  ..#',
        '# $  $          ..#',
        '##### ### #@##  ..#',
        '    #     #########',
        '    #######'
    ],
    [
        '############',
        '#..  #     ###',
        '#..  # $  $  #',
        '#..  #$####  #',
        '#..    @ ##  #',
        '#..  # #  $ ##',
        '###### ##$ $ #',
        '  # $  $ $ $ #',
        '  #    #     #',
        '  ############'
    ],
    [
        '        ########',
        '        #     @#',
        '        # $#$ ##',
        '        # $  $#',
        '        ##$ $ #',
        '######### $ # ###',
        '#....  ## $  $  #',
        '##...    $  $   #',
        '#....  ##########',
        '########'
    ]
]

const levelService = () => {
    return Promise.resolve(levels)
}

export default levelService;
export { addLevel, getAllOriginalLevels };