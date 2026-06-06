import { useMemo, useState } from 'react';

const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
const baseCargo = [145, 152, 158, 165, 171, 178, 185, 191, 198, 205, 212];
const baseDistance = [1250, 1280, 1310, 1340, 1370, 1400, 1430, 1460, 1490, 1520, 1550];

const cargoClasses = {
  all: { label: 'Все классы', cargo: 1, distance: 1 },
  class1: { label: 'Первый класс', cargo: 0.42, distance: 0.78 },
  class2: { label: 'Второй класс', cargo: 0.31, distance: 1.15 },
  class3: { label: 'Третий класс', cargo: 0.19, distance: 1.42 },
};

const fmt = (value) => new Intl.NumberFormat('ru-RU').format(value);

function buildSeries(selectedClass) {
  const coeff = cargoClasses[selectedClass];

  return years.map((year, index) => ({
    year,
    cargo: Number((baseCargo[index] * coeff.cargo).toFixed(1)),
    distance: Math.round(baseDistance[index] * coeff.distance),
  }));
}

function getGrowth(current, previous) {
  if (!previous) return null;

  return {
    cargo: (((current.cargo - previous.cargo) / previous.cargo) * 100).toFixed(1),
    distance: current.distance - previous.distance,
  };
}

function BarChart({ data, valueKey, maxValue, selectedYear, onSelect }) {
  return (
    <div style={styles.chart}>
      {data.map((item) => {
        const height = Math.max(8, (item[valueKey] / maxValue) * 150);
        const active = item.year === selectedYear;

        return (
          <button key={item.year} type="button" style={styles.barWrap} onClick={() => onSelect(item.year)}>
            <span style={styles.barValue}>{item[valueKey]}</span>
            <i style={{ ...styles.bar, ...(active ? styles.activeBar : {}), height }} />
            <span style={styles.barYear}>{item.year}</span>
          </button>
        );
      })}
    </div>
  );
}

function Kpi({ title, value, note }) {
  return (
    <article style={styles.kpi}>
      <span>{title}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </article>
  );
}

function Details({ open, onToggle, currentClass, current }) {
  return (
    <section style={styles.card}>
      <button type="button" style={styles.folderHeader} onClick={onToggle}>
        <strong>Пояснение расчета</strong>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={styles.details}>
          <p>Выбран класс: <b>{cargoClasses[currentClass].label}</b>.</p>
          <p>Объем = базовый объем года × коэффициент класса.</p>
          <p>Средняя дальность = базовая дальность года × коэффициент класса.</p>
          <p>Для выбранного года: <b>{current.cargo} млн тонн</b> и <b>{fmt(current.distance)} км</b>.</p>
        </div>
      )}
    </section>
  );
}

export default function AlyaPage() {
  const [year, setYear] = useState(2031);
  const [selectedClass, setSelectedClass] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const data = useMemo(() => buildSeries(selectedClass), [selectedClass]);
  const currentIndex = data.findIndex((item) => item.year === year);
  const current = data[currentIndex];
  const previous = data[currentIndex - 1];
  const growth = getGrowth(current, previous);
  const maxCargo = Math.max(...data.map((item) => item.cargo));
  const maxDistance = Math.max(...data.map((item) => item.distance));
  const periodGrowth = (((data.at(-1).cargo - data[0].cargo) / data[0].cargo) * 100).toFixed(1);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2 style={styles.title}>Аналитика грузов</h2>
        <p style={styles.subtitle}>Прогноз объема перевозок и средней дальности по классам грузов.</p>
      </header>

      <section style={styles.panel}>
        <h3 style={styles.sectionTitle}>Настройки</h3>
        <div style={styles.grid}>
          <label style={styles.field}>
            Год: <b>{year}</b>
            <input type="range" min="2026" max="2036" step="1" value={year} onChange={(e) => setYear(Number(e.target.value))} />
          </label>

          <div style={styles.field}>
            Класс груза
            <div style={styles.buttons}>
              {Object.entries(cargoClasses).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  style={{ ...styles.chip, ...(selectedClass === key ? styles.activeChip : {}) }}
                  onClick={() => setSelectedClass(key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" style={styles.compareButton} onClick={() => setShowComparison(!showComparison)}>
            {showComparison ? 'Скрыть сравнение' : 'Сравнить с прошлым годом'}
          </button>
        </div>
      </section>

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>Объем грузоперевозок</h3>
          <span>{cargoClasses[selectedClass].label}</span>
        </div>
        <div style={styles.kpiGrid}>
          <Kpi title="Текущий показатель" value={`${current.cargo} млн т`} note={showComparison && growth ? `${growth.cargo}% к ${year - 1}` : ''} />
          <Kpi title="Максимум за период" value={`${maxCargo} млн т`} />
          <Kpi title="Рост за период" value={`${periodGrowth}%`} note={`${years[0]}–${years.at(-1)}`} />
        </div>
        <BarChart data={data} valueKey="cargo" maxValue={maxCargo} selectedYear={year} onSelect={setYear} />
      </section>

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <h3>Средняя дальность перевозки</h3>
          <span>км</span>
        </div>
        <div style={styles.kpiGrid}>
          <Kpi title="Текущая дальность" value={`${fmt(current.distance)} км`} note={showComparison && growth ? `${growth.distance > 0 ? '+' : ''}${growth.distance} км к ${year - 1}` : ''} />
          <Kpi title="Максимум" value={`${fmt(maxDistance)} км`} />
          <Kpi title="Выбранный год" value={year} />
        </div>
        <BarChart data={data} valueKey="distance" maxValue={maxDistance} selectedYear={year} onSelect={setYear} />
      </section>

      <section style={styles.summary}>
        <span>Итог выбранного сценария</span>
        <strong>{current.cargo} млн т · {fmt(current.distance)} км</strong>
      </section>

      <Details open={detailsOpen} onToggle={() => setDetailsOpen(!detailsOpen)} currentClass={selectedClass} current={current} />
    </div>
  );
}

const styles = {
  page: { padding: '48px 24px 72px', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' },
  header: { marginBottom: 32 },
  title: { margin: '0 0 12px', fontSize: '2rem', fontWeight: 700, color: '#0f172a' },
  subtitle: { maxWidth: 620, color: '#64748b' },
  panel: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, marginBottom: 28, boxShadow: '0 1px 3px rgba(0,0,0,.04)' },
  sectionTitle: { margin: '0 0 22px', fontSize: '.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'end' },
  field: { display: 'grid', gap: 10, color: '#334155', fontWeight: 600, fontSize: '.875rem' },
  buttons: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  chip: { border: '1px solid #cbd5e1', background: 'transparent', color: '#475569', borderRadius: 999, padding: '8px 16px', cursor: 'pointer' },
  activeChip: { background: '#1e3a8a', color: '#fff', borderColor: '#1e3a8a' },
  compareButton: { border: '1px solid #cbd5e1', borderRadius: 10, padding: '10px 18px', background: '#fff', color: '#475569', cursor: 'pointer', fontWeight: 600 },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, marginBottom: 28, overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,.06)' },
  cardHeader: { padding: '22px 28px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', gap: 16 },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, padding: 28 },
  kpi: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: 20, display: 'grid', gap: 8, textAlign: 'center' },
  chart: { display: 'flex', alignItems: 'end', gap: 10, minWidth: 620, padding: '0 28px 32px', overflowX: 'auto' },
  barWrap: { flex: 1, minWidth: 48, border: 0, background: 'transparent', display: 'grid', justifyItems: 'center', gap: 8, cursor: 'pointer' },
  barValue: { fontSize: '.75rem', color: '#64748b' },
  bar: { width: '100%', maxWidth: 46, display: 'block', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)' },
  activeBar: { background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)' },
  barYear: { fontSize: '.75rem', color: '#94a3b8' },
  summary: { marginBottom: 28, padding: 28, borderRadius: 20, background: '#0f172a', color: '#fff', display: 'grid', gap: 12, textAlign: 'center' },
  folderHeader: { width: '100%', border: 0, padding: '20px 28px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' },
  details: { padding: 28, color: '#334155', lineHeight: 1.8 },
};
