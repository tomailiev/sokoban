const LevelSelect = (props) => {

    return (
        <select className="button-square" value={props.current + 1 || 'Select level'} onChange={(e) => props.handleLevelChange(Number(e.target.value) - 1)}>
            <option value="Select level" disabled>Level...</option>
            {props.levels.map(x => <option key={x[0]} value={x[0]}> Level {x[0]}</option>)}
        </select>
    );
};

export default LevelSelect;