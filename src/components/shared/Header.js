import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function Header() {

    const { user } = useContext(UserContext)

    return (
        <header>
            <article className="logo"></article>
            <nav className="flex-container container-90 flex-end">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game">Play</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game">High Scores</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game">How To</NavLink>
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