const ThemeSelect = (props) => {

    return (
        <select className="button-square" value="Select theme" onChange={(e) => console.log(e)}>
            <option value="Select theme" disabled>Theme...</option>
            {/* {props.levels.map(x => <option key={x[0]} value={x[0]}> Level {x[0]}</option>)} */}
        </select>
    );
};

export default ThemeSelect;