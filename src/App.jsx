import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TempPage } from './pages/TempPage/TempPage'
import RouteVisualization from './components/RouteVisualization'; // Твоя карта
import CalculationPage from './components/CalculationPage';       // Твой калькулятор
import './App.css';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-brand">РЖД <span>Логистика</span></div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Карта маршрутов</Link>
        <Link to="/calculation" className={`nav-link ${isActive('/calculation')}`}>Расчет дохода</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<RouteVisualization />} />
            <Route path="/calculation" element={<CalculationPage />} />
            <Route path='/test' element={<TempPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;