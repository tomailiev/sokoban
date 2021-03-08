import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock'
import Board from './components/Board';

function App() {

  const boardInitial = [
    '    #####',
    '    #   #',
    '    #$  #',
    '  ###  $##',
    '  #  $ $ #',
    '### # ## #   ######',
    '#   # ## #####  ..#',
    '# $  $          ..#',
    '##### ### #@##  ..#',
    '    #     #########',
    '    #######'
  ];
  
  return (
    <div className="App">
      <Clock />
      <Board level={boardInitial} />
    </div>
  );
}

export default App;
