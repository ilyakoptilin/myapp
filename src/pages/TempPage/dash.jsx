export default function Dash() {
  // Данные для графика
  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
  const revenues = [980, 1050, 1120, 1180, 1240, 1290, 1330, 1360, 1380, 1395, 1400];
  
  // Расчёт CAGR (среднегодовой темп роста)
  const firstRevenue = revenues[0];
  const lastRevenue = revenues[revenues.length - 1];
  const yearsCount = revenues.length - 1;
  const cagr = ((Math.pow(lastRevenue / firstRevenue, 1 / yearsCount) - 1) * 100).toFixed(1);
  
  const maxRevenue = Math.max(...revenues);
  const chartHeight = 280;
  
  const getBarHeight = (value) => (value / maxRevenue) * chartHeight;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Боковое меню */}
      <aside style={{
        width: '260px',
        backgroundColor: 'white',
        padding: '24px 16px',
        borderRight: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          margin: '0 0 32px 12px',
          color: '#1e293b',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Навигация
        </h2>
        
        <nav>
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            color: '#0f172a',
            marginBottom: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: '500'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></span>
            Главный экран
          </div>
          
          {['Карта грузопотоков', 'Детализация доходов', 'Сценарное моделирование', 'Расходы и баланс'].map((item) => (
            <div key={item} style={{
              padding: '12px 16px',
              color: '#64748b',
              borderRadius: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#64748b';
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                border: '2px solid #cbd5e1',
                borderRadius: '50%'
              }}></span>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Основной контент */}
      <main style={{
        flex: 1,
        padding: '32px'
      }}>
        {/* Заголовок */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}></span>
            Прогноз доходов за грузоперевозки
          </h1>
        </header>

        {/* Карточки с метриками — исправлено: нет повторяющихся данных */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Карточка 1: Итоговый доход 2036 */}
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '14px' }}>
               Доход 2036 года
            </p>
            <p style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a'
            }}>
              1.4 трлн ₽
            </p>
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 12px',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              ↑ +42.8% к 2026
            </span>
          </div>

          {/* Карточка 2: CAGR (среднегодовой рост) — уникальная метрика */}
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '14px' }}>
               Среднегодовой рост (CAGR)
            </p>
            <p style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a'
            }}>
              {cagr}%
            </p>
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 12px',
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              за 10 лет
            </span>
          </div>

          {/* Карточка 3: Точность модели — оставляем как есть */}
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '14px' }}>
               Точность модели
            </p>
            <p style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a'
            }}>
              83%
            </p>
            <span style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 12px',
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              ↑ +5 п.п.
            </span>
          </div>
        </div>

        {/* График */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            margin: '0 0 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#0f172a'
          }}>
            📊 Прогноз доходов 2026–2036, млрд ₽
          </h3>
          
          <div style={{
            position: 'relative',
            height: `${chartHeight + 50}px`,
            marginLeft: '50px'
          }}>
            {/* Горизонтальные линии сетки */}
            {[0, 300, 600, 900, 1200, 1500].map((val) => {
              const yPosition = chartHeight - (val / maxRevenue) * chartHeight;
              if (yPosition >= 0 && yPosition <= chartHeight) {
                return (
                  <div key={val} style={{
                    position: 'absolute',
                    bottom: yPosition,
                    left: 0,
                    right: 0,
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '-45px',
                      fontSize: '11px',
                      color: '#94a3b8'
                    }}>
                      {val}
                    </span>
                  </div>
                );
              }
              return null;
            })}
            
            {/* Столбцы графика */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px'
            }}>
              {revenues.map((rev, idx) => (
                <div key={idx} style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '100%',
                    backgroundColor: '#3b82f6',
                    height: `${getBarHeight(rev)}px`,
                    minHeight: '4px',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      top: '-22px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#0f172a',
                      whiteSpace: 'nowrap'
                    }}>
                      {rev}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {years[idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#94a3b8'
          }}>
            млрд рублей
          </div>
        </div>
      </main>
    </div>
  );
}