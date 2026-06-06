import { useMemo, useState } from 'react';

const cargoData = [
  { name: 'Остальные грузы', revenue: 175.9, share: 32.2, trend: '-18%', icon: 'ОГ' },
  { name: 'Нефтяные грузы', revenue: 104.5, share: 19.2, trend: '-9%', icon: 'НГ' },
  { name: 'Уголь каменный', revenue: 82.4, share: 15.1, trend: '-31%', icon: 'УГ' },
  { name: 'Минерально-строит.', revenue: 61.8, share: 11.3, trend: '-22%', icon: 'МС' },
  { name: 'Черные металлы', revenue: 46.2, share: 8.5, trend: '-14%', icon: 'ЧМ' },
  { name: 'Удобрения', revenue: 34.7, share: 6.4, trend: '+6%', icon: 'УД' },
];

const companyData = [
  { name: 'СУЭК / угольные отправители', revenue: 78.4, marketShare: 14.4, growth: '-29%' },
  { name: 'Нефтяной сектор', revenue: 104.5, marketShare: 19.2, growth: '-9%' },
  { name: 'Металлургические компании', revenue: 46.2, marketShare: 8.5, growth: '-14%' },
  { name: 'Строительные грузы', revenue: 61.8, marketShare: 11.3, growth: '-22%' },
  { name: 'Прочие грузоотправители', revenue: 175.9, marketShare: 32.2, growth: '-18%' },
];

const tabs = [
  { id: 'cargo', label: 'По грузам' },
  { id: 'clients', label: 'По клиентам' },
  { id: 'risk', label: 'Концентрация' },
];

const fmt = (value) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value);

export const Client = () => {
  const [activeTab, setActiveTab] = useState('cargo');
  const [selected, setSelected] = useState(cargoData[0].name);

  const totalRevenue = useMemo(() => cargoData.reduce((sum, item) => sum + item.revenue, 0), []);
  const maxRevenue = Math.max(...cargoData.map((item) => item.revenue));
  const selectedCargo = cargoData.find((item) => item.name === selected) || cargoData[0];

  return (
    <div className="client-page">
      <div className="client-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'client-tab active' : 'client-tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="client-kpi-grid">
        <div className="client-kpi-card accent">
          <span>Base-доход 2036</span>
          <strong>545,5 млрд ₽</strong>
          <small>Снижение к 2026: −336,3 млрд ₽</small>
        </div>
        <div className="client-kpi-card">
          <span>Крупнейшая категория</span>
          <strong>{selectedCargo.name}</strong>
          <small>{fmt(selectedCargo.revenue)} млрд ₽ · {fmt(selectedCargo.share)}%</small>
        </div>
        <div className="client-kpi-card">
          <span>Топ-3 грузов</span>
          <strong>{fmt(cargoData.slice(0, 3).reduce((s, x) => s + x.share, 0))}%</strong>
          <small>Концентрация доходов требует мониторинга</small>
        </div>
      </div>

      {activeTab === 'cargo' && (
        <div className="client-grid two">
          <section className="client-card">
            <div className="client-card-head">
              <div>
                <h2>Структура доходов по грузам</h2>
                <p>Base-сценарий, 2036 год</p>
              </div>
              <span>{fmt(totalRevenue)} млрд ₽</span>
            </div>

            <div className="client-bars">
              {cargoData.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className={selected === item.name ? 'client-bar active' : 'client-bar'}
                  onClick={() => setSelected(item.name)}
                >
                  <span className="client-bar-title"><b>{item.icon}</b>{item.name}</span>
                  <span className="client-bar-value">{fmt(item.revenue)} млрд ₽</span>
                  <i><em style={{ width: `${(item.revenue / maxRevenue) * 100}%` }} /></i>
                  <span className={item.trend.startsWith('+') ? 'trend up' : 'trend down'}>{item.trend}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="client-card highlight">
            <h2>{selectedCargo.name}</h2>
            <p className="client-big-number">{fmt(selectedCargo.revenue)} млрд ₽</p>
            <p className="client-muted">Доля в доходах 2036: {fmt(selectedCargo.share)}%. Динамика к базовому периоду: {selectedCargo.trend}.</p>
            <div className="client-insight">
              <strong>Что смотреть дальше</strong>
              <span>Проверить тарифные коэффициенты, долю экспортных перевозок и чувствительность категории к изменению объема.</span>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'clients' && (
        <section className="client-card">
          <div className="client-card-head">
            <div>
              <h2>Ключевые группы клиентов</h2>
              <p>Агрегированная управленческая группировка</p>
            </div>
          </div>
          <div className="client-table-wrap">
            <table className="client-table">
              <thead>
                <tr><th>Группа</th><th>Доход</th><th>Доля</th><th>Динамика</th></tr>
              </thead>
              <tbody>
                {companyData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{fmt(item.revenue)} млрд ₽</td>
                    <td>{fmt(item.marketShare)}%</td>
                    <td className={item.growth.startsWith('+') ? 'trend up' : 'trend down'}>{item.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'risk' && (
        <div className="client-grid three">
          <section className="client-card"><h2>Концентрация</h2><p className="client-big-number">66,5%</p><p className="client-muted">доходов дают первые 4 категории грузов.</p></section>
          <section className="client-card"><h2>Главный риск</h2><p className="client-big-number">уголь</p><p className="client-muted">категория сильно влияет на общий спад выручки.</p></section>
          <section className="client-card"><h2>Точка роста</h2><p className="client-big-number">удобрения</p><p className="client-muted">единственная категория с положительной динамикой в текущей витрине.</p></section>
        </div>
      )}
    </div>
  );
};
