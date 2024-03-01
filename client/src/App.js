import Authorization from './components/Auth';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {REGISTRETION_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from './routes/routes'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route Component={Authorization} path={LOGIN_ROUTE}/>
          <Route Component={Authorization} path={REGISTRETION_ROUTE}/>
          <Route Component={Home} path={HOME_ROUTE}/>
          <Route Component={Home} path={HOME_ROUTE}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
