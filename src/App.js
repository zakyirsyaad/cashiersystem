import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cashier from './page/cashier';
import Home from './page/home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cashier' element={<Cashier />} />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
