// import logo from './logo.svg';
import './App.css';
import Header from './components/shared/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import GameScene from './components/game/GameScene';
import Player from './components/user/Player';
import { useEffect, useState } from 'react';
import getUser from './services/user.service';
import UserContext from './contexts/UserContext';
import Register from './components/user/Register';
import { auth } from './utils/firebase';
import Login from './components/user/Login';

function App() {

  const [user, setUser] = useState({ bestLevel: 1 });


  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        console.log(u.uid);
        setUser({
          name: u.displayName,
          email: u.email,
          photoUrl: u.photoURL,
          id: u.uid,
          bestLevel: 1
        });
      } else {
        console.log('out');
        setUser({ bestLevel: 1 });
      }
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={GameScene} />
            <Route path="/player" component={user.email ? Player : Login} />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
