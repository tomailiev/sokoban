// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import GameScene from './components/GameScene';

function App() {

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={GameScene} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
