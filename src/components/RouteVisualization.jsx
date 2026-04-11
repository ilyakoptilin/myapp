import React, { useState, useRef, useEffect } from 'react';
import './RouteVisualization.css';

const RouteVisualization = () => {
  const [stations] = useState([
    { id: 1, name: 'Москва', x: 420, y: 320, region: 'Центральный', cargoTypes: ['coal', 'oil', 'containers', 'metals', 'grain'], population: '12.6M' },
    { id: 2, name: 'Санкт-Петербург', x: 380, y: 220, region: 'Северо-Запад', cargoTypes: ['containers', 'timber', 'oil', 'metals'], population: '5.4M' },
    { id: 3, name: 'Мурманск', x: 340, y: 100, region: 'Северо-Запад', cargoTypes: ['oil', 'containers', 'metals'], population: '0.3M' },
    { id: 4, name: 'Архангельск', x: 380, y: 140, region: 'Северо-Запад', cargoTypes: ['timber', 'coal', 'containers'], population: '0.3M' },
    { id: 5, name: 'Петрозаводск', x: 370, y: 180, region: 'Северо-Запад', cargoTypes: ['timber', 'metals'], population: '0.3M' },
    { id: 6, name: 'Великий Новгород', x: 370, y: 230, region: 'Северо-Запад', cargoTypes: ['grain', 'timber'], population: '0.2M' },
    { id: 7, name: 'Псков', x: 350, y: 240, region: 'Северо-Запад', cargoTypes: ['grain', 'timber'], population: '0.2M' },
    { id: 8, name: 'Калининград', x: 290, y: 250, region: 'Северо-Запад', cargoTypes: ['containers', 'oil', 'grain'], population: '0.5M' },
    { id: 9, name: 'Владимир', x: 460, y: 310, region: 'Центральный', cargoTypes: ['metals', 'coal'], population: '0.3M' },
    { id: 10, name: 'Нижний Новгород', x: 540, y: 300, region: 'Поволжье', cargoTypes: ['metals', 'grain', 'coal', 'oil'], population: '1.2M' },
    { id: 11, name: 'Ярославль', x: 440, y: 260, region: 'Центральный', cargoTypes: ['oil', 'metals'], population: '0.6M' },
    { id: 12, name: 'Кострома', x: 460, y: 250, region: 'Центральный', cargoTypes: ['timber', 'metals'], population: '0.3M' },
    { id: 13, name: 'Иваново', x: 450, y: 270, region: 'Центральный', cargoTypes: ['metals', 'coal'], population: '0.4M' },
    { id: 14, name: 'Тула', x: 430, y: 350, region: 'Центральный', cargoTypes: ['coal', 'metals'], population: '0.5M' },
    { id: 15, name: 'Рязань', x: 470, y: 340, region: 'Центральный', cargoTypes: ['grain', 'oil'], population: '0.5M' },
    { id: 16, name: 'Воронеж', x: 490, y: 410, region: 'Южный', cargoTypes: ['grain', 'coal', 'metals'], population: '1.0M' },
    { id: 17, name: 'Белгород', x: 460, y: 420, region: 'Южный', cargoTypes: ['grain', 'metals'], population: '0.4M' },
    { id: 18, name: 'Курск', x: 480, y: 390, region: 'Центральный', cargoTypes: ['grain', 'coal'], population: '0.4M' },
    { id: 19, name: 'Казань', x: 600, y: 340, region: 'Поволжье', cargoTypes: ['oil', 'grain', 'chemicals', 'containers'], population: '1.3M' },
    { id: 20, name: 'Ульяновск', x: 620, y: 370, region: 'Поволжье', cargoTypes: ['oil', 'grain', 'metals'], population: '0.6M' },
    { id: 21, name: 'Самара', x: 640, y: 380, region: 'Поволжье', cargoTypes: ['oil', 'metals', 'grain'], population: '1.1M' },
    { id: 22, name: 'Саратов', x: 620, y: 420, region: 'Поволжье', cargoTypes: ['grain', 'oil', 'chemicals'], population: '0.8M' },
    { id: 23, name: 'Волгоград', x: 600, y: 470, region: 'Южный', cargoTypes: ['oil', 'grain', 'metals'], population: '1.0M' },
    { id: 24, name: 'Астрахань', x: 620, y: 520, region: 'Южный', cargoTypes: ['oil', 'grain'], population: '0.5M' },
    { id: 25, name: 'Пенза', x: 580, y: 360, region: 'Поволжье', cargoTypes: ['grain', 'metals'], population: '0.5M' },
    { id: 26, name: 'Чебоксары', x: 570, y: 320, region: 'Поволжье', cargoTypes: ['chemicals', 'grain'], population: '0.5M' },
    { id: 27, name: 'Йошкар-Ола', x: 560, y: 310, region: 'Поволжье', cargoTypes: ['timber', 'grain'], population: '0.3M' },
    { id: 28, name: 'Ростов-на-Дону', x: 520, y: 450, region: 'Южный', cargoTypes: ['grain', 'coal', 'oil', 'containers'], population: '1.1M' },
    { id: 29, name: 'Краснодар', x: 480, y: 490, region: 'Южный', cargoTypes: ['grain', 'oil', 'fertilizers'], population: '0.9M' },
    { id: 30, name: 'Сочи', x: 500, y: 530, region: 'Южный', cargoTypes: ['containers', 'grain'], population: '0.4M' },
    { id: 31, name: 'Ставрополь', x: 540, y: 490, region: 'Южный', cargoTypes: ['grain', 'oil'], population: '0.4M' },
    { id: 32, name: 'Владикавказ', x: 560, y: 530, region: 'Южный', cargoTypes: ['metals', 'grain'], population: '0.3M' },
    { id: 33, name: 'Грозный', x: 580, y: 540, region: 'Южный', cargoTypes: ['oil', 'grain'], population: '0.3M' },
    { id: 34, name: 'Махачкала', x: 620, y: 560, region: 'Южный', cargoTypes: ['oil', 'grain'], population: '0.6M' },
    { id: 35, name: 'Екатеринбург', x: 760, y: 320, region: 'Уральский', cargoTypes: ['metals', 'coal', 'chemicals', 'containers'], population: '1.5M' },
    { id: 36, name: 'Челябинск', x: 740, y: 360, region: 'Уральский', cargoTypes: ['metals', 'coal'], population: '1.2M' },
    { id: 37, name: 'Уфа', x: 680, y: 360, region: 'Поволжье', cargoTypes: ['oil', 'chemicals', 'grain'], population: '1.1M' },
    { id: 38, name: 'Оренбург', x: 700, y: 420, region: 'Поволжье', cargoTypes: ['oil', 'grain'], population: '0.6M' },
    { id: 39, name: 'Пермь', x: 680, y: 290, region: 'Поволжье', cargoTypes: ['oil', 'timber', 'metals'], population: '1.0M' },
    { id: 40, name: 'Тюмень', x: 800, y: 270, region: 'Уральский', cargoTypes: ['oil', 'gas', 'metals'], population: '0.8M' },
    { id: 41, name: 'Сургут', x: 780, y: 200, region: 'Уральский', cargoTypes: ['oil', 'gas'], population: '0.4M' },
    { id: 42, name: 'Нижневартовск', x: 800, y: 220, region: 'Уральский', cargoTypes: ['oil', 'gas'], population: '0.3M' },
    { id: 43, name: 'Курган', x: 780, y: 360, region: 'Уральский', cargoTypes: ['metals', 'grain'], population: '0.3M' },
    { id: 44, name: 'Магнитогорск', x: 720, y: 380, region: 'Уральский', cargoTypes: ['metals', 'coal'], population: '0.4M' },
    { id: 45, name: 'Омск', x: 880, y: 340, region: 'Сибирский', cargoTypes: ['oil', 'grain', 'chemicals'], population: '1.1M' },
    { id: 46, name: 'Новосибирск', x: 960, y: 330, region: 'Сибирский', cargoTypes: ['coal', 'grain', 'metals', 'containers'], population: '1.6M' },
    { id: 47, name: 'Томск', x: 920, y: 300, region: 'Сибирский', cargoTypes: ['oil', 'timber', 'metals'], population: '0.6M' },
    { id: 48, name: 'Кемерово', x: 990, y: 340, region: 'Сибирский', cargoTypes: ['coal', 'metals'], population: '0.5M' },
    { id: 49, name: 'Новокузнецк', x: 1010, y: 360, region: 'Сибирский', cargoTypes: ['coal', 'metals'], population: '0.5M' },
    { id: 50, name: 'Красноярск', x: 1100, y: 340, region: 'Сибирский', cargoTypes: ['coal', 'metals', 'timber', 'aluminum'], population: '1.1M' },
    { id: 51, name: 'Иркутск', x: 1200, y: 360, region: 'Сибирский', cargoTypes: ['coal', 'timber', 'containers'], population: '0.6M' },
    { id: 52, name: 'Улан-Удэ', x: 1240, y: 380, region: 'Сибирский', cargoTypes: ['coal', 'timber'], population: '0.4M' },
    { id: 53, name: 'Чита', x: 1300, y: 380, region: 'Сибирский', cargoTypes: ['coal', 'timber', 'metals'], population: '0.3M' },
    { id: 54, name: 'Абакан', x: 1070, y: 380, region: 'Сибирский', cargoTypes: ['coal', 'metals'], population: '0.2M' },
    { id: 55, name: 'Кызыл', x: 1110, y: 420, region: 'Сибирский', cargoTypes: ['coal', 'timber'], population: '0.1M' },
    { id: 56, name: 'Владивосток', x: 1420, y: 420, region: 'Дальневосточный', cargoTypes: ['containers', 'oil', 'timber', 'fish'], population: '0.6M' },
    { id: 57, name: 'Хабаровск', x: 1380, y: 380, region: 'Дальневосточный', cargoTypes: ['timber', 'containers', 'metals'], population: '0.6M' },
    { id: 58, name: 'Благовещенск', x: 1320, y: 360, region: 'Дальневосточный', cargoTypes: ['grain', 'timber', 'metals'], population: '0.2M' },
    { id: 59, name: 'Комсомольск-на-Амуре', x: 1360, y: 340, region: 'Дальневосточный', cargoTypes: ['metals', 'timber', 'oil'], population: '0.2M' },
    { id: 60, name: 'Южно-Сахалинск', x: 1520, y: 480, region: 'Дальневосточный', cargoTypes: ['oil', 'gas', 'fish', 'coal'], population: '0.2M' },
    { id: 61, name: 'Петропавловск-Камчатский', x: 1600, y: 440, region: 'Дальневосточный', cargoTypes: ['fish', 'containers'], population: '0.2M' },
    { id: 62, name: 'Магадан', x: 1480, y: 320, region: 'Дальневосточный', cargoTypes: ['gold', 'coal', 'fish'], population: '0.1M' },
    { id: 63, name: 'Якутск', x: 1220, y: 240, region: 'Дальневосточный', cargoTypes: ['diamonds', 'coal', 'timber', 'gold'], population: '0.3M' },
    { id: 64, name: 'Уссурийск', x: 1410, y: 410, region: 'Дальневосточный', cargoTypes: ['grain', 'containers'], population: '0.2M' },
    { id: 65, name: 'Находка', x: 1440, y: 440, region: 'Дальневосточный', cargoTypes: ['containers', 'oil', 'coal'], population: '0.1M' },
  ]);

  const [edges] = useState([
    { id: 1, from: 1, to: 10, distance: 400, capacity: 150, type: 'main' },
    { id: 2, from: 10, to: 19, distance: 380, capacity: 140, type: 'main' },
    { id: 3, from: 19, to: 35, distance: 650, capacity: 160, type: 'main' },
    { id: 4, from: 35, to: 46, distance: 1600, capacity: 180, type: 'main' },
    { id: 5, from: 46, to: 50, distance: 800, capacity: 150, type: 'main' },
    { id: 6, from: 50, to: 51, distance: 1100, capacity: 140, type: 'main' },
    { id: 7, from: 51, to: 57, distance: 1200, capacity: 120, type: 'main' },
    { id: 8, from: 57, to: 56, distance: 800, capacity: 130, type: 'main' },
    { id: 9, from: 1, to: 2, distance: 650, capacity: 120, type: 'main' },
    { id: 10, from: 1, to: 9, distance: 180, capacity: 100, type: 'regional' },
    { id: 11, from: 1, to: 11, distance: 250, capacity: 90, type: 'regional' },
    { id: 12, from: 1, to: 14, distance: 180, capacity: 110, type: 'regional' },
    { id: 13, from: 1, to: 15, distance: 190, capacity: 95, type: 'regional' },
    { id: 14, from: 1, to: 16, distance: 470, capacity: 100, type: 'regional' },
    { id: 15, from: 2, to: 3, distance: 1100, capacity: 80, type: 'regional' },
    { id: 16, from: 2, to: 4, distance: 350, capacity: 70, type: 'regional' },
    { id: 17, from: 2, to: 5, distance: 250, capacity: 60, type: 'regional' },
    { id: 18, from: 2, to: 8, distance: 400, capacity: 75, type: 'regional' },
    { id: 19, from: 10, to: 21, distance: 420, capacity: 110, type: 'main' },
    { id: 20, from: 19, to: 21, distance: 370, capacity: 100, type: 'regional' },
    { id: 21, from: 21, to: 22, distance: 320, capacity: 95, type: 'regional' },
    { id: 22, from: 22, to: 23, distance: 420, capacity: 100, type: 'main' },
    { id: 23, from: 23, to: 24, distance: 400, capacity: 85, type: 'regional' },
    { id: 24, from: 19, to: 37, distance: 450, capacity: 105, type: 'main' },
    { id: 25, from: 16, to: 28, distance: 460, capacity: 120, type: 'main' },
    { id: 26, from: 28, to: 29, distance: 270, capacity: 90, type: 'regional' },
    { id: 27, from: 28, to: 31, distance: 250, capacity: 80, type: 'regional' },
    { id: 28, from: 29, to: 30, distance: 280, capacity: 70, type: 'regional' },
    { id: 29, from: 23, to: 28, distance: 460, capacity: 110, type: 'main' },
    { id: 30, from: 35, to: 36, distance: 250, capacity: 130, type: 'main' },
    { id: 31, from: 35, to: 39, distance: 450, capacity: 100, type: 'regional' },
    { id: 32, from: 35, to: 40, distance: 330, capacity: 110, type: 'main' },
    { id: 33, from: 40, to: 41, distance: 420, capacity: 90, type: 'regional' },
    { id: 34, from: 36, to: 44, distance: 220, capacity: 120, type: 'regional' },
    { id: 35, from: 37, to: 38, distance: 320, capacity: 85, type: 'regional' },
    { id: 36, from: 40, to: 45, distance: 570, capacity: 100, type: 'main' },
    { id: 37, from: 45, to: 46, distance: 650, capacity: 120, type: 'main' },
    { id: 38, from: 46, to: 47, distance: 240, capacity: 80, type: 'regional' },
    { id: 39, from: 46, to: 48, distance: 260, capacity: 110, type: 'regional' },
    { id: 40, from: 48, to: 49, distance: 200, capacity: 130, type: 'regional' },
    { id: 41, from: 50, to: 54, distance: 380, capacity: 90, type: 'regional' },
    { id: 42, from: 51, to: 52, distance: 280, capacity: 75, type: 'regional' },
    { id: 43, from: 52, to: 53, distance: 450, capacity: 70, type: 'regional' },
    { id: 44, from: 53, to: 58, distance: 650, capacity: 65, type: 'regional' },
    { id: 45, from: 56, to: 64, distance: 100, capacity: 60, type: 'regional' },
    { id: 46, from: 56, to: 65, distance: 170, capacity: 80, type: 'regional' },
    { id: 47, from: 57, to: 59, distance: 360, capacity: 70, type: 'regional' },
    { id: 48, from: 56, to: 60, distance: 850, capacity: 50, type: 'regional' },
    { id: 49, from: 1, to: 13, distance: 300, capacity: 80, type: 'regional' },
    { id: 50, from: 11, to: 12, distance: 120, capacity: 60, type: 'regional' },
    { id: 51, from: 10, to: 25, distance: 240, capacity: 75, type: 'regional' },
    { id: 52, from: 21, to: 25, distance: 280, capacity: 70, type: 'regional' },
    { id: 53, from: 35, to: 43, distance: 320, capacity: 65, type: 'regional' },
    { id: 54, from: 45, to: 42, distance: 450, capacity: 60, type: 'regional' },
  ]);

  const [filters, setFilters] = useState({
    cargoType: 'all',
    region: 'all',
    minCapacity: 0,
    showEdgeLabels: true,
    highlightMainRoutes: true,
  });

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState([]);
  const [hoveredStation, setHoveredStation] = useState(null);
  
  // Zoom/Pan state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const cargoTypes = {
    coal: 'Уголь', oil: 'Нефть', containers: 'Контейнеры', grain: 'Зерно',
    metals: 'Металлы', timber: 'Лес', chemicals: 'Химия', fertilizers: 'Удобрения',
    gas: 'Газ', fish: 'Рыба', diamonds: 'Алмазы', gold: 'Золото', aluminum: 'Алюминий',
  };

  const regions = [...new Set(stations.map(s => s.region))];

  const findRoute = (startId, endId) => {
    const graph = {};
    stations.forEach(station => { graph[station.id] = []; });
    edges.forEach(edge => {
      graph[edge.from].push({ to: edge.to, distance: edge.distance, edgeId: edge.id, capacity: edge.capacity });
      graph[edge.to].push({ to: edge.from, distance: edge.distance, edgeId: edge.id, capacity: edge.capacity });
    });
    const visited = new Set();
    const queue = [[startId, [startId], [], 0]];
    while (queue.length > 0) {
      const [current, path, edgePath, totalDist] = queue.shift();
      if (current === endId) return { path, edgePath, totalDistance: totalDist };
      if (!visited.has(current)) {
        visited.add(current);
        for (const neighbor of graph[current]) {
          if (!visited.has(neighbor.to)) {
            queue.push([neighbor.to, [...path, neighbor.to], [...edgePath, neighbor.edgeId], totalDist + neighbor.distance]);
          }
        }
      }
    }
    return null;
  };

  const handleStationClick = (station) => {
    if (selectedStation && selectedStation.id !== station.id) {
      const route = findRoute(selectedStation.id, station.id);
      if (route) {
        setHighlightedPath(route.edgePath);
        setSelectedRoute({
          from: selectedStation, to: station,
          edges: route.edgePath.map(id => edges.find(e => e.id === id)),
          totalDistance: route.totalDistance
        });
      }
    } else {
      setSelectedStation(station);
      setHighlightedPath([]);
      setSelectedRoute(null);
    }
  };

  const filteredStations = stations.filter(station => {
    if (filters.region !== 'all' && station.region !== filters.region) return false;
    if (filters.cargoType !== 'all' && !station.cargoTypes.includes(filters.cargoType)) return false;
    return true;
  });

  const filteredEdges = edges.filter(edge => {
    const fromStation = stations.find(s => s.id === edge.from);
    const toStation = stations.find(s => s.id === edge.to);
    if (!filteredStations.includes(fromStation) || !filteredStations.includes(toStation)) return false;
    if (edge.capacity < filters.minCapacity) return false;
    return true;
  });

  const resetSelection = () => {
    setSelectedStation(null);
    setSelectedRoute(null);
    setHighlightedPath([]);
  };

  const getCargoColor = (type) => {
    const colors = {
      coal: '#2c3e50', oil: '#8e44ad', containers: '#e74c3c', grain: '#f1c40f',
      metals: '#95a5a6', timber: '#27ae60', chemicals: '#e67e22', fertilizers: '#1abc9c',
      gas: '#3498db', fish: '#16a085', diamonds: '#00d2ff', gold: '#f39c12', aluminum: '#bdc3c7',
    };
    return colors[type] || '#95a5a6';
  };

  // Zoom handling
  const handleWheel = (e) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(0.3, transform.scale + scaleAmount), 4);
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mouseX = (x - transform.x) / transform.scale;
    const mouseY = (y - transform.y) / transform.scale;
    setTransform({
      x: x - mouseX * newScale,
      y: y - mouseY * newScale,
      scale: newScale
    });
  };

  // Pan handling
  const handleMouseDown = (e) => {
    if (e.target.tagName === 'svg' || e.target.classList.contains('map-bg')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setTransform(prev => ({ ...prev, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="route-visualization-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Железнодорожная сеть России</h2>
          <p className="sidebar-subtitle">Интерактивная карта маршрутов</p>
        </div>

        <div className="filter-section">
          <h3>Фильтры</h3>
          
          <div className="filter-group">
            <label>Тип груза</label>
            <select value={filters.cargoType} onChange={(e) => setFilters({...filters, cargoType: e.target.value})}>
              <option value="all">Все типы</option>
              {Object.entries(cargoTypes).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Регион</label>
            <select value={filters.region} onChange={(e) => setFilters({...filters, region: e.target.value})}>
              <option value="all">Все регионы</option>
              {regions.map(region => (<option key={region} value={region}>{region}</option>))}
            </select>
          </div>

          <div className="filter-group">
            <label>Мин. пропускная способность: {filters.minCapacity} тыс.т</label>
            <input type="range" min="0" max="150" step="10" value={filters.minCapacity}
              onChange={(e) => setFilters({...filters, minCapacity: parseInt(e.target.value)})} />
          </div>

          <label className="checkbox-label">
            <input type="checkbox" checked={filters.showEdgeLabels}
              onChange={(e) => setFilters({...filters, showEdgeLabels: e.target.checked})} />
            Показывать расстояния
          </label>

          <label className="checkbox-label">
            <input type="checkbox" checked={filters.highlightMainRoutes}
              onChange={(e) => setFilters({...filters, highlightMainRoutes: e.target.checked})} />
            Выделить магистрали
          </label>

          <button className="btn-reset" onClick={resetSelection}>Сбросить выделение</button>
          <button className="btn-reset btn-secondary" onClick={resetZoom}>Сбросить масштаб</button>
        </div>

        <div className="stats-section">
          <h3>Статистика</h3>
          <div className="stat-item">
            <span>Станций</span>
            <strong>{filteredStations.length}</strong>
          </div>
          <div className="stat-item">
            <span>Перегонов</span>
            <strong>{filteredEdges.length}</strong>
          </div>
        </div>

        <div className="legend-section">
          <h3>Условные обозначения</h3>
          <div className="legend-grid">
            <div className="legend-item">
              <div className="legend-dot main-station"></div>
              <span>Основная станция</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot selected-station"></div>
              <span>Выбрана</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot route-station"></div>
              <span>Маршрут</span>
            </div>
            <div className="legend-item">
              <div className="legend-line main-line"></div>
              <span>Магистраль</span>
            </div>
            <div className="legend-item">
              <div className="legend-line regional-line"></div>
              <span>Региональная</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="map-area">
        <svg 
          ref={svgRef}
          className="map-svg" 
          viewBox="0 0 1800 800"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <linearGradient id="mainRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:'#e74c3c', stopOpacity:0.9}} />
              <stop offset="100%" style={{stopColor:'#f39c12', stopOpacity:0.9}} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="mapShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3"/>
            </filter>
          </defs>

          <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
            {/* Russia Map Background */}
            <path 
              className="russia-map-bg"
              d="M 200,200 
                 L 250,150 L 300,120 L 350,100 L 400,90 L 450,100 L 500,120 L 550,150 
                 L 600,180 L 650,200 L 700,220 L 750,240 L 800,260 L 850,280 L 900,300 
                 L 950,320 L 1000,340 L 1050,360 L 1100,380 L 1150,400 L 1200,420 
                 L 1250,440 L 1300,460 L 1350,480 L 1400,500 L 1450,520 L 1500,540 
                 L 1550,560 L 1600,580 L 1650,600 L 1700,620 L 1750,640 L 1800,660 
                 L 1780,680 L 1750,700 L 1700,720 L 1650,740 L 1600,760 L 1550,780 
                 L 1500,760 L 1450,740 L 1400,720 L 1350,700 L 1300,680 L 1250,660 
                 L 1200,640 L 1150,620 L 1100,600 L 1050,580 L 1000,560 L 950,540 
                 L 900,520 L 850,500 L 800,480 L 750,460 L 700,440 L 650,420 
                 L 600,400 L 550,380 L 500,360 L 450,340 L 400,320 L 350,300 
                 L 300,280 L 250,260 L 200,240 Z"
              fill="rgba(52, 73, 94, 0.15)"
              stroke="rgba(52, 73, 94, 0.3)"
              strokeWidth="2"
            />
            
            {/* Edges */}
            {filteredEdges.map(edge => {
              const from = stations.find(s => s.id === edge.from);
              const to = stations.find(s => s.id === edge.to);
              const isHighlighted = highlightedPath.includes(edge.id);
              const isMainRoute = edge.type === 'main';
              
              return (
                <g key={edge.id}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    className={`edge ${isHighlighted ? 'highlighted' : ''} ${isMainRoute && filters.highlightMainRoutes ? 'main-route' : ''}`}
                    strokeWidth={isHighlighted ? 5 : (isMainRoute ? 3 : 2)}
                    stroke={isHighlighted ? '#f1c40f' : (isMainRoute ? 'url(#mainRouteGradient)' : 'rgba(255,255,255,0.4)')}
                    filter={isHighlighted ? 'url(#glow)' : ''}
                  />
                  {filters.showEdgeLabels && (
                    <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 5}
                      className="edge-label" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                      {edge.distance} км
                    </text>
                  )}
                </g>
              );
            })}

            {/* Stations */}
            {filteredStations.map(station => {
              const isSelected = selectedStation && selectedStation.id === station.id;
              const isStartOrEnd = selectedRoute && (selectedRoute.from.id === station.id || selectedRoute.to.id === station.id);
              const isHovered = hoveredStation && hoveredStation.id === station.id;
              
              return (
                <g key={station.id} className="station-node"
                  onClick={() => handleStationClick(station)}
                  onMouseEnter={() => setHoveredStation(station)}
                  onMouseLeave={() => setHoveredStation(null)}
                  style={{ cursor: 'pointer' }}>
                  
                  {(isSelected || isStartOrEnd) && (
                    <circle cx={station.x} cy={station.y} r={20} className="pulse-ring"
                      fill="none" stroke={isSelected ? '#e74c3c' : '#f1c40f'} strokeWidth="2" />
                  )}
                  
                  <circle cx={station.x} cy={station.y}
                    r={isSelected || isStartOrEnd ? 14 : (isHovered ? 12 : 8)}
                    className={`station ${isSelected ? 'selected' : ''} ${isStartOrEnd ? 'route-endpoint' : ''}`}
                    fill={isSelected ? '#e74c3c' : (isStartOrEnd ? '#f1c40f' : '#fff')}
                    stroke={station.cargoTypes.map(c => getCargoColor(c))[0]}
                    strokeWidth="3" />
                  
                  {station.cargoTypes.slice(0, 3).map((cargo, idx) => (
                    <circle key={cargo} cx={station.x + (idx - 1) * 6} cy={station.y + 18}
                      r="3" fill={getCargoColor(cargo)} opacity="0.8" />
                  ))}
                  
                  <text x={station.x} y={station.y - (isHovered ? 20 : 15)}
                    className="station-label" textAnchor="middle" fill="#fff"
                    fontSize={isHovered ? "13" : "11"} fontWeight="bold"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', transition: 'all 0.3s' }}>
                    {station.name}
                  </text>
                  
                  {isHovered && (
                    <text x={station.x} y={station.y + 35} className="station-pop"
                      textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">
                      {station.population}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Info Panel */}
        <div className="info-panel">
          {selectedRoute ? (
            <div className="route-info">
              <h3>Маршрут</h3>
              <div className="route-header">
                <div className="route-city">
                  <div className="city-name">{selectedRoute.from.name}</div>
                  <div className="city-region">{selectedRoute.from.region}</div>
                </div>
                <div className="route-arrow">→</div>
                <div className="route-city">
                  <div className="city-name">{selectedRoute.to.name}</div>
                  <div className="city-region">{selectedRoute.to.region}</div>
                </div>
              </div>
              
              <div className="route-stats">
                <div className="stat-card">
                  <div className="stat-value">{selectedRoute.totalDistance} км</div>
                  <div className="stat-label">Расстояние</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{selectedRoute.edges.length}</div>
                  <div className="stat-label">Перегонов</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {Math.round(selectedRoute.edges.reduce((sum, e) => sum + e.capacity, 0) / selectedRoute.edges.length)}
                  </div>
                  <div className="stat-label">Ср. пропускная</div>
                </div>
              </div>

              <div className="route-segments">
                <h4>Путь</h4>
                {selectedRoute.edges.map((edge, index) => {
                  const from = stations.find(s => s.id === edge.from);
                  const to = stations.find(s => s.id === edge.to);
                  return (
                    <div key={edge.id} className="segment">
                      <div className="segment-number">{index + 1}</div>
                      <div className="segment-info">
                        <div className="segment-cities">{from.name} → {to.name}</div>
                        <div className="segment-details">{edge.distance} км • {edge.capacity} тыс.т</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : selectedStation ? (
            <div className="station-info">
              <h3>Станция</h3>
              <div className="station-header">
                <div className="station-name-large">{selectedStation.name}</div>
                <div className="station-region-badge">{selectedStation.region}</div>
              </div>
              
              <div className="station-details">
                <div className="detail-row">
                  <span className="detail-label">Население</span>
                  <span className="detail-value">{selectedStation.population} млн</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Типы грузов</span>
                  <div className="cargo-tags">
                    {selectedStation.cargoTypes.map(cargo => (
                      <span key={cargo} className="cargo-tag" style={{backgroundColor: getCargoColor(cargo)}}>
                        {cargoTypes[cargo]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="action-hint">
                Выберите другую станцию для построения маршрута
              </div>
            </div>
          ) : (
            <div className="welcome-info">
              <h3>Железнодорожная сеть России</h3>
              <p>Интерактивная карта с {stations.length} станциями</p>
              <div className="how-to-use">
                <h4>Инструкция</h4>
                <ol>
                  <li>Используйте фильтры для отображения нужных станций</li>
                  <li>Кликните на первую станцию</li>
                  <li>Кликните на вторую станцию</li>
                  <li>Изучите информацию о маршруте</li>
                </ol>
              </div>
              <div className="features">
                <div className="feature-item">{stations.length} станций по всей России</div>
                <div className="feature-item">{edges.length} железнодорожных перегонов</div>
                <div className="feature-item">Транссибирская магистраль</div>
                <div className="feature-item">Фильтрация по грузам и регионам</div>
              </div>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button onClick={() => setTransform(prev => ({...prev, scale: Math.min(prev.scale + 0.2, 4)}))}>+</button>
          <button onClick={() => setTransform(prev => ({...prev, scale: Math.max(prev.scale - 0.2, 0.3)}))}>−</button>
          <button onClick={resetZoom}>⟲</button>
        </div>
      </div>
    </div>
  );
};

export default RouteVisualization;