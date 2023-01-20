import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';
import ResetPass from './pages/ResetPass';

function App() {
  // color palette: https://colorswall.com/palette/227825

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/todo' element={ <Todo /> } />
        <Route path='/reset-pass' element={ <ResetPass /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
