const LevelSelect = (props) => {

    return (
        <select className="button-square" value={props.current + 1 || 'Select level'} onChange={(e) => props.handleLevelChange(Number(e.target.value) - 1)}>
            <option value="Select level" disabled>Level...</option>
            {props.levels.map(x => <option key={x.index} value={x.index}> Level {x.index}</option>)}
        </select>
    );
};

export default LevelSelect;