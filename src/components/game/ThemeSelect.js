import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import * as themes from '../../themes';

const ThemeSelect = () => {

    const { dispatch } = useContext(GameContext);

    function handleThemeChange(e) {
        dispatch({ type: 'changeTheme', payload: e.target.value });
    }

    return (
        <select className="button-square" value="Select theme" onChange={handleThemeChange}>
            <option value="Select theme" disabled>Theme...</option>
            {Object.entries(themes).map(([key, value]) => <option value={key} key={key}>{value.name}</option>)}
        </select>
    );
};

export default ThemeSelect;