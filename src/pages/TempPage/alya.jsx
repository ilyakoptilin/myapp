import React, { useState, useMemo } from 'react';

// =============================================================================
// 📊 ИСХОДНЫЕ ДАННЫЕ И КОЭФФИЦИЕНТЫ
// Замените массивы ниже на реальные данные из Excel/BI/Python.
// Коэффициенты (multipliers) масштабируют базовые показатели под выбранный груз.
// =============================================================================
const BASE_DATA = {
    years: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036],
    cargo: [145, 152, 158, 165, 171, 178, 185, 191, 198, 205, 212],      // млн т (базовый/совокупный)
    distance: [1250, 1280, 1310, 1340, 1370, 1400, 1430, 1460, 1490, 1520, 1550], // км (среднее плечо)
    accuracy: [95.0, 94.2, 93.5, 92.8, 92.0, 91.3, 90.5, 89.8, 89.0, 88.3, 87.5] // %
};

const CARGO_MULTIPLIERS = {
    all:         { cargo: 1.00, distance: 1.00, accuracy: 1.00 },
    coal:        { cargo: 0.35, distance: 0.85, accuracy: 1.05 },
    oil:         { cargo: 0.28, distance: 1.20, accuracy: 1.02 },
    ore:         { cargo: 0.18, distance: 0.70, accuracy: 0.98 },
    construction:{ cargo: 0.12, distance: 0.60, accuracy: 0.95 }
};
// =============================================================================

const AlyaPage = () => {
    const [year, setYear] = useState(2031);
    const [selectedCargo, setSelectedCargo] = useState('all');
    const [compareWithLastYear, setCompareWithLastYear] = useState(false);
    
    // Пересчёт данных при смене типа груза
    const chartData = useMemo(() => {
        const m = CARGO_MULTIPLIERS[selectedCargo];
        return {
            years: BASE_DATA.years,
            cargo: BASE_DATA.cargo.map(v => +(v * m.cargo).toFixed(1)),
            distance: BASE_DATA.distance.map(v => Math.round(v * m.distance)),
            accuracy: BASE_DATA.accuracy.map(v => +(v * m.accuracy).toFixed(1))
        };
    }, [selectedCargo]);
    
    const currentIndex = chartData.years.indexOf(year);
    const maxCargo = Math.max(...chartData.cargo);
    const maxDistance = Math.max(...chartData.distance);
    
    const current = {
        cargo: chartData.cargo[currentIndex],
        distance: chartData.distance[currentIndex],
        accuracy: chartData.accuracy[currentIndex]
    };
    
    const prev = currentIndex > 0 ? {
        cargo: chartData.cargo[currentIndex - 1],
        distance: chartData.distance[currentIndex - 1]
    } : null;
    
    const exportToCSV = () => {
        const headers = ['Год', 'Грузоперевозки (млн т)', 'Среднее расстояние (км)', 'Точность прогноза (%)'];
        const rows = chartData.years.map((y, i) => [
            y,
            chartData.cargo[i],
            chartData.distance[i],
            chartData.accuracy[i]
        ]);
        
        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `rzd_forecast_${year}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };
    
    const exportToPDF = () => window.print();
    
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Заголовок */}
                <div style={styles.header}>
                    <div style={styles.logo}>РЖД ПРОГНОЗ</div>
                    <div style={styles.subtitle}>Аналитическая панель грузовых перевозок 2026–2036</div>
                </div>
                
                {/* Панель управления */}
                <div style={styles.controlPanel}>
                    <div style={styles.controlGroup}>
                        <div style={styles.controlLabel}>ВЫБОР ГОДА</div>
                        <input
                            type="range"
                            min="2026"
                            max="2036"
                            step="1"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            style={styles.slider}
                        />
                        <div style={styles.yearBadgeLarge}>{year}</div>
                    </div>
                    
                    <div style={styles.controlGroup}>
                        <div style={styles.controlLabel}>ТИП ГРУЗА</div>
                        <div style={styles.filterButtons}>
                            <button onClick={() => setSelectedCargo('all')} style={{...styles.filterBtn, ...(selectedCargo === 'all' ? styles.filterBtnActive : {})}}>Все</button>
                            <button onClick={() => setSelectedCargo('coal')} style={{...styles.filterBtn, ...(selectedCargo === 'coal' ? styles.filterBtnActive : {})}}>Уголь</button>
                            <button onClick={() => setSelectedCargo('oil')} style={{...styles.filterBtn, ...(selectedCargo === 'oil' ? styles.filterBtnActive : {})}}>Нефть</button>
                            <button onClick={() => setSelectedCargo('ore')} style={{...styles.filterBtn, ...(selectedCargo === 'ore' ? styles.filterBtnActive : {})}}>Руда</button>
                            <button onClick={() => setSelectedCargo('construction')} style={{...styles.filterBtn, ...(selectedCargo === 'construction' ? styles.filterBtnActive : {})}}>Стройматериалы</button>
                        </div>
                    </div>
                    
                    <div style={styles.buttonGroup}>
                        <button onClick={() => setCompareWithLastYear(!compareWithLastYear)} style={styles.actionBtn}>
                            {compareWithLastYear ? 'Скрыть' : 'Показать'} сравнение с {year-1}
                        </button>
                        <button onClick={exportToCSV} style={styles.actionBtn}>Экспорт CSV</button>
                        <button onClick={exportToPDF} style={styles.actionBtn}>Экспорт PDF</button>
                    </div>
                </div>
                
                {/* Блок 1: Грузоперевозки */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>ГРУЗОПЕРЕВОЗКИ</div>
                    <div style={styles.kpiRow}>
                        <div style={styles.kpiBox}>
                            <div style={styles.kpiValue}>{current.cargo}</div>
                            <div style={styles.kpiLabel}>млн тонн</div>
                            <div style={styles.trendText}>
                                {compareWithLastYear && prev ? (
                                    <span>{(current.cargo - prev.cargo >= 0 ? '+' : '')}{(current.cargo - prev.cargo).toFixed(1)}% к {year-1}г</span>
                                ) : <span>Прогноз на год</span>}
                            </div>
                        </div>
                        <div style={styles.kpiBox}>
                            <div style={styles.kpiValue}>{current.accuracy}%</div>
                            <div style={styles.kpiLabel}>точность прогноза</div>
                            <div style={styles.accuracyBar}>
                                <div style={{...styles.accuracyFill, width: `${current.accuracy}%`}}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.chartSection}>
                        <div style={styles.chartTitle}>Динамика объёмов перевозок 2026–2036</div>
                        <div style={styles.chart}>
                            {chartData.cargo.map((value, idx) => {
                                const height = (value / maxCargo) * 200;
                                const isCurrent = idx === currentIndex;
                                return (
                                    <div key={idx} style={styles.barWrapper}>
                                        <div style={{...styles.barValue, color: isCurrent ? '#0f172a' : '#334155'}}>{value}</div>
                                        <div style={{
                                            ...styles.bar,
                                            height: `${Math.max(8, height)}px`,
                                            background: isCurrent ? '#1e3a8a' : '#3b82f6'
                                        }}></div>
                                        <div style={styles.barLabel}>{chartData.years[idx]}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={styles.baseline}></div>
                    </div>
                </div>
                
                {/* Блок 2: Среднее расстояние (вместо дохода) */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>СРЕДНЕЕ РАССТОЯНИЕ ПЕРЕВОЗКИ</div>
                    <div style={styles.kpiRow}>
                        <div style={styles.kpiBox}>
                            <div style={styles.kpiValue}>{current.distance.toLocaleString('ru-RU')}</div>
                            <div style={styles.kpiLabel}>км</div>
                            <div style={styles.trendText}>
                                {compareWithLastYear && prev ? (
                                    <span>{(current.distance - prev.distance >= 0 ? '+' : '')}{(current.distance - prev.distance).toLocaleString('ru-RU')} км к {year-1}г</span>
                                ) : <span>Прогноз на год</span>}
                            </div>
                        </div>
                        <div style={styles.kpiBox}>
                            <div style={styles.kpiValue}>{current.accuracy}%</div>
                            <div style={styles.kpiLabel}>точность модели</div>
                            <div style={styles.accuracyBar}>
                                <div style={{...styles.accuracyFill, width: `${current.accuracy}%`}}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={styles.chartSection}>
                        <div style={styles.chartTitle}>Прогноз среднего плеча перевозки 2026–2036</div>
                        <div style={styles.chart}>
                            {chartData.distance.map((value, idx) => {
                                const height = (value / maxDistance) * 200;
                                const isCurrent = idx === currentIndex;
                                return (
                                    <div key={idx} style={styles.barWrapper}>
                                        <div style={{...styles.barValue, color: isCurrent ? '#0f172a' : '#334155'}}>{value.toLocaleString('ru-RU')}</div>
                                        <div style={{
                                            ...styles.bar,
                                            height: `${Math.max(8, height)}px`,
                                            background: isCurrent ? '#1e3a8a' : '#3b82f6'
                                        }}></div>
                                        <div style={styles.barLabel}>{chartData.years[idx]}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={styles.baseline}></div>
                    </div>
                </div>
                
                {/* Итоговая карточка */}
                <div style={styles.totalCard}>
                    <div style={styles.totalText}>ИТОГО ПРОГНОЗ НА {year}</div>
                    <div style={styles.totalValues}>
                        <span>{current.cargo} млн т</span>
                        <span style={styles.totalSeparator}>|</span>
                        <span>{current.distance.toLocaleString('ru-RU')} км</span>
                        <span style={styles.totalSeparator}>|</span>
                        <span>точность {current.accuracy}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// =============================================================================
// 🎨 СТИЛИ (Корпоративная тёмно-синяя палитра)
// =============================================================================
const styles = {
    container: {
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: '#f8fafc',
        color: '#0f172a'
    },
    content: {
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px 60px'
    },
    header: {
        marginBottom: '28px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '16px'
    },
    logo: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: '-0.5px',
        marginBottom: '6px'
    },
    subtitle: {
        fontSize: '0.95rem',
        color: '#334155',
        fontWeight: '500'
    },
    controlPanel: {
        background: '#ffffff',
        borderRadius: '6px',
        padding: '20px 24px',
        marginBottom: '24px',
        border: '1px solid #cbd5e1'
    },
    controlGroup: { marginBottom: '16px' },
    controlLabel: {
        color: '#0f172a',
        fontSize: '0.7rem',
        fontWeight: '700',
        letterSpacing: '1px',
        marginBottom: '10px',
        textTransform: 'uppercase'
    },
    slider: {
        width: '100%',
        height: '6px',
        borderRadius: '3px',
        background: '#cbd5e1',
        outline: 'none',
        cursor: 'pointer',
        WebkitAppearance: 'none'
    },
    yearBadgeLarge: {
        textAlign: 'center',
        marginTop: '8px',
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#0f172a'
    },
    filterButtons: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    filterBtn: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #94a3b8',
        background: '#ffffff',
        color: '#0f172a',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.15s'
    },
    filterBtnActive: {
        background: '#1e3a8a',
        color: '#ffffff',
        borderColor: '#1e3a8a'
    },
    buttonGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' },
    actionBtn: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #1e3a8a',
        background: '#ffffff',
        color: '#1e3a8a',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.15s'
    },
    card: {
        background: '#ffffff',
        borderRadius: '6px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #cbd5e1'
    },
    cardHeader: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid #e2e8f0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    kpiRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
    },
    kpiBox: {
        background: '#f8fafc',
        borderRadius: '4px',
        padding: '20px 16px',
        textAlign: 'center',
        border: '1px solid #e2e8f0'
    },
    kpiValue: {
        fontSize: '3.2rem',
        fontWeight: '800',
        color: '#1e3a8a',
        lineHeight: 1
    },
    kpiLabel: {
        fontSize: '0.75rem',
        color: '#334155',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '8px',
        fontWeight: '600'
    },
    trendText: {
        fontSize: '0.85rem',
        color: '#0f172a',
        marginTop: '10px',
        fontWeight: '600'
    },
    accuracyBar: {
        background: '#e2e8f0',
        borderRadius: '3px',
        height: '6px',
        marginTop: '12px',
        overflow: 'hidden'
    },
    accuracyFill: {
        height: '100%',
        background: '#1e3a8a',
        borderRadius: '3px',
        transition: 'width 0.3s ease'
    },
    chartSection: { marginTop: '16px' },
    chartTitle: {
        fontSize: '0.85rem',
        color: '#334155',
        marginBottom: '16px',
        fontWeight: '600'
    },
    chart: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '220px',
        paddingBottom: '4px',
        gap: '12px'
    },
    barWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    bar: {
        width: '100%',
        maxWidth: '42px',
        borderRadius: '2px 2px 0 0',
        transition: 'height 0.3s ease',
        marginBottom: '6px'
    },
    barValue: {
        fontSize: '0.8rem',
        fontWeight: '700',
        marginBottom: '4px'
    },
    barLabel: {
        fontSize: '0.75rem',
        color: '#334155',
        fontWeight: '600',
        marginTop: '6px'
    },
    baseline: {
        height: '1px',
        background: '#94a3b8',
        width: '100%',
        marginTop: '8px'
    },
    totalCard: {
        background: '#0f172a',
        borderRadius: '6px',
        padding: '20px',
        textAlign: 'center'
    },
    totalText: {
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '1.5px',
        color: '#94a3b8',
        marginBottom: '10px',
        textTransform: 'uppercase'
    },
    totalValues: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
    },
    totalSeparator: { color: '#475569' }
};

// Подключение шрифта и стилизация ползунка
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #1e3a8a;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.3);
        transition: transform 0.15s;
    }
    input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.1); }
    input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #1e3a8a;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.3);
    }
    @media print {
        body * { visibility: hidden; }
        #root, #root * { visibility: visible; }
        #root { position: absolute; left: 0; top: 0; width: 100%; background: #fff; }
        .actionBtn { display: none !important; }
        .card, .controlPanel, .totalCard { box-shadow: none !important; border: 1px solid #cbd5e1 !important; }
    }
    @media (max-width: 768px) {
        .kpiValue { font-size: 2.8rem !important; }
        .chart { gap: 6px; }
        .bar { max-width: 32px; }
    }
`;
document.head.appendChild(styleSheet);

export default AlyaPage;