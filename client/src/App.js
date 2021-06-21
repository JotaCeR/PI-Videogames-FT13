import './styles/App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Route path='/' render={() => <NavBar />} />
      <Route exact path='/' render={() => <Home />} />
      <Route exact path='/videogames' render={() => <Main />} />
    </div>
  );
}

export default App;
