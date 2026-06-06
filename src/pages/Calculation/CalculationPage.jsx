import { useMemo, useState } from 'react';
import './CalculationPage.css';

const stations = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Владивосток', 'Красноярск', 'Иркутск'];

const rates = {
  coal: ['Уголь', 1.5],
  oil: ['Нефть', 2.2],
  containers: ['Контейнеры', 3.5],
  grain: ['Зерно', 1.8],
  metals: ['Металлы', 2.5],
  timber: ['Лес', 1.4],
  chemicals: ['Химия', 2.8],
};

const factorsList = [
  ['sanctions', 'Снятие санкций (+15%)', 1.15, '#10b981'],
  ['subsidy', 'Гос. субсидии (+20%)', 1.20, '#10b981'],
  ['season', 'Высокий сезон (+10%)', 1.10, '#10b981'],
  ['fuel', 'Рост цен на топливо (-10%)', 0.90, '#ef4444'],
  ['competition', 'Конкуренция (-15%)', 0.85, '#ef4444'],
  ['pandemic', 'Пандемия/Кризис (-25%)', 0.75, '#ef4444'],
];

const initialForm = {
  fromStation: 'Москва',
  toStation: 'Новосибирск',
  distance: 3184,
  cargoType: 'coal',
  weight: 500,
};

const formatMoney = (value) => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

function calculateIncome(form, factors) {
  const [, rate] = rates[form.cargoType];
  const baseIncome = form.distance * form.weight * rate;
  const multiplier = factorsList.reduce((result, [id, , value]) => (
    factors[id] ? result * value : result
  ), 1);
  const finalIncome = baseIncome * multiplier;

  return {
    baseIncome,
    multiplier,
    finalIncome,
    diff: finalIncome - baseIncome,
  };
}

export default function CalculationPage() {
  const [form, setForm] = useState(initialForm);
  const [factors, setFactors] = useState({});
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => calculateIncome(form, factors), [form, factors]);

  const updateForm = (event) => {
    const { name, value, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const toggleFactor = (id) => {
    setFactors((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="calc-page">
      <div className="calc-grid">
        <div className="panel inputs-panel">
          <h2>Параметры перевозки</h2>

          <div className="form-group">
            <label>Маршрут</label>
            <div className="route-inputs">
              <StationSelect name="fromStation" value={form.fromStation} onChange={updateForm} />
              <span className="arrow">→</span>
              <StationSelect name="toStation" value={form.toStation} onChange={updateForm} />
            </div>
          </div>

          <NumberField label="Дистанция (км)" name="distance" value={form.distance} onChange={updateForm} />

          <div className="form-group">
            <label>Тип груза</label>
            <select name="cargoType" value={form.cargoType} onChange={updateForm}>
              {Object.entries(rates).map(([key, [name, rate]]) => (
                <option key={key} value={key}>{name} ({rate} руб/т*км)</option>
              ))}
            </select>
          </div>

          <NumberField label="Масса груза (тонн)" name="weight" value={form.weight} onChange={updateForm} />
        </div>

        <div className="panel factors-panel">
          <h2>Экономические факторы</h2>
          <p className="panel-sub">Выберите условия, влияющие на доход</p>

          <div className="factors-list">
            {factorsList.map(([id, label, , color]) => (
              <label
                key={id}
                className={`factor-item ${factors[id] ? 'active' : ''}`}
                style={{ borderColor: factors[id] ? color : 'transparent' }}
              >
                <input type="checkbox" checked={Boolean(factors[id])} onChange={() => toggleFactor(id)} />
                <span className="checkmark" />
                <span className="factor-label">{label}</span>
              </label>
            ))}
          </div>

          <button className="calc-btn" onClick={() => setShowResult(true)}>Рассчитать доход</button>

          {showResult && <ResultBox result={result} />}
        </div>
      </div>
    </div>
  );
}

function StationSelect({ name, value, onChange }) {
  return (
    <select name={name} value={value} onChange={onChange}>
      {stations.map((station) => <option key={station} value={station}>{station}</option>)}
    </select>
  );
}

function NumberField({ label, name, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type="number" name={name} value={value} onChange={onChange} />
    </div>
  );
}

function ResultBox({ result }) {
  const isPositive = result.diff >= 0;

  return (
    <div className="result-box">
      <div className="result-row">
        <span>Базовый доход:</span>
        <span>{formatMoney(result.baseIncome)}</span>
      </div>
      <div className="result-row">
        <span>Итоговый множитель:</span>
        <span className={result.multiplier >= 1 ? 'pos' : 'neg'}>x{result.multiplier.toFixed(2)}</span>
      </div>
      <div className="divider" />
      <div className="result-row main-result">
        <span>ИТОГО:</span>
        <span>{formatMoney(result.finalIncome)}</span>
      </div>
      <div className={`diff-badge ${isPositive ? 'green' : 'red'}`}>
        {isPositive ? '+' : ''}{formatMoney(result.diff)}
      </div>
    </div>
  );
}
