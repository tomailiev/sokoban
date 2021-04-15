import { useState } from "react";
import { addLevel } from '../../services/level.service';

function UploadLevel(props) {

    const [level, setLevel] = useState('');
    const [index, setIndex] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        addLevel(Number(index), level.split('\n'))
            .then(() => console.log('success'))
            .catch(console.log);
    }

    const formFieldStyle = {
        display: 'block',
        width: 250,
        height: 'auto',
    }

    return (
        <div className="form-wrapper container container-50 flex-container flex-center">
            <h2 className="flex-100">Enter your own level!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div style={formFieldStyle} className="field">
                    <label htmlFor="level-index"> Level index: </label>
                    <input id="level-index" type="number" value={index} onChange={e => setIndex(e.target.value)} />
                </div>
                <div style={formFieldStyle} className="field">
                    <label htmlFor="level-legend">Level legend:</label>
                    <textarea value={level} id="level-legend" onChange={e => setLevel(e.target.value)} cols="30" rows="20"></textarea>
                </div>

                <input style={formFieldStyle} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UploadLevel;