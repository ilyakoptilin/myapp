import { useMemo, useState } from 'react';

const BASE_RATES = {
  aInitial: 18169,
  bPerTon: 0.288,
  bConst: 69.165,
  aWagon: 8991,
  bWagon: 8.803,
  emptyRunRate: 7.1881,
};

const DEFAULTS = {
  distance: 1000,
  weight: 60,
  tariffClass: 2,
  routeCoeff: 1,
  specialCoeff: 1,
  trainTypeCoeff: 1,
  axles: 4,
  inflationCoeff: 1,
};

const fields = [
  ['distance', 'Расстояние, км', 50, 5000, 50],
  ['weight', 'Вес груза, т', 1, 80, 1],
  ['routeCoeff', 'Коэффициент маршрута', 0.5, 2, 0.05],
  ['specialCoeff', 'Спец. коэффициент', 0.5, 2, 0.05],
  ['trainTypeCoeff', 'Коэффициент типа поезда', 0.5, 2, 0.05],
  ['inflationCoeff', 'Коэффициент индексации', 0.8, 2, 0.05],
  ['axles', 'Количество осей', 4, 8, 2],
];

const classOptions = [
  { value: 1, label: '1 класс' },
  { value: 2, label: '2 класс' },
  { value: 3, label: '3 класс' },
];

const money = (value) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value);

function getDistanceCoeff(distance) {
  if (distance <= 160) return 1.23;
  if (distance >= 3000) return 0.87;
  return 1.041 - 0.00006 * distance + 31 / distance;
}

function getClassCoeff(tariffClass, distance) {
  if (tariffClass === 2) return 1;
  if (tariffClass === 3) return 1.54;

  const stepsAfter1200 = Math.max(0, Math.ceil((distance - 1200) / 200));
  return Math.max(0.55, 0.75 - stepsAfter1200 * 0.01);
}

function getTariff(values) {
  const distanceCoeff = getDistanceCoeff(values.distance);
  const classCoeff = getClassCoeff(values.tariffClass, values.distance);
  const commonCoeff = values.routeCoeff * values.specialCoeff * values.trainTypeCoeff;

  const infrastructure =
    BASE_RATES.aInitial +
    (BASE_RATES.bConst + BASE_RATES.bPerTon * values.weight) * distanceCoeff * values.distance;

  const infrastructureTotal = infrastructure * classCoeff * commonCoeff;
  const wagon = BASE_RATES.aWagon + BASE_RATES.bWagon * distanceCoeff * values.distance;
  const emptyRun = BASE_RATES.emptyRunRate * values.axles * values.distance * 0.6 * commonCoeff;
  const totalBeforeIndex = infrastructureTotal + wagon + emptyRun;

  return {
    distanceCoeff,
    classCoeff,
    infrastructureTotal,
    wagon,
    emptyRun,
    totalBeforeIndex,
    total: totalBeforeIndex * values.inflationCoeff,
  };
}

function Chevron({ open }) {
  return <span style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none' }}>⌄</span>;
}

function Field({ field, value, onChange }) {
  const [name, label, min, max, step] = field;

  return (
    <label style={styles.field}>
      <span>{label}: <b>{value}</b></span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(name, Number(event.target.value))}
      />
    </label>
  );
}

function Section({ title, open, onToggle, children }) {
  return (
    <section style={styles.card}>
      <button type="button" style={styles.cardHeader} onClick={onToggle}>
        <strong>{title}</strong>
        <Chevron open={open} />
      </button>
      {open && <div style={styles.cardBody}>{children}</div>}
    </section>
  );
}

export default function RailwayTariffCalculator() {
  const [values, setValues] = useState(DEFAULTS);
  const [isFormulaOpen, setFormulaOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const result = useMemo(() => getTariff(values), [values]);

  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h2 style={styles.title}>Тарифная формула</h2>
          <p style={styles.subtitle}>Простой расчет тарифа по расстоянию, весу и коэффициентам.</p>
        </header>

        <Section title="Показать формулу" open={isFormulaOpen} onToggle={() => setFormulaOpen(!isFormulaOpen)}>
          <pre style={styles.code}>{`Доход = (инфраструктура + вагон + порожний пробег) × индексация

KL = 1.041 - 0.00006 × L + 31 / L
Инфраструктура = A + (B_const + B_тонна × вес) × KL × L`}</pre>
        </Section>

        <section style={styles.panel}>
          <h3 style={styles.sectionTitle}>Входные параметры</h3>
          <div style={styles.grid}>
            <label style={styles.field}>
              <span>Тарифный класс</span>
              <select value={values.tariffClass} onChange={(e) => updateValue('tariffClass', Number(e.target.value))}>
                {classOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            {fields.map((field) => (
              <Field key={field[0]} field={field} value={values[field[0]]} onChange={updateValue} />
            ))}
          </div>
        </section>

        <section style={styles.resultGrid}>
          <ResultCard title="Итоговый тариф" value={`${money(result.total)} ₽`} accent />
          <ResultCard title="Инфраструктура" value={`${money(result.infrastructureTotal)} ₽`} />
          <ResultCard title="Вагон" value={`${money(result.wagon)} ₽`} />
          <ResultCard title="Порожний пробег" value={`${money(result.emptyRun)} ₽`} />
        </section>

        <Section title="Детализация коэффициентов" open={isDetailsOpen} onToggle={() => setDetailsOpen(!isDetailsOpen)}>
          <div style={styles.details}>
            <p>Коэффициент расстояния KL: <b>{result.distanceCoeff.toFixed(3)}</b></p>
            <p>Коэффициент класса: <b>{result.classCoeff.toFixed(2)}</b></p>
            <p>Сумма до индексации: <b>{money(result.totalBeforeIndex)} ₽</b></p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function ResultCard({ title, value, accent = false }) {
  return (
    <article style={{ ...styles.resultCard, ...(accent ? styles.accentCard : {}) }}>
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

const styles = {
  page: { minHeight: '100%', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', color: '#1e293b' },
  container: { maxWidth: 1180, margin: '0 auto', padding: '48px 24px 72px' },
  header: { marginBottom: 32 },
  title: { margin: '0 0 12px', fontSize: '2rem', fontWeight: 700, color: '#0f172a' },
  subtitle: { color: '#64748b' },
  panel: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,.04)' },
  sectionTitle: { margin: '0 0 24px', fontSize: '.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 },
  field: { display: 'grid', gap: 10, fontSize: '.875rem', fontWeight: 600, color: '#334155' },
  resultGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 32 },
  resultCard: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, display: 'grid', gap: 10 },
  accentCard: { background: '#0f172a', color: '#fff' },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, marginBottom: 24, overflow: 'hidden' },
  cardHeader: { width: '100%', padding: '18px 24px', border: 0, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' },
  cardBody: { padding: 24 },
  code: { margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '.875rem', color: '#334155' },
  details: { display: 'grid', gap: 8, color: '#334155' },
};
