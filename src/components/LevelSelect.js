import { useEffect, useState } from "react";
import getUser from "../services/user.service";

const LevelSelect = (props) => {

    const [levels, setLevels] = useState(0);

    useEffect(() => {
        getUser()
            .then(u => {
                setLevels(u.bestLevel);
                props.handleLevelChange(u.bestLevel);
            })
            .catch(console.error);
    }, [])

    return (
        <select className="button-square" value={props.current || 'Select level'} onChange={(e) => props.handleLevelChange(Number(e.target.value))}>
            <option value="Select level" disabled>Level...</option>
            {Array.from(Array(levels)).map((_x, i) => <option key={i + 1} value={i + 1}> Level {i + 1}</option>)}
        </select>
    );
};

export default LevelSelect;