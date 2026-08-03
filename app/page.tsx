"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Polyline } from "leaflet";
import { allRoutePoints, formatMinutes, hotelStays, optimizedDays, routePointTimes, type RoutePoint } from "./route-data";

type DayPlan = {
  day: number;
  date: string;
  place: string;
  events: Array<{ time: string; label: string }>;
  note?: string;
  drive?: string;
  hotelId?: string;
};

const days: DayPlan[] = [
  { day: 0, date: "9月21日 · 周一", place: "北京 → 仁川", hotelId: "grand-hyatt-incheon", events: [{ time: "10:30–12:30", label: "PEK 办理值机 / 安检" }, { time: "13:30–16:30", label: "KE856 · Beijing → Seoul" }, { time: "16:30–18:15", label: "入境 / 接驳 / 酒店入住" }, { time: "9/22 · 11:00 / 13:00", label: "退房 / 前往机场办理值机" }, { time: "9/22 · 16:00–11:00", label: "KE023 · Seoul → San Francisco（当地时间）" }], note: "航班时刻以出票信息为准" },
  { day: 1, date: "9月22日 · 周二", place: "抵达旧金山", hotelId: "hotel-caza", events: [{ time: "11:00–14:00", label: "SFO 抵达 / 入境 / 接送" }, { time: "14:00–16:00", label: "寄存行李 / 午餐 / 休息" }, { time: "16:00–16:30", label: "酒店入住" }, { time: "17:30–20:30", label: "晚餐 / Fisherman’s Wharf 夜间散步" }], note: "提前下载离线地图；酒店通常可在入住前寄存行李" },
  { day: 2, date: "9月23日 · 周三", place: "金门与海岸", hotelId: "hotel-caza", events: [{ time: "08:00–09:15", label: "Golden Gate Bridge" }, { time: "09:30–10:30", label: "Palace of Fine Arts / Crissy Field" }, { time: "10:45–15:00", label: "Baker Beach / 午餐 / 回酒店休息" }], note: "下午保留弹性，照顾时差与脚部恢复" },
  { day: 3, date: "9月24日 · 周四", place: "恶魔岛与渔人码头", hotelId: "hotel-caza", events: [{ time: "08:40–12:00", label: "Alcatraz Island（预约约 09:10 轮渡）" }, { time: "12:15–13:30", label: "Pier 39" }, { time: "13:45–14:30", label: "Ghirardelli Square" }, { time: "14:30–16:00", label: "Fisherman’s Wharf" }, { time: "16:15–17:15", label: "Lombard Street" }], note: "提前预订官方轮渡，并提前约 30 分钟抵达 Pier 33" },
  { day: 4, date: "9月25日 · 周五", place: "Golden Gate Park 与 Mission", hotelId: "hotel-caza", events: [{ time: "09:00–09:30", label: "前往 Golden Gate Park" }, { time: "09:30–13:00", label: "California Academy of Sciences" }, { time: "13:00–14:30", label: "午餐 / Japanese Tea Garden" }, { time: "15:00–16:00", label: "Painted Ladies / Alamo Square" }, { time: "16:30–20:00", label: "Mission District / Dolores Park / 晚餐" }], note: "新增旧金山一天；跨区段优先使用网约车或 Muni" },
  { day: 5, date: "9月26日 · 周六", place: "旧金山 → 优胜美地", hotelId: "yosemite-valley-lodge", events: [{ time: "08:00–09:30", label: "取车 / 加油 / 补给" }, { time: "09:30–16:30", label: "前往 Yosemite（含午餐与拥堵缓冲）" }, { time: "16:30–17:00", label: "酒店入住" }, { time: "17:05–17:45", label: "Cook’s Meadow Loop 短平路段" }, { time: "17:50–18:50", label: "Lower Yosemite Fall / 日落" }], note: "2026 无需车辆预约，但周六入口与山谷仍可能拥堵", drive: "约 5 小时 + 缓冲" },
  { day: 6, date: "9月27日 · 周日", place: "优胜美地山谷", hotelId: "yosemite-valley-lodge", events: [{ time: "08:00–09:15", label: "El Capitan Meadow / Valley View" }, { time: "09:30–13:00", label: "Bouldering / 弹性休息" }, { time: "14:30–16:30", label: "Bridalveil Fall / Tunnel View" }], note: "停车后尽量使用山谷接驳车；脚部不适则缩短徒步" },
  { day: 7, date: "9月28日 · 周一", place: "Glacier Point → 维塞利亚", hotelId: "visalia-marriott", events: [{ time: "07:15–10:45", label: "Glacier Point（含往返山路）" }, { time: "10:45–15:30", label: "前往 Visalia（含午餐 / 加油）" }, { time: "16:00–16:30", label: "酒店入住" }, { time: "17:30–19:30", label: "Downtown Visalia 晚餐 / 轻松散步" }], note: "出发前确认 Glacier Point Road 路况", drive: "约 4 小时 45 分" },
  { day: 8, date: "9月29日 · 周二", place: "红杉国家公园", hotelId: "visalia-marriott", events: [{ time: "06:30–08:30", label: "前往 General Sherman 区域" }, { time: "08:30–10:00", label: "General Sherman Tree" }, { time: "10:15–13:00", label: "Congress Trail 短段 / Giant Forest / 午餐" }, { time: "13:00–16:30", label: "Giant Forest Museum / 沿途观景 / 返回 Visalia" }], note: "山路狭窄弯曲；Sherman 主步道返回段为上坡", drive: "约 4 小时往返" },
  { day: 9, date: "9月30日 · 周三", place: "维塞利亚 → 圣莫尼卡", hotelId: "shore-hotel", events: [{ time: "08:30–13:00", label: "前往 Santa Monica（含休息与进城缓冲）" }, { time: "13:00–14:00", label: "午餐 / 寄存行李" }, { time: "14:00–16:00", label: "Santa Monica Pier / 海滩" }, { time: "16:00–20:00", label: "酒店入住 / 日落 / 晚餐" }], note: "新版取消 Death Valley，接近洛杉矶时用实时导航复核", drive: "约 4 小时 30 分" },
  { day: 10, date: "10月1日 · 周四", place: "Camarillo 与 Malibu", hotelId: "shore-hotel", events: [{ time: "08:30–10:00", label: "前往 Camarillo Premium Outlets" }, { time: "10:00–13:30", label: "Camarillo Premium Outlets" }, { time: "13:30–17:00", label: "Malibu 海岸驾驶 / 精选海滩停靠" }, { time: "17:00–20:30", label: "返回 Santa Monica / 日落 / 晚餐" }], note: "新增洛杉矶一天；Malibu 只选一至两个停靠点", drive: "约 3 小时" },
  { day: 11, date: "10月2日 · 周五", place: "Venice → LAX → Koreatown", hotelId: "line-la", events: [{ time: "08:30–11:30", label: "Venice Beach / Abbot Kinney" }, { time: "11:30–13:00", label: "午餐 / 酒店退房" }, { time: "13:00–15:30", label: "加油 / 前往 LAX / 还车" }, { time: "15:30–18:00", label: "Uber / Lyft 前往 Koreatown / 入住 / 晚餐" }], note: "周五高峰前还车；LAX 到 Koreatown 仍可能超过一小时" },
  { day: 12, date: "10月3日 · 周六", place: "洛杉矶经典城市线", hotelId: "line-la", events: [{ time: "09:00–12:30", label: "Griffith Observatory（含交通 / 停车）" }, { time: "13:00–14:30", label: "Hollywood 区域" }, { time: "15:00–17:30", label: "Los Angeles County Museum of Art" }, { time: "18:30–20:00", label: "BCD Tofu House" }], note: "周六天文台 10:00 开放；LACMA 当前周六 10:00–19:00" },
  { day: 13, date: "10月4日 · 周日", place: "攀岩与韩餐", hotelId: "line-la", events: [{ time: "10:00–14:00", label: "The Stronghold Climbing Gym" }, { time: "17:30–20:00", label: "Quarters Korean BBQ（建议早到）" }], note: "确认分店与周日时间；脚部无痛且状态适合时再攀爬" },
  { day: 14, date: "10月5日 · 周一", place: "LAX 离境", hotelId: "line-la", events: [{ time: "待定", label: "酒店退房 / 寄存行李 / 机场接送" }, { time: "待定", label: "从 LAX 离境" }], note: "航班仍待定；酒店约提前 4.5 小时出发，争取提前 3 小时抵达 LAX" },
];

type RouteSelection = number | "all";

function toLatLng(point: RoutePoint): [number, number] {
  return [point.coordinates[1], point.coordinates[0]];
}

function routeLatLngs(points: RoutePoint[]) {
  const coordinates = points.filter((point) => point.status !== "closed").map(toLatLng);
  return coordinates.length === 1 ? [coordinates[0], coordinates[0]] : coordinates;
}

function formatTravel(point: RoutePoint) {
  if (point.status === "closed") return "当前关闭，跳过";
  const duration = formatMinutes(point.travelMinutes);
  return point.travelLabel ? `${point.travelLabel} · ${duration}` : duration;
}

export default function Home() {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const routeLinesRef = useRef<Polyline[]>([]);
  const [selectedRouteDay, setSelectedRouteDay] = useState<RouteSelection>("all");
  const [selectedPointId, setSelectedPointId] = useState(allRoutePoints[0].id);
  const [openDay, setOpenDay] = useState(1);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [baseMapUnavailable, setBaseMapUnavailable] = useState(false);

  const selectedDay = useMemo(
    () => typeof selectedRouteDay === "number" ? optimizedDays.find((day) => day.day === selectedRouteDay) : undefined,
    [selectedRouteDay],
  );
  const activePoints = selectedDay?.points ?? allRoutePoints;
  const selectedPoint = allRoutePoints.find((point) => point.id === selectedPointId) ?? activePoints[0];
  const selectedPointDay = optimizedDays.find((day) => day.day === selectedPoint.day);
  const activeHotel = hotelStays.find((hotel) => hotel.id === (selectedDay?.hotelId ?? selectedPointDay?.hotelId));
  const activeTravelMinutes = activePoints.reduce((total, point) => total + (point.status === "closed" ? 0 : point.travelMinutes), 0);
  const activeVisitMinutes = activePoints.reduce((total, point) => total + (point.status === "closed" ? 0 : point.visitMinutes), 0);

  useEffect(() => {
    let disposed = false;

    async function mountMap() {
      try {
        const leaflet = await import("leaflet");
        if (disposed || !mapNodeRef.current) return;

        const map = leaflet.map(mapNodeRef.current, {
          center: [36.1, -120.1],
          zoom: 5,
          minZoom: 4,
          maxZoom: 13,
          zoomControl: false,
        });

        mapRef.current = map;
        leaflet.control.zoom({ position: "topright" }).addTo(map);

        const esriTiles = leaflet.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri — Sources: Esri, HERE, Garmin, USGS and the GIS User Community",
            maxZoom: 19,
          },
        );
        let esriTileErrors = 0;
        let esriTileLoaded = false;
        let fallbackActive = false;

        const activateFallback = () => {
          if (disposed || fallbackActive) return;
          fallbackActive = true;
          map.removeLayer(esriTiles);

          const osmFallback = leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
          });
          let fallbackTileErrors = 0;
          osmFallback.on("tileload", () => {
            fallbackTileErrors = 0;
            if (!disposed) setBaseMapUnavailable(false);
          });
          osmFallback.on("tileerror", () => {
            fallbackTileErrors += 1;
            if (!disposed && fallbackTileErrors >= 4) setBaseMapUnavailable(true);
          });
          osmFallback.addTo(map);
        };

        esriTiles.on("tileload", () => {
          esriTileLoaded = true;
          esriTileErrors = 0;
          if (!disposed) setBaseMapUnavailable(false);
        });
        esriTiles.on("tileerror", () => {
          esriTileErrors += 1;
          if (esriTileErrors >= 3) activateFallback();
        });
        esriTiles.addTo(map);

        window.setTimeout(() => {
          if (!disposed && !fallbackActive && !esriTileLoaded) activateFallback();
        }, 5000);

        const initialRoute = routeLatLngs(allRoutePoints);
        routeLinesRef.current = [
          leaflet.polyline(initialRoute, {
            color: "#f5efdf",
            weight: 9,
            opacity: 0.9,
            lineCap: "round",
            lineJoin: "round",
            interactive: false,
          }).addTo(map),
          leaflet.polyline(initialRoute, {
            color: "#2452c7",
            weight: 4,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            interactive: false,
          }).addTo(map),
        ];

        map.fitBounds([[33.45, -123.12], [38.35, -118.02]], { padding: [64, 64], animate: false });

        allRoutePoints.forEach((point) => {
          const markerButton = document.createElement("button");
          markerButton.type = "button";
          markerButton.className = `atlas-marker ${point.status === "closed" ? "is-closed" : ""}`;
          markerButton.dataset.pointId = point.id;
          markerButton.dataset.day = String(point.day);
          markerButton.setAttribute("aria-label", `Day ${point.day}, stop ${point.order}, ${point.name}`);
          markerButton.innerHTML = `<span>${point.day}·${point.order}</span><em>${point.name}</em>`;
          markerButton.addEventListener("click", () => {
            setSelectedRouteDay(point.day);
            setSelectedPointId(point.id);
          });

          leaflet.marker(toLatLng(point), {
            icon: leaflet.divIcon({
              className: "leaflet-atlas-icon",
              html: markerButton,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            }),
            keyboard: false,
          }).addTo(map);
        });

        hotelStays.filter((hotel) => hotel.coordinates).forEach((hotel) => {
          const hotelButton = document.createElement("button");
          hotelButton.type = "button";
          hotelButton.className = "hotel-marker";
          hotelButton.dataset.hotelId = hotel.id;
          hotelButton.dataset.dayFrom = String(hotel.dayFrom);
          hotelButton.dataset.dayTo = String(hotel.dayTo);
          hotelButton.setAttribute("aria-label", `${hotel.cn}，${hotel.dates}，${hotel.nights} 晚`);
          hotelButton.innerHTML = `<span>H</span><em>${hotel.name}</em>`;
          hotelButton.addEventListener("click", () => {
            setSelectedRouteDay(hotel.dayFrom);
            const firstPoint = optimizedDays.find((day) => day.day === hotel.dayFrom)?.points[0];
            if (firstPoint) setSelectedPointId(firstPoint.id);
          });

          leaflet.marker([hotel.coordinates![1], hotel.coordinates![0]], {
            icon: leaflet.divIcon({
              className: "leaflet-hotel-icon",
              html: hotelButton,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            }),
            keyboard: false,
          }).addTo(map);
        });

        if (!disposed) {
          map.invalidateSize();
          setMapReady(true);
        }
      } catch (error) {
        console.error("Map initialization failed", error);
        if (!disposed) {
          setMapError(true);
          setMapReady(false);
        }
      }
    }

    void mountMap();
    return () => {
      disposed = true;
      routeLinesRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const points = selectedDay?.points ?? allRoutePoints;
    const openPoints = points.filter((point) => point.status !== "closed");
    const latLngs = routeLatLngs(points);
    routeLinesRef.current.forEach((line) => line.setLatLngs(latLngs));

    document.querySelectorAll<HTMLElement>(".atlas-marker").forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.pointId === selectedPointId);
      marker.classList.toggle("is-muted", selectedRouteDay !== "all" && marker.dataset.day !== String(selectedRouteDay));
    });
    document.querySelectorAll<HTMLElement>(".hotel-marker").forEach((marker) => {
      const dayFrom = Number(marker.dataset.dayFrom);
      const dayTo = Number(marker.dataset.dayTo);
      const isInSelectedDay = selectedRouteDay === "all" || (typeof selectedRouteDay === "number" && selectedRouteDay >= dayFrom && selectedRouteDay <= dayTo);
      marker.classList.toggle("is-muted", !isInSelectedDay);
      marker.classList.toggle("is-active", marker.dataset.hotelId === activeHotel?.id);
    });

    if (!mapReady || !mapRef.current || !openPoints.length) return;
    if (openPoints.length === 1) {
      mapRef.current.flyTo(toLatLng(openPoints[0]), 10, { duration: 0.85 });
      return;
    }
    mapRef.current.fitBounds(
      openPoints.map(toLatLng),
      { padding: selectedRouteDay === "all" ? [64, 64] : [92, 92], animate: true, duration: 0.85, maxZoom: 11 },
    );
  }, [activeHotel?.id, selectedDay, selectedPointId, selectedRouteDay, mapReady]);

  function selectRouteDay(day: RouteSelection) {
    setSelectedRouteDay(day);
    if (day === "all") return;
    const firstPoint = optimizedDays.find((item) => item.day === day)?.points[0];
    if (firstPoint) setSelectedPointId(firstPoint.id);
  }

  function selectDay(plan: DayPlan) {
    setOpenDay((current) => (current === plan.day ? -1 : plan.day));
    if (plan.day > 0) selectRouteDay(plan.day);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到页面顶部">
          <span>CA</span><i>26</i>
        </a>
        <nav aria-label="页面导航">
          <a href="#route">路线</a>
          <a href="#stays">住宿</a>
          <a href="#journal">每日行程</a>
        </nav>
        <div className="header-date">SEP 21 — OCT 5</div>
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
            <span>Linna &amp; Wooju</span>
          </h1>
          <p className="hero-deck">从仁川转机夜开始，十四天穿过太平洋的雾、花岗岩与古老巨木，沿南加州海岸抵达洛杉矶的城市灯光。</p>
          <a className="route-cta" href="#route">
            展开路线 <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-facts" aria-label="旅行概览">
          <div><b>15</b><span>CALENDAR DAYS</span></div>
          <div><b>{allRoutePoints.length}</b><span>ROUTE STOPS</span></div>
          <div><b>{hotelStays.length}</b><span>HOTEL STAYS</span></div>
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
            <p className="eyebrow blue">OPTIMIZED ROUTE / {allRoutePoints.length} COORDINATES</p>
            <h2>所有景点，一张地图</h2>
          </div>
          <p>已按每天少折返、顺路衔接的原则重新排序。点击 D1—D14 放大当天路线，再点编号查看到达时间与建议观光时长。</p>
        </div>

        <div className="day-route-tabs" aria-label="选择地图日期">
          <button
            type="button"
            className={selectedRouteDay === "all" ? "is-active" : ""}
            aria-pressed={selectedRouteDay === "all"}
            onClick={() => selectRouteDay("all")}
          >
            <span>ALL</span><b>全部 {allRoutePoints.length} 站</b>
          </button>
          {optimizedDays.map((day) => (
            <button
              key={day.day}
              type="button"
              className={selectedRouteDay === day.day ? "is-active" : ""}
              aria-pressed={selectedRouteDay === day.day}
              onClick={() => selectRouteDay(day.day)}
            >
              <span>D{String(day.day).padStart(2, "0")}</span><b>{day.title}</b>
            </button>
          ))}
        </div>

        <div className="atlas-frame">
          <div className="map-panel">
            <div ref={mapNodeRef} className="route-map" aria-label="包含全部景点、逐日顺序和路线的加州旅行交互地图" />
            {!mapReady && !mapError && <div className="map-loading">正在展开路线图…</div>}
            {mapError && <div className="map-error" role="status"><b>地图暂时无法加载</b><span>全部路线、时间与地点仍可在右侧查看。</span></div>}
            {baseMapUnavailable && <div className="map-network-note" role="status">底图网络受限，路线与地点标记仍可正常使用</div>}
            <div className="map-index">PACIFIC<br />OCEAN</div>
            <div className="map-legend"><i className="legend-open" /> 景点 / 交通节点 <i className="legend-hotel" /> 酒店</div>
          </div>

          <aside className="route-planner" aria-live="polite">
            <div className="planner-heading">
              <p>{selectedDay ? `DAY ${String(selectedDay.day).padStart(2, "0")} · ${selectedDay.date}` : "ALL DAYS · SEP 22 — OCT 5"}</p>
              <h3>{selectedDay?.title ?? "加州全程总览"}</h3>
              <div className="planner-metrics">
                <div><span>预计交通</span><b>{formatMinutes(activeTravelMinutes)}</b></div>
                <div><span>建议观光</span><b>{formatMinutes(activeVisitMinutes)}</b></div>
              </div>
            </div>

            <div className="selected-point">
              <div className="selected-point-index">{selectedPoint.day}·{selectedPoint.order}</div>
              <div>
                <p>SELECTED STOP</p>
                <h4>{selectedPoint.name}<small>DAY {String(selectedPoint.day).padStart(2, "0")} · STOP {String(selectedPoint.order).padStart(2, "0")}</small></h4>
                <div className="selected-point-times">
                  <span>计划 · {routePointTimes[selectedPoint.id]}</span>
                  <span>{selectedPoint.travelMode} · {formatTravel(selectedPoint)}</span>
                  <span>建议停留 · {formatMinutes(selectedPoint.visitMinutes)}</span>
                </div>
                {selectedPoint.note && <p className="point-note">{selectedPoint.note}</p>}
              </div>
            </div>

            {activeHotel && (
              <a className="planner-hotel" href={activeHotel.website} target="_blank" rel="noreferrer">
                <span>STAY · {activeHotel.dates} · {activeHotel.nights} 晚</span>
                <b>{activeHotel.cn}</b>
                <small>{activeHotel.name} · 入住 {activeHotel.checkIn}</small>
              </a>
            )}

            {selectedDay ? (
              <ol className="route-sequence" aria-label={`第 ${selectedDay.day} 天推荐顺序`}>
                {selectedDay.points.map((point) => (
                  <li key={point.id} className={`${point.id === selectedPointId ? "is-active" : ""} ${point.status === "closed" ? "is-closed" : ""}`}>
                    <button type="button" onClick={() => setSelectedPointId(point.id)}>
                      <span className="sequence-number">{String(point.order).padStart(2, "0")}</span>
                      <span className="sequence-place"><em>{routePointTimes[point.id]}</em><b>{point.name}</b><small>DAY {String(point.day).padStart(2, "0")} · STOP {String(point.order).padStart(2, "0")}</small></span>
                      <span className="sequence-time"><b>{point.travelMode}</b><small>{formatTravel(point)}</small></span>
                      <span className="sequence-visit"><b>观光</b><small>{formatMinutes(point.visitMinutes)}</small></span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="all-days-index">
                <p>地图已显示 14 天的 {allRoutePoints.length} 个坐标点；选择某一天，可查看当天的最优顺序与每一段时间。</p>
                <div>
                  {optimizedDays.map((day) => (
                    <button key={day.day} type="button" onClick={() => selectRouteDay(day.day)}>
                      <span>D{String(day.day).padStart(2, "0")}</span><b>{day.title}</b><small>{day.points.length} 站</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="planner-disclaimer">时间为非实时规划估算，不含停车、排队、用餐和临时封路；出发当天请用导航复核。</p>
          </aside>
        </div>

        <div className="route-method">
          <p><b>路线逻辑</b> 同一片区按地理方向串联，步行街区集中处理，日落点放在每日最后；每天首段从当晚酒店或对应城市中心估算。地图连线表达顺序，不代替逐路口导航。</p>
          <p><b>状态依据</b> 新版已经取消 Death Valley；国家公园路况仍会快速变化。出发前查看
            <a href="https://www.nps.gov/yose/planyourvisit/index.htm" target="_blank" rel="noreferrer"> Yosemite 行前信息</a> 与
            <a href="https://www.nps.gov/seki/planyourvisit/visitorcenters.htm" target="_blank" rel="noreferrer">Sequoia 游客中心</a>。
          </p>
          <p><b>时长参考</b> 恶魔岛按官方建议保留 2–3 小时；Griffith Observatory 按周六 10:00 开放安排上午到达。查看
            <a href="https://home.nps.gov/alca/planyourvisit/things2do.htm" target="_blank" rel="noreferrer"> Alcatraz 建议</a> 与
            <a href="https://griffithobservatory.org/?topic_id=17" target="_blank" rel="noreferrer">Griffith 开放信息</a>。
          </p>
        </div>
      </section>

      <section className="stays-section" id="stays">
        <div className="stays-intro">
          <p className="eyebrow blue">SIX STAYS / ONE CONTINUOUS ROUTE</p>
          <h2>从转机夜，到太平洋边</h2>
          <p>住宿完全按新版日期同步：旧金山四晚、Yosemite 两晚、Visalia 两晚、Santa Monica 两晚，最后转到 Koreatown 连住三晚。</p>
        </div>
        <div className="stays-list">
          {hotelStays.map((hotel, index) => (
            <a key={hotel.id} href={hotel.website} target="_blank" rel="noreferrer" className="stay-row">
              <span className="stay-index">H{String(index + 1).padStart(2, "0")}</span>
              <span className="stay-dates">{hotel.dates}<small>{hotel.nights} NIGHT{hotel.nights > 1 ? "S" : ""}</small></span>
              <span className="stay-name"><b>{hotel.cn}</b><small>{hotel.name}</small></span>
              <span className="stay-address">{hotel.address}<small>IN {hotel.checkIn} · OUT {hotel.checkOut}</small></span>
              <span className="stay-arrow" aria-hidden="true">↗</span>
              <span className="stay-note">{hotel.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div className="journal-intro">
          <p className="eyebrow red">THE DAILY LOG / SEP 21 — OCT 5</p>
          <h2>从 Day 0 开始，每小时都有去处</h2>
          <p>新版表格里的航班、景点、入住时间和驾驶节点已经排进时间轴。点开 D1—D14，地图会同步移动到当天路线。</p>
        </div>

        <div className="day-list">
          {days.map((plan) => {
            const isOpen = plan.day === openDay;
            const planHotel = hotelStays.find((hotel) => hotel.id === plan.hotelId);
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
                      <li key={`${plan.day}-${event.label}`}>
                        <span>{String(eventIndex + 1).padStart(2, "0")}</span>
                        <time>{event.time}</time>
                        <b>{event.label}</b>
                      </li>
                    ))}
                  </ol>
                  {planHotel && <a className="day-hotel" href={planHotel.website} target="_blank" rel="noreferrer"><span>STAY</span><b>{planHotel.name}</b><small>{planHotel.dates} · 入住 {planHotel.checkIn}</small></a>}
                  {plan.note && <p className="field-note"><b>FIELD NOTE</b>{plan.note}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer>
        <div>
          <span>CALIFORNIA / 2026</span>
          <h2>See you where<br />the road bends.</h2>
        </div>
        <p>路线依据《Trip planning_260801_SF_LA_extra_days.xlsx》整理，开放时间与住宿信息以表格 Sources 页及各机构官方页面为准。封面摄影来自 Unsplash：
          <a href="https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-3_o3u8AeQw8" target="_blank" rel="noreferrer">Yosemite Valley</a>。
        </p>
      </footer>
    </main>
  );
}
