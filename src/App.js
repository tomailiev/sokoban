import React from 'react';
import './App.css';
import Header from './components/shared/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Player from './components/user/Player';
import { Suspense, useEffect, useState } from 'react';
import UserContext from './contexts/UserContext';
import Register from './components/user/Register';
import { auth } from './utils/firebase';
import Login from './components/user/Login';
import handleLogout from './components/user/Logout';
import { getUserData } from './services/user.service';
import HighScores from './components/HighScores';
import Footer from './components/shared/Footer';
import WithAuthGuard from './components/shared/WithAuthGuard';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HowTo from './components/HowTo';

const GameScene = React.lazy(() => import('./components/game/GameScene'));

function App() {

  const [user, setUser] = useState({ bestLevel: 1 });
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        getUserData(u.uid)
          .then(userData => {
            setUser({
              displayName: u.displayName,
              email: u.email,
              photoUrl: u.photoURL,
              id: u.uid,
              bestLevel: userData.bestLevel,
              scores: userData.scores
            });
            setIsLoadingUser(false);
          })
          .catch(console.log);
      } else {
        setUser({ bestLevel: 1 })
        setIsLoadingUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game" component={GameScene} />
              <Route path="/how_to" component={HowTo} />
              <Route path="/high" component={HighScores} />
              <WithAuthGuard path="/player/:id" component={Player} shouldAuth={true} />
              <Route path="/logout" render={handleLogout} />
              <WithAuthGuard path="/login" component={Login} shouldAuth={false} />
              <WithAuthGuard path="/register" component={Register} shouldAuth={false} />
              <Route path="*"><Redirect to="/" /></Route>
            </Switch>
          </Suspense>
        </main>
        <Footer />
        <ToastContainer autoClose={1500} hideProgressBar={true} pauseOnFocusLoss={false} transition={Slide} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
