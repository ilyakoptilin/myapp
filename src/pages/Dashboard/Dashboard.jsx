import React, { useMemo, useState } from 'react';

const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
const volume = [1086.0, 1042.6, 996.5, 945.3, 889.5, 829.1, 764.1, 694.5, 636.6, 623.4, 614.0];
const revenueBase = [881.8, 846.5, 808.7, 767.0, 722.3, 674.8, 675.1, 614.7, 564.8, 553.6, 545.5];
const revenueConservative = [821.2, 788.3, 753.0, 714.2, 672.6, 628.4, 628.6, 572.4, 525.9, 515.5, 508.0];
const revenueUpside = [972.1, 933.2, 891.5, 845.5, 796.3, 743.9, 744.2, 677.7, 622.6, 610.2, 601.4];

const cargo2036 = [
  ['Остальные грузы', 175.9],
  ['Нефтяные грузы', 94.8],
  ['Уголь каменный', 83.9],
  ['Минерально-строит.', 64.4],
  ['Черные металлы', 43.6],
  ['Удобрения', 37.9],
];

const fmt = (value, digits = 1) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
}).format(value);

const Sparkline = ({ data, min, max }) => {
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 92 - ((value - min) / (max - min || 1)) * 78;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="dash-sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
};

const DashboardMainPage = () => {
  const [selectedYear, setSelectedYear] = useState(2036);
  const selectedIndex = years.indexOf(selectedYear);

  const revenueChange = revenueBase[revenueBase.length - 1] - revenueBase[0];
  const volumeChange = volume[volume.length - 1] - volume[0];
  const maxRevenue = Math.max(...revenueUpside);
  const minRevenue = Math.min(...revenueConservative);
  const maxCargoRevenue = Math.max(...cargo2036.map(([, value]) => value));

  const tableRows = useMemo(() => years.map((year, index) => ({
    year,
    volume: volume[index],
    conservative: revenueConservative[index],
    base: revenueBase[index],
    upside: revenueUpside[index],
  })), []);

  return (
    <div className="dash-page">
      <section className="dash-hero">
        <div>
          <span className="dash-section-label">Сводка модели</span>
          <h2>Прогноз доходов от грузоперевозок до 2036 года</h2>
          <p>Базовый сценарий показывает снижение дохода с 881,8 до 545,5 млрд ₽ при сокращении прогнозного объема погрузки.</p>
        </div>
        <div className="dash-hero-number">
          <span>Base 2036</span>
          <strong>{fmt(revenueBase.at(-1))} млрд ₽</strong>
        </div>
      </section>

      <section className="dash-kpis">
        <article className="dash-card dash-kpi">
          <span>Доход Base</span>
          <strong>{fmt(revenueBase.at(-1))} млрд ₽</strong>
          <small>{fmt(revenueChange)} млрд ₽ к 2026</small>
          <Sparkline data={revenueBase} min={minRevenue} max={maxRevenue} />
        </article>
        <article className="dash-card dash-kpi">
          <span>Объем погрузки</span>
          <strong>{fmt(volume.at(-1))} млн т</strong>
          <small>{fmt(volumeChange)} млн т к 2026</small>
          <Sparkline data={volume} min={Math.min(...volume)} max={Math.max(...volume)} />
        </article>
        <article className="dash-card dash-kpi">
          <span>Сценарный диапазон 2036</span>
          <strong>{fmt(revenueConservative.at(-1))}–{fmt(revenueUpside.at(-1))}</strong>
          <small>млрд ₽, Conservative–Upside</small>
        </article>
        <article className="dash-card dash-kpi">
          <span>Ключевой груз 2036</span>
          <strong>Остальные грузы</strong>
          <small>175,9 млрд ₽ в Base</small>
        </article>
      </section>

      <section className="dash-grid">
        <article className="dash-card dash-wide">
          <div className="dash-card-head">
            <div>
              <span className="dash-section-label">Динамика</span>
              <h3>Доходы по сценариям</h3>
            </div>
            <select value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value))}>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>

          <div className="dash-bars" role="img" aria-label="Годовая динамика доходов по базовому сценарию">
            {revenueBase.map((value, index) => {
              const height = Math.max(18, (value / maxRevenue) * 170);
              const active = years[index] === selectedYear;
              return (
                <button
                  className={`dash-bar${active ? ' active' : ''}`}
                  key={years[index]}
                  onClick={() => setSelectedYear(years[index])}
                  title={`${years[index]}: ${fmt(value)} млрд ₽`}
                >
                  <span style={{ height: `${height}px` }} />
                  <em>{years[index]}</em>
                </button>
              );
            })}
          </div>

          <div className="dash-selected-row">
            <div><span>Год</span><strong>{selectedYear}</strong></div>
            <div><span>Conservative</span><strong>{fmt(revenueConservative[selectedIndex])}</strong></div>
            <div><span>Base</span><strong>{fmt(revenueBase[selectedIndex])}</strong></div>
            <div><span>Upside</span><strong>{fmt(revenueUpside[selectedIndex])}</strong></div>
          </div>
        </article>

        <article className="dash-card">
          <div className="dash-card-head">
            <div>
              <span className="dash-section-label">Структура</span>
              <h3>Доходы по грузам, 2036</h3>
            </div>
          </div>
          <div className="dash-cargo-list">
            {cargo2036.map(([name, value]) => (
              <div className="dash-cargo-row" key={name}>
                <div><strong>{name}</strong><span>{fmt(value)} млрд ₽</span></div>
                <div className="dash-progress"><span style={{ width: `${(value / maxCargoRevenue) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dash-card dash-table-card">
        <div className="dash-card-head">
          <div>
            <span className="dash-section-label">Годовой прогноз</span>
            <h3>Объем и доходы</h3>
          </div>
        </div>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Год</th>
                <th>Объем, млн т</th>
                <th>Conservative</th>
                <th>Base</th>
                <th>Upside</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.year} className={row.year === selectedYear ? 'active' : ''} onClick={() => setSelectedYear(row.year)}>
                  <td>{row.year}</td>
                  <td>{fmt(row.volume)}</td>
                  <td>{fmt(row.conservative)}</td>
                  <td>{fmt(row.base)}</td>
                  <td>{fmt(row.upside)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardMainPage;
