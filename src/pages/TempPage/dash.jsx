import React, { useState } from 'react';

const DashboardMainPage = () => {
  // Данные для графиков
  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
  const revenues = [980, 1050, 1120, 1180, 1240, 1290, 1330, 1360, 1380, 1395, 1400];
  const cargoVolume = [145, 152, 158, 165, 171, 178, 185, 191, 198, 205, 212];
  const avgDistance = [1250, 1280, 1310, 1340, 1370, 1400, 1430, 1460, 1490, 1520, 1550];
  
  const [selectedYear, setSelectedYear] = useState(2036);
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);
  const [showCargoDetails, setShowCargoDetails] = useState(false);

  // Расчёты
  const firstRevenue = revenues[0];
  const lastRevenue = revenues[revenues.length - 1];
  const yearsCount = revenues.length - 1;
  const cagr = ((Math.pow(lastRevenue / firstRevenue, 1 / yearsCount) - 1) * 100).toFixed(1);
  
  const firstCargo = cargoVolume[0];
  const lastCargo = cargoVolume[cargoVolume.length - 1];
  const cargoGrowth = ((lastCargo - firstCargo) / firstCargo * 100).toFixed(1);
  
  const firstDistance = avgDistance[0];
  const lastDistance = avgDistance[avgDistance.length - 1];
  const distanceGrowth = ((lastDistance - firstDistance) / firstDistance * 100).toFixed(1);
  
  const maxRevenue = Math.max(...revenues);
  const maxCargo = Math.max(...cargoVolume);
  const maxDistance = Math.max(...avgDistance);
  const chartHeight = 200;
  
  const currentRevenue = revenues[years.indexOf(selectedYear)];
  const currentCargo = cargoVolume[years.indexOf(selectedYear)];
  const currentDistance = avgDistance[years.indexOf(selectedYear)];

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  // Иконка стрелки
  const ChevronIcon = ({ expanded }) => (
    <svg style={{ width: '14px', height: '14px', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  // Компонент мини-графика
  const MiniChart = ({ data, maxValue, color, height = 80 }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: `${height}px` }}>
        {data.map((value, idx) => (
          <div key={idx} style={{
            flex: 1,
            height: `${(value / maxValue) * height}px`,
            background: color,
            borderRadius: '3px 3px 0 0',
            minHeight: '3px'
          }} />
        ))}
      </div>
    );
  };

  const styles = {
    page: {
      minHeight: '200vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      color: '#1e293b',
      lineHeight: '1.5'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '40px 32px 64px'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '6px',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      fontSize: '0.9rem',
      color: '#64748b'
    },
    dateBadge: {
      display: 'inline-block',
      background: '#e0f2fe',
      color: '#0369a1',
      fontSize: '0.7rem',
      padding: '4px 10px',
      borderRadius: '20px',
      marginTop: '12px'
    },
    // Секция с KPI карточками
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '32px'
    },
    kpiCard: {
      background: '#ffffff',
      borderRadius: '20px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    kpiLabel: {
      fontSize: '0.7rem',
      fontWeight: '600',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '8px'
    },
    kpiValue: {
      fontSize: '1.6rem',
      fontWeight: '800',
      color: '#0f172a',
      lineHeight: '1.2',
      marginBottom: '8px'
    },
    kpiTrend: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: '600'
    },
    trendPositive: {
      background: '#e0f2fe',
      color: '#0369a1'
    },
    trendNeutral: {
      background: '#f1f5f9',
      color: '#475569'
    },
    // Две колонки
    twoColumns: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px'
    },
    card: {
      background: '#ffffff',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
    },
    cardHeader: {
      padding: '16px 20px',
      background: '#fafbfc',
      borderBottom: '1px solid #eef2f6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardTitle: {
      fontSize: '0.8rem',
      fontWeight: '600',
      color: '#475569',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cardBody: {
      padding: '20px'
    },
    // График
    chartContainer: {
      marginTop: '16px',
      overflowX: 'auto'
    },
    chartBars: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '6px',
      minWidth: '400px'
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px'
    },
    bar: {
      width: '100%',
      maxWidth: '35px',
      background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
      borderRadius: '4px 4px 0 0',
      transition: 'height 0.3s ease'
    },
    barCurrent: {
      background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
    },
    barValue: {
      fontSize: '0.65rem',
      fontWeight: '600',
      color: '#0f172a'
    },
    barLabel: {
      fontSize: '0.6rem',
      color: '#94a3b8'
    },
    // Фолдеры
    folder: {
      marginBottom: '12px',
      borderRadius: '12px',
      border: '1px solid #eef2f6',
      background: '#ffffff',
      overflow: 'hidden'
    },
    folderHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: '#fafbfc',
      cursor: 'pointer'
    },
    folderTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#475569',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    folderContent: {
      padding: '16px',
      background: '#ffffff',
      borderTop: '1px solid #eef2f6',
      fontSize: '0.75rem',
      lineHeight: '1.6',
      color: '#475569'
    },
    // Слайдер
    sliderWrapper: {
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid #eef2f6'
    },
    sliderLabel: {
      fontSize: '0.7rem',
      fontWeight: '600',
      color: '#64748b',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    slider: {
      width: '100%',
      height: '4px',
      borderRadius: '2px',
      background: '#e2e8f0',
      outline: 'none',
      WebkitAppearance: 'none'
    },
    yearValue: {
      background: '#f1f5f9',
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    // Итоговая карточка
    summaryCard: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '20px',
      padding: '24px',
      textAlign: 'center',
      marginBottom: '24px'
    },
    summaryTitle: {
      fontSize: '0.7rem',
      fontWeight: '600',
      color: '#94a3b8',
      textTransform: 'uppercase',
      marginBottom: '12px'
    },
    summaryValues: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    summaryValue: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#ffffff'
    },
    summarySeparator: {
      color: '#475569',
      fontSize: '1.25rem'
    },
    footer: {
      marginTop: '24px',
      paddingTop: '20px',
      borderTop: '1px solid #e2e8f0',
      fontSize: '0.7rem',
      color: '#94a3b8',
      textAlign: 'center'
    },
    link: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Заголовок */}
        <header style={styles.header}>
          <h1 style={styles.title}>Дашборд грузовых перевозок РЖД</h1>
          <p style={styles.subtitle}>Прогноз ключевых показателей на период 2026–2036 годов</p>
          <div style={styles.dateBadge}>Актуально на март 2026</div>
        </header>

        {/* KPI карточки */}
        <div style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>Доход 2036</div>
            <div style={styles.kpiValue}>{formatCurrency(lastRevenue)} млрд ₽</div>
            <span style={{ ...styles.kpiTrend, ...styles.trendPositive }}>↑ +{((lastRevenue - firstRevenue) / firstRevenue * 100).toFixed(1)}%</span>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>CAGR</div>
            <div style={styles.kpiValue}>{cagr}%</div>
            <span style={{ ...styles.kpiTrend, ...styles.trendNeutral }}>среднегодовой</span>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>Грузоперевозки</div>
            <div style={styles.kpiValue}>{formatNumber(lastCargo)} млн т</div>
            <span style={{ ...styles.kpiTrend, ...styles.trendPositive }}>↑ +{cargoGrowth}%</span>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiLabel}>Среднее расстояние</div>
            <div style={styles.kpiValue}>{formatNumber(lastDistance)} км</div>
            <span style={{ ...styles.kpiTrend, ...styles.trendPositive }}>↑ +{distanceGrowth}%</span>
          </div>
        </div>

        {/* Две колонки с графиками */}
        <div style={styles.twoColumns}>
          {/* Доходы */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>
                Прогноз доходов
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>млрд ₽</span>
            </div>
            <div style={styles.cardBody}>
              <MiniChart data={revenues} maxValue={maxRevenue} color="#3b82f6" height={100} />
              <div style={styles.sliderWrapper}>
                <div style={styles.sliderLabel}>
                  <span>Выберите год для детализации</span>
                  <span style={styles.yearValue}>{selectedYear}</span>
                </div>
                <input
                  type="range"
                  min={years[0]}
                  max={years[years.length - 1]}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  style={styles.slider}
                />
              </div>
              
              <div style={styles.folder}>
                <div style={styles.folderHeader} onClick={() => setShowRevenueDetails(!showRevenueDetails)}>
                  <div style={styles.folderTitle}>
                    <ChevronIcon expanded={showRevenueDetails} />
                    Детализация доходов
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#3b82f6' }}>{showRevenueDetails ? 'Свернуть' : 'Развернуть'}</span>
                </div>
                {showRevenueDetails && (
                  <div style={styles.folderContent}>
                    {years.map((year, idx) => (
                      <div key={year} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>{year}:</span>
                        <span style={{ fontWeight: '600' }}>{formatNumber(revenues[idx])} млрд ₽</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Грузоперевозки */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>
                Объём грузоперевозок
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>млн тонн</span>
            </div>
            <div style={styles.cardBody}>
              <MiniChart data={cargoVolume} maxValue={maxCargo} color="#3b82f6" height={100} />
              
              <div style={styles.folder}>
                <div style={styles.folderHeader} onClick={() => setShowCargoDetails(!showCargoDetails)}>
                  <div style={styles.folderTitle}>
                    <ChevronIcon expanded={showCargoDetails} />
                    Детализация по годам
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#3b82f6' }}>{showCargoDetails ? 'Свернуть' : 'Развернуть'}</span>
                </div>
                {showCargoDetails && (
                  <div style={styles.folderContent}>
                    {years.map((year, idx) => (
                      <div key={year} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>{year}:</span>
                        <span style={{ fontWeight: '600' }}>{cargoVolume[idx]} млн т</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Среднее расстояние перевозки */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>
              Среднее расстояние перевозки
            </div>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>км</span>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.chartContainer}>
              <div style={styles.chartBars}>
                {avgDistance.map((value, idx) => {
                  const height = (value / maxDistance) * 120;
                  const isCurrent = years[idx] === selectedYear;
                  return (
                    <div key={idx} style={styles.barWrapper}>
                      <div style={{
                        ...styles.bar,
                        height: `${Math.max(4, height)}px`,
                        ...(isCurrent ? styles.barCurrent : {})
                      }} />
                      <span style={styles.barValue}>{value}</span>
                      <span style={styles.barLabel}>{years[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Итоговая карточка */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Прогноз на {selectedYear} год</div>
          <div style={styles.summaryValues}>
            <span style={styles.summaryValue}>{formatCurrency(currentRevenue)} млрд ₽</span>
            <span style={styles.summarySeparator}>|</span>
            <span style={styles.summaryValue}>{currentCargo} млн т</span>
            <span style={styles.summarySeparator}>|</span>
            <span style={styles.summaryValue}>{formatNumber(currentDistance)} км</span>
          </div>
        </div>

        {/* Навигация по страницам */}
        <div style={styles.footer}>
          <span>Полные версии расчётов: </span>
          <a href="#" style={styles.link}>Калькулятор дохода</a>
          <span style={{ margin: '0 8px' }}>•</span>
          <a href="#" style={styles.link}>Аналитика грузоперевозок</a>
          <span style={{ margin: '0 8px' }}>•</span>
          <a href="#" style={styles.link}>Полный прогноз доходов</a>
          <div style={{ marginTop: '12px' }}>
            Данные основаны на прогнозах развития экономики РФ и индексации тарифов
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardMainPage;