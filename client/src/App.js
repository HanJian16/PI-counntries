import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing}></Route>
      <Route path='/home' component={Home}></Route>
    </Router>
  );
}

export default App;