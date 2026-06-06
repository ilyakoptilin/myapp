import React, { useMemo, useState } from 'react';
import './RouteVisualization.css';

const cargoTypes = {
  coal: 'Уголь',
  oil: 'Нефтяные грузы',
  containers: 'Контейнеры',
  grain: 'Зерно',
  metals: 'Металлы',
  timber: 'Лесные грузы',
  fertilizers: 'Удобрения',
};

const stations = [
  { id: 'spb', name: 'Санкт-Петербург', region: 'Северо-Запад', lat: 59.94, lon: 30.31, cargo: ['containers', 'oil', 'timber'], volume: 42 },
  { id: 'moscow', name: 'Москва', region: 'Центр', lat: 55.75, lon: 37.62, cargo: ['containers', 'metals', 'grain'], volume: 86 },
  { id: 'nn', name: 'Нижний Новгород', region: 'Поволжье', lat: 56.33, lon: 44.00, cargo: ['metals', 'oil'], volume: 38 },
  { id: 'kazan', name: 'Казань', region: 'Поволжье', lat: 55.79, lon: 49.12, cargo: ['oil', 'containers', 'fertilizers'], volume: 51 },
  { id: 'samara', name: 'Самара', region: 'Поволжье', lat: 53.20, lon: 50.15, cargo: ['oil', 'grain'], volume: 57 },
  { id: 'ufa', name: 'Уфа', region: 'Урал', lat: 54.74, lon: 55.97, cargo: ['oil', 'fertilizers'], volume: 49 },
  { id: 'perm', name: 'Пермь', region: 'Урал', lat: 58.01, lon: 56.25, cargo: ['oil', 'timber'], volume: 36 },
  { id: 'ekb', name: 'Екатеринбург', region: 'Урал', lat: 56.84, lon: 60.61, cargo: ['metals', 'containers'], volume: 74 },
  { id: 'chelyabinsk', name: 'Челябинск', region: 'Урал', lat: 55.16, lon: 61.40, cargo: ['metals', 'coal'], volume: 61 },
  { id: 'omsk', name: 'Омск', region: 'Сибирь', lat: 54.99, lon: 73.37, cargo: ['grain', 'oil'], volume: 45 },
  { id: 'novosibirsk', name: 'Новосибирск', region: 'Сибирь', lat: 55.03, lon: 82.92, cargo: ['containers', 'coal', 'grain'], volume: 83 },
  { id: 'krasnoyarsk', name: 'Красноярск', region: 'Сибирь', lat: 56.01, lon: 92.87, cargo: ['coal', 'metals', 'timber'], volume: 67 },
  { id: 'irkutsk', name: 'Иркутск', region: 'Сибирь', lat: 52.29, lon: 104.28, cargo: ['coal', 'timber'], volume: 48 },
  { id: 'chita', name: 'Чита', region: 'Забайкалье', lat: 52.03, lon: 113.50, cargo: ['coal', 'containers'], volume: 32 },
  { id: 'khabarovsk', name: 'Хабаровск', region: 'Дальний Восток', lat: 48.48, lon: 135.07, cargo: ['containers', 'timber'], volume: 41 },
  { id: 'vladivostok', name: 'Владивосток', region: 'Дальний Восток', lat: 43.12, lon: 131.89, cargo: ['containers', 'oil'], volume: 53 },
  { id: 'rostov', name: 'Ростов-на-Дону', region: 'Юг', lat: 47.23, lon: 39.70, cargo: ['grain', 'oil'], volume: 44 },
  { id: 'novorossiysk', name: 'Новороссийск', region: 'Юг', lat: 44.72, lon: 37.77, cargo: ['grain', 'oil', 'containers'], volume: 58 },
];

const routes = [
  ['spb', 'moscow', 650, 78, 'main'], ['moscow', 'nn', 440, 82, 'main'], ['nn', 'kazan', 390, 72, 'main'],
  ['kazan', 'samara', 350, 64, 'main'], ['samara', 'ufa', 460, 66, 'main'], ['ufa', 'chelyabinsk', 420, 71, 'main'],
  ['chelyabinsk', 'ekb', 210, 88, 'main'], ['ekb', 'omsk', 950, 96, 'main'], ['omsk', 'novosibirsk', 660, 103, 'main'],
  ['novosibirsk', 'krasnoyarsk', 790, 91, 'main'], ['krasnoyarsk', 'irkutsk', 1060, 80, 'main'], ['irkutsk', 'chita', 1100, 67, 'main'],
  ['chita', 'khabarovsk', 2200, 58, 'main'], ['khabarovsk', 'vladivostok', 760, 62, 'main'],
  ['moscow', 'rostov', 1070, 61, 'regional'], ['rostov', 'novorossiysk', 410, 54, 'regional'], ['perm', 'ekb', 360, 48, 'regional'],
  ['kazan', 'perm', 600, 44, 'regional'], ['samara', 'rostov', 950, 37, 'regional'],
].map(([from, to, distance, capacity, type], index) => ({ id: `r${index}`, from, to, distance, capacity, type }));

const cargoColor = {
  coal: '#334155', oil: '#7c3aed', containers: '#dc2626', grain: '#ca8a04', metals: '#64748b', timber: '#16a34a', fertilizers: '#0891b2',
};

const zoom = 4;
const tileSize = 256;
const tileUrl = (x, y) => `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

function project(lon, lat) {
  const sin = Math.sin((lat * Math.PI) / 180);
  const x = ((lon + 180) / 360) * 2 ** zoom * tileSize;
  const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * 2 ** zoom * tileSize;
  return { x, y };
}

const mapBounds = {
  left: project(20, 70).x,
  top: project(20, 70).y,
  right: project(147, 41).x,
  bottom: project(147, 41).y,
};
mapBounds.width = mapBounds.right - mapBounds.left;
mapBounds.height = mapBounds.bottom - mapBounds.top;

function screenPoint(station) {
  const p = project(station.lon, station.lat);
  return { x: p.x - mapBounds.left, y: p.y - mapBounds.top };
}

function RouteVisualization() {
  const [filters, setFilters] = useState({ region: 'all', cargo: 'all', capacity: 0 });
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const regions = useMemo(() => [...new Set(stations.map((s) => s.region))], []);
  const stationById = useMemo(() => Object.fromEntries(stations.map((s) => [s.id, s])), []);

  const filteredStations = stations.filter((station) => {
    if (filters.region !== 'all' && station.region !== filters.region) return false;
    if (filters.cargo !== 'all' && !station.cargo.includes(filters.cargo)) return false;
    return true;
  });
  const visibleIds = new Set(filteredStations.map((s) => s.id));
  const filteredRoutes = routes.filter((route) => visibleIds.has(route.from) && visibleIds.has(route.to) && route.capacity >= filters.capacity);
  const totalVolume = filteredStations.reduce((sum, station) => sum + station.volume, 0);

  const tiles = [];
  const minTileX = Math.floor(mapBounds.left / tileSize);
  const maxTileX = Math.ceil(mapBounds.right / tileSize);
  const minTileY = Math.floor(mapBounds.top / tileSize);
  const maxTileY = Math.ceil(mapBounds.bottom / tileSize);
  for (let x = minTileX; x <= maxTileX; x += 1) {
    for (let y = minTileY; y <= maxTileY; y += 1) {
      tiles.push({ x, y, px: x * tileSize - mapBounds.left, py: y * tileSize - mapBounds.top });
    }
  }

  const activeRouteStations = selectedRoute ? [stationById[selectedRoute.from], stationById[selectedRoute.to]] : [];

  const handleStationClick = (station) => {
    if (selectedStation && selectedStation.id !== station.id) {
      const direct = filteredRoutes.find((r) => (r.from === selectedStation.id && r.to === station.id) || (r.from === station.id && r.to === selectedStation.id));
      setSelectedRoute(direct || null);
    }
    setSelectedStation(station);
  };

  return (
    <div className="route-visualization-container">
      <aside className="map-sidebar">
        <div className="map-panel map-panel-title">
          <span>Маршрутная сеть</span>
          <h2>Карта грузовых направлений</h2>
          <p>Все маршруты и станции находятся на одной карте OpenStreetMap. Темная схема-сетка удалена.</p>
        </div>

        <div className="map-panel">
          <h3>Фильтры</h3>
          <label>
            Регион
            <select value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}>
              <option value="all">Все регионы</option>
              {regions.map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
          </label>
          <label>
            Груз
            <select value={filters.cargo} onChange={(e) => setFilters({ ...filters, cargo: e.target.value })}>
              <option value="all">Все грузы</option>
              {Object.entries(cargoTypes).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </select>
          </label>
          <label>
            Мин. пропускная способность: {filters.capacity} млн т/год
            <input type="range" min="0" max="100" step="10" value={filters.capacity} onChange={(e) => setFilters({ ...filters, capacity: Number(e.target.value) })} />
          </label>
          <button className="map-reset" onClick={() => { setSelectedStation(null); setSelectedRoute(null); }}>Сбросить выбор</button>
        </div>

        <div className="map-panel map-stats">
          <h3>Сводка</h3>
          <div><span>Узлы</span><strong>{filteredStations.length}</strong></div>
          <div><span>Маршруты</span><strong>{filteredRoutes.length}</strong></div>
          <div><span>Объем узлов</span><strong>{totalVolume} млн т</strong></div>
        </div>
      </aside>

      <main className="map-workspace single-map-workspace">
        <section className="real-map-card only-map-card">
          <svg className="real-map" viewBox={`0 0 ${mapBounds.width} ${mapBounds.height}`} preserveAspectRatio="xMidYMid meet" aria-label="Карта маршрутов РЖД на подложке OpenStreetMap">
            <g className="tile-layer">
              {tiles.map((tile) => (
                <image key={`${tile.x}-${tile.y}`} href={tileUrl(tile.x, tile.y)} x={tile.px} y={tile.py} width={tileSize} height={tileSize} preserveAspectRatio="none" />
              ))}
            </g>

            {filteredRoutes.map((route) => {
              const from = screenPoint(stationById[route.from]);
              const to = screenPoint(stationById[route.to]);
              const active = selectedRoute?.id === route.id;
              return (
                <g key={route.id}>
                  <line className={`map-route ${route.type} ${active ? 'active' : ''}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
                  <line className="map-route-hit" x1={from.x} y1={from.y} x2={to.x} y2={to.y} onClick={() => setSelectedRoute(route)} />
                </g>
              );
            })}

            {filteredStations.map((station) => {
              const point = screenPoint(station);
              const active = selectedStation?.id === station.id || activeRouteStations.some((s) => s?.id === station.id);
              return (
                <g key={station.id} className={`map-station ${active ? 'active' : ''}`} transform={`translate(${point.x} ${point.y})`} onClick={() => handleStationClick(station)}>
                  <circle className="station-halo" r={Math.max(10, station.volume / 4)} />
                  <circle className="station-dot" r={active ? 8 : 6} />
                  <text x="10" y="-9">{station.name}</text>
                </g>
              );
            })}
          </svg>

          <div className="map-floating-card">
            {selectedRoute ? (
              <>
                <span>Выбранное направление</span>
                <h3>{stationById[selectedRoute.from].name} → {stationById[selectedRoute.to].name}</h3>
                <dl>
                  <div><dt>Расстояние</dt><dd>{selectedRoute.distance} км</dd></div>
                  <div><dt>Пропускная способность</dt><dd>{selectedRoute.capacity} млн т/год</dd></div>
                  <div><dt>Тип</dt><dd>{selectedRoute.type === 'main' ? 'Магистраль' : 'Региональная линия'}</dd></div>
                </dl>
              </>
            ) : selectedStation ? (
              <>
                <span>Выбранный узел</span>
                <h3>{selectedStation.name}</h3>
                <p>{selectedStation.region} · {selectedStation.volume} млн т</p>
                <div className="map-tags">{selectedStation.cargo.map((cargo) => <i key={cargo} style={{ '--tag': cargoColor[cargo] }}>{cargoTypes[cargo]}</i>)}</div>
              </>
            ) : (
              <>
                <span>Карта</span>
                <h3>Маршруты поверх OpenStreetMap</h3>
                <p>Кликните по линии или станции, чтобы посмотреть детали. Все точки и направления отрисованы на одной карте.</p>
              </>
            )}
          </div>

          <div className="map-legend-on-map">
            <strong>Тип линии</strong>
            <span><i className="line-main" />Магистраль</span>
            <span><i className="line-regional" />Региональная</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RouteVisualization;
