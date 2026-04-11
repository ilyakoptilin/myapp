import { useState } from 'react'

export const Client = () => {
    const [activePage, setActivePage] = useState('revenue')
    const [selectedCompany, setSelectedCompany] = useState(null)
    
    // Данные по грузам
    const cargoData = [
        { name: "Уголь", revenue: 420, share: 35, color: "#1e3a8a", icon: "🪨", trend: "+12%" },
        { name: "Нефть", revenue: 300, share: 25, color: "#2563eb", icon: "🛢️", trend: "+8%" },
        { name: "Металл", revenue: 240, share: 20, color: "#3b82f6", icon: "⚙️", trend: "+5%" },
        { name: "Контейнеры", revenue: 180, share: 15, color: "#60a5fa", icon: "📦", trend: "+18%" },
        { name: "Прочее", revenue: 60, share: 5, color: "#94a3b8", icon: "📊", trend: "-2%" }
    ]

    // Данные по компаниям
    const companyData = [
        { name: "РЖД Логистика", revenue: 350, growth: "+15%", color: "#1e3a8a", marketShare: 29 },
        { name: "СУЭК", revenue: 280, growth: "+22%", color: "#2563eb", marketShare: 23 },
        { name: "Роснефть", revenue: 250, growth: "+10%", color: "#3b82f6", marketShare: 21 },
        { name: "НЛМК", revenue: 200, growth: "+7%", color: "#60a5fa", marketShare: 17 },
        { name: "FESCO", revenue: 120, growth: "+25%", color: "#94a3b8", marketShare: 10 }
    ]

    const maxRevenue = Math.max(...cargoData.map(c => c.revenue))

    const menuItems = [
        { id: 'main', label: 'Главный экран', icon: '📊' },
        { id: 'map', label: 'Карта грузопотоков', icon: '🗺️' },
        { id: 'revenue', label: 'Детализация доходов', icon: '💰' },
        { id: 'scenario', label: 'Сценарное моделирование', icon: '⚙️' },
        { id: 'expenses', label: 'Расходы и баланс', icon: '📉' }
    ]

    // Заглушка для неработающих страниц
    const renderPlaceholder = () => (
        <div style={styles.card}>
            <div style={styles.cardHeader}>В разработке</div>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
                <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '8px' }}>Страница находится в разработке</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Функционал будет доступен в следующей версии</div>
            </div>
        </div>
    )

    // Объединенная страница "Детализация доходов" + "Кто платит"
    const renderRevenue = () => (
        <>
            {/* Блок 1: Структура доходов по грузам */}
            <div style={styles.card}>
                <div style={styles.cardHeader}>📦 Структура доходов по грузам</div>
                
                {cargoData.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                                {item.name}
                            </div>
                            <div style={{ fontWeight: '700', color: item.color }}>
                                {item.revenue} млрд ₽
                            </div>
                        </div>
                        <div style={styles.accuracyBar}>
                            <div style={{
                                ...styles.accuracyFill,
                                width: `${(item.revenue / maxRevenue) * 100}%`,
                                background: item.color
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#334155' }}>
                                Доля: {item.share}%
                            </span>
                            <span style={{
                                fontSize: '0.75rem',
                                color: item.trend.startsWith('+') ? '#10b981' : '#ef4444',
                                fontWeight: '600'
                            }}>
                                {item.trend}
                            </span>
                        </div>
                    </div>
                ))}
                
                <div style={styles.baseline} />
                <div style={styles.trendText}>📊 Уголь и нефть формируют 60% всей выручки</div>
            </div>

            {/* Блок 2: Доходы по компаниям-клиентам */}
            <div style={styles.card}>
                <div style={styles.cardHeader}>🏢 Доходы по компаниям-клиентам</div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <th style={styles.th}>Компания</th>
                            <th style={styles.thRight}>Доход</th>
                            <th style={styles.thRight}>Доля</th>
                            <th style={styles.thRight}>Динамика</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyData.map((item, idx) => (
                            <tr
                                key={idx}
                                style={{
                                    ...styles.tr,
                                    cursor: 'pointer',
                                    background: selectedCompany === item.name ? '#f8fafc' : 'transparent'
                                }}
                                onClick={() => setSelectedCompany(selectedCompany === item.name ? null : item.name)}
                            >
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.tdRight}>{item.revenue} млрд</td>
                                <td style={styles.tdRight}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '40px', background: '#e2e8f0', borderRadius: '2px', height: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${item.marketShare}%`, height: '100%', background: item.color }} />
                                        </div>
                                        <span>{item.marketShare}%</span>
                                    </div>
                                </td>
                                <td style={{ ...styles.tdRight, color: item.growth.startsWith('+') ? '#10b981' : '#ef4444' }}>
                                    {item.growth}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={styles.tfoot}>
                            <td style={styles.tdFoot}>Итого</td>
                            <td style={styles.tdFootRight}>1200 млрд</td>
                            <td style={styles.tdFootRight}>100%</td>
                            <td style={styles.tdFootRight}>—</td>
                        </tr>
                    </tfoot>
                </table>
                
                {selectedCompany && (
                    <div style={{
                        marginTop: '20px',
                        padding: '12px 16px',
                        background: '#f8fafc',
                        borderRadius: '4px',
                        borderLeft: `3px solid ${companyData.find(c => c.name === selectedCompany)?.color || '#1e3a8a'}`
                    }}>
                        <span style={{ fontSize: '0.8rem', color: '#334155' }}>
                            <strong>{selectedCompany}</strong> — доля {companyData.find(c => c.name === selectedCompany)?.marketShare}% в портфеле. Рост {companyData.find(c => c.name === selectedCompany)?.growth}.
                        </span>
                    </div>
                )}
                
                <div style={styles.baseline} />
                <div style={styles.trendText}>📊 Два крупнейших клиента обеспечивают 52% всех доходов</div>
            </div>

            {/* Итоговая сводка */}
            <div style={styles.totalCard}>
                <div style={styles.totalText}>Аналитическая сводка</div>
                <div style={styles.totalValues}>
                    <span>Уголь + Нефть: 60% выручки</span>
                    <span style={styles.totalSeparator}>|</span>
                    <span>Топ-2 клиента: 52% доходов</span>
                    <span style={styles.totalSeparator}>|</span>
                    <span>Контейнеры: +18% рост</span>
                </div>
            </div>
        </>
    )

    const renderContent = () => {
        if (activePage === 'revenue') {
            return renderRevenue()
        }
        return renderPlaceholder()
    }

    return (
        <div style={styles.container}>
            {/* Боковое меню - маркированный список */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarLogo}>
                    <div style={styles.logoIcon}>🚂</div>
                    <div style={styles.logoText}>РЖД<br /><span style={{ fontSize: '10px', fontWeight: '400' }}>Аналитика</span></div>
                </div>
                <nav style={styles.sidebarNav}>
                    <ul style={styles.menuList}>
                        {menuItems.map(item => (
                            <li 
                                key={item.id}
                                style={{
                                    ...styles.menuItem,
                                    ...(activePage === item.id ? styles.menuItemActive : {})
                                }}
                                onClick={() => setActivePage(item.id)}
                            >
                                <span style={styles.menuBullet}>•</span>
                                <span style={styles.menuIcon}>{item.icon}</span>
                                <span style={styles.menuLabel}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div style={styles.sidebarFooter}>
                    <div style={styles.footerText}>© 2024<br />Версия 2.0</div>
                </div>
            </div>

            {/* Основной контент */}
            <div style={styles.mainContent}>
                <div style={styles.content}>
                    
                    {/* Шапка */}
                    <div style={styles.header}>
                        <div style={styles.logo}>💰 Детализация доходов</div>
                        <div style={styles.subtitle}>Анализ доходов по типам грузов и компаниям-клиентам</div>
                    </div>

                    {/* Контент */}
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

// 🎨 СТИЛИ
const styles = {
    container: {
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: '#f8fafc',
        color: '#0f172a',
        display: 'flex'
    },
    sidebar: {
        width: '260px',
        background: '#f8fafc',
        color: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #e2e8f0'
    },
    sidebarLogo: {
        padding: '28px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    logoIcon: {
        fontSize: '32px'
    },
    logoText: {
        fontSize: '18px',
        fontWeight: '700',
        lineHeight: '1.3',
        color: '#0f172a'
    },
    sidebarNav: {
        flex: 1,
        padding: '24px 16px'
    },
    menuList: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        marginBottom: '4px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        color: '#475569',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    menuItemActive: {
        background: '#e2e8f0',
        color: '#1e3a8a',
        fontWeight: '600'
    },
    menuBullet: {
        fontSize: '16px',
        color: '#94a3b8',
        marginRight: '4px'
    },
    menuIcon: {
        fontSize: '1.1rem'
    },
    menuLabel: {
        flex: 1
    },
    sidebarFooter: {
        padding: '20px',
        borderTop: '1px solid #e2e8f0',
        fontSize: '10px',
        color: '#94a3b8',
        textAlign: 'center'
    },
    footerText: {
        lineHeight: '1.5'
    },
    mainContent: {
        flex: 1,
        marginLeft: '260px'
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
    accuracyBar: {
        background: '#e2e8f0',
        borderRadius: '3px',
        height: '6px',
        overflow: 'hidden'
    },
    accuracyFill: {
        height: '100%',
        borderRadius: '3px',
        transition: 'width 0.3s ease'
    },
    baseline: {
        height: '1px',
        background: '#94a3b8',
        width: '100%',
        marginTop: '20px',
        marginBottom: '16px'
    },
    trendText: {
        fontSize: '0.85rem',
        color: '#0f172a',
        marginTop: '10px',
        fontWeight: '600'
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
        fontSize: '1rem',
        fontWeight: '600',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
    },
    totalSeparator: {
        color: '#475569'
    },
    th: {
        textAlign: 'left',
        padding: '12px 8px',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#334155'
    },
    thRight: {
        textAlign: 'right',
        padding: '12px 8px',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#334155'
    },
    tr: {
        borderBottom: '1px solid #f1f5f9'
    },
    td: {
        padding: '12px 8px',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    tdRight: {
        padding: '12px 8px',
        fontSize: '0.85rem',
        textAlign: 'right',
        fontWeight: '500'
    },
    tfoot: {
        borderTop: '2px solid #e2e8f0',
        background: '#f8fafc'
    },
    tdFoot: {
        padding: '12px 8px',
        fontWeight: '700'
    },
    tdFootRight: {
        padding: '12px 8px',
        textAlign: 'right',
        fontWeight: '700'
    }
}