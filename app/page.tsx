"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

type Stop = {
  id: string;
  number: string;
  name: string;
  cn: string;
  days: string;
  dates: string;
  kicker: string;
  summary: string;
  highlights: string[];
  coordinates: [number, number];
  image: string;
};

type DayPlan = {
  day: number;
  date: string;
  place: string;
  stopId: string;
  events: string[];
  note?: string;
  drive?: string;
};

const stops: Stop[] = [
  {
    id: "san-francisco",
    number: "01",
    name: "San Francisco",
    cn: "旧金山",
    days: "DAYS 01—03",
    dates: "SEP 23—25",
    kicker: "PACIFIC FOG · 3 NIGHTS",
    summary: "从海湾的雾、红色桥塔和码头灯光开始，让城市节奏为长途自驾预热。",
    highlights: ["Golden Gate Bridge", "Alcatraz Island", "Fisherman’s Wharf"],
    coordinates: [-122.4194, 37.7749],
    image: "/places/san-francisco.jpg",
  },
  {
    id: "yosemite",
    number: "02",
    name: "Yosemite",
    cn: "优胜美地",
    days: "DAYS 04—06",
    dates: "SEP 26—28",
    kicker: "GRANITE LIGHT · 3 DAYS",
    summary: "进入花岗岩峡谷，在瀑布、草甸与 El Capitan 的巨大尺度之间慢下来。",
    highlights: ["Cook’s Meadow", "El Capitan", "Glacier Point"],
    coordinates: [-119.5383, 37.7459],
    image: "/places/yosemite.jpg",
  },
  {
    id: "visalia",
    number: "03",
    name: "Visalia",
    cn: "维塞利亚",
    days: "DAY 06",
    dates: "SEP 28",
    kicker: "VALLEY PAUSE · 1 NIGHT",
    summary: "从山谷驶向中央谷地，在进入巨木森林前补给、入住并短暂休整。",
    highlights: ["Scenic drive", "Hotel check-in", "Evening walk"],
    coordinates: [-119.2921, 36.3302],
    image: "/places/yosemite.jpg",
  },
  {
    id: "sequoia",
    number: "04",
    name: "Sequoia",
    cn: "红杉国家公园",
    days: "DAY 07",
    dates: "SEP 29",
    kicker: "GIANT FOREST · 1 DAY",
    summary: "在 General Sherman Tree 下重新理解“巨大”，沿短步道穿行古老森林。",
    highlights: ["Foothills Visitor Center", "General Sherman Tree", "Lincoln Tree trail"],
    coordinates: [-118.7511, 36.5819],
    image: "/places/sequoia.jpg",
  },
  {
    id: "death-valley",
    number: "05",
    name: "Death Valley",
    cn: "死亡谷",
    days: "DAYS 08—09",
    dates: "SEP 30—OCT 1",
    kicker: "DESERT DUSK · 2 DAYS",
    summary: "从沙丘走到海平面以下，再把一天留给 Artist’s Palette 与金色日落。",
    highlights: ["Mesquite Flat Dunes", "Badwater Basin", "Zabriskie Point"],
    coordinates: [-116.8668, 36.4626],
    image: "/places/death-valley.jpg",
  },
  {
    id: "los-angeles",
    number: "06",
    name: "Los Angeles",
    cn: "洛杉矶",
    days: "DAYS 10—14",
    dates: "OCT 2—6",
    kicker: "COAST & CITY · 5 DAYS",
    summary: "沿海岸线收尾：Santa Monica、Malibu、Griffith Observatory，以及攀岩与韩餐。",
    highlights: ["Santa Monica", "Malibu Beach", "Griffith Observatory"],
    coordinates: [-118.2437, 34.0522],
    image: "/places/los-angeles.jpg",
  },
];

const days: DayPlan[] = [
  { day: 1, date: "9月23日 · 周三", place: "旧金山", stopId: "san-francisco", events: ["抵达 San Francisco", "酒店入住", "晚餐", "夜景 / 城市散步"], note: "提前下载国家公园离线地图" },
  { day: 2, date: "9月24日 · 周四", place: "旧金山", stopId: "san-francisco", events: ["Golden Gate Bridge", "Palace of Fine Arts", "Baker Beach"] },
  { day: 3, date: "9月25日 · 周五", place: "旧金山", stopId: "san-francisco", events: ["Alcatraz Island", "Pier 39", "Ghirardelli Square", "Fisherman’s Wharf", "Lombard Street"] },
  { day: 4, date: "9月26日 · 周六", place: "优胜美地", stopId: "yosemite", events: ["取车", "前往 Yosemite", "酒店入住", "Cook’s Meadow Loop Trailhead", "Yosemite Falls"], note: "检查油量，准备饮用水和零食", drive: "约 4 小时 40 分" },
  { day: 5, date: "9月27日 · 周日", place: "优胜美地", stopId: "yosemite", events: ["El Capitan", "Bouldering", "Bridalveil Falls Trail"] },
  { day: 6, date: "9月28日 · 周一", place: "优胜美地 → 维塞利亚", stopId: "visalia", events: ["Glacier Point", "前往 Visalia", "酒店入住", "市区散步"], note: "加油地点待定", drive: "约 3 小时 30 分" },
  { day: 7, date: "9月29日 · 周二", place: "红杉国家公园", stopId: "sequoia", events: ["前往 Sequoia National Park", "Foothills Visitor Center", "General Sherman Tree", "Lincoln Tree 附近短步道"], note: "加油地点待定", drive: "约 50 分钟" },
  { day: 8, date: "9月30日 · 周三", place: "死亡谷", stopId: "death-valley", events: ["前往 Death Valley", "Furnace Creek Visitor Center", "酒店入住", "Mesquite Flat Sand Dunes", "Salt Creek Interpretive Trail · 待定"], note: "进入沙漠后换轻便鞋 / 拖鞋", drive: "约 6 小时" },
  { day: 9, date: "10月1日 · 周四", place: "死亡谷", stopId: "death-valley", events: ["Badwater Basin", "Artist’s Palette", "Zabriskie Point", "Dante’s View", "返程途中看 Zabriskie Point 日落"] },
  { day: 10, date: "10月2日 · 周五", place: "洛杉矶", stopId: "los-angeles", events: ["前往 Los Angeles", "Santa Monica Beach", "酒店入住", "散步 / 晚餐"], note: "加油地点待定", drive: "约 4 小时 45 分" },
  { day: 11, date: "10月3日 · 周六", place: "洛杉矶海岸线", stopId: "los-angeles", events: ["Camarillo Premium Outlets", "沿海驾驶 · Malibu Beach", "酒店入住", "归还租车"] },
  { day: 12, date: "10月4日 · 周日", place: "洛杉矶", stopId: "los-angeles", events: ["Griffith Observatory", "Hollywood 区域", "Los Angeles County Museum of Art", "BCD Tofu House"] },
  { day: 13, date: "10月5日 · 周一", place: "洛杉矶", stopId: "los-angeles", events: ["The Stronghold Climbing Gym", "Quarters Korean BBQ"] },
  { day: 14, date: "10月6日 · 周二", place: "LAX", stopId: "los-angeles", events: ["从 Los Angeles International Airport 离境"] },
];

const routeCoordinates: [number, number][] = [
  [-122.4194, 37.7749],
  [-121.887, 37.668],
  [-120.93, 37.67],
  [-119.5383, 37.7459],
  [-119.64, 36.74],
  [-119.2921, 36.3302],
  [-118.7511, 36.5819],
  [-118.98, 35.39],
  [-117.67, 35.62],
  [-116.8668, 36.4626],
  [-117.29, 35.29],
  [-118.2437, 34.0522],
];

const gallery = [
  { src: "/places/san-francisco.jpg", label: "01 / BAY LIGHT", caption: "Golden Gate · San Francisco" },
  { src: "/places/yosemite.jpg", label: "02 / GRANITE", caption: "Yosemite Valley" },
  { src: "/places/sequoia.jpg", label: "04 / GIANT FOREST", caption: "Sequoia National Park" },
  { src: "/places/death-valley.jpg", label: "05 / DESERT", caption: "Mesquite Flat Sand Dunes" },
  { src: "/places/los-angeles.jpg", label: "06 / CITY LIGHT", caption: "Griffith Observatory" },
];

export default function Home() {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [selectedStopId, setSelectedStopId] = useState(stops[0].id);
  const [openDay, setOpenDay] = useState(1);
  const [mapReady, setMapReady] = useState(false);

  const selectedStop = useMemo(
    () => stops.find((stop) => stop.id === selectedStopId) ?? stops[0],
    [selectedStopId],
  );

  useEffect(() => {
    let disposed = false;
    const markers: Array<{ remove: () => void }> = [];

    async function mountMap() {
      const maplibreModule = await import("maplibre-gl");
      if (disposed || !mapNodeRef.current) return;

      const maplibre = maplibreModule.default;
      const map = new maplibre.Map({
        container: mapNodeRef.current,
        style: "https://tiles.openfreemap.org/styles/bright",
        center: [-119.45, 36.15],
        zoom: 5,
        minZoom: 4,
        maxZoom: 13,
        attributionControl: true,
      });

      mapRef.current = map;
      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        if (disposed) return;
        setMapReady(true);
        map.addSource("road-trip-route", {
          type: "geojson",
          lineMetrics: true,
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: routeCoordinates },
          },
        });
        map.addLayer({
          id: "road-trip-route-shadow",
          type: "line",
          source: "road-trip-route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#f5efdf", "line-width": 9, "line-opacity": 0.9 },
        });
        map.addLayer({
          id: "road-trip-route",
          type: "line",
          source: "road-trip-route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-width": 4,
            "line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "#2452c7", 0.66, "#2452c7", 1, "#e84a2f"],
          },
        });
        map.fitBounds([[-123.12, 33.45], [-116.08, 38.35]], { padding: 64, duration: 0 });
      });

      stops.forEach((stop) => {
        const markerButton = document.createElement("button");
        markerButton.type = "button";
        markerButton.className = "atlas-marker";
        markerButton.dataset.stopId = stop.id;
        markerButton.setAttribute("aria-label", `${stop.number} ${stop.cn} ${stop.name}`);
        markerButton.innerHTML = `<span>${stop.number}</span><em>${stop.name}</em>`;
        markerButton.addEventListener("click", () => selectStop(stop.id, false));

        const marker = new maplibre.Marker({ element: markerButton, anchor: "center" })
          .setLngLat(stop.coordinates)
          .addTo(map);
        markers.push(marker);
      });
    }

    mountMap();
    return () => {
      disposed = true;
      markers.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".atlas-marker").forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.stopId === selectedStopId);
    });
  }, [selectedStopId, mapReady]);

  function selectStop(id: string, moveMap = true) {
    const stop = stops.find((item) => item.id === id);
    if (!stop) return;
    setSelectedStopId(id);
    if (moveMap) {
      mapRef.current?.flyTo({ center: stop.coordinates, zoom: id === "san-francisco" || id === "los-angeles" ? 8.2 : 7.1, duration: 900 });
    }
  }

  function selectDay(plan: DayPlan) {
    setOpenDay((current) => (current === plan.day ? 0 : plan.day));
    selectStop(plan.stopId);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到页面顶部">
          <span>CA</span><i>26</i>
        </a>
        <nav aria-label="页面导航">
          <a href="#route">路线</a>
          <a href="#journal">每日行程</a>
          <a href="#notes">出发提醒</a>
        </nav>
        <div className="header-date">SEP 23 — OCT 6</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true">
          <img src="/places/yosemite.jpg" alt="" fetchPriority="high" />
          <div className="hero-wash" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A CALIFORNIA FIELD JOURNAL · 2026</p>
          <h1>
            California,
            <span>written in light</span>
          </h1>
          <p className="hero-deck">十四天，从太平洋的雾出发，穿过花岗岩、古老巨木与沙漠暮色，抵达洛杉矶的城市灯光。</p>
          <a className="route-cta" href="#route">
            展开路线 <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-facts" aria-label="旅行概览">
          <div><b>14</b><span>DAYS</span></div>
          <div><b>6</b><span>REGIONS</span></div>
          <div><b>5</b><span>MAJOR DRIVES</span></div>
        </div>
        <div className="hero-stamp">
          <span>37.7749° N</span>
          <b>CALIFORNIA</b>
          <span>34.0522° N</span>
        </div>
      </section>

      <section className="route-section" id="route">
        <div className="section-heading">
          <div>
            <p className="eyebrow blue">ROUTE 01—06 / WESTERN FIELD NOTES</p>
            <h2>一条路，六个章节</h2>
          </div>
          <p>点击地图路标查看章节；路线为旅程概览，实际驾驶请以当天导航与道路状况为准。</p>
        </div>

        <div className="atlas-frame">
          <div className="map-panel">
            <div ref={mapNodeRef} className="route-map" aria-label="加州公路旅行交互地图" />
            {!mapReady && <div className="map-loading">正在展开路线图…</div>}
            <div className="map-index">PACIFIC<br />OCEAN</div>
            <div className="map-scale"><i /> APPROX. 100 MILES</div>
          </div>

          <aside className="stop-card" aria-live="polite">
            <div className="stop-card-image">
              <img src={selectedStop.image} alt={`${selectedStop.name} 目的地风景`} />
              <span>{selectedStop.kicker}</span>
            </div>
            <div className="stop-card-body">
              <div className="stop-card-meta">
                <span>{selectedStop.days}</span>
                <b>{selectedStop.number}</b>
              </div>
              <p>{selectedStop.dates}</p>
              <h3>{selectedStop.cn}<small>{selectedStop.name}</small></h3>
              <div className="chapter-rule" />
              <p className="stop-summary">{selectedStop.summary}</p>
              <ol>
                {selectedStop.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ol>
            </div>
          </aside>
        </div>

        <div className="route-tabs" aria-label="目的地章节">
          {stops.map((stop) => (
            <button
              key={stop.id}
              type="button"
              className={selectedStopId === stop.id ? "is-active" : ""}
              aria-pressed={selectedStopId === stop.id}
              onClick={() => selectStop(stop.id)}
            >
              <span>{stop.number}</span>
              <b>{stop.cn}</b>
              <small>{stop.name}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-section" aria-label="目的地影像">
        <div className="gallery-title">
          <p className="eyebrow">FRAME BY FRAME</p>
          <h2>雾、岩石、森林与暮色</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure key={item.src} className={`gallery-item gallery-item-${index + 1}`}>
              <img src={item.src} alt={item.caption} loading="lazy" />
              <figcaption><span>{item.label}</span><b>{item.caption}</b></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div className="journal-intro">
          <p className="eyebrow red">THE DAILY LOG / SEP 23 — OCT 6</p>
          <h2>十四天，每一天都有坐标</h2>
          <p>景点、驾驶时间与原表格里的提醒都整理在这里。点开任意一天，地图会同步移动到对应章节。</p>
        </div>

        <div className="day-list">
          {days.map((plan) => {
            const isOpen = plan.day === openDay;
            return (
              <article key={plan.day} className={`day-card ${isOpen ? "is-open" : ""}`}>
                <button type="button" onClick={() => selectDay(plan)} aria-expanded={isOpen}>
                  <span className="day-number">{String(plan.day).padStart(2, "0")}</span>
                  <span className="day-title"><small>{plan.date}</small><b>{plan.place}</b></span>
                  {plan.drive && <span className="drive-time">DRIVE · {plan.drive}</span>}
                  <span className="day-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="day-content">
                  <ol>
                    {plan.events.map((event, eventIndex) => (
                      <li key={`${plan.day}-${event}`}><span>{String(eventIndex + 1).padStart(2, "0")}</span>{event}</li>
                    ))}
                  </ol>
                  {plan.note && <p className="field-note"><b>FIELD NOTE</b>{plan.note}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="notes-section" id="notes">
        <div className="notes-heading">
          <p className="eyebrow">BEFORE THE ENGINE STARTS</p>
          <h2>出发前，记住这四件事</h2>
        </div>
        <div className="notes-grid">
          <article><span>01</span><h3>离线地图</h3><p>出发前下载国家公园区域地图；山谷与沙漠路段可能没有稳定信号。</p></article>
          <article><span>02</span><h3>补给与油量</h3><p>进入 Yosemite、Sequoia 和 Death Valley 前检查油量，补充水与零食。</p></article>
          <article><span>03</span><h3>沙漠装备</h3><p>Death Valley 日照强、地表热。准备轻便鞋、防晒、帽子和足量饮水。</p></article>
          <article><span>04</span><h3>车辆节点</h3><p>旧金山第 4 天取车，洛杉矶第 11 天归还；预留停车与交接时间。</p></article>
        </div>
      </section>

      <footer>
        <div>
          <span>CALIFORNIA / 2026</span>
          <h2>See you where<br />the road bends.</h2>
        </div>
        <p>路线依据《Trip planning.xlsx》整理。目的地摄影来自 Unsplash：
          <a href="https://unsplash.com/photos/person-standing-on-bridge-taking-picture-cDw1OunQDOg" target="_blank" rel="noreferrer">San Francisco</a>、
          <a href="https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-3_o3u8AeQw8" target="_blank" rel="noreferrer">Yosemite</a>、
          <a href="https://unsplash.com/photos/giant-sequoia-trees-stand-tall-in-the-forest-15X_bz7tdsc" target="_blank" rel="noreferrer">Sequoia</a>、
          <a href="https://unsplash.com/photos/a-desert-landscape-with-mountains-in-the-distance-coIQpWW5xjc" target="_blank" rel="noreferrer">Death Valley</a>、
          <a href="https://unsplash.com/photos/a-large-building-with-a-dome-on-top-of-it-surrounded-by-trees-rMG_acMmyk0" target="_blank" rel="noreferrer">Los Angeles</a>。
        </p>
      </footer>
    </main>
  );
}
