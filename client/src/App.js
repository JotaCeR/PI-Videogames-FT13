import './styles/App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import CreateGame from './components/CreateGame';
import DetailedGame from './components/DetailedGame';

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={() => <Home />} />
      <Route exact path='/videogames' render={() => <Main />} />
      <Route exact path='/create' render={() => <CreateGame />} />
      <Route exact path='/videogame/:id' render={({match}) => <DetailedGame id={match.params.id} />} />
    </div>
  );
}

export default App;
