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
  optional?: boolean;
  status?: RoutePointStatus;
};

export type OptimizedDay = {
  day: number;
  date: string;
  title: string;
  hotelId: string;
  points: RoutePoint[];
  returnTravelMinutes?: number;
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
  { id: "comfort-inn-bay", name: "Comfort Inn by the Bay", cn: "Comfort Inn by the Bay", dates: "9/21 — 9/24", nights: 3, address: "2775 Van Ness Ave, San Francisco", checkIn: "16:00", checkOut: "12:00", dayFrom: 1, dayTo: 3, coordinates: [-122.4244, 37.8014], website: "https://www.choicehotels.com/california/san-francisco/comfort-inn-hotels/ca004", note: "最终表格指定酒店；含早餐（表格记录 06:30–09:30）。步行可到 Fisherman’s Wharf 与 Lombard Street，前三天无需租车。" },
  { id: "yosemite-way-station", name: "Best Western Plus Yosemite Way Station Motel", cn: "Best Western Plus Yosemite Way Station Motel", dates: "9/24 — 9/27", nights: 3, address: "4999 Highway 140, Mariposa", checkIn: "16:00", checkOut: "11:00", dayFrom: 4, dayTo: 6, coordinates: [-119.9686, 37.4863], website: "https://www.bestwestern.com/en_US/book/hotels-in-mariposa/best-western-plus-yosemite-way-station-motel/propertyCode.05440.html", note: "Counter Clockwise 最终表格指定酒店；含早餐，作为两天 Yosemite 行程的 Mariposa 基地。去 Tunnel View 建议预留约 65 分钟。" },
  { id: "alder-inn", name: "The Alder Inn", cn: "The Alder Inn", dates: "9/27 — 9/30", nights: 3, address: "1072 Ski Run Blvd, South Lake Tahoe", checkIn: "16:00", checkOut: "10:00", dayFrom: 7, dayTo: 9, coordinates: [-119.9562, 38.9464], website: "https://www.thealderinn.com/", note: "已选酒店；免费停车，适合作为 Emerald Bay、South Lake Tahoe 与 Nevada 一侧的三晚基地。" },
  { id: "palm-court-davis", name: "Best Western Plus Palm Court Hotel", cn: "Best Western Plus Palm Court Hotel", dates: "9/30 — 10/1", nights: 1, address: "234 D Street, Davis", checkIn: "15:00", checkOut: "11:00", dayFrom: 10, dayTo: 10, coordinates: [-121.7406, 38.5448], website: "https://www.bestwestern.com/en_US/book/hotels-in-davis/best-western-plus-palm-court-hotel/propertyCode.05536.html", note: "最终表格指定酒店；实际位于 Downtown Davis，靠近 UC Davis。早餐需额外付费，不是免费早餐。" },
  { id: "best-western-silicon-valley", name: "Best Western Silicon Valley Inn", cn: "Best Western Silicon Valley Inn", dates: "10/1 — 10/4", nights: 3, address: "600 N Mathilda Ave, Sunnyvale", checkIn: "15:00", checkOut: "11:00", dayFrom: 11, dayTo: 14, coordinates: [-122.0295, 37.392], website: "https://www.trip.com/hotels/sunnyvale-hotel-detail-2193813/best-western-silicon-valley-inn/", note: "沿用最终文件中的 Sunnyvale 酒店链接；从这里到 Great Mall 约 20 分钟，去 Half Moon Bay 与 SFO 也较顺路。" },
];

export const optimizedDays: OptimizedDay[] = [
  {
    day: 1,
    date: "9月21日 · 周一",
    title: "Beijing → San Francisco",
    hotelId: "comfort-inn-bay",
    points: [
      { id: "d1-sfo", day: 1, order: 1, cn: "旧金山国际机场", name: "San Francisco International Airport", coordinates: [-122.379, 37.6213], travelMode: "航班抵达", travelMinutes: 0, travelLabel: "UA889 · 14:05 抵达", visitMinutes: 120, note: "预留约两小时完成入境、取行李和进城；航班时刻以出票信息为准。" },
      { id: "d1-wharf-night", day: 1, order: 2, cn: "渔人码头夜景", name: "Fisherman’s Wharf at Night", coordinates: [-122.4177, 37.808], travelMode: "网约车 / 步行", travelMinutes: 45, travelLabel: "经酒店入住后前往", visitMinutes: 120, note: "抵达日只安排晚餐和轻松散步。" },
    ],
  },
  {
    day: 2,
    date: "9月22日 · 周二",
    title: "Pier 39 → Lombard Street",
    hotelId: "comfort-inn-bay",
    returnTravelMinutes: 12,
    points: [
      { id: "d2-pier39", day: 2, order: 1, cn: "39 号码头海狮区", name: "Pier 39 Sea Lion Viewing Area", coordinates: [-122.4098, 37.8108], travelMode: "步行", travelMinutes: 18, travelLabel: "从酒店出发", visitMinutes: 60 },
      { id: "d2-wharf", day: 2, order: 2, cn: "渔人码头", name: "Fisherman’s Wharf", coordinates: [-122.4177, 37.808], travelMode: "步行", travelMinutes: 8, visitMinutes: 110, note: "午餐可就近安排在码头区。" },
      { id: "d2-lombard", day: 2, order: 3, cn: "九曲花街", name: "Lombard Street", coordinates: [-122.4186, 37.8021], travelMode: "步行", travelMinutes: 15, visitMinutes: 45, note: "从码头方向上坡；体力不足时可乘短程网约车。" },
    ],
  },
  {
    day: 3,
    date: "9月23日 · 周三",
    title: "Alcatraz Island",
    hotelId: "comfort-inn-bay",
    returnTravelMinutes: 40,
    points: [
      { id: "d3-pier33", day: 3, order: 1, cn: "恶魔岛登船码头", name: "Pier 33 Alcatraz Landing", coordinates: [-122.4048, 37.8066], travelMode: "步行", travelMinutes: 25, travelLabel: "从酒店出发", visitMinutes: 30, note: "应在票面时间至少 30 分钟前到达。" },
      { id: "d3-alcatraz", day: 3, order: 2, cn: "恶魔岛", name: "Alcatraz Island", coordinates: [-122.423, 37.8267], travelMode: "轮渡", travelMinutes: 15, visitMinutes: 180, note: "带水和简餐；岛上坡度较大，总行程建议预留 3–3.5 小时。" },
    ],
  },
  {
    day: 4,
    date: "9月24日 · 周四",
    title: "San Francisco → Mariposa / Yosemite",
    hotelId: "yosemite-way-station",
    points: [
      { id: "d4-sfo-rental", day: 4, order: 1, cn: "SFO 租车中心", name: "SFO Rental Car Center", coordinates: [-122.4017, 37.6287], travelMode: "网约车", travelMinutes: 24, travelLabel: "从酒店出发", visitMinutes: 45, note: "取车后检查证件、轮胎与油量，并下载离线地图。" },
      { id: "d4-trader-joes", day: 4, order: 2, cn: "Trader Joe’s 途中补给", name: "Trader Joe’s · Modesto", coordinates: [-121.0498, 37.6898], travelMode: "驾车", travelMinutes: 105, travelLabel: "SFO → Modesto", visitMinutes: 30, note: "按表格要求补充 Yosemite 两天所需的水、早餐和野餐食物。" },
      { id: "d4-way-station", day: 4, order: 3, cn: "Mariposa 酒店入住", name: "Best Western Plus Yosemite Way Station Motel", coordinates: [-119.9686, 37.4863], travelMode: "驾车", travelMinutes: 105, travelLabel: "Modesto → Mariposa", visitMinutes: 60, note: "取消南侧红杉林绕行；抵达后先在 Downtown Mariposa 午餐和散步，16:00 后入住。" },
    ],
  },
  {
    day: 5,
    date: "9月25日 · 周五",
    title: "Yosemite Valley Highlights",
    hotelId: "yosemite-way-station",
    returnTravelMinutes: 70,
    points: [
      { id: "d5-tunnel", day: 5, order: 1, cn: "隧道观景台", name: "Tunnel View", coordinates: [-119.6778, 37.7158], travelMode: "驾车", travelMinutes: 65, travelLabel: "从 Mariposa 酒店出发", visitMinutes: 30 },
      { id: "d5-bridalveil", day: 5, order: 2, cn: "新娘面纱瀑布", name: "Bridalveil Fall", coordinates: [-119.6505, 37.7159], travelMode: "驾车", travelMinutes: 10, visitMinutes: 45 },
      { id: "d5-el-capitan", day: 5, order: 3, cn: "酋长岩草甸", name: "El Capitan Meadow", coordinates: [-119.6378, 37.7247], travelMode: "驾车", travelMinutes: 10, visitMinutes: 35 },
      { id: "d5-sentinel", day: 5, order: 4, cn: "哨兵桥", name: "Sentinel Bridge", coordinates: [-119.5899, 37.7373], travelMode: "停车后步行 / 接驳车", travelMinutes: 25, visitMinutes: 30, note: "进入东谷后停车一次，后续景点全部步行或乘免费接驳车。" },
      { id: "d5-lower-fall", day: 5, order: 5, cn: "下优胜美地瀑布", name: "Lower Yosemite Fall", coordinates: [-119.5965, 37.749], travelMode: "步行 / 接驳车", travelMinutes: 15, visitMinutes: 30, optional: true, note: "备选景点：9 月底通常接近或完全断流；现场无水时直接跳过。" },
      { id: "d5-cooks", day: 5, order: 6, cn: "库克草甸环线", name: "Cook’s Meadow Loop", coordinates: [-119.5911, 37.7447], travelMode: "步行", travelMinutes: 10, visitMinutes: 60, note: "全天自带水和简餐；游览结束后从同一停车区域取车返回 Mariposa。" },
    ],
  },
  {
    day: 6,
    date: "9月26日 · 周六",
    title: "Glacier Point & High Country Views",
    hotelId: "yosemite-way-station",
    returnTravelMinutes: 110,
    points: [
      { id: "d6-washburn", day: 6, order: 1, cn: "沃什伯恩观景台", name: "Washburn Point", coordinates: [-119.5729, 37.7206], travelMode: "驾车", travelMinutes: 110, travelLabel: "从 Mariposa 酒店出发", visitMinutes: 25 },
      { id: "d6-glacier", day: 6, order: 2, cn: "冰川点", name: "Glacier Point", coordinates: [-119.5733, 37.73], travelMode: "驾车", travelMinutes: 10, visitMinutes: 60 },
      { id: "d6-sentinel", day: 6, order: 3, cn: "哨兵穹顶", name: "Sentinel Dome", coordinates: [-119.5866, 37.7124], travelMode: "驾车 / 徒步", travelMinutes: 15, visitMinutes: 120, note: "往返约 2 英里，作为当天主徒步。" },
      { id: "d6-taft", day: 6, order: 4, cn: "塔夫脱点", name: "Taft Point", coordinates: [-119.6046, 37.7129], travelMode: "同一登山口 / 徒步", travelMinutes: 0, travelLabel: "与 Sentinel Dome 二选一", visitMinutes: 120, optional: true, note: "备选路线：与 Sentinel Dome 共用登山口，默认不叠加游览；根据体力、风力和能见度二选一。" },
    ],
  },
  {
    day: 7,
    date: "9月27日 · 周日",
    title: "Yosemite → Lake Tahoe",
    hotelId: "alder-inn",
    points: [
      { id: "d7-alder", day: 7, order: 1, cn: "南太浩湖酒店", name: "The Alder Inn / Hotel Check-in", coordinates: [-119.9562, 38.9464], travelMode: "驾车", travelMinutes: 300, travelLabel: "Mariposa → South Lake Tahoe（含休息缓冲）", visitMinutes: 60, note: "按约 5 小时门到门安排，并另外保留半小时弹性；16:00 后入住。" },
      { id: "d7-regan", day: 7, order: 2, cn: "Regan 纪念城市海滩", name: "Thomas F. Regan Memorial City Beach", coordinates: [-119.9777, 38.9492], travelMode: "驾车", travelMinutes: 6, visitMinutes: 60, optional: true, note: "备选景点：仅在抵达较早且驾驶者状态良好时散步，否则直接休息。" },
    ],
  },
  {
    day: 8,
    date: "9月28日 · 周一",
    title: "Emerald Bay & West Shore",
    hotelId: "alder-inn",
    returnTravelMinutes: 15,
    points: [
      { id: "d8-gather", day: 8, order: 1, cn: "Gather 早餐", name: "Gather Botanical Café", coordinates: [-119.9838, 38.9481], travelMode: "驾车 / 步行", travelMinutes: 8, travelLabel: "从酒店出发", visitMinutes: 45, note: "前一晚确认营业时间；若 07:15 尚未营业，改用提前购买的早餐。" },
      { id: "d8-emerald", day: 8, order: 2, cn: "翡翠湾", name: "Emerald Bay State Park", coordinates: [-120.1015, 38.954], travelMode: "驾车", travelMinutes: 35, visitMinutes: 90, note: "目标 08:30 前抵达热门停车点；提前买好在湖边吃的食物。" },
      { id: "d8-tallac", day: 8, order: 3, cn: "塔拉克历史遗址", name: "Tallac Historic Site", coordinates: [-120.0008, 38.9374], travelMode: "驾车", travelMinutes: 20, visitMinutes: 75 },
      { id: "d8-pope", day: 8, order: 4, cn: "Pope Beach", name: "Pope Beach", coordinates: [-120.0396, 38.9311], travelMode: "驾车", travelMinutes: 8, visitMinutes: 90 },
    ],
  },
  {
    day: 9,
    date: "9月29日 · 周二",
    title: "Sand Harbor → Nevada Beach",
    hotelId: "alder-inn",
    returnTravelMinutes: 10,
    points: [
      { id: "d9-sand-harbor", day: 9, order: 1, cn: "Sand Harbor 海滩", name: "Sand Harbor", coordinates: [-119.9401, 39.1987], travelMode: "驾车", travelMinutes: 45, travelLabel: "从酒店出发", visitMinutes: 240, note: "9 月 30 日前 08:00–10:30 车辆入园需要预约；先买好午餐和水。" },
      { id: "d9-nevada", day: 9, order: 2, cn: "Nevada Beach", name: "Nevada Beach", coordinates: [-119.9481, 38.9656], travelMode: "驾车", travelMinutes: 40, visitMinutes: 180, note: "回程顺路停留，下午以野餐、散步和休息为主。" },
    ],
  },
  {
    day: 10,
    date: "9月30日 · 周三",
    title: "Lake Tahoe → Old Sacramento → Davis",
    hotelId: "palm-court-davis",
    returnTravelMinutes: 8,
    points: [
      { id: "d10-old-sac", day: 10, order: 1, cn: "老萨克拉门托滨水区", name: "Old Sacramento Waterfront", coordinates: [-121.5053, 38.5845], travelMode: "驾车", travelMinutes: 135, travelLabel: "South Lake Tahoe → Sacramento", visitMinutes: 90 },
      { id: "d10-joes", day: 10, order: 2, cn: "Joe’s Crab Shack 午餐", name: "Joe’s Crab Shack · Old Sacramento", coordinates: [-121.5064, 38.5832], travelMode: "步行", travelMinutes: 5, visitMinutes: 75 },
      { id: "d10-beers", day: 10, order: 3, cn: "Beers Books", name: "Beers Books", coordinates: [-121.4934, 38.5702], travelMode: "驾车", travelMinutes: 10, visitMinutes: 40 },
      { id: "d10-palm-court", day: 10, order: 4, cn: "Davis 酒店入住", name: "Best Western Plus Palm Court Hotel", coordinates: [-121.7406, 38.5448], travelMode: "驾车", travelMinutes: 25, travelLabel: "Sacramento → Davis", visitMinutes: 45, note: "酒店实际位于 Davis；15:00 后入住。" },
      { id: "d10-uc-davis", day: 10, order: 5, cn: "加州大学戴维斯分校", name: "UC Davis Arboretum and Public Garden", coordinates: [-121.7496, 38.5303], travelMode: "驾车 / 步行", travelMinutes: 8, visitMinutes: 75, note: "傍晚散步后在 Downtown Davis 用晚餐。" },
    ],
  },
  {
    day: 11,
    date: "10月1日 · 周四",
    title: "Davis → Napa Valley → Sunnyvale",
    hotelId: "best-western-silicon-valley",
    points: [
      { id: "d11-castello", day: 11, order: 1, cn: "纳帕城堡酒庄", name: "Castello di Amorosa", coordinates: [-122.5426, 38.5584], travelMode: "驾车", travelMinutes: 75, travelLabel: "Davis → Calistoga", visitMinutes: 90, note: "按最终表格指定；需要提前预约，驾驶者请勿饮酒。" },
      { id: "d11-oxbow", day: 11, order: 2, cn: "纳帕午餐", name: "Oxbow Public Market", coordinates: [-122.2818, 38.302], travelMode: "驾车", travelMinutes: 40, visitMinutes: 75, note: "顺路午餐和咖啡，再向 Sunnyvale 出发。" },
      { id: "d11-sunnyvale", day: 11, order: 3, cn: "Sunnyvale 酒店入住", name: "Best Western Silicon Valley Inn / Check-in", coordinates: [-122.0295, 37.392], travelMode: "驾车", travelMinutes: 155, travelLabel: "Napa → Sunnyvale（含车流缓冲）", visitMinutes: 60, note: "按 2 小时 35 分规划，拥堵时仍可能更久；长途驾驶后晚上不再安排正式景点。" },
    ],
  },
  {
    day: 12,
    date: "10月2日 · 周五",
    title: "Great Mall",
    hotelId: "best-western-silicon-valley",
    returnTravelMinutes: 20,
    points: [
      { id: "d12-great-mall", day: 12, order: 1, cn: "Milpitas 大型奥特莱斯", name: "Great Mall", coordinates: [-121.8968, 37.4142], travelMode: "驾车", travelMinutes: 20, travelLabel: "从 Sunnyvale 酒店出发", visitMinutes: 240, note: "表格估算约 20 分钟；保留半天购物，其余时间自由安排。" },
    ],
  },
  {
    day: 13,
    date: "10月3日 · 周六",
    title: "Half Moon Bay & Pumpkin Farms",
    hotelId: "best-western-silicon-valley",
    returnTravelMinutes: 70,
    points: [
      { id: "d13-lemos", day: 13, order: 1, cn: "Lemos 农场", name: "Lemos Farm", coordinates: [-122.4261, 37.4695], travelMode: "驾车", travelMinutes: 50, travelLabel: "Sunnyvale → Half Moon Bay", visitMinutes: 120, note: "秋季周末建议提前购票。" },
      { id: "d13-pastorino", day: 13, order: 2, cn: "Pastorino 南瓜农场", name: "Pastorino Farms", coordinates: [-122.4208, 37.4709], travelMode: "短程驾车", travelMinutes: 5, visitMinutes: 120, optional: true, note: "备选路线：与 Lemos Farm 二选一，不连续游览两家。" },
      { id: "d13-hmb", day: 13, order: 3, cn: "半月湾州立海滩", name: "Half Moon Bay State Beach", coordinates: [-122.4453, 37.4656], travelMode: "驾车", travelMinutes: 10, visitMinutes: 120, note: "把表格中的 Top of the World 理解为海岸高点观景；天气合适时沿 Coastside Trail 散步。" },
    ],
  },
  {
    day: 14,
    date: "10月4日 · 周日",
    title: "Sunnyvale → SFO → Beijing",
    hotelId: "best-western-silicon-valley",
    points: [
      { id: "d14-sfo", day: 14, order: 1, cn: "旧金山国际机场", name: "San Francisco International Airport", coordinates: [-122.379, 37.6213], travelMode: "驾车 / 还车 / AirTrain", travelMinutes: 75, travelLabel: "Sunnyvale 酒店 → SFO 航站楼", visitMinutes: 200, note: "UA888 10:35 起飞；建议 06:00 离店，为加油、还车、AirTrain 和国际航班值机留缓冲。" },
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
  "d4-sfo-rental": "08:00–08:45",
  "d4-trader-joes": "10:30–11:00",
  "d4-way-station": "16:00–17:00",
  "d5-tunnel": "08:05–08:35",
  "d5-bridalveil": "08:45–09:30",
  "d5-el-capitan": "09:40–10:15",
  "d5-sentinel": "10:45–11:15",
  "d5-lower-fall": "11:30–12:00 · 备选",
  "d5-cooks": "12:15–13:15",
  "d6-washburn": "08:30–08:55",
  "d6-glacier": "09:05–10:05",
  "d6-sentinel": "10:25–12:25",
  "d6-taft": "10:25–12:25 · 二选一",
  "d7-alder": "08:00–13:30",
  "d7-regan": "14:30–15:30 · 备选",
  "d8-gather": "07:15–08:00",
  "d8-emerald": "08:35–10:05",
  "d8-tallac": "10:25–11:40",
  "d8-pope": "11:50–13:20",
  "d9-sand-harbor": "08:00–12:00",
  "d9-nevada": "12:40–15:40",
  "d10-old-sac": "10:15–11:45",
  "d10-joes": "11:50–13:05",
  "d10-beers": "13:20–14:00",
  "d10-palm-court": "14:30–15:15",
  "d10-uc-davis": "16:00–17:15",
  "d11-castello": "10:00–11:30",
  "d11-oxbow": "12:10–13:25",
  "d11-sunnyvale": "16:00–17:00",
  "d12-great-mall": "10:00–14:00",
  "d13-lemos": "10:00–12:00",
  "d13-pastorino": "10:00–12:00 · 二选一",
  "d13-hmb": "12:20–14:20",
  "d14-sfo": "06:00–10:35",
};

export function formatMinutes(minutes: number) {
  if (minutes <= 0) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} 分钟`;
  if (!rest) return `${hours} 小时`;
  return `${hours} 小时 ${rest} 分`;
}
