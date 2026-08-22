"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Polyline } from "leaflet";
import ExpenseSheet from "./expense-sheet";
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
  { day: 1, date: "9月21日 · 周一", place: "Beijing → San Francisco", hotelId: "comfort-inn-bay", events: [{ time: "17:25–14:05", label: "UA889 · Beijing → San Francisco（当地时间）" }, { time: "14:05–16:05", label: "SFO 入境 / 取行李 / 接送" }, { time: "16:45–17:15", label: "Comfort Inn by the Bay check-in / 休息" }, { time: "18:00–20:00", label: "晚餐 / Fisherman’s Wharf at Night" }], note: "跨时区同日抵达；航班时刻以出票信息为准" },
  { day: 2, date: "9月22日 · 周二", place: "Pier 39 → Lombard Street", hotelId: "comfort-inn-bay", events: [{ time: "09:00–10:00", label: "Pier 39 Sea Lion Viewing Area" }, { time: "10:10–12:00", label: "Fisherman’s Wharf" }, { time: "12:00–13:00", label: "码头区午餐" }, { time: "13:15–14:00", label: "Lombard Street" }], note: "这一天景点集中在酒店附近，步行即可" },
  { day: 3, date: "9月23日 · 周三", place: "Alcatraz Island", hotelId: "comfort-inn-bay", events: [{ time: "08:30–09:00", label: "Pier 33 Alcatraz Landing" }, { time: "09:10–12:30", label: "Alcatraz Island / 往返轮渡" }, { time: "12:45–14:00", label: "Embarcadero 午餐 / 返回酒店" }], note: "提前 30 分钟到 Pier 33；随身带水和简餐" },
  { day: 4, date: "9月24日 · 周四", place: "San Francisco → Mariposa / Yosemite", hotelId: "yosemite-way-station", events: [{ time: "07:35–08:45", label: "SFO Rental Car Center / 取车" }, { time: "08:45–10:30", label: "SFO → Trader Joe’s · Modesto" }, { time: "10:30–11:00", label: "水和野餐补给" }, { time: "11:00–13:25", label: "Modesto → Nelder Grove Interpretive Area" }, { time: "13:25–14:40", label: "Nelder Grove（道路开放时）" }, { time: "14:40–15:55", label: "Nelder Grove → Mariposa" }, { time: "15:55–17:00", label: "Best Western Plus Yosemite Way Station Motel check-in" }], note: "Nelder Grove 是明显绕行项；出发前向 Sierra National Forest 确认 2026 年道路状态，关闭或晚出发就直接去酒店", drive: "约 5 小时 50 分 + 取车 / 补给" },
  { day: 5, date: "9月25日 · 周五", place: "Yosemite Valley Highlights", hotelId: "yosemite-way-station", events: [{ time: "07:00–08:05", label: "Mariposa → Tunnel View" }, { time: "08:05–08:35", label: "Tunnel View" }, { time: "08:45–09:45", label: "Bridalveil Fall" }, { time: "09:55–10:30", label: "El Capitan Meadow" }, { time: "10:45–11:15", label: "Sentinel Bridge" }, { time: "11:30–12:30", label: "Lower Yosemite Fall" }, { time: "13:00–14:15", label: "Cook’s Meadow Loop" }], note: "全天带水和简餐；9月底 Yosemite Falls 可能水量很低", drive: "园内约 2 小时 + 返回 Mariposa" },
  { day: 6, date: "9月26日 · 周六", place: "Glacier Point & High Country Views", hotelId: "yosemite-way-station", events: [{ time: "06:40–08:30", label: "Mariposa → Washburn Point" }, { time: "08:30–08:55", label: "Washburn Point" }, { time: "09:05–10:05", label: "Glacier Point" }, { time: "10:25–12:25", label: "Sentinel Dome Trail" }, { time: "12:25–13:15", label: "野餐 / 休息" }, { time: "13:15–15:15", label: "Taft Point（体力允许时）" }, { time: "15:15–17:15", label: "返回 Mariposa" }], note: "第二个 Yosemite 日以 Glacier Point 和 Sentinel Dome 为核心；Taft Point 可删减", drive: "驾车约 4 小时 + 徒步约 4 小时" },
  { day: 7, date: "9月27日 · 周日", place: "Yosemite → Lake Tahoe", hotelId: "alder-inn", events: [{ time: "08:30–13:00", label: "Mariposa → South Lake Tahoe（含休息缓冲）" }, { time: "13:00–14:00", label: "午餐 / The Alder Inn 寄存行李" }, { time: "14:20–15:35", label: "Thomas F. Regan Memorial City Beach" }, { time: "16:00–16:30", label: "The Alder Inn check-in" }], note: "表格估算净驾驶 3 小时 59 分，实际应为山路和一次休息留缓冲", drive: "约 4 小时 + 休息" },
  { day: 8, date: "9月28日 · 周一", place: "Emerald Bay & West Shore", hotelId: "alder-inn", events: [{ time: "08:00–09:00", label: "Gather Botanical Café · Breakfast" }, { time: "09:35–11:05", label: "Emerald Bay State Park" }, { time: "11:25–12:40", label: "Tallac Historic Site" }, { time: "13:00–14:30", label: "Pope Beach" }], note: "先到热门停车点，再向 South Lake Tahoe 方向返回；提前买好湖边食物", drive: "约 1 小时 10 分" },
  { day: 9, date: "9月29日 · 周二", place: "Sand Harbor → Nevada Beach", hotelId: "alder-inn", events: [{ time: "07:15–08:00", label: "前往 Sand Harbor" }, { time: "08:00–12:00", label: "Sand Harbor / 野餐" }, { time: "12:00–12:40", label: "Sand Harbor → Nevada Beach" }, { time: "12:40–15:40", label: "Nevada Beach" }], note: "Sand Harbor 上午车辆入园需预约；出发前先买好食物和水", drive: "约 1 小时 25 分" },
  { day: 10, date: "9月30日 · 周三", place: "Lake Tahoe → Old Sacramento → Davis", hotelId: "palm-court-davis", events: [{ time: "07:45–10:00", label: "South Lake Tahoe → Old Sacramento" }, { time: "10:15–11:45", label: "Old Sacramento Waterfront" }, { time: "11:50–13:05", label: "Joe’s Crab Shack · Lunch" }, { time: "13:20–14:00", label: "Beers Books" }, { time: "14:00–14:30", label: "Sacramento → Davis" }, { time: "15:00–15:30", label: "Best Western Plus Palm Court Hotel check-in" }, { time: "16:00–17:15", label: "UC Davis Arboretum and Public Garden" }], note: "酒店实际在 Downtown Davis；早餐为付费项目，不要按免费早餐预期", drive: "约 2 小时 45 分" },
  { day: 11, date: "10月1日 · 周四", place: "Davis → Napa Valley → Sunnyvale", hotelId: "best-western-silicon-valley", events: [{ time: "08:30–09:45", label: "Davis → Castello di Amorosa" }, { time: "10:00–11:30", label: "Castello di Amorosa（预约）" }, { time: "11:30–12:10", label: "Calistoga → Oxbow Public Market" }, { time: "12:10–13:25", label: "Napa 午餐" }, { time: "13:25–15:25", label: "Napa → Sunnyvale" }, { time: "15:25–16:25", label: "Best Western Silicon Valley Inn check-in" }], note: "驾驶者不饮酒；长途驾驶后晚间留空", drive: "约 4 小时" },
  { day: 12, date: "10月2日 · 周五", place: "Great Mall", hotelId: "best-western-silicon-valley", events: [{ time: "09:40–10:00", label: "Sunnyvale → Great Mall" }, { time: "10:00–14:00", label: "Great Mall / Outlet Shopping" }, { time: "14:00–晚间", label: "自由活动 / 休息" }], note: "按最终表格保留 Great Mall，不再加入 Clockwise 版本的额外 San Jose 景点", drive: "约 40 分钟往返" },
  { day: 13, date: "10月3日 · 周六", place: "Half Moon Bay & Pumpkin Farms", hotelId: "best-western-silicon-valley", events: [{ time: "09:00–09:50", label: "Sunnyvale → Half Moon Bay" }, { time: "10:00–12:00", label: "Lemos Farm" }, { time: "12:10–13:10", label: "Pastorino Farms（二选一）" }, { time: "13:20–15:20", label: "Half Moon Bay State Beach / Coastside views" }, { time: "15:20–16:20", label: "返回 Sunnyvale" }], note: "两家 pumpkin farm 选一家即可；秋季周末建议提前购票", drive: "约 2 小时往返" },
  { day: 14, date: "10月4日 · 周日", place: "Sunnyvale → SFO → Beijing", hotelId: "best-western-silicon-valley", events: [{ time: "06:30–07:30", label: "酒店退房 / 前往 SFO / 还车" }, { time: "07:30–10:35", label: "国际航班值机 / 安检 / 登机" }, { time: "10:35–15:25 +1", label: "UA888 · San Francisco → Beijing" }], note: "表格预计酒店到 SFO 约 41 分钟；仍建议起飞前约 3 小时抵达机场", drive: "约 41 分钟 + 还车" },
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
          center: [38.2, -120.8],
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

        map.fitBounds([[37.2, -123.05], [39.35, -119.05]], { padding: [64, 64], animate: false });

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
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到页面顶部">
          <span>CA</span><i>26</i>
        </a>
        <nav aria-label="页面导航">
          <a href="#route">路线</a>
          <a href="#stays">住宿</a>
          <a href="#expenses">消费</a>
          <a href="#journal">每日行程</a>
        </nav>
        <div className="header-date">SEP 21 — OCT 4</div>
      </header>

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
              <p>{selectedDay ? `DAY ${String(selectedDay.day).padStart(2, "0")} · ${selectedDay.date}` : "ALL DAYS · SEP 21 — OCT 4"}</p>
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
          <p><b>状态依据</b> Nelder Grove 是 9 月 24 日最大的绕行项，2025 年曾因安全原因关闭；2026 年是否开放需临行复核。出发前查看
            <a href="https://www.fs.usda.gov/r05/sierra/alerts" target="_blank" rel="noreferrer"> Sierra National Forest Alerts</a>、
            <a href="https://www.nps.gov/yose/planyourvisit/conditions.htm" target="_blank" rel="noreferrer">Yosemite 当前路况</a> 与
            <a href="https://parks.nv.gov/about/frequently-asked-questions/sand-harbor-reservations" target="_blank" rel="noreferrer">Sand Harbor 预约规则</a>。
          </p>
          <p><b>时长参考</b> Alcatraz 按往返轮渡与岛上参观保留 3–3.5 小时；Great Mall 与 Lemos Farm 按当前常规营业时间排入。查看
            <a href="https://www.cityexperiences.com/san-francisco/city-cruises/alcatraz/" target="_blank" rel="noreferrer"> Alcatraz 官方轮渡</a>、
            <a href="https://www.simon.com/mall/great-mall/hours" target="_blank" rel="noreferrer">Great Mall</a> 与
            <a href="https://www.lemosfarm.com/select-your-month-to-visit" target="_blank" rel="noreferrer">Lemos Farm</a>。
          </p>
        </div>
      </section>

      <section className="stays-section" id="stays">
        <div className="stays-intro">
          <p className="eyebrow blue">FIVE STAYS / ONE CONTINUOUS ROUTE</p>
          <h2>从海湾，到山谷</h2>
          <p>住宿已按 Counter Clockwise 最终表格同步：Comfort Inn by the Bay 三晚、Mariposa 三晚、The Alder Inn 三晚、Downtown Davis 一晚，最后在 Best Western Silicon Valley Inn 连住三晚。</p>
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

      <ExpenseSheet />

      <section className="journal-section" id="journal">
        <div className="journal-intro">
          <p className="eyebrow red">THE DAILY LOG / SEP 21 — OCT 4</p>
          <h2>从 Day 1 开始，每小时都有去处</h2>
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
        <p>路线依据《Trip planning_Final.xlsx》的 Counter Clockwise 工作表整理；旧 Clockwise 方案未保留。住宿以最终表格为准，开放时间、驾驶时长与航班以出发前官方信息和实时导航为准。封面摄影来自 Unsplash：
          <a href="https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-3_o3u8AeQw8" target="_blank" rel="noreferrer">Yosemite Valley</a>。
        </p>
      </footer>
    </main>
  );
}
