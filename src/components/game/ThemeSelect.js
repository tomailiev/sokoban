import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import UserContext from "../../contexts/UserContext";
import * as themes from '../../themes';

const ThemeSelect = () => {

    const { dispatch } = useContext(GameContext);
    const { user } = useContext(UserContext);

    function handleThemeChange(e) {
        dispatch({ type: 'changeTheme', payload: e.target.value });
    }

    return (
        <select className="button-square" value="Select theme" onChange={handleThemeChange}>
            <option value="Select theme" disabled>Theme...</option>
            {Object.entries(themes)
                .sort(([_key1, value1], [_key2, value2]) => value1.index - value2.index)
                .slice(0, Math.ceil(user.bestLevel / 5))
                .map(([key, value]) => <option value={key} key={key}>{value.name}</option>)}
        </select>
    );
};

export default ThemeSelect;