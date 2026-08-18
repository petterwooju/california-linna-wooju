export type RoutePointStatus = "open" | "closed";

export type RoutePoint = {
  id: string;
  day: number;
  order: number;
  cn: string;
  name: string;
  coordinates: [number, number];
  travelMode: string;
  travelMinutes: number;
  travelLabel?: string;
  visitMinutes: number;
  note?: string;
  status?: RoutePointStatus;
};

export type OptimizedDay = {
  day: number;
  date: string;
  title: string;
  hotelId: string;
  points: RoutePoint[];
};

export type HotelStay = {
  id: string;
  name: string;
  cn: string;
  dates: string;
  nights: number;
  address: string;
  checkIn: string;
  checkOut: string;
  dayFrom: number;
  dayTo: number;
  coordinates?: [number, number];
  website: string;
  note: string;
};

export const hotelStays: HotelStay[] = [
  { id: "hotel-caza", name: "Hotel Caza Fisherman’s Wharf", cn: "Hotel Caza 渔人码头", dates: "9/21 — 9/24", nights: 3, address: "1300 Columbus Ave, San Francisco", checkIn: "16:00", checkOut: "12:00", dayFrom: 1, dayTo: 3, coordinates: [-122.4189, 37.8068], website: "https://www.hotelcaza.com/", note: "建议住宿；步行可达 Fisherman’s Wharf、Pier 39 与 Pier 33，适合前三天不租车的安排。" },
  { id: "holiday-inn-sacramento", name: "Holiday Inn Sacramento Downtown – Arena by IHG", cn: "Holiday Inn Sacramento Downtown – Arena", dates: "9/24 — 9/25", nights: 1, address: "300 J Street, Sacramento", checkIn: "15:00", checkOut: "11:00", dayFrom: 4, dayTo: 4, coordinates: [-121.5024, 38.5819], website: "https://www.trip.com/hotels/sacramento-hotel-detail-2216965/holiday-inn-sacramento-downtown-arena-by-ihg/", note: "已选酒店；距 Old Sacramento Waterfront 约 200 米，第二天可直接步行出发。酒店提供收费私人停车，当前页面标示约 US$20/天。" },
  { id: "alder-inn", name: "The Alder Inn", cn: "The Alder Inn", dates: "9/25 — 9/28", nights: 3, address: "1072 Ski Run Blvd, South Lake Tahoe", checkIn: "16:00", checkOut: "10:00", dayFrom: 5, dayTo: 7, coordinates: [-119.9562, 38.9464], website: "https://www.thealderinn.com/", note: "已选酒店；免费停车，位置适合作为 Emerald Bay、South Lake Tahoe 与 Nevada 一侧的三晚基地。Deluxe Queen Room 是否配独立空调建议以订单房型设施为准。" },
  { id: "yosemite-view-lodge", name: "Yosemite View Lodge", cn: "Yosemite View Lodge", dates: "9/28 — 10/1", nights: 3, address: "11136 CA-140, El Portal", checkIn: "15:00", checkOut: "11:00", dayFrom: 8, dayTo: 10, coordinates: [-119.7649, 37.6782], website: "https://www.trip.com/hotels/el-portal-hotel-detail-2194994/yosemite-view-lodge/", note: "已选酒店；位于 CA-140、靠近 Arch Rock Entrance，连续住三晚可减少搬运行李。进入 Yosemite Valley 通常仍需约 20–30 分钟车程。" },
  { id: "hyatt-san-jose", name: "Hyatt Place San Jose / Downtown", cn: "Hyatt Place San Jose / Downtown", dates: "10/1 — 10/4", nights: 3, address: "282 Almaden Boulevard, San Jose", checkIn: "15:00", checkOut: "12:00", dayFrom: 11, dayTo: 14, coordinates: [-121.8905, 37.3292], website: "https://www.hyatt.com/hyatt-place/en-US/sjczj-hyatt-place-san-jose-downtown", note: "建议住宿；连住三晚，前往 Downtown、Great Mall、Half Moon Bay 与 SFO 都较顺路。" },
];

export const optimizedDays: OptimizedDay[] = [
  {
    day: 1,
    date: "9月21日 · 周一",
    title: "北京 → 旧金山",
    hotelId: "hotel-caza",
    points: [
      { id: "d1-sfo", day: 1, order: 1, cn: "旧金山国际机场", name: "San Francisco International Airport", coordinates: [-122.379, 37.6213], travelMode: "航班抵达", travelMinutes: 0, travelLabel: "UA889 · 14:05 抵达", visitMinutes: 120, note: "预留约两小时完成入境、取行李和取网约车；UA889 航班时刻以出票信息为准。" },
      { id: "d1-wharf-night", day: 1, order: 2, cn: "渔人码头夜景", name: "Fisherman’s Wharf at Night", coordinates: [-122.4177, 37.808], travelMode: "网约车 / 步行", travelMinutes: 45, travelLabel: "经酒店入住后前往", visitMinutes: 120, note: "抵达日只安排晚餐和轻松散步，不把正式景点塞得太满。" },
    ],
  },
  {
    day: 2,
    date: "9月22日 · 周二",
    title: "Pier 39 → Lombard Street",
    hotelId: "hotel-caza",
    points: [
      { id: "d2-pier39", day: 2, order: 1, cn: "39 号码头海狮区", name: "Pier 39 Sea Lion Viewing Area", coordinates: [-122.4098, 37.8108], travelMode: "步行", travelMinutes: 12, travelLabel: "从酒店出发", visitMinutes: 60, note: "这一段全程步行更轻松，不需要租自行车。" },
      { id: "d2-wharf", day: 2, order: 2, cn: "渔人码头", name: "Fisherman’s Wharf", coordinates: [-122.4177, 37.808], travelMode: "步行", travelMinutes: 8, visitMinutes: 110, note: "午餐可就近安排在码头区，避免来回折返。" },
      { id: "d2-lombard", day: 2, order: 3, cn: "九曲花街", name: "Lombard Street", coordinates: [-122.4186, 37.8021], travelMode: "步行", travelMinutes: 15, visitMinutes: 45, note: "从码头方向上坡；穿支撑性好的鞋，体力不足时可改乘短程网约车。" },
    ],
  },
  {
    day: 3,
    date: "9月23日 · 周三",
    title: "Alcatraz Island",
    hotelId: "hotel-caza",
    points: [
      { id: "d3-pier33", day: 3, order: 1, cn: "恶魔岛登船码头", name: "Pier 33 Alcatraz Landing", coordinates: [-122.4048, 37.8066], travelMode: "步行", travelMinutes: 18, travelLabel: "从酒店出发", visitMinutes: 30, note: "官方轮渡从 Pier 33 出发；应在票面时间至少 30 分钟前到达。" },
      { id: "d3-alcatraz", day: 3, order: 2, cn: "恶魔岛", name: "Alcatraz Island", coordinates: [-122.423, 37.8267], travelMode: "轮渡", travelMinutes: 15, visitMinutes: 180, note: "岛上坡度较大，往返轮渡约各 15 分钟；总行程建议预留 3–3.5 小时。" },
    ],
  },
  {
    day: 4,
    date: "9月24日 · 周四",
    title: "Napa Valley → Sacramento",
    hotelId: "holiday-inn-sacramento",
    points: [
      { id: "d4-domaine", day: 4, order: 1, cn: "纳帕酒庄品鉴", name: "Domaine Carneros", coordinates: [-122.3568, 38.255], travelMode: "驾车", travelMinutes: 88, travelLabel: "旧金山取车后出发", visitMinutes: 90, note: "作为 Napa Valley wine cellar 的推荐落点；品鉴通常需要提前预约，驾驶者请勿饮酒。" },
      { id: "d4-oxbow", day: 4, order: 2, cn: "纳帕午餐", name: "Oxbow Public Market", coordinates: [-122.2818, 38.302], travelMode: "驾车", travelMinutes: 18, visitMinutes: 75, note: "顺路解决午餐和咖啡，再向 Sacramento 出发。" },
      { id: "d4-capitol", day: 4, order: 3, cn: "加州州议会大厦公园", name: "California State Capitol Park", coordinates: [-121.4934, 38.5766], travelMode: "驾车", travelMinutes: 69, travelLabel: "Napa → Sacramento", visitMinutes: 45, note: "参观后再驾车约 5–10 分钟到 300 J Street 办理入住；若到达较晚，可直接去酒店。" },
    ],
  },
  {
    day: 5,
    date: "9月25日 · 周五",
    title: "Sacramento → Lake Tahoe",
    hotelId: "alder-inn",
    points: [
      { id: "d5-old-sac", day: 5, order: 1, cn: "老萨克拉门托滨水区", name: "Old Sacramento Waterfront", coordinates: [-121.5053, 38.5845], travelMode: "步行", travelMinutes: 5, travelLabel: "从酒店出发", visitMinutes: 90, note: "酒店距离 Old Sacramento 约 200 米，不必开车；退房后可先把行李留在车内或寄存前台。" },
      { id: "d5-joes", day: 5, order: 2, cn: "Joe’s Crab Shack 午餐", name: "Joe’s Crab Shack · Old Sacramento", coordinates: [-121.5064, 38.5832], travelMode: "步行", travelMinutes: 5, visitMinutes: 75 },
      { id: "d5-tahoe", day: 5, order: 3, cn: "南太浩湖与酒店入住", name: "The Alder Inn / Hotel Check-in", coordinates: [-119.9562, 38.9464], travelMode: "驾车", travelMinutes: 120, travelLabel: "Sacramento → Lake Tahoe", visitMinutes: 90, note: "山路天气变化快；抵达后只安排入住和湖边短散步。" },
    ],
  },
  {
    day: 6,
    date: "9月26日 · 周六",
    title: "Emerald Bay → South Lake Tahoe",
    hotelId: "alder-inn",
    points: [
      { id: "d6-gather", day: 6, order: 1, cn: "Gather 早餐", name: "Gather Botanical Café", coordinates: [-119.9838, 38.9481], travelMode: "驾车 / 步行", travelMinutes: 8, travelLabel: "从酒店出发", visitMinutes: 60 },
      { id: "d6-emerald", day: 6, order: 2, cn: "翡翠湾", name: "Emerald Bay State Park", coordinates: [-120.1015, 38.954], travelMode: "驾车", travelMinutes: 35, visitMinutes: 90, note: "上午先到热门停车点；这条 West Shore 路线以驾车最合适，不必租自行车。" },
      { id: "d6-tallac", day: 6, order: 3, cn: "塔拉克历史遗址", name: "Tallac Historic Site", coordinates: [-120.0008, 38.9374], travelMode: "驾车", travelMinutes: 20, visitMinutes: 75, note: "季节性开放，周六通常 10:00–16:30；出发前复核当日项目。" },
      { id: "d6-pope", day: 6, order: 4, cn: "Pope Beach", name: "Pope Beach", coordinates: [-120.0396, 38.9311], travelMode: "驾车", travelMinutes: 8, visitMinutes: 90 },
      { id: "d6-regan", day: 6, order: 5, cn: "Regan 纪念城市海滩", name: "Thomas F. Regan Memorial City Beach", coordinates: [-119.9777, 38.9492], travelMode: "驾车", travelMinutes: 18, visitMinutes: 75, note: "最后回到酒店附近，在湖边休息并看傍晚光线。" },
    ],
  },
  {
    day: 7,
    date: "9月27日 · 周日",
    title: "Sand Harbor → Nevada Beach",
    hotelId: "alder-inn",
    points: [
      { id: "d7-sand-harbor", day: 7, order: 1, cn: "Sand Harbor 海滩", name: "Sand Harbor", coordinates: [-119.9401, 39.1987], travelMode: "驾车", travelMinutes: 45, travelLabel: "从酒店出发", visitMinutes: 240, note: "9 月 30 日前 08:00–10:30 车辆入园需要预约；提前买好午餐并在 08:00 左右抵达。" },
      { id: "d7-nevada", day: 7, order: 2, cn: "Nevada Beach", name: "Nevada Beach", coordinates: [-119.9481, 38.9656], travelMode: "驾车", travelMinutes: 40, visitMinutes: 180, note: "回程顺路停留，下午以野餐、散步和休息为主。" },
    ],
  },
  {
    day: 8,
    date: "9月28日 · 周一",
    title: "Lake Tahoe → Yosemite",
    hotelId: "yosemite-view-lodge",
    points: [
      { id: "d8-tioga", day: 8, order: 1, cn: "蒂奥加山口入口", name: "Tioga Pass Entrance", coordinates: [-119.2177, 37.9109], travelMode: "驾车", travelMinutes: 180, travelLabel: "South Lake Tahoe 出发", visitMinutes: 20, note: "表格中的 2小时40分大致只够到东侧山口；继续进入 Yosemite Valley 还需要约两小时。" },
      { id: "d8-olmsted", day: 8, order: 2, cn: "奥姆斯特德观景点", name: "Olmsted Point", coordinates: [-119.4896, 37.8107], travelMode: "驾车", travelMinutes: 45, visitMinutes: 30, note: "Tioga Road 路边短停；高海拔天气不佳时直接跳过。" },
      { id: "d8-lodge", day: 8, order: 3, cn: "优胜美地景观旅馆", name: "Yosemite View Lodge", coordinates: [-119.7649, 37.6782], travelMode: "驾车", travelMinutes: 135, travelLabel: "经 Yosemite Valley 前往 El Portal", visitMinutes: 60, note: "Lake Tahoe 到 Yosemite View Lodge 经 Tioga Road 全程按约 5.5–6 小时净驾驶规划，并在出发前确认 Tioga Road 状态。" },
    ],
  },
  {
    day: 9,
    date: "9月29日 · 周二",
    title: "Yosemite Valley Highlights",
    hotelId: "yosemite-view-lodge",
    points: [
      { id: "d9-tunnel", day: 9, order: 1, cn: "隧道观景台", name: "Tunnel View", coordinates: [-119.6778, 37.7158], travelMode: "驾车", travelMinutes: 30, travelLabel: "从 Yosemite View Lodge 出发", visitMinutes: 30 },
      { id: "d9-bridalveil", day: 9, order: 2, cn: "新娘面纱瀑布", name: "Bridalveil Fall", coordinates: [-119.6505, 37.7159], travelMode: "驾车", travelMinutes: 10, visitMinutes: 60 },
      { id: "d9-valley-view", day: 9, order: 3, cn: "山谷景观台", name: "Valley View", coordinates: [-119.6607, 37.7174], travelMode: "驾车", travelMinutes: 10, visitMinutes: 25 },
      { id: "d9-el-capitan", day: 9, order: 4, cn: "酋长岩草甸", name: "El Capitan Meadow", coordinates: [-119.6378, 37.7247], travelMode: "驾车", travelMinutes: 5, visitMinutes: 35 },
      { id: "d9-cooks", day: 9, order: 5, cn: "库克草甸环线", name: "Cook’s Meadow Loop", coordinates: [-119.5911, 37.7447], travelMode: "接驳车 / 驾车", travelMinutes: 15, visitMinutes: 75 },
      { id: "d9-lower-fall", day: 9, order: 6, cn: "下优胜美地瀑布", name: "Lower Yosemite Fall", coordinates: [-119.5965, 37.749], travelMode: "步行", travelMinutes: 10, visitMinutes: 60, note: "9 月底瀑布水量通常很低；若接近断流，可改为 Sentinel Bridge 与草甸散步。" },
    ],
  },
  {
    day: 10,
    date: "9月30日 · 周三",
    title: "Glacier Point & High Country Views",
    hotelId: "yosemite-view-lodge",
    points: [
      { id: "d10-washburn", day: 10, order: 1, cn: "沃什伯恩观景台", name: "Washburn Point", coordinates: [-119.5729, 37.7206], travelMode: "驾车", travelMinutes: 80, travelLabel: "从 Yosemite View Lodge 出发", visitMinutes: 25, note: "Glacier Point 前的顺路短停，可先看 Half Dome 与瀑布群的全景。" },
      { id: "d10-glacier", day: 10, order: 2, cn: "冰川点", name: "Glacier Point", coordinates: [-119.5733, 37.73], travelMode: "驾车", travelMinutes: 10, visitMinutes: 60, note: "核心观景点；9 月底早晚温差大，带好保暖层。" },
      { id: "d10-sentinel", day: 10, order: 3, cn: "哨兵穹顶", name: "Sentinel Dome", coordinates: [-119.5866, 37.7124], travelMode: "驾车 / 徒步", travelMinutes: 15, visitMinutes: 120, note: "往返约 2 英里、通常 1–2 小时；把它作为当天的主徒步。" },
      { id: "d10-taft", day: 10, order: 4, cn: "塔夫脱点", name: "Taft Point", coordinates: [-119.6046, 37.7129], travelMode: "徒步", travelMinutes: 45, visitMinutes: 75, note: "体力与天气允许时再走；若已疲劳，可跳过并提前返回酒店。" },
    ],
  },
  {
    day: 11,
    date: "10月1日 · 周四",
    title: "Yosemite → San Jose",
    hotelId: "hyatt-san-jose",
    points: [
      { id: "d11-san-jose", day: 11, order: 1, cn: "圣何塞市中心与酒店入住", name: "Downtown San Jose / Hotel Check-in", coordinates: [-121.8905, 37.3292], travelMode: "驾车", travelMinutes: 240, travelLabel: "Yosemite View Lodge 出发", visitMinutes: 60, note: "按约 4 小时净驾驶并另加一次休息；15:00 后办理入住。" },
      { id: "d11-rose", day: 11, order: 2, cn: "市立玫瑰园", name: "Municipal Rose Garden", coordinates: [-121.9287, 37.3315], travelMode: "驾车", travelMinutes: 15, visitMinutes: 60 },
      { id: "d11-santana", day: 11, order: 3, cn: "Santana Row 晚餐与散步", name: "Santana Row", coordinates: [-121.9476, 37.3208], travelMode: "驾车", travelMinutes: 8, visitMinutes: 105, note: "长途驾驶后只保留轻松散步和晚餐；疲劳时可直接取消。" },
    ],
  },
  {
    day: 12,
    date: "10月2日 · 周五",
    title: "Great Mall → Winchester Mystery House",
    hotelId: "hyatt-san-jose",
    points: [
      { id: "d12-great-mall", day: 12, order: 1, cn: "Milpitas 大型奥特莱斯", name: "Great Mall", coordinates: [-121.8968, 37.4142], travelMode: "驾车", travelMinutes: 20, travelLabel: "从 San Jose 酒店出发", visitMinutes: 210, note: "购物时间压缩到约 3.5 小时，为下午的 Winchester Mystery House 留出预约时段。" },
      { id: "d12-winchester", day: 12, order: 2, cn: "温彻斯特神秘屋", name: "Winchester Mystery House", coordinates: [-121.9506, 37.3184], travelMode: "驾车", travelMinutes: 30, visitMinutes: 120, note: "建议预约 14:30 左右的参观场次，并为停车与入场留缓冲。" },
      { id: "d12-san-pedro", day: 12, order: 3, cn: "San Pedro Square 晚餐", name: "San Pedro Square Market", coordinates: [-121.8947, 37.3366], travelMode: "驾车", travelMinutes: 15, visitMinutes: 120 },
    ],
  },
  {
    day: 13,
    date: "10月3日 · 周六",
    title: "Lemos Farm",
    hotelId: "hyatt-san-jose",
    points: [
      { id: "d13-lemos", day: 13, order: 1, cn: "Lemos 农场", name: "Lemos Farm", coordinates: [-122.4261, 37.4695], travelMode: "驾车", travelMinutes: 50, travelLabel: "San Jose → Half Moon Bay", visitMinutes: 150, note: "农场周六通常 10:00–17:00，秋季票务可能分时段；建议提前购票。" },
    ],
  },
  {
    day: 14,
    date: "10月4日 · 周日",
    title: "San Jose → SFO → 北京",
    hotelId: "hyatt-san-jose",
    points: [
      { id: "d14-sfo", day: 14, order: 1, cn: "旧金山国际机场", name: "San Francisco International Airport", coordinates: [-122.379, 37.6213], travelMode: "驾车", travelMinutes: 60, travelLabel: "从 San Jose 酒店出发", visitMinutes: 180, note: "UA888 10:35 起飞；建议 06:30 左右离店，预留周日路况、还车和国际航班值机时间。" },
    ],
  },
];

export const allRoutePoints = optimizedDays.flatMap((day) => day.points);

export const routePointTimes: Record<string, string> = {
  "d1-sfo": "14:05–16:05",
  "d1-wharf-night": "18:00–20:00",
  "d2-pier39": "09:00–10:00",
  "d2-wharf": "10:10–12:00",
  "d2-lombard": "13:15–14:00",
  "d3-pier33": "08:30–09:00",
  "d3-alcatraz": "09:10–12:30",
  "d4-domaine": "10:00–11:30",
  "d4-oxbow": "11:50–13:05",
  "d4-capitol": "14:15–15:00",
  "d5-old-sac": "09:00–10:30",
  "d5-joes": "10:45–12:00",
  "d5-tahoe": "14:00–16:00",
  "d6-gather": "08:00–09:00",
  "d6-emerald": "09:35–11:05",
  "d6-tallac": "11:25–12:40",
  "d6-pope": "13:00–14:30",
  "d6-regan": "14:50–16:05",
  "d7-sand-harbor": "08:00–12:00",
  "d7-nevada": "12:40–15:40",
  "d8-tioga": "11:00–11:20",
  "d8-olmsted": "12:05–12:35",
  "d8-lodge": "14:50–15:50",
  "d9-tunnel": "08:00–08:30",
  "d9-bridalveil": "08:40–09:40",
  "d9-valley-view": "09:50–10:15",
  "d9-el-capitan": "10:20–10:55",
  "d9-cooks": "13:00–14:15",
  "d9-lower-fall": "14:25–15:25",
  "d10-washburn": "08:20–08:45",
  "d10-glacier": "08:55–09:55",
  "d10-sentinel": "10:15–12:15",
  "d10-taft": "13:15–15:15",
  "d11-san-jose": "13:00–16:00",
  "d11-rose": "16:15–17:15",
  "d11-santana": "17:30–19:15",
  "d12-great-mall": "10:00–13:30",
  "d12-winchester": "14:15–16:15",
  "d12-san-pedro": "17:00–19:00",
  "d13-lemos": "10:00–12:30",
  "d14-sfo": "07:30–10:35",
};

export function formatMinutes(minutes: number) {
  if (minutes <= 0) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} 分钟`;
  if (!rest) return `${hours} 小时`;
  return `${hours} 小时 ${rest} 分`;
}
