// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/shared/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
// import GameScene from './components/game/GameScene';
import Player from './components/user/Player';
import { Suspense, useEffect, useState } from 'react';
// import getUser from './services/user.service';
import UserContext from './contexts/UserContext';
import Register from './components/user/Register';
import { auth } from './utils/firebase';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import { getUserData } from './services/user.service';
const GameScene = React.lazy(() => import('./components/game/GameScene'));

function App() {

  const [user, setUser] = useState({ bestLevel: 1 });


  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        getUserData(u.uid)
          .then(userData => {
            setUser({
              name: u.displayName,
              email: u.email,
              photoUrl: u.photoURL,
              id: u.uid,
              bestLevel: userData.bestLevel,
              scores: userData.scores
            });
          })
          .catch(console.log);
      } else {
        setUser({ bestLevel: 1 });
      }
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Suspense fallback="<div>Loading...</div>">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game" component={GameScene} />
              <Route path="/player" component={Player} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Suspense>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
