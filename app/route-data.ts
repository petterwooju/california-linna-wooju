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
  { id: "grand-hyatt-incheon", name: "Grand Hyatt Incheon", cn: "仁川君悦酒店", dates: "9/21 — 9/22", nights: 1, address: "208 Yeongjonghaeannam-ro 321beon-gil, Incheon", checkIn: "15:00", checkOut: "11:00", dayFrom: 0, dayTo: 0, website: "https://www.hyatt.com/grand-hyatt/en-US/inche-grand-hyatt-incheon/hotel-info", note: "转机夜住机场附近，第二天按新版时间返回机场办理 KE023 值机。" },
  { id: "hotel-caza", name: "Hotel Caza Fisherman’s Wharf", cn: "Hotel Caza 渔人码头", dates: "9/22 — 9/26", nights: 4, address: "1300 Columbus Ave, San Francisco", checkIn: "16:00", checkOut: "12:00", dayFrom: 1, dayTo: 4, coordinates: [-122.4189, 37.8068], website: "https://www.hotelcaza.com/", note: "新版延长为四晚；覆盖码头步行线与新增的 Golden Gate Park / Mission District 一日。" },
  { id: "yosemite-valley-lodge", name: "Yosemite Valley Lodge", cn: "优胜美地山谷旅馆", dates: "9/26 — 9/28", nights: 2, address: "9006 Yosemite Lodge Dr, Yosemite Valley", checkIn: "16:00", checkOut: "11:00", dayFrom: 5, dayTo: 6, coordinates: [-119.5978, 37.7448], website: "https://www.nps.gov/places/000/yosemite-valley-lodge.htm", note: "整体顺延一天；住在山谷内，减少瀑布、草甸与 Glacier Point 行程中的重复驾驶。" },
  { id: "visalia-marriott", name: "Visalia Marriott at the Convention Center", cn: "维塞利亚会议中心万豪", dates: "9/28 — 9/30", nights: 2, address: "300 S Court St, Visalia", checkIn: "16:00", checkOut: "12:00", dayFrom: 7, dayTo: 8, coordinates: [-119.2927, 36.3295], website: "https://www.marriott.com/en-us/hotels/vismc-visalia-marriott-at-the-convention-center/overview/", note: "连住两晚；D8 游览 Sequoia 后返回，D9 直接前往 Santa Monica。" },
  { id: "shore-hotel", name: "Shore Hotel Santa Monica", cn: "圣莫尼卡 Shore Hotel", dates: "9/30 — 10/2", nights: 2, address: "1515 Ocean Ave, Santa Monica", checkIn: "16:00", checkOut: "11:00", dayFrom: 9, dayTo: 10, coordinates: [-118.4956, 34.0114], website: "https://www.shorehotel.com/", note: "新版延长为两晚；覆盖 Santa Monica、Camarillo 与 Malibu 海岸环线。" },
  { id: "line-la", name: "The LINE LA", cn: "洛杉矶 LINE 酒店", dates: "10/2 — 10/5", nights: 3, address: "3515 Wilshire Blvd, Los Angeles", checkIn: "15:00", checkOut: "12:00", dayFrom: 11, dayTo: 14, coordinates: [-118.3014, 34.0618], website: "https://www.thelinehotel.com/los-angeles/faq/", note: "位于 Koreatown；还车后转为网约车动线，覆盖 Griffith、LACMA、攀岩与韩餐。" },
];

export const optimizedDays: OptimizedDay[] = [
  {
    day: 1,
    date: "9月22日 · 周二",
    title: "抵达旧金山",
    hotelId: "hotel-caza",
    points: [
      { id: "d1-sfo", day: 1, order: 1, cn: "旧金山国际机场", name: "San Francisco International Airport", coordinates: [-122.379, 37.6213], travelMode: "抵达 / 接送", travelMinutes: 60, travelLabel: "入境后前往酒店", visitMinutes: 120, note: "11:00–14:00 预留入境、取行李和接送；酒店通常可在正式入住前寄存行李。" },
    ],
  },
  {
    day: 2,
    date: "9月23日 · 周三",
    title: "金门与海岸",
    hotelId: "hotel-caza",
    points: [
      { id: "d2-golden-gate", day: 2, order: 1, cn: "金门大桥南观景点", name: "Golden Gate Bridge South Vista", coordinates: [-122.4783, 37.8199], travelMode: "驾车 / 网约车", travelMinutes: 20, travelLabel: "从酒店出发", visitMinutes: 75 },
      { id: "d2-palace", day: 2, order: 2, cn: "艺术宫与 Crissy Field", name: "Palace of Fine Arts / Crissy Field", coordinates: [-122.4484, 37.8024], travelMode: "驾车 / 网约车", travelMinutes: 12, visitMinutes: 60 },
      { id: "d2-baker", day: 2, order: 3, cn: "贝克海滩", name: "Baker Beach", coordinates: [-122.4836, 37.7936], travelMode: "驾车 / 网约车", travelMinutes: 15, visitMinutes: 60, note: "10:45–15:00 的大块时间还包含午餐和回酒店休息，景点本身建议约一小时。" },
    ],
  },
  {
    day: 3,
    date: "9月24日 · 周四",
    title: "恶魔岛与码头步行线",
    hotelId: "hotel-caza",
    points: [
      { id: "d3-alcatraz", day: 3, order: 1, cn: "恶魔岛", name: "Alcatraz Island", coordinates: [-122.423, 37.8267], travelMode: "轮渡 / 步行", travelMinutes: 15, travelLabel: "前往 33 号码头", visitMinutes: 180, note: "按新版表格预约约 09:10 的官方轮渡，提前约 30 分钟抵达 Pier 33。" },
      { id: "d3-pier39", day: 3, order: 2, cn: "39 号码头", name: "Pier 39", coordinates: [-122.4098, 37.8087], travelMode: "步行", travelMinutes: 10, visitMinutes: 75 },
      { id: "d3-ghirardelli", day: 3, order: 3, cn: "吉拉德利广场", name: "Ghirardelli Square", coordinates: [-122.422, 37.8057], travelMode: "步行", travelMinutes: 18, visitMinutes: 45 },
      { id: "d3-wharf", day: 3, order: 4, cn: "渔人码头", name: "Fisherman’s Wharf", coordinates: [-122.4177, 37.808], travelMode: "步行", travelMinutes: 8, visitMinutes: 90 },
      { id: "d3-lombard", day: 3, order: 5, cn: "九曲花街", name: "Lombard Street", coordinates: [-122.4186, 37.8021], travelMode: "步行", travelMinutes: 12, visitMinutes: 60, note: "从码头向南上坡，建议穿支撑性好的鞋。" },
    ],
  },
  {
    day: 4,
    date: "9月25日 · 周五",
    title: "Golden Gate Park 与 Mission",
    hotelId: "hotel-caza",
    points: [
      { id: "d4-calacademy", day: 4, order: 1, cn: "加州科学院", name: "California Academy of Sciences", coordinates: [-122.4662, 37.7699], travelMode: "驾车 / Muni", travelMinutes: 30, travelLabel: "从酒店前往 Golden Gate Park", visitMinutes: 210, note: "周五按 09:30 开馆时间排在第一站。" },
      { id: "d4-tea-garden", day: 4, order: 2, cn: "日本茶园", name: "Japanese Tea Garden", coordinates: [-122.4701, 37.7701], travelMode: "步行", travelMinutes: 5, visitMinutes: 60 },
      { id: "d4-painted-ladies", day: 4, order: 3, cn: "彩绘女士与阿拉莫广场", name: "Painted Ladies / Alamo Square", coordinates: [-122.4324, 37.776], travelMode: "驾车 / 网约车", travelMinutes: 15, visitMinutes: 60 },
      { id: "d4-dolores", day: 4, order: 4, cn: "多洛雷斯公园观景点", name: "Mission Dolores Park", coordinates: [-122.4269, 37.7596], travelMode: "驾车 / 网约车", travelMinutes: 15, visitMinutes: 45 },
      { id: "d4-mission", day: 4, order: 5, cn: "Mission District 晚餐", name: "Mission District / Valencia Street", coordinates: [-122.4216, 37.7585], travelMode: "步行", travelMinutes: 8, visitMinutes: 165, note: "以晚餐和轻松散步收尾，避免一天跨区过多。" },
    ],
  },
  {
    day: 5,
    date: "9月26日 · 周六",
    title: "旧金山 → 优胜美地山谷",
    hotelId: "yosemite-valley-lodge",
    points: [
      { id: "d5-cooks", day: 5, order: 1, cn: "库克草甸", name: "Cook’s Meadow Loop", coordinates: [-119.5911, 37.7447], travelMode: "驾车", travelMinutes: 420, travelLabel: "旧金山取车后出发，含午餐与周六缓冲", visitMinutes: 40, note: "Yosemite 2026 不需要车辆预约，但周六入口和山谷可能排队；保持 16:30 左右抵达酒店。" },
      { id: "d5-lower-fall", day: 5, order: 2, cn: "下优胜美地瀑布", name: "Lower Yosemite Fall", coordinates: [-119.5965, 37.749], travelMode: "步行", travelMinutes: 5, visitMinutes: 60, note: "日落约 18:48，保留拍照和返回住宿时间。" },
    ],
  },
  {
    day: 6,
    date: "9月27日 · 周日",
    title: "优胜美地山谷精华",
    hotelId: "yosemite-valley-lodge",
    points: [
      { id: "d6-el-capitan", day: 6, order: 1, cn: "酋长岩草甸", name: "El Capitan Meadow", coordinates: [-119.6378, 37.7247], travelMode: "驾车 / 接驳车", travelMinutes: 15, travelLabel: "从山谷住宿出发", visitMinutes: 35 },
      { id: "d6-valley-view", day: 6, order: 2, cn: "山谷景观台", name: "Valley View", coordinates: [-119.6607, 37.7174], travelMode: "驾车", travelMinutes: 8, visitMinutes: 25 },
      { id: "d6-camp4", day: 6, order: 3, cn: "Camp 4 抱石区", name: "Camp 4 Bouldering", coordinates: [-119.6027, 37.7418], travelMode: "接驳车 / 驾车", travelMinutes: 15, visitMinutes: 210, note: "与新版表格一致保留弹性休息；脚部仍不舒服时直接改为休息。" },
      { id: "d6-bridalveil", day: 6, order: 4, cn: "新娘面纱瀑布", name: "Bridalveil Fall", coordinates: [-119.6505, 37.7159], travelMode: "驾车", travelMinutes: 15, visitMinutes: 45 },
      { id: "d6-tunnel-view", day: 6, order: 5, cn: "隧道观景台", name: "Tunnel View", coordinates: [-119.6778, 37.7158], travelMode: "驾车", travelMinutes: 8, visitMinutes: 45 },
    ],
  },
  {
    day: 7,
    date: "9月28日 · 周一",
    title: "Glacier Point → 维塞利亚",
    hotelId: "visalia-marriott",
    points: [
      { id: "d7-glacier", day: 7, order: 1, cn: "冰川点", name: "Glacier Point", coordinates: [-119.5741, 37.728], travelMode: "驾车", travelMinutes: 60, travelLabel: "从山谷住宿出发", visitMinutes: 90, note: "往返山谷各约一小时；出发前确认 Glacier Point Road 路况。" },
      { id: "d7-visalia", day: 7, order: 2, cn: "维塞利亚市中心", name: "Downtown Visalia", coordinates: [-119.2921, 36.3302], travelMode: "驾车", travelMinutes: 285, travelLabel: "含午餐与加油", visitMinutes: 120 },
    ],
  },
  {
    day: 8,
    date: "9月29日 · 周二",
    title: "红杉国家公园",
    hotelId: "visalia-marriott",
    points: [
      { id: "d8-sherman", day: 8, order: 1, cn: "谢尔曼将军树", name: "General Sherman Tree", coordinates: [-118.7511, 36.5819], travelMode: "驾车", travelMinutes: 120, travelLabel: "从维塞利亚出发，含山路缓冲", visitMinutes: 90, note: "山路弯多；主步道铺装良好，但从树返回停车区为上坡。" },
      { id: "d8-congress", day: 8, order: 2, cn: "国会步道与巨木森林", name: "Congress Trail / Giant Forest", coordinates: [-118.7481, 36.5766], travelMode: "步行", travelMinutes: 5, visitMinutes: 120 },
      { id: "d8-museum", day: 8, order: 3, cn: "巨木森林博物馆", name: "Giant Forest Museum", coordinates: [-118.7654, 36.5646], travelMode: "驾车 / 接驳车", travelMinutes: 12, visitMinutes: 60, note: "预留沿途观景和返回 Visalia 的时间。" },
    ],
  },
  {
    day: 9,
    date: "9月30日 · 周三",
    title: "维塞利亚 → Santa Monica",
    hotelId: "shore-hotel",
    points: [
      { id: "d9-santa-monica", day: 9, order: 1, cn: "圣莫尼卡码头与海滩", name: "Santa Monica Pier & Beach", coordinates: [-118.4962, 34.0092], travelMode: "驾车", travelMinutes: 270, travelLabel: "从维塞利亚出发，含休息与进城缓冲", visitMinutes: 120, note: "新版已删除 Death Valley；临近洛杉矶时实时路况可能明显增加车程。" },
    ],
  },
  {
    day: 10,
    date: "10月1日 · 周四",
    title: "Camarillo → Malibu 海岸线",
    hotelId: "shore-hotel",
    points: [
      { id: "d10-camarillo", day: 10, order: 1, cn: "卡马里奥奥特莱斯", name: "Camarillo Premium Outlets", coordinates: [-119.038, 34.2174], travelMode: "驾车", travelMinutes: 90, travelLabel: "从 Santa Monica 出发", visitMinutes: 210 },
      { id: "d10-malibu", day: 10, order: 2, cn: "马里布海岸与沙滩", name: "Malibu Lagoon / Selected Beach Stops", coordinates: [-118.6783, 34.0357], travelMode: "驾车", travelMinutes: 45, visitMinutes: 120, note: "返程只选一至两个海滩停靠点，让全天节奏更舒适。" },
      { id: "d10-santa-monica-sunset", day: 10, order: 3, cn: "圣莫尼卡日落", name: "Santa Monica Sunset / Dinner", coordinates: [-118.4962, 34.0092], travelMode: "驾车", travelMinutes: 45, visitMinutes: 150 },
    ],
  },
  {
    day: 11,
    date: "10月2日 · 周五",
    title: "Venice → 还车 → Koreatown",
    hotelId: "line-la",
    points: [
      { id: "d11-venice", day: 11, order: 1, cn: "威尼斯海滩", name: "Venice Beach", coordinates: [-118.472, 33.985], travelMode: "驾车", travelMinutes: 20, travelLabel: "从 Shore Hotel 出发", visitMinutes: 75 },
      { id: "d11-abbot", day: 11, order: 2, cn: "Abbot Kinney 大道", name: "Abbot Kinney Boulevard", coordinates: [-118.469, 33.9917], travelMode: "驾车 / 步行", travelMinutes: 8, visitMinutes: 90 },
      { id: "d11-lax-return", day: 11, order: 3, cn: "LAX 租车中心", name: "LAX Rental Car Return", coordinates: [-118.4085, 33.9416], travelMode: "驾车", travelMinutes: 45, travelLabel: "含加油与机场周边缓冲", visitMinutes: 105, note: "在周五晚高峰前还车；之后改乘 Uber / Lyft 前往 Koreatown。" },
    ],
  },
  {
    day: 12,
    date: "10月3日 · 周六",
    title: "洛杉矶经典城市线",
    hotelId: "line-la",
    points: [
      { id: "d12-griffith", day: 12, order: 1, cn: "格里菲斯天文台", name: "Griffith Observatory", coordinates: [-118.3004, 34.1184], travelMode: "网约车", travelMinutes: 25, travelLabel: "从住宿出发", visitMinutes: 120, note: "周六 10:00 开放，09:00–12:30 的计划块包含交通和停车缓冲。" },
      { id: "d12-hollywood", day: 12, order: 2, cn: "好莱坞区域", name: "Hollywood Area", coordinates: [-118.3267, 34.1016], travelMode: "网约车", travelMinutes: 20, visitMinutes: 90 },
      { id: "d12-lacma", day: 12, order: 3, cn: "洛杉矶县艺术博物馆", name: "Los Angeles County Museum of Art", coordinates: [-118.3592, 34.0638], travelMode: "网约车", travelMinutes: 20, visitMinutes: 150 },
      { id: "d12-bcd", day: 12, order: 4, cn: "BCD 豆腐坊", name: "BCD Tofu House · Wilshire", coordinates: [-118.2977, 34.0638], travelMode: "网约车", travelMinutes: 15, visitMinutes: 90 },
    ],
  },
  {
    day: 13,
    date: "10月4日 · 周日",
    title: "攀岩与韩餐",
    hotelId: "line-la",
    points: [
      { id: "d13-stronghold", day: 13, order: 1, cn: "Stronghold 攀岩馆", name: "The Stronghold Climbing Gym", coordinates: [-118.2174, 34.0645], travelMode: "网约车", travelMinutes: 25, travelLabel: "从住宿出发", visitMinutes: 240, note: "先确认分店与周日营业时间；只有脚部无痛且状态适合时再攀爬。" },
      { id: "d13-quarters", day: 13, order: 2, cn: "Quarters 韩式烤肉", name: "Quarters Korean BBQ", coordinates: [-118.3005, 34.0636], travelMode: "网约车", travelMinutes: 25, visitMinutes: 150, note: "建议比计划用餐时间稍早到店，以减少等位。" },
    ],
  },
  {
    day: 14,
    date: "10月5日 · 周一",
    title: "洛杉矶离境",
    hotelId: "line-la",
    points: [
      { id: "d14-lax", day: 14, order: 1, cn: "洛杉矶国际机场", name: "Los Angeles International Airport", coordinates: [-118.4085, 33.9416], travelMode: "网约车", travelMinutes: 75, travelLabel: "按工作日路况留足缓冲", visitMinutes: 180, note: "最终航班仍为 TBD；建议酒店出发时间设为起飞前约 4.5 小时，并提前约 3 小时到达 LAX。" },
    ],
  },
];

export const allRoutePoints = optimizedDays.flatMap((day) => day.points);

export const routePointTimes: Record<string, string> = {
  "d1-sfo": "11:00–14:00",
  "d2-golden-gate": "08:00–09:15",
  "d2-palace": "09:30–10:30",
  "d2-baker": "10:45–15:00",
  "d3-alcatraz": "08:40–12:00",
  "d3-pier39": "12:15–13:30",
  "d3-ghirardelli": "13:45–14:30",
  "d3-wharf": "14:30–16:00",
  "d3-lombard": "16:15–17:15",
  "d4-calacademy": "09:30–13:00",
  "d4-tea-garden": "13:00–14:30",
  "d4-painted-ladies": "15:00–16:00",
  "d4-dolores": "16:30–17:15",
  "d4-mission": "17:15–20:00",
  "d5-cooks": "17:05–17:45",
  "d5-lower-fall": "17:50–18:50",
  "d6-el-capitan": "08:00–08:35",
  "d6-valley-view": "08:50–09:15",
  "d6-camp4": "09:30–13:00",
  "d6-bridalveil": "14:30–15:15",
  "d6-tunnel-view": "15:30–16:30",
  "d7-glacier": "07:15–10:45",
  "d7-visalia": "10:45–19:30",
  "d8-sherman": "08:30–10:00",
  "d8-congress": "10:15–13:00",
  "d8-museum": "13:00–16:30",
  "d9-santa-monica": "14:00–20:00",
  "d10-camarillo": "10:00–13:30",
  "d10-malibu": "13:30–17:00",
  "d10-santa-monica-sunset": "17:00–20:30",
  "d11-venice": "08:30–09:45",
  "d11-abbot": "10:00–11:30",
  "d11-lax-return": "13:00–15:30",
  "d12-griffith": "09:00–12:30",
  "d12-hollywood": "13:00–14:30",
  "d12-lacma": "15:00–17:30",
  "d12-bcd": "18:30–20:00",
  "d13-stronghold": "10:00–14:00",
  "d13-quarters": "17:30–20:00",
  "d14-lax": "TBD · 提前约 3 小时到达",
};

export function formatMinutes(minutes: number) {
  if (minutes <= 0) return "—";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} 分钟`;
  if (!rest) return `${hours} 小时`;
  return `${hours} 小时 ${rest} 分`;
}
