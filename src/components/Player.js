import { useState } from "react";

function Player(props) {

    const [level, setLevel] = useState('enter value');
    const [number, setNumber] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();

        console.log(level.split('\n'));
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
            <textarea value={level} onChange={e => setLevel(e.target.value)} cols="20" rows="20"></textarea>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default Player;