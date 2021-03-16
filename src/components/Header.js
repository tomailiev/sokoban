import { NavLink } from 'react-router-dom';

function Header(props) {


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
                    <li>
                        <NavLink to="/player">Player</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;