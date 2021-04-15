import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function Header() {

    const { user } = useContext(UserContext);
    const [menuShown, setMenuShown] = useState(false);

    function showMenu() {
        setMenuShown(prev => !prev);
    }

    return (
        <header className={menuShown ? 'show' : ''}>
            <article className="logo"></article>
            <nav className="flex-container container container-90 flex-end">
                <ul onClick={() => menuShown ? setMenuShown(false) : null}>
                    <li className="mobile-only" onClick={showMenu}>
                        <i className="fas fa-bars"></i>
                    </li>
                    <li>
                        <NavLink to="/" exact>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game">Play</NavLink>
                    </li>
                    <li>
                        <NavLink to="/high">High Scores</NavLink>
                    </li>
                    <li>
                        <NavLink to="/how_to">How To</NavLink>
                    </li>
                    {user.id
                        ? <>
                            <li>
                                <NavLink to={`/player/${user.id}`}>Player</NavLink>
                            </li>
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        </>
                        : <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;