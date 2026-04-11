import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { TempPage } from './pages/TempPage/TempPage'
import RouteVisualization from './components/RouteVisualization'; // Твоя карта
import CalculationPage from './components/CalculationPage';       // Твой калькулятор
import './App.css';
import { Client } from './pages/TempPage/klient'
import Dash from './pages/TempPage/dash'
import  AlyaPage  from './pages/TempPage/alya'
import  RailwayTariffCalculator  from './pages/TempPage/formula'


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
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/map" element={<RouteVisualization />} />
            <Route path="/calculation" element={<CalculationPage />} />
            <Route path='/test' element={<TempPage/>}/>
            <Route path='/cl' element={<Client/>}/>
            <Route path='/aleksandra' element={<AlyaPage/>}/>
            <Route path='/formula' element={<RailwayTariffCalculator/>}/>
            <Route path='/' element={<Dash/>}/>
          </Routes>
        </div>
      </div>

  );
}

export default App;
