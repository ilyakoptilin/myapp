import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import RouteVisualization from './pages/Map/RouteVisualization';
import CalculationPage from './pages/Calculation/CalculationPage';
import './App.css';
import { Client } from './pages/Clients/ClientsPage';
import Dash from './pages/Dashboard/Dashboard';
import AlyaPage from './pages/CargoAnalytics/CargoAnalyticsPage';
import RailwayTariffCalculator from './pages/TariffFormula/TariffFormulaPage';

const navItems = [
  { to: '/', label: 'Dashboard', description: 'Сводка прогноза' },
  { to: '/cl', label: 'Клиенты и доходы', description: 'Структура выручки' },
  { to: '/aleksandra', label: 'Аналитика грузов', description: 'Грузы и сценарии' },
  { to: '/formula', label: 'Тарифная формула', description: 'Коэффициенты' },
  { to: '/calculation', label: 'Калькулятор', description: 'Расчет дохода' },
  { to: '/map', label: 'Карта маршрутов', description: 'Сеть и потоки' },
];

const pageMeta = {
  '/': ['Dashboard', 'Единая панель прогноза доходов РЖД до 2036 года'],
  '/cl': ['Клиенты и доходы', 'Структура выручки по грузам и ключевым клиентам'],
  '/aleksandra': ['Аналитика грузов', 'Сценарии, динамика и структура грузоперевозок'],
  '/formula': ['Тарифная формула', 'Расчет тарифных коэффициентов и дохода'],
  '/calculation': ['Калькулятор дохода', 'Интерактивный расчет по маршруту и параметрам перевозки'],
  '/map': ['Карта маршрутов', 'Визуализация железнодорожной сети и грузовых направлений'],
};

function AppShell({ children }) {
  const location = useLocation();
  const [title, subtitle] = pageMeta[location.pathname] || pageMeta['/'];

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink to="/" className="app-logo" aria-label="На главную">
          <span className="app-logo-mark">РЖД</span>
          <span>
            <strong>Прогноз доходов</strong>
            <small>грузоперевозки 2026–2036</small>
          </span>
        </NavLink>

        <nav className="app-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `app-nav-link${isActive ? ' active' : ''}`}
            >
              <span className="app-nav-text">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          <span>Base-сценарий</span>
          <strong>545,5 млрд ₽ в 2036</strong>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <div>
            <p className="app-eyebrow">РЖД · прогнозная модель</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </header>
        <section className="app-content">{children}</section>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/map" element={<RouteVisualization />} />
        <Route path="/calculation" element={<CalculationPage />} />
        <Route path="/cl" element={<Client />} />
        <Route path="/aleksandra" element={<AlyaPage />} />
        <Route path="/formula" element={<RailwayTariffCalculator />} />
        <Route path="/" element={<Dash />} />
      </Routes>
    </AppShell>
  );
}

export default App;
