import React, { useState, useMemo } from 'react';

const FreightAnalyticsPage = () => {
  // Базовые данные
  const BASE_DATA = {
    years: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036],
    cargo: [145, 152, 158, 165, 171, 178, 185, 191, 198, 205, 212],
    distance: [1250, 1280, 1310, 1340, 1370, 1400, 1430, 1460, 1490, 1520, 1550]
  };

  const CARGO_CLASS_MULTIPLIERS = {
    all: { cargo: 1.00, distance: 1.00 },
    class1: { cargo: 0.42, distance: 0.78 },
    class2: { cargo: 0.31, distance: 1.15 },
    class3: { cargo: 0.19, distance: 1.42 }
  };

  const [year, setYear] = useState(2031);
  const [selectedClass, setSelectedClass] = useState('all');
  const [compareWithLastYear, setCompareWithLastYear] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const chartData = useMemo(() => {
    const m = CARGO_CLASS_MULTIPLIERS[selectedClass];
    return {
      years: BASE_DATA.years,
      cargo: BASE_DATA.cargo.map(v => +(v * m.cargo).toFixed(1)),
      distance: BASE_DATA.distance.map(v => Math.round(v * m.distance))
    };
  }, [selectedClass]);

  const currentIndex = chartData.years.indexOf(year);
  const maxCargo = Math.max(...chartData.cargo);
  const maxDistance = Math.max(...chartData.distance);

  const current = {
    cargo: chartData.cargo[currentIndex],
    distance: chartData.distance[currentIndex]
  };

  const prev = currentIndex > 0 ? {
    cargo: chartData.cargo[currentIndex - 1],
    distance: chartData.distance[currentIndex - 1]
  } : null;

  // Рост/падение
  const cargoGrowth = prev ? ((current.cargo - prev.cargo) / prev.cargo * 100).toFixed(1) : null;
  const distanceGrowth = prev ? current.distance - prev.distance : null;

  const classLabels = {
    all: 'Все классы',
    class1: 'Первый класс',
    class2: 'Второй класс',
    class3: 'Третий класс'
  };

  const classDescriptions = {
    class1: 'насыпные, навалочные грузы (уголь, руда, стройматериалы)',
    class2: 'наливные, химические грузы (нефть, химикаты)',
    class3: 'штучные, тарно-упаковочные грузы'
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  // Иконка стрелки
  const ChevronIcon = ({ expanded }) => (
    <svg 
      style={{ 
        width: '18px', 
        height: '18px', 
        transition: 'transform 0.2s',
        transform: expanded ? 'rotate(180deg)' : 'rotate(0)'
      }} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const styles = {
    page: {
      minHeight: '350vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#1e293b',
      lineHeight: '1.6'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 32px 80px'
    },
    header: {
      marginBottom: '48px',
      textAlign: 'left'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '12px',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#64748b',
      fontWeight: '400',
      maxWidth: '600px'
    },
    controlPanel: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)'
    },
    sectionTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#475569',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #f1f5f9',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '0.8125rem',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '10px',
      letterSpacing: '0.02em'
    },
    slider: {
      width: '100%',
      height: '4px',
      borderRadius: '2px',
      background: '#e2e8f0',
      outline: 'none',
      WebkitAppearance: 'none'
    },
    yearDisplay: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#0f172a',
      minWidth: '60px',
      textAlign: 'center',
      background: '#f1f5f9',
      padding: '8px 16px',
      borderRadius: '10px'
    },
    yearControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    filterButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '12px'
    },
    filterBtn: {
      background: 'transparent',
      border: '1px solid #cbd5e1',
      color: '#475569',
      padding: '8px 20px',
      borderRadius: '30px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      marginTop: '16px'
    },
    actionBtn: {
      background: 'transparent',
      border: '1px solid #cbd5e1',
      color: '#475569',
      padding: '8px 20px',
      borderRadius: '10px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    card: {
      background: '#ffffff',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
      marginBottom: '32px',
      overflow: 'hidden'
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      padding: '24px 32px',
      borderBottom: '1px solid #e2e8f0'
    },
    cardTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#475569',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '4px'
    },
    cardSubtitle: {
      fontSize: '0.8125rem',
      color: '#94a3b8'
    },
    kpiSection: {
      padding: '32px 32px 24px'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    kpiCard: {
      background: '#f8fafc',
      borderRadius: '14px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    kpiLabel: {
      fontSize: '0.8125rem',
      color: '#475569',
      fontWeight: '600',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    kpiValue: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#0f172a',
      lineHeight: '1.1',
      marginBottom: '8px'
    },
    kpiUnit: {
      fontSize: '0.75rem',
      color: '#94a3b8'
    },
    trend: {
      fontSize: '0.75rem',
      marginTop: '8px',
      padding: '4px 8px',
      borderRadius: '12px',
      display: 'inline-block'
    },
    trendPositive: {
      background: '#dcfce7',
      color: '#166534'
    },
    trendNegative: {
      background: '#fee2e2',
      color: '#991b1b'
    },
    chartContainer: {
      padding: '0 32px 32px',
      overflowX: 'auto'
    },
    chartBars: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '8px',
      minWidth: '600px'
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    },
    barValue: {
      fontSize: '0.6875rem',
      color: '#64748b',
      fontWeight: '500'
    },
    bar: {
      width: '100%',
      maxWidth: '50px',
      background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
      borderRadius: '6px 6px 0 0',
      transition: 'height 0.3s ease',
      cursor: 'pointer'
    },
    barCurrent: {
      background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
      boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)'
    },
    barLabel: {
      fontSize: '0.6875rem',
      color: '#94a3b8'
    },
    summaryCard: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '20px',
      padding: '32px',
      textAlign: 'center'
    },
    summaryTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#94a3b8',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    summaryValues: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      alignItems: 'center'
    },
    summaryValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#ffffff'
    },
    summarySeparator: {
      fontSize: '1.5rem',
      color: '#475569'
    },
    detailsFolder: {
      marginBottom: '32px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)'
    },
    folderHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 28px',
      background: '#f8fafc',
      cursor: 'pointer',
      transition: 'background 0.2s'
    },
    folderTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#475569',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    folderContent: {
      padding: '28px',
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0'
    },
    detailsContent: {
      background: '#f8fafc',
      borderRadius: '10px',
      padding: '20px',
      fontSize: '0.8125rem',
      fontFamily: 'ui-monospace, SFMono-Regular, monospace',
      color: '#334155',
      lineHeight: '2',
      overflowX: 'auto'
    },
    footer: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0',
      fontSize: '0.8125rem',
      color: '#64748b',
      lineHeight: '1.8'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Заголовок */}
        <header style={styles.header}>
          <h1 style={styles.title}>Аналитика грузовых перевозок</h1>
          <p style={styles.subtitle}>
            Прогноз объёмов перевозок и средней дальности транспортировки 
            по классам грузов на период 2026–2036 годов
          </p>
        </header>

        {/* Панель управления */}
        <div style={styles.controlPanel}>
          <div style={styles.sectionTitle}>Параметры анализа</div>
          
          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Выбор года</label>
              <div style={styles.yearControl}>
                <input
                  type="range"
                  min="2026"
                  max="2036"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  style={styles.slider}
                />
                <span style={styles.yearDisplay}>{year}</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Класс груза</label>
              <div style={styles.filterButtons}>
                {Object.entries(classLabels).map(([key, label]) => (
                  <button
                    key={key}
                    style={{
                      ...styles.filterBtn,
                      ...(selectedClass === key ? {
                        background: '#1e3a8a',
                        borderColor: '#1e3a8a',
                        color: '#ffffff'
                      } : {})
                    }}
                    onClick={() => setSelectedClass(key)}
                    onMouseEnter={(e) => {
                      if (selectedClass !== key) {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.color = '#3b82f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedClass !== key) {
                        e.target.style.borderColor = '#cbd5e1';
                        e.target.style.color = '#475569';
                      }
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Дополнительные опции</label>
              <div style={styles.actionButtons}>
                <button
                  style={{
                    ...styles.actionBtn,
                    ...(compareWithLastYear ? {
                      background: '#1e3a8a',
                      borderColor: '#1e3a8a',
                      color: '#ffffff'
                    } : {})
                  }}
                  onClick={() => setCompareWithLastYear(!compareWithLastYear)}
                  onMouseEnter={(e) => {
                    if (!compareWithLastYear) {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.color = '#3b82f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!compareWithLastYear) {
                      e.target.style.borderColor = '#cbd5e1';
                      e.target.style.color = '#475569';
                    }
                  }}
                >
                  {compareWithLastYear ? 'Скрыть сравнение' : 'Сравнить с прошлым годом'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Карточка грузоперевозок */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Объём грузоперевозок</div>
            <div style={styles.cardSubtitle}>
              {selectedClass !== 'all' ? `${classLabels[selectedClass]}` : 'Все классы грузов'}
            </div>
          </div>
          
          <div style={styles.kpiSection}>
            <div style={styles.kpiGrid}>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Текущий показатель</div>
                <div style={styles.kpiValue}>{current.cargo}</div>
                <div style={styles.kpiUnit}>млн тонн</div>
                {compareWithLastYear && prev && (
                  <div style={{
                    ...styles.trend,
                    ...(Number(cargoGrowth) >= 0 ? styles.trendPositive : styles.trendNegative)
                  }}>
                    {Number(cargoGrowth) >= 0 ? '+' : ''}{cargoGrowth}% к {year - 1}
                  </div>
                )}
              </div>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Максимум за период</div>
                <div style={styles.kpiValue}>{Math.max(...chartData.cargo)}</div>
                <div style={styles.kpiUnit}>млн тонн</div>
                <div style={styles.kpiUnit}>({chartData.years[chartData.cargo.indexOf(Math.max(...chartData.cargo))]} год)</div>
              </div>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Рост за период</div>
                <div style={styles.kpiValue}>
                  {((chartData.cargo[chartData.cargo.length - 1] - chartData.cargo[0]) / chartData.cargo[0] * 100).toFixed(1)}%
                </div>
                <div style={styles.kpiUnit}>с {chartData.years[0]} по {chartData.years[chartData.years.length - 1]}</div>
              </div>
            </div>

            <div style={styles.chartContainer}>
              <div style={styles.chartBars}>
                {chartData.cargo.map((value, idx) => {
                  const height = (value / maxCargo) * 150;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div key={idx} style={styles.barWrapper}>
                      <span style={styles.barValue}>{value}</span>
                      <div
                        style={{
                          ...styles.bar,
                          height: `${Math.max(4, height)}px`,
                          ...(isCurrent ? styles.barCurrent : {})
                        }}
                      />
                      <span style={styles.barLabel}>{chartData.years[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Карточка расстояния */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Среднее расстояние перевозки</div>
            <div style={styles.cardSubtitle}>
              {selectedClass !== 'all' ? `${classLabels[selectedClass]}` : 'Все классы грузов'}
            </div>
          </div>
          
          <div style={styles.kpiSection}>
            <div style={styles.kpiGrid}>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Текущий показатель</div>
                <div style={styles.kpiValue}>{formatNumber(current.distance)}</div>
                <div style={styles.kpiUnit}>км</div>
                {compareWithLastYear && prev && distanceGrowth !== null && (
                  <div style={{
                    ...styles.trend,
                    ...(distanceGrowth >= 0 ? styles.trendPositive : styles.trendNegative)
                  }}>
                    {distanceGrowth >= 0 ? '+' : ''}{formatNumber(Math.abs(distanceGrowth))} км к {year - 1}
                  </div>
                )}
              </div>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Максимум за период</div>
                <div style={styles.kpiValue}>{formatNumber(Math.max(...chartData.distance))}</div>
                <div style={styles.kpiUnit}>км</div>
                <div style={styles.kpiUnit}>({chartData.years[chartData.distance.indexOf(Math.max(...chartData.distance))]} год)</div>
              </div>
              <div style={styles.kpiCard}>
                <div style={styles.kpiLabel}>Прирост расстояния</div>
                <div style={styles.kpiValue}>
                  +{formatNumber(chartData.distance[chartData.distance.length - 1] - chartData.distance[0])}
                </div>
                <div style={styles.kpiUnit}>км за период</div>
              </div>
            </div>

            <div style={styles.chartContainer}>
              <div style={styles.chartBars}>
                {chartData.distance.map((value, idx) => {
                  const height = (value / maxDistance) * 150;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div key={idx} style={styles.barWrapper}>
                      <span style={styles.barValue}>{formatNumber(value)}</span>
                      <div
                        style={{
                          ...styles.bar,
                          height: `${Math.max(4, height)}px`,
                          ...(isCurrent ? styles.barCurrent : {})
                        }}
                      />
                      <span style={styles.barLabel}>{chartData.years[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Выпадающий фолдер с детализацией */}
        <div style={styles.detailsFolder}>
          <div 
            style={styles.folderHeader}
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8fafc';
            }}
          >
            <div style={styles.folderTitle}>
              Детализация по классам грузов
              <ChevronIcon expanded={isDetailsOpen} />
            </div>
            <button
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#1e3a8a',
                background: 'none',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailsOpen(!isDetailsOpen);
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              {isDetailsOpen ? 'Свернуть' : 'Развернуть'}
            </button>
          </div>
          
          {isDetailsOpen && (
            <div style={styles.folderContent}>
              <div style={styles.detailsContent}>
                <div><strong>Коэффициенты пересчёта для классов грузов:</strong></div>
                <div style={{ marginTop: '12px' }}>
                  <div>• <strong>Первый класс</strong> (насыпные, навалочные): грузооборот ×0,42, расстояние ×0,78</div>
                  <div>• <strong>Второй класс</strong> (наливные, химические): грузооборот ×0,31, расстояние ×1,15</div>
                  <div>• <strong>Третий класс</strong> (штучные, тарно-упаковочные): грузооборот ×0,19, расстояние ×1,42</div>
                </div>
                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <strong>Исходные прогнозные данные (базовый сценарий):</strong>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <div>• Грузоперевозки: от {BASE_DATA.cargo[0]} до {BASE_DATA.cargo[BASE_DATA.cargo.length - 1]} млн тонн</div>
                  <div>• Среднее расстояние: от {BASE_DATA.distance[0]} до {BASE_DATA.distance[BASE_DATA.distance.length - 1]} км</div>
                  <div>• Период прогнозирования: {BASE_DATA.years[0]}–{BASE_DATA.years[BASE_DATA.years.length - 1]} гг.</div>
                  <div>• Ежегодный прирост грузоперевозок: ~{((BASE_DATA.cargo[BASE_DATA.cargo.length - 1] - BASE_DATA.cargo[0]) / BASE_DATA.cargo[0] / (BASE_DATA.years.length - 1) * 100).toFixed(1)}%</div>
                  <div>• Ежегодный прирост расстояния: ~{Math.round((BASE_DATA.distance[BASE_DATA.distance.length - 1] - BASE_DATA.distance[0]) / (BASE_DATA.years.length - 1))} км</div>
                </div>
                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <strong>Методология расчёта:</strong>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <div>Прогнозные значения получены на основе экстраполяции трендов предыдущих периодов с учётом:</div>
                  <div>• макроэкономических показателей развития экономики РФ</div>
                  <div>• инвестиционных программ в транспортную инфраструктуру</div>
                  <div>• структурных изменений в грузовой базе</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Итоговая карточка */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Прогноз на {year} год</div>
          <div style={styles.summaryValues}>
            <span style={styles.summaryValue}>{current.cargo} млн т</span>
            <span style={styles.summarySeparator}>|</span>
            <span style={styles.summaryValue}>{formatNumber(current.distance)} км</span>
          </div>
        </div>

        {/* Дисклеймер */}
        <div style={styles.footer}>
          <div>Прогноз составлен на основе анализа динамики грузоперевозок за предыдущие периоды</div>
          <div>Коэффициенты пересчёта по классам грузов определены на основании статистических данных</div>
          <div style={{ marginTop: '8px', fontStyle: 'italic' }}>
            * Для детального расчёта тарифов используйте калькулятор дохода РЖД
          </div>
        </div>

      </div>
    </div>
  );
};

export default FreightAnalyticsPage;