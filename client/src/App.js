import Authorization from './components/Auth';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route Component={Authorization} path='/auth'/>
          <Route Component={Authorization} path='/register'/>
          <Route Component={Home} path='/'/>
          <Route Component={Home} path='*'/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
