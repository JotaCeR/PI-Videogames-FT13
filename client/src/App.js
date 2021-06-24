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
      <Route path='/videogame/:id' render={(props) => <DetailedGame id={props.match.params.id} source={props.location.search} />} />
    </div>
  );
}

export default App;
