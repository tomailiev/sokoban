const LevelSelect = (props) => {

    return (
        <select value="Select Level" onChange={(e) => props.handleLevelChange(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
    );
};

export default LevelSelect;