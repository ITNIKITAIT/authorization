import Authorization from './components/Auth';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {REGISTRETION_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from './routes/routes'
import { useContext, useEffect } from 'react';
import { Context } from '.';
import { AuthService } from './services/auth.service';

const App = () => {
  const {user} = useContext(Context)
  useEffect(() => {
    AuthService.check().then(data => {
      user.setIsAuth(true)
    }).catch(err => {
      alert(err)
    })
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route Component={Authorization} path={LOGIN_ROUTE}/>
          <Route Component={Authorization} path={REGISTRETION_ROUTE}/>
          <Route Component={Home} path={HOME_ROUTE}/>
          <Route Component={Home} path={'*'}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
