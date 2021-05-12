import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/shared/Header';
import UserContext from './contexts/UserContext';
import { auth } from './utils/firebase';
import Register from './components/user/Register';
import Login from './components/user/Login';
import handleLogout from './components/user/Logout';
import HighScores from './components/HighScores';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from 'react-spinners/BarLoader';
import LoadingContext from './contexts/LoadingContext';
import { getUserData } from './services/user.service';
import WithAuthGuard from './components/shared/WithAuthGuard';
import Footer from './components/shared/Footer';

const Home = React.lazy(() => import('./components/Home'));
const GameScene = React.lazy(() => import('./components/game/GameScene'));
const HowTo = React.lazy(() => import('./components/HowTo'));
const Player = React.lazy(() => import('./components/user/Player'));

function App() {

  const [user, setUser] = useState({ bestLevel: 1 });
  const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
          })
          .catch(console.log);
      } else {
        setUser({ bestLevel: 1 })
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Header />
          <main>
            <Suspense fallback={<BarLoader color="blue" size={15} loading={true} />}>
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
          <ClipLoader color="orange" size={90} loading={isLoading} />
          <ToastContainer autoClose={2000} hideProgressBar={true} pauseOnFocusLoss={false} transition={Slide} />
        </LoadingContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
