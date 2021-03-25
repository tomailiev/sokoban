// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import GameScene from './components/GameScene';
import Player from './components/Player';
import { useEffect, useState } from 'react';
import getUser from './services/user.service';
import UserContext from './contexts/UserContext';

function App() {

  const [user, setUser] = useState({ bestLevel: null });

  useEffect(() => {
    getUser()
      .then(u => setUser(u))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={GameScene} />
            <Route path="/player" component={Player} />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
