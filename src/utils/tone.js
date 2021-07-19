import * as Tone from 'tone'

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function triggerStart(notes = []) {
    notes.forEach(n => {
        synth.triggerAttack(n.name, n.start);
        synth.triggerRelease(n.name, n.length);
    });
}

function triggerUndoSound() {
    const now = Tone.now();
    synth.triggerAttack('B3', now);
    synth.triggerRelease('B3', now + 0.04)
    synth.triggerAttack('B3', now + 0.05);
    synth.triggerRelease('B3', now + 0.09);
    synth.triggerAttack('F4', now + 0.1);
    synth.triggerRelease('F4', now + 0.2);
}

function triggerStartSound() {
    const now = Tone.now();
    synth.triggerAttack('C4', now);
    synth.triggerAttack('F4', now);
    synth.triggerAttack('A4', now);
    synth.triggerRelease(['C4', 'F4', 'A4'], now + 0.1);
    synth.triggerAttack('F4', now + 0.2);
    synth.triggerAttack('A4', now + 0.2);
    synth.triggerAttack('C5', now + 0.2);
    synth.triggerRelease(['C5', 'F4', 'A4'], now + 0.4);
}

function triggerLevelCompleteSound() {
    const now = Tone.now();
    // const notes = [
    //     { name: 'C4', start: now, length: 0.4 },
    //     { name: 'E4', start: now, length: 0.4 },
    //     { name: 'G4', start: now, length: 0.4 },
    //     { name: 'C5', start: now, length: 0.2 },
    //     { name: 'Bb4', start: now + 0.2, length: 0.4 },
    // ];
    // triggerStart(notes);
    synth.triggerAttack('C4', now);
    synth.triggerAttack('E4', now);
    synth.triggerAttack('G4', now);
    synth.triggerAttack('C5', now);
    synth.triggerRelease('C5', now + 0.2);
    synth.triggerAttack('Bb4', now + 0.2);
    synth.triggerRelease('Bb4', now + 0.4);
    synth.triggerRelease('C4', now + 0.4);
    synth.triggerRelease('E4', now + 0.4);
    synth.triggerRelease('G4', now + 0.4);
    synth.triggerAttack('F3', now + 0.4);
    synth.triggerAttack('C4', now + 0.4);
    synth.triggerAttack('F4', now + 0.4);
    synth.triggerAttack('A4', now + 0.4);
    synth.triggerRelease('F3', now + 0.8);
    synth.triggerRelease('C4', now + 0.8);
    synth.triggerRelease('F4', now + 0.8);
    synth.triggerRelease('A4', now + 0.8);
}

export { triggerUndoSound, triggerStartSound, triggerLevelCompleteSound };