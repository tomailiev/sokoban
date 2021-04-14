import { Link } from 'react-router-dom';
import './Home.css';
import sokoOld from '../assets/3_11.png';

const Home = () => {
    return (
        <div className="title-wrapper container responsive-container">
            <h2>Welcome</h2>
            <h5>to</h5>
            <h1>Sokoban</h1>
            <p>
                Originally developed in the 1980s, this game has seen countless implementations over the years. For general information on the game check out the Wiki article <a href="https://en.wikipedia.org/wiki/Sokoban" target="_blank" rel="noreferrer">here</a>.
            </p>
            <img src={sokoOld} alt="Sokoban on Windows 3.11" />
            <p className="caption">Sokoban for Windows by Allan B. Liss, 1992</p>
            <p>
                This implementation aims to showcase the game and its original 50 levels while keeping it simple and fun. For info on how to play please check out the <Link to="/how_to">How To</Link>.
            </p>
        </div>
    );
};

export default Home;