import React, { useState } from 'react';
import './CalculationPage.css';

const CalculationPage = () => {
  // Состояние формы
  const [formData, setFormData] = useState({
    fromStation: 'Москва',
    toStation: 'Новосибирск',
    distance: 3184,
    cargoType: 'coal',
    weight: 500, // в тоннах
  });

  // Состояние коэффициентов (факторов влияния)
  const [factors, setFactors] = useState({
    sanctions: false, // Снятие санкций (+15%)
    pandemic: false,  // Пандемия/Кризис (-25%)
    fuel: false,      // Рост цен на топливо (-10%)
    season: false,    // Высокий сезон (+10%)
    subsidy: false,   // Гос. субсидии (+20%)
    competition: false // Рост конкуренции (-15%)
  });

  // Результаты
  const [result, setResult] = useState(null);

  // Базовые ставки (руб/т*км)
  const rates = {
    coal: { name: 'Уголь', rate: 1.5 },
    oil: { name: 'Нефть', rate: 2.2 },
    containers: { name: 'Контейнеры', rate: 3.5 },
    grain: { name: 'Зерно', rate: 1.8 },
    metals: { name: 'Металлы', rate: 2.5 },
    timber: { name: 'Лес', rate: 1.4 },
    chemicals: { name: 'Химия', rate: 2.8 }
  };

  const stations = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Владивосток', 'Красноярск', 'Иркутск'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Авто-заполнение примерного расстояния (упрощено)
    if (name === 'fromStation' || name === 'toStation') {
      setFormData(prev => ({ ...prev, [name]: value, distance: Math.floor(Math.random() * 3000) + 500 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFactorChange = (factorName) => {
    setFactors(prev => ({ ...prev, [factorName]: !prev[factorName] }));
  };

  const calculate = () => {
    const { distance, cargoType, weight } = formData;
    const baseRate = rates[cargoType].rate;
    
    // Базовый расчет: КМ * Вес * Ставка
    let baseIncome = distance * weight * baseRate;
    
    // Расчет коэффициентов
    let multiplier = 1;
    if (factors.sanctions) multiplier *= 1.15;
    if (factors.pandemic) multiplier *= 0.75;
    if (factors.fuel) multiplier *= 0.90;
    if (factors.season) multiplier *= 1.10;
    if (factors.subsidy) multiplier *= 1.20;
    if (factors.competition) multiplier *= 0.85;

    const finalIncome = baseIncome * multiplier;

    setResult({
      baseIncome,
      multiplier,
      finalIncome,
      diff: finalIncome - baseIncome
    });
  };

  return (
    <div className="calc-page">
      <div className="calc-grid">
        
        {/* ЛЕВАЯ КОЛОНКА: ВВОД ДАННЫХ */}
        <div className="panel inputs-panel">
          <h2>Параметры перевозки</h2>
          
          <div className="form-group">
            <label>Маршрут</label>
            <div className="route-inputs">
              <select name="fromStation" value={formData.fromStation} onChange={handleChange}>
                {stations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="arrow">→</span>
              <select name="toStation" value={formData.toStation} onChange={handleChange}>
                {stations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Дистанция (км)</label>
            <input type="number" name="distance" value={formData.distance} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Тип груза</label>
            <select name="cargoType" value={formData.cargoType} onChange={handleChange}>
              {Object.entries(rates).map(([key, val]) => (
                <option key={key} value={key}>{val.name} ({val.rate} руб/т*км)</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Масса груза (тонн)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ФАКТОРЫ И РЕЗУЛЬТАТ */}
        <div className="panel factors-panel">
          <h2>Экономические факторы</h2>
          <p className="panel-sub">Выберите условия, влияющие на доход</p>
          
          <div className="factors-list">
            {[
              { id: 'sanctions', label: 'Снятие санкций (+15%)', color: '#10b981' },
              { id: 'subsidy', label: 'Гос. субсидии (+20%)', color: '#10b981' },
              { id: 'season', label: 'Высокий сезон (+10%)', color: '#10b981' },
              { id: 'fuel', label: 'Рост цен на топливо (-10%)', color: '#ef4444' },
              { id: 'competition', label: 'Конкуренция (-15%)', color: '#ef4444' },
              { id: 'pandemic', label: 'Пандемия/Кризис (-25%)', color: '#ef4444' },
            ].map(f => (
              <label key={f.id} className={`factor-item ${factors[f.id] ? 'active' : ''}`} style={{borderColor: factors[f.id] ? f.color : 'transparent'}}>
                <input type="checkbox" checked={factors[f.id]} onChange={() => handleFactorChange(f.id)} />
                <span className="checkmark"></span>
                <span className="factor-label">{f.label}</span>
              </label>
            ))}
          </div>

          <button className="calc-btn" onClick={calculate}>Рассчитать доход</button>

          {/* БЛОК РЕЗУЛЬТАТА (Появляется после расчета) */}
          {result && (
            <div className="result-box">
              <div className="result-row">
                <span>Базовый доход:</span>
                <span>{result.baseIncome.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="result-row">
                <span>Итоговый множитель:</span>
                <span className={result.multiplier >= 1 ? 'pos' : 'neg'}>x{result.multiplier.toFixed(2)}</span>
              </div>
              <div className="divider"></div>
              <div className="result-row main-result">
                <span>ИТОГО:</span>
                <span>{result.finalIncome.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className={`diff-badge ${result.diff >= 0 ? 'green' : 'red'}`}>
                {result.diff >= 0 ? '+' : ''}{result.diff.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CalculationPage;