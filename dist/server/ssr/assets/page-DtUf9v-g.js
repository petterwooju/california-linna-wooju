import { a as require_react, s as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/route-data.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var hotelStays = [
	{
		id: "grand-hyatt-incheon",
		name: "Grand Hyatt Incheon",
		cn: "仁川君悦酒店",
		dates: "9/21 — 9/22",
		nights: 1,
		address: "208 Yeongjonghaeannam-ro 321beon-gil, Incheon",
		checkIn: "15:00",
		checkOut: "11:00",
		dayFrom: 0,
		dayTo: 0,
		website: "https://www.hyatt.com/grand-hyatt/en-US/inche-grand-hyatt-incheon/hotel-info",
		note: "转机夜住机场附近，第二天按新版时间返回机场办理 KE023 值机。"
	},
	{
		id: "hotel-caza",
		name: "Hotel Caza Fisherman’s Wharf",
		cn: "Hotel Caza 渔人码头",
		dates: "9/22 — 9/26",
		nights: 4,
		address: "1300 Columbus Ave, San Francisco",
		checkIn: "16:00",
		checkOut: "12:00",
		dayFrom: 1,
		dayTo: 4,
		coordinates: [-122.4189, 37.8068],
		website: "https://www.hotelcaza.com/",
		note: "新版延长为四晚；覆盖码头步行线与新增的 Golden Gate Park / Mission District 一日。"
	},
	{
		id: "yosemite-valley-lodge",
		name: "Yosemite Valley Lodge",
		cn: "优胜美地山谷旅馆",
		dates: "9/26 — 9/28",
		nights: 2,
		address: "9006 Yosemite Lodge Dr, Yosemite Valley",
		checkIn: "16:00",
		checkOut: "11:00",
		dayFrom: 5,
		dayTo: 6,
		coordinates: [-119.5978, 37.7448],
		website: "https://www.nps.gov/places/000/yosemite-valley-lodge.htm",
		note: "整体顺延一天；住在山谷内，减少瀑布、草甸与 Glacier Point 行程中的重复驾驶。"
	},
	{
		id: "visalia-marriott",
		name: "Visalia Marriott at the Convention Center",
		cn: "维塞利亚会议中心万豪",
		dates: "9/28 — 9/30",
		nights: 2,
		address: "300 S Court St, Visalia",
		checkIn: "16:00",
		checkOut: "12:00",
		dayFrom: 7,
		dayTo: 8,
		coordinates: [-119.2927, 36.3295],
		website: "https://www.marriott.com/en-us/hotels/vismc-visalia-marriott-at-the-convention-center/overview/",
		note: "连住两晚；D8 游览 Sequoia 后返回，D9 直接前往 Santa Monica。"
	},
	{
		id: "shore-hotel",
		name: "Shore Hotel Santa Monica",
		cn: "圣莫尼卡 Shore Hotel",
		dates: "9/30 — 10/2",
		nights: 2,
		address: "1515 Ocean Ave, Santa Monica",
		checkIn: "16:00",
		checkOut: "11:00",
		dayFrom: 9,
		dayTo: 10,
		coordinates: [-118.4956, 34.0114],
		website: "https://www.shorehotel.com/",
		note: "新版延长为两晚；覆盖 Santa Monica、Camarillo 与 Malibu 海岸环线。"
	},
	{
		id: "line-la",
		name: "The LINE LA",
		cn: "洛杉矶 LINE 酒店",
		dates: "10/2 — 10/5",
		nights: 3,
		address: "3515 Wilshire Blvd, Los Angeles",
		checkIn: "15:00",
		checkOut: "12:00",
		dayFrom: 11,
		dayTo: 14,
		coordinates: [-118.3014, 34.0618],
		website: "https://www.thelinehotel.com/los-angeles/faq/",
		note: "位于 Koreatown；还车后转为网约车动线，覆盖 Griffith、LACMA、攀岩与韩餐。"
	}
];
var optimizedDays = [
	{
		day: 1,
		date: "9月22日 · 周二",
		title: "抵达旧金山",
		hotelId: "hotel-caza",
		points: [{
			id: "d1-sfo",
			day: 1,
			order: 1,
			cn: "旧金山国际机场",
			name: "San Francisco International Airport",
			coordinates: [-122.379, 37.6213],
			travelMode: "抵达 / 接送",
			travelMinutes: 60,
			travelLabel: "入境后前往酒店",
			visitMinutes: 120,
			note: "11:00–14:00 预留入境、取行李和接送；酒店通常可在正式入住前寄存行李。"
		}]
	},
	{
		day: 2,
		date: "9月23日 · 周三",
		title: "金门与海岸",
		hotelId: "hotel-caza",
		points: [
			{
				id: "d2-golden-gate",
				day: 2,
				order: 1,
				cn: "金门大桥南观景点",
				name: "Golden Gate Bridge South Vista",
				coordinates: [-122.4783, 37.8199],
				travelMode: "驾车 / 网约车",
				travelMinutes: 20,
				travelLabel: "从酒店出发",
				visitMinutes: 75
			},
			{
				id: "d2-palace",
				day: 2,
				order: 2,
				cn: "艺术宫与 Crissy Field",
				name: "Palace of Fine Arts / Crissy Field",
				coordinates: [-122.4484, 37.8024],
				travelMode: "驾车 / 网约车",
				travelMinutes: 12,
				visitMinutes: 60
			},
			{
				id: "d2-baker",
				day: 2,
				order: 3,
				cn: "贝克海滩",
				name: "Baker Beach",
				coordinates: [-122.4836, 37.7936],
				travelMode: "驾车 / 网约车",
				travelMinutes: 15,
				visitMinutes: 60,
				note: "10:45–15:00 的大块时间还包含午餐和回酒店休息，景点本身建议约一小时。"
			}
		]
	},
	{
		day: 3,
		date: "9月24日 · 周四",
		title: "恶魔岛与码头步行线",
		hotelId: "hotel-caza",
		points: [
			{
				id: "d3-alcatraz",
				day: 3,
				order: 1,
				cn: "恶魔岛",
				name: "Alcatraz Island",
				coordinates: [-122.423, 37.8267],
				travelMode: "轮渡 / 步行",
				travelMinutes: 15,
				travelLabel: "前往 33 号码头",
				visitMinutes: 180,
				note: "按新版表格预约约 09:10 的官方轮渡，提前约 30 分钟抵达 Pier 33。"
			},
			{
				id: "d3-pier39",
				day: 3,
				order: 2,
				cn: "39 号码头",
				name: "Pier 39",
				coordinates: [-122.4098, 37.8087],
				travelMode: "步行",
				travelMinutes: 10,
				visitMinutes: 75
			},
			{
				id: "d3-ghirardelli",
				day: 3,
				order: 3,
				cn: "吉拉德利广场",
				name: "Ghirardelli Square",
				coordinates: [-122.422, 37.8057],
				travelMode: "步行",
				travelMinutes: 18,
				visitMinutes: 45
			},
			{
				id: "d3-wharf",
				day: 3,
				order: 4,
				cn: "渔人码头",
				name: "Fisherman’s Wharf",
				coordinates: [-122.4177, 37.808],
				travelMode: "步行",
				travelMinutes: 8,
				visitMinutes: 90
			},
			{
				id: "d3-lombard",
				day: 3,
				order: 5,
				cn: "九曲花街",
				name: "Lombard Street",
				coordinates: [-122.4186, 37.8021],
				travelMode: "步行",
				travelMinutes: 12,
				visitMinutes: 60,
				note: "从码头向南上坡，建议穿支撑性好的鞋。"
			}
		]
	},
	{
		day: 4,
		date: "9月25日 · 周五",
		title: "Golden Gate Park 与 Mission",
		hotelId: "hotel-caza",
		points: [
			{
				id: "d4-calacademy",
				day: 4,
				order: 1,
				cn: "加州科学院",
				name: "California Academy of Sciences",
				coordinates: [-122.4662, 37.7699],
				travelMode: "驾车 / Muni",
				travelMinutes: 30,
				travelLabel: "从酒店前往 Golden Gate Park",
				visitMinutes: 210,
				note: "周五按 09:30 开馆时间排在第一站。"
			},
			{
				id: "d4-tea-garden",
				day: 4,
				order: 2,
				cn: "日本茶园",
				name: "Japanese Tea Garden",
				coordinates: [-122.4701, 37.7701],
				travelMode: "步行",
				travelMinutes: 5,
				visitMinutes: 60
			},
			{
				id: "d4-painted-ladies",
				day: 4,
				order: 3,
				cn: "彩绘女士与阿拉莫广场",
				name: "Painted Ladies / Alamo Square",
				coordinates: [-122.4324, 37.776],
				travelMode: "驾车 / 网约车",
				travelMinutes: 15,
				visitMinutes: 60
			},
			{
				id: "d4-dolores",
				day: 4,
				order: 4,
				cn: "多洛雷斯公园观景点",
				name: "Mission Dolores Park",
				coordinates: [-122.4269, 37.7596],
				travelMode: "驾车 / 网约车",
				travelMinutes: 15,
				visitMinutes: 45
			},
			{
				id: "d4-mission",
				day: 4,
				order: 5,
				cn: "Mission District 晚餐",
				name: "Mission District / Valencia Street",
				coordinates: [-122.4216, 37.7585],
				travelMode: "步行",
				travelMinutes: 8,
				visitMinutes: 165,
				note: "以晚餐和轻松散步收尾，避免一天跨区过多。"
			}
		]
	},
	{
		day: 5,
		date: "9月26日 · 周六",
		title: "旧金山 → 优胜美地山谷",
		hotelId: "yosemite-valley-lodge",
		points: [{
			id: "d5-cooks",
			day: 5,
			order: 1,
			cn: "库克草甸",
			name: "Cook’s Meadow Loop",
			coordinates: [-119.5911, 37.7447],
			travelMode: "驾车",
			travelMinutes: 420,
			travelLabel: "旧金山取车后出发，含午餐与周六缓冲",
			visitMinutes: 40,
			note: "Yosemite 2026 不需要车辆预约，但周六入口和山谷可能排队；保持 16:30 左右抵达酒店。"
		}, {
			id: "d5-lower-fall",
			day: 5,
			order: 2,
			cn: "下优胜美地瀑布",
			name: "Lower Yosemite Fall",
			coordinates: [-119.5965, 37.749],
			travelMode: "步行",
			travelMinutes: 5,
			visitMinutes: 60,
			note: "日落约 18:48，保留拍照和返回住宿时间。"
		}]
	},
	{
		day: 6,
		date: "9月27日 · 周日",
		title: "优胜美地山谷精华",
		hotelId: "yosemite-valley-lodge",
		points: [
			{
				id: "d6-el-capitan",
				day: 6,
				order: 1,
				cn: "酋长岩草甸",
				name: "El Capitan Meadow",
				coordinates: [-119.6378, 37.7247],
				travelMode: "驾车 / 接驳车",
				travelMinutes: 15,
				travelLabel: "从山谷住宿出发",
				visitMinutes: 35
			},
			{
				id: "d6-valley-view",
				day: 6,
				order: 2,
				cn: "山谷景观台",
				name: "Valley View",
				coordinates: [-119.6607, 37.7174],
				travelMode: "驾车",
				travelMinutes: 8,
				visitMinutes: 25
			},
			{
				id: "d6-camp4",
				day: 6,
				order: 3,
				cn: "Camp 4 抱石区",
				name: "Camp 4 Bouldering",
				coordinates: [-119.6027, 37.7418],
				travelMode: "接驳车 / 驾车",
				travelMinutes: 15,
				visitMinutes: 210,
				note: "与新版表格一致保留弹性休息；脚部仍不舒服时直接改为休息。"
			},
			{
				id: "d6-bridalveil",
				day: 6,
				order: 4,
				cn: "新娘面纱瀑布",
				name: "Bridalveil Fall",
				coordinates: [-119.6505, 37.7159],
				travelMode: "驾车",
				travelMinutes: 15,
				visitMinutes: 45
			},
			{
				id: "d6-tunnel-view",
				day: 6,
				order: 5,
				cn: "隧道观景台",
				name: "Tunnel View",
				coordinates: [-119.6778, 37.7158],
				travelMode: "驾车",
				travelMinutes: 8,
				visitMinutes: 45
			}
		]
	},
	{
		day: 7,
		date: "9月28日 · 周一",
		title: "Glacier Point → 维塞利亚",
		hotelId: "visalia-marriott",
		points: [{
			id: "d7-glacier",
			day: 7,
			order: 1,
			cn: "冰川点",
			name: "Glacier Point",
			coordinates: [-119.5741, 37.728],
			travelMode: "驾车",
			travelMinutes: 60,
			travelLabel: "从山谷住宿出发",
			visitMinutes: 90,
			note: "往返山谷各约一小时；出发前确认 Glacier Point Road 路况。"
		}, {
			id: "d7-visalia",
			day: 7,
			order: 2,
			cn: "维塞利亚市中心",
			name: "Downtown Visalia",
			coordinates: [-119.2921, 36.3302],
			travelMode: "驾车",
			travelMinutes: 285,
			travelLabel: "含午餐与加油",
			visitMinutes: 120
		}]
	},
	{
		day: 8,
		date: "9月29日 · 周二",
		title: "红杉国家公园",
		hotelId: "visalia-marriott",
		points: [
			{
				id: "d8-sherman",
				day: 8,
				order: 1,
				cn: "谢尔曼将军树",
				name: "General Sherman Tree",
				coordinates: [-118.7511, 36.5819],
				travelMode: "驾车",
				travelMinutes: 120,
				travelLabel: "从维塞利亚出发，含山路缓冲",
				visitMinutes: 90,
				note: "山路弯多；主步道铺装良好，但从树返回停车区为上坡。"
			},
			{
				id: "d8-congress",
				day: 8,
				order: 2,
				cn: "国会步道与巨木森林",
				name: "Congress Trail / Giant Forest",
				coordinates: [-118.7481, 36.5766],
				travelMode: "步行",
				travelMinutes: 5,
				visitMinutes: 120
			},
			{
				id: "d8-museum",
				day: 8,
				order: 3,
				cn: "巨木森林博物馆",
				name: "Giant Forest Museum",
				coordinates: [-118.7654, 36.5646],
				travelMode: "驾车 / 接驳车",
				travelMinutes: 12,
				visitMinutes: 60,
				note: "预留沿途观景和返回 Visalia 的时间。"
			}
		]
	},
	{
		day: 9,
		date: "9月30日 · 周三",
		title: "维塞利亚 → Santa Monica",
		hotelId: "shore-hotel",
		points: [{
			id: "d9-santa-monica",
			day: 9,
			order: 1,
			cn: "圣莫尼卡码头与海滩",
			name: "Santa Monica Pier & Beach",
			coordinates: [-118.4962, 34.0092],
			travelMode: "驾车",
			travelMinutes: 270,
			travelLabel: "从维塞利亚出发，含休息与进城缓冲",
			visitMinutes: 120,
			note: "新版已删除 Death Valley；临近洛杉矶时实时路况可能明显增加车程。"
		}]
	},
	{
		day: 10,
		date: "10月1日 · 周四",
		title: "Camarillo → Malibu 海岸线",
		hotelId: "shore-hotel",
		points: [
			{
				id: "d10-camarillo",
				day: 10,
				order: 1,
				cn: "卡马里奥奥特莱斯",
				name: "Camarillo Premium Outlets",
				coordinates: [-119.038, 34.2174],
				travelMode: "驾车",
				travelMinutes: 90,
				travelLabel: "从 Santa Monica 出发",
				visitMinutes: 210
			},
			{
				id: "d10-malibu",
				day: 10,
				order: 2,
				cn: "马里布海岸与沙滩",
				name: "Malibu Lagoon / Selected Beach Stops",
				coordinates: [-118.6783, 34.0357],
				travelMode: "驾车",
				travelMinutes: 45,
				visitMinutes: 120,
				note: "返程只选一至两个海滩停靠点，让全天节奏更舒适。"
			},
			{
				id: "d10-santa-monica-sunset",
				day: 10,
				order: 3,
				cn: "圣莫尼卡日落",
				name: "Santa Monica Sunset / Dinner",
				coordinates: [-118.4962, 34.0092],
				travelMode: "驾车",
				travelMinutes: 45,
				visitMinutes: 150
			}
		]
	},
	{
		day: 11,
		date: "10月2日 · 周五",
		title: "Venice → 还车 → Koreatown",
		hotelId: "line-la",
		points: [
			{
				id: "d11-venice",
				day: 11,
				order: 1,
				cn: "威尼斯海滩",
				name: "Venice Beach",
				coordinates: [-118.472, 33.985],
				travelMode: "驾车",
				travelMinutes: 20,
				travelLabel: "从 Shore Hotel 出发",
				visitMinutes: 75
			},
			{
				id: "d11-abbot",
				day: 11,
				order: 2,
				cn: "Abbot Kinney 大道",
				name: "Abbot Kinney Boulevard",
				coordinates: [-118.469, 33.9917],
				travelMode: "驾车 / 步行",
				travelMinutes: 8,
				visitMinutes: 90
			},
			{
				id: "d11-lax-return",
				day: 11,
				order: 3,
				cn: "LAX 租车中心",
				name: "LAX Rental Car Return",
				coordinates: [-118.4085, 33.9416],
				travelMode: "驾车",
				travelMinutes: 45,
				travelLabel: "含加油与机场周边缓冲",
				visitMinutes: 105,
				note: "在周五晚高峰前还车；之后改乘 Uber / Lyft 前往 Koreatown。"
			}
		]
	},
	{
		day: 12,
		date: "10月3日 · 周六",
		title: "洛杉矶经典城市线",
		hotelId: "line-la",
		points: [
			{
				id: "d12-griffith",
				day: 12,
				order: 1,
				cn: "格里菲斯天文台",
				name: "Griffith Observatory",
				coordinates: [-118.3004, 34.1184],
				travelMode: "网约车",
				travelMinutes: 25,
				travelLabel: "从住宿出发",
				visitMinutes: 120,
				note: "周六 10:00 开放，09:00–12:30 的计划块包含交通和停车缓冲。"
			},
			{
				id: "d12-hollywood",
				day: 12,
				order: 2,
				cn: "好莱坞区域",
				name: "Hollywood Area",
				coordinates: [-118.3267, 34.1016],
				travelMode: "网约车",
				travelMinutes: 20,
				visitMinutes: 90
			},
			{
				id: "d12-lacma",
				day: 12,
				order: 3,
				cn: "洛杉矶县艺术博物馆",
				name: "Los Angeles County Museum of Art",
				coordinates: [-118.3592, 34.0638],
				travelMode: "网约车",
				travelMinutes: 20,
				visitMinutes: 150
			},
			{
				id: "d12-bcd",
				day: 12,
				order: 4,
				cn: "BCD 豆腐坊",
				name: "BCD Tofu House · Wilshire",
				coordinates: [-118.2977, 34.0638],
				travelMode: "网约车",
				travelMinutes: 15,
				visitMinutes: 90
			}
		]
	},
	{
		day: 13,
		date: "10月4日 · 周日",
		title: "攀岩与韩餐",
		hotelId: "line-la",
		points: [{
			id: "d13-stronghold",
			day: 13,
			order: 1,
			cn: "Stronghold 攀岩馆",
			name: "The Stronghold Climbing Gym",
			coordinates: [-118.2174, 34.0645],
			travelMode: "网约车",
			travelMinutes: 25,
			travelLabel: "从住宿出发",
			visitMinutes: 240,
			note: "先确认分店与周日营业时间；只有脚部无痛且状态适合时再攀爬。"
		}, {
			id: "d13-quarters",
			day: 13,
			order: 2,
			cn: "Quarters 韩式烤肉",
			name: "Quarters Korean BBQ",
			coordinates: [-118.3005, 34.0636],
			travelMode: "网约车",
			travelMinutes: 25,
			visitMinutes: 150,
			note: "建议比计划用餐时间稍早到店，以减少等位。"
		}]
	},
	{
		day: 14,
		date: "10月5日 · 周一",
		title: "洛杉矶离境",
		hotelId: "line-la",
		points: [{
			id: "d14-lax",
			day: 14,
			order: 1,
			cn: "洛杉矶国际机场",
			name: "Los Angeles International Airport",
			coordinates: [-118.4085, 33.9416],
			travelMode: "网约车",
			travelMinutes: 75,
			travelLabel: "按工作日路况留足缓冲",
			visitMinutes: 180,
			note: "最终航班仍为 TBD；建议酒店出发时间设为起飞前约 4.5 小时，并提前约 3 小时到达 LAX。"
		}]
	}
];
var allRoutePoints = optimizedDays.flatMap((day) => day.points);
var routePointTimes = {
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
	"d14-lax": "TBD · 提前约 3 小时到达"
};
function formatMinutes(minutes) {
	if (minutes <= 0) return "—";
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;
	if (!hours) return `${rest} 分钟`;
	if (!rest) return `${hours} 小时`;
	return `${hours} 小时 ${rest} 分`;
}
//#endregion
//#region app/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var days = [
	{
		day: 0,
		date: "9月21日 · 周一",
		place: "北京 → 仁川",
		hotelId: "grand-hyatt-incheon",
		events: [
			{
				time: "10:30–12:30",
				label: "PEK 办理值机 / 安检"
			},
			{
				time: "13:30–16:30",
				label: "KE856 · Beijing → Seoul"
			},
			{
				time: "16:30–18:15",
				label: "入境 / 接驳 / 酒店入住"
			},
			{
				time: "9/22 · 11:00 / 13:00",
				label: "退房 / 前往机场办理值机"
			},
			{
				time: "9/22 · 16:00–11:00",
				label: "KE023 · Seoul → San Francisco（当地时间）"
			}
		],
		note: "航班时刻以出票信息为准"
	},
	{
		day: 1,
		date: "9月22日 · 周二",
		place: "抵达旧金山",
		hotelId: "hotel-caza",
		events: [
			{
				time: "11:00–14:00",
				label: "SFO 抵达 / 入境 / 接送"
			},
			{
				time: "14:00–16:00",
				label: "寄存行李 / 午餐 / 休息"
			},
			{
				time: "16:00–16:30",
				label: "酒店入住"
			},
			{
				time: "17:30–20:30",
				label: "晚餐 / Fisherman’s Wharf 夜间散步"
			}
		],
		note: "提前下载离线地图；酒店通常可在入住前寄存行李"
	},
	{
		day: 2,
		date: "9月23日 · 周三",
		place: "金门与海岸",
		hotelId: "hotel-caza",
		events: [
			{
				time: "08:00–09:15",
				label: "Golden Gate Bridge"
			},
			{
				time: "09:30–10:30",
				label: "Palace of Fine Arts / Crissy Field"
			},
			{
				time: "10:45–15:00",
				label: "Baker Beach / 午餐 / 回酒店休息"
			}
		],
		note: "下午保留弹性，照顾时差与脚部恢复"
	},
	{
		day: 3,
		date: "9月24日 · 周四",
		place: "恶魔岛与渔人码头",
		hotelId: "hotel-caza",
		events: [
			{
				time: "08:40–12:00",
				label: "Alcatraz Island（预约约 09:10 轮渡）"
			},
			{
				time: "12:15–13:30",
				label: "Pier 39"
			},
			{
				time: "13:45–14:30",
				label: "Ghirardelli Square"
			},
			{
				time: "14:30–16:00",
				label: "Fisherman’s Wharf"
			},
			{
				time: "16:15–17:15",
				label: "Lombard Street"
			}
		],
		note: "提前预订官方轮渡，并提前约 30 分钟抵达 Pier 33"
	},
	{
		day: 4,
		date: "9月25日 · 周五",
		place: "Golden Gate Park 与 Mission",
		hotelId: "hotel-caza",
		events: [
			{
				time: "09:00–09:30",
				label: "前往 Golden Gate Park"
			},
			{
				time: "09:30–13:00",
				label: "California Academy of Sciences"
			},
			{
				time: "13:00–14:30",
				label: "午餐 / Japanese Tea Garden"
			},
			{
				time: "15:00–16:00",
				label: "Painted Ladies / Alamo Square"
			},
			{
				time: "16:30–20:00",
				label: "Mission District / Dolores Park / 晚餐"
			}
		],
		note: "新增旧金山一天；跨区段优先使用网约车或 Muni"
	},
	{
		day: 5,
		date: "9月26日 · 周六",
		place: "旧金山 → 优胜美地",
		hotelId: "yosemite-valley-lodge",
		events: [
			{
				time: "08:00–09:30",
				label: "取车 / 加油 / 补给"
			},
			{
				time: "09:30–16:30",
				label: "前往 Yosemite（含午餐与拥堵缓冲）"
			},
			{
				time: "16:30–17:00",
				label: "酒店入住"
			},
			{
				time: "17:05–17:45",
				label: "Cook’s Meadow Loop 短平路段"
			},
			{
				time: "17:50–18:50",
				label: "Lower Yosemite Fall / 日落"
			}
		],
		note: "2026 无需车辆预约，但周六入口与山谷仍可能拥堵",
		drive: "约 5 小时 + 缓冲"
	},
	{
		day: 6,
		date: "9月27日 · 周日",
		place: "优胜美地山谷",
		hotelId: "yosemite-valley-lodge",
		events: [
			{
				time: "08:00–09:15",
				label: "El Capitan Meadow / Valley View"
			},
			{
				time: "09:30–13:00",
				label: "Bouldering / 弹性休息"
			},
			{
				time: "14:30–16:30",
				label: "Bridalveil Fall / Tunnel View"
			}
		],
		note: "停车后尽量使用山谷接驳车；脚部不适则缩短徒步"
	},
	{
		day: 7,
		date: "9月28日 · 周一",
		place: "Glacier Point → 维塞利亚",
		hotelId: "visalia-marriott",
		events: [
			{
				time: "07:15–10:45",
				label: "Glacier Point（含往返山路）"
			},
			{
				time: "10:45–15:30",
				label: "前往 Visalia（含午餐 / 加油）"
			},
			{
				time: "16:00–16:30",
				label: "酒店入住"
			},
			{
				time: "17:30–19:30",
				label: "Downtown Visalia 晚餐 / 轻松散步"
			}
		],
		note: "出发前确认 Glacier Point Road 路况",
		drive: "约 4 小时 45 分"
	},
	{
		day: 8,
		date: "9月29日 · 周二",
		place: "红杉国家公园",
		hotelId: "visalia-marriott",
		events: [
			{
				time: "06:30–08:30",
				label: "前往 General Sherman 区域"
			},
			{
				time: "08:30–10:00",
				label: "General Sherman Tree"
			},
			{
				time: "10:15–13:00",
				label: "Congress Trail 短段 / Giant Forest / 午餐"
			},
			{
				time: "13:00–16:30",
				label: "Giant Forest Museum / 沿途观景 / 返回 Visalia"
			}
		],
		note: "山路狭窄弯曲；Sherman 主步道返回段为上坡",
		drive: "约 4 小时往返"
	},
	{
		day: 9,
		date: "9月30日 · 周三",
		place: "维塞利亚 → 圣莫尼卡",
		hotelId: "shore-hotel",
		events: [
			{
				time: "08:30–13:00",
				label: "前往 Santa Monica（含休息与进城缓冲）"
			},
			{
				time: "13:00–14:00",
				label: "午餐 / 寄存行李"
			},
			{
				time: "14:00–16:00",
				label: "Santa Monica Pier / 海滩"
			},
			{
				time: "16:00–20:00",
				label: "酒店入住 / 日落 / 晚餐"
			}
		],
		note: "新版取消 Death Valley，接近洛杉矶时用实时导航复核",
		drive: "约 4 小时 30 分"
	},
	{
		day: 10,
		date: "10月1日 · 周四",
		place: "Camarillo 与 Malibu",
		hotelId: "shore-hotel",
		events: [
			{
				time: "08:30–10:00",
				label: "前往 Camarillo Premium Outlets"
			},
			{
				time: "10:00–13:30",
				label: "Camarillo Premium Outlets"
			},
			{
				time: "13:30–17:00",
				label: "Malibu 海岸驾驶 / 精选海滩停靠"
			},
			{
				time: "17:00–20:30",
				label: "返回 Santa Monica / 日落 / 晚餐"
			}
		],
		note: "新增洛杉矶一天；Malibu 只选一至两个停靠点",
		drive: "约 3 小时"
	},
	{
		day: 11,
		date: "10月2日 · 周五",
		place: "Venice → LAX → Koreatown",
		hotelId: "line-la",
		events: [
			{
				time: "08:30–11:30",
				label: "Venice Beach / Abbot Kinney"
			},
			{
				time: "11:30–13:00",
				label: "午餐 / 酒店退房"
			},
			{
				time: "13:00–15:30",
				label: "加油 / 前往 LAX / 还车"
			},
			{
				time: "15:30–18:00",
				label: "Uber / Lyft 前往 Koreatown / 入住 / 晚餐"
			}
		],
		note: "周五高峰前还车；LAX 到 Koreatown 仍可能超过一小时"
	},
	{
		day: 12,
		date: "10月3日 · 周六",
		place: "洛杉矶经典城市线",
		hotelId: "line-la",
		events: [
			{
				time: "09:00–12:30",
				label: "Griffith Observatory（含交通 / 停车）"
			},
			{
				time: "13:00–14:30",
				label: "Hollywood 区域"
			},
			{
				time: "15:00–17:30",
				label: "Los Angeles County Museum of Art"
			},
			{
				time: "18:30–20:00",
				label: "BCD Tofu House"
			}
		],
		note: "周六天文台 10:00 开放；LACMA 当前周六 10:00–19:00"
	},
	{
		day: 13,
		date: "10月4日 · 周日",
		place: "攀岩与韩餐",
		hotelId: "line-la",
		events: [{
			time: "10:00–14:00",
			label: "The Stronghold Climbing Gym"
		}, {
			time: "17:30–20:00",
			label: "Quarters Korean BBQ（建议早到）"
		}],
		note: "确认分店与周日时间；脚部无痛且状态适合时再攀爬"
	},
	{
		day: 14,
		date: "10月5日 · 周一",
		place: "LAX 离境",
		hotelId: "line-la",
		events: [{
			time: "待定",
			label: "酒店退房 / 寄存行李 / 机场接送"
		}, {
			time: "待定",
			label: "从 LAX 离境"
		}],
		note: "航班仍待定；酒店约提前 4.5 小时出发，争取提前 3 小时抵达 LAX"
	}
];
function toLatLng(point) {
	return [point.coordinates[1], point.coordinates[0]];
}
function routeLatLngs(points) {
	const coordinates = points.filter((point) => point.status !== "closed").map(toLatLng);
	return coordinates.length === 1 ? [coordinates[0], coordinates[0]] : coordinates;
}
function formatTravel(point) {
	if (point.status === "closed") return "当前关闭，跳过";
	const duration = formatMinutes(point.travelMinutes);
	return point.travelLabel ? `${point.travelLabel} · ${duration}` : duration;
}
function Home() {
	const mapNodeRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const routeLinesRef = (0, import_react.useRef)([]);
	const [selectedRouteDay, setSelectedRouteDay] = (0, import_react.useState)("all");
	const [selectedPointId, setSelectedPointId] = (0, import_react.useState)(allRoutePoints[0].id);
	const [openDay, setOpenDay] = (0, import_react.useState)(1);
	const [mapReady, setMapReady] = (0, import_react.useState)(false);
	const [mapError, setMapError] = (0, import_react.useState)(false);
	const [baseMapUnavailable, setBaseMapUnavailable] = (0, import_react.useState)(false);
	const selectedDay = (0, import_react.useMemo)(() => typeof selectedRouteDay === "number" ? optimizedDays.find((day) => day.day === selectedRouteDay) : void 0, [selectedRouteDay]);
	const activePoints = selectedDay?.points ?? allRoutePoints;
	const selectedPoint = allRoutePoints.find((point) => point.id === selectedPointId) ?? activePoints[0];
	const selectedPointDay = optimizedDays.find((day) => day.day === selectedPoint.day);
	const activeHotel = hotelStays.find((hotel) => hotel.id === (selectedDay?.hotelId ?? selectedPointDay?.hotelId));
	const activeTravelMinutes = activePoints.reduce((total, point) => total + (point.status === "closed" ? 0 : point.travelMinutes), 0);
	const activeVisitMinutes = activePoints.reduce((total, point) => total + (point.status === "closed" ? 0 : point.visitMinutes), 0);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		async function mountMap() {
			try {
				const leaflet = await import("./leaflet-src-lebVF56Q.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
				if (disposed || !mapNodeRef.current) return;
				const map = leaflet.map(mapNodeRef.current, {
					center: [36.1, -120.1],
					zoom: 5,
					minZoom: 4,
					maxZoom: 13,
					zoomControl: false
				});
				mapRef.current = map;
				leaflet.control.zoom({ position: "topright" }).addTo(map);
				const esriTiles = leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
					attribution: "Tiles &copy; Esri — Sources: Esri, HERE, Garmin, USGS and the GIS User Community",
					maxZoom: 19
				});
				let esriTileErrors = 0;
				let esriTileLoaded = false;
				let fallbackActive = false;
				const activateFallback = () => {
					if (disposed || fallbackActive) return;
					fallbackActive = true;
					map.removeLayer(esriTiles);
					const osmFallback = leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
						attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
						maxZoom: 19
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
				}, 5e3);
				const initialRoute = routeLatLngs(allRoutePoints);
				routeLinesRef.current = [leaflet.polyline(initialRoute, {
					color: "#f5efdf",
					weight: 9,
					opacity: .9,
					lineCap: "round",
					lineJoin: "round",
					interactive: false
				}).addTo(map), leaflet.polyline(initialRoute, {
					color: "#2452c7",
					weight: 4,
					opacity: 1,
					lineCap: "round",
					lineJoin: "round",
					interactive: false
				}).addTo(map)];
				map.fitBounds([[33.45, -123.12], [38.35, -118.02]], {
					padding: [64, 64],
					animate: false
				});
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
							iconAnchor: [16, 16]
						}),
						keyboard: false
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
					leaflet.marker([hotel.coordinates[1], hotel.coordinates[0]], {
						icon: leaflet.divIcon({
							className: "leaflet-hotel-icon",
							html: hotelButton,
							iconSize: [30, 30],
							iconAnchor: [15, 15]
						}),
						keyboard: false
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
		mountMap();
		return () => {
			disposed = true;
			routeLinesRef.current = [];
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const points = selectedDay?.points ?? allRoutePoints;
		const openPoints = points.filter((point) => point.status !== "closed");
		const latLngs = routeLatLngs(points);
		routeLinesRef.current.forEach((line) => line.setLatLngs(latLngs));
		document.querySelectorAll(".atlas-marker").forEach((marker) => {
			marker.classList.toggle("is-active", marker.dataset.pointId === selectedPointId);
			marker.classList.toggle("is-muted", selectedRouteDay !== "all" && marker.dataset.day !== String(selectedRouteDay));
		});
		document.querySelectorAll(".hotel-marker").forEach((marker) => {
			const dayFrom = Number(marker.dataset.dayFrom);
			const dayTo = Number(marker.dataset.dayTo);
			const isInSelectedDay = selectedRouteDay === "all" || typeof selectedRouteDay === "number" && selectedRouteDay >= dayFrom && selectedRouteDay <= dayTo;
			marker.classList.toggle("is-muted", !isInSelectedDay);
			marker.classList.toggle("is-active", marker.dataset.hotelId === activeHotel?.id);
		});
		if (!mapReady || !mapRef.current || !openPoints.length) return;
		if (openPoints.length === 1) {
			mapRef.current.flyTo(toLatLng(openPoints[0]), 10, { duration: .85 });
			return;
		}
		mapRef.current.fitBounds(openPoints.map(toLatLng), {
			padding: selectedRouteDay === "all" ? [64, 64] : [92, 92],
			animate: true,
			duration: .85,
			maxZoom: 11
		});
	}, [
		activeHotel?.id,
		selectedDay,
		selectedPointId,
		selectedRouteDay,
		mapReady
	]);
	function selectRouteDay(day) {
		setSelectedRouteDay(day);
		if (day === "all") return;
		const firstPoint = optimizedDays.find((item) => item.day === day)?.points[0];
		if (firstPoint) setSelectedPointId(firstPoint.id);
	}
	function selectDay(plan) {
		setOpenDay((current) => current === plan.day ? -1 : plan.day);
		if (plan.day > 0) selectRouteDay(plan.day);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "brand",
					href: "#top",
					"aria-label": "回到页面顶部",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "26" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "页面导航",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#route",
							children: "路线"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#stays",
							children: "住宿"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#journal",
							children: "每日行程"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "header-date",
					children: "SEP 21 — OCT 5"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-image",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/places/yosemite.jpg",
						alt: "",
						fetchPriority: "high"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-wash" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "A CALIFORNIA FIELD JOURNAL · 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["California,", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Linna & Wooju" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-deck",
							children: "从仁川转机夜开始，十四天穿过太平洋的雾、花岗岩与古老巨木，沿南加州海岸抵达洛杉矶的城市灯光。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "route-cta",
							href: "#route",
							children: ["展开路线 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "↓"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-facts",
					"aria-label": "旅行概览",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CALENDAR DAYS" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: allRoutePoints.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ROUTE STOPS" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hotelStays.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HOTEL STAYS" })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-stamp",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "37.7749° N" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CALIFORNIA" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "34.0522° N" })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "route-section",
			id: "route",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow blue",
						children: [
							"OPTIMIZED ROUTE / ",
							allRoutePoints.length,
							" COORDINATES"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "所有景点，一张地图" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "已按每天少折返、顺路衔接的原则重新排序。点击 D1—D14 放大当天路线，再点编号查看到达时间与建议观光时长。" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "day-route-tabs",
					"aria-label": "选择地图日期",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: selectedRouteDay === "all" ? "is-active" : "",
						"aria-pressed": selectedRouteDay === "all",
						onClick: () => selectRouteDay("all"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ALL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							"全部 ",
							allRoutePoints.length,
							" 站"
						] })]
					}), optimizedDays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: selectedRouteDay === day.day ? "is-active" : "",
						"aria-pressed": selectedRouteDay === day.day,
						onClick: () => selectRouteDay(day.day),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["D", String(day.day).padStart(2, "0")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: day.title })]
					}, day.day))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "atlas-frame",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "map-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: mapNodeRef,
								className: "route-map",
								"aria-label": "包含全部景点、逐日顺序和路线的加州旅行交互地图"
							}),
							!mapReady && !mapError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "map-loading",
								children: "正在展开路线图…"
							}),
							mapError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "map-error",
								role: "status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "地图暂时无法加载" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "全部路线、时间与地点仍可在右侧查看。" })]
							}),
							baseMapUnavailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "map-network-note",
								role: "status",
								children: "底图网络受限，路线与地点标记仍可正常使用"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "map-index",
								children: [
									"PACIFIC",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"OCEAN"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "map-legend",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-open" }),
									" 景点 / 交通节点 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-hotel" }),
									" 酒店"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "route-planner",
						"aria-live": "polite",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "planner-heading",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedDay ? `DAY ${String(selectedDay.day).padStart(2, "0")} · ${selectedDay.date}` : "ALL DAYS · SEP 22 — OCT 5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selectedDay?.title ?? "加州全程总览" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "planner-metrics",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "预计交通" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatMinutes(activeTravelMinutes) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "建议观光" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatMinutes(activeVisitMinutes) })] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "selected-point",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "selected-point-index",
									children: [
										selectedPoint.day,
										"·",
										selectedPoint.order
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SELECTED STOP" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { children: [selectedPoint.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"DAY ",
										String(selectedPoint.day).padStart(2, "0"),
										" · STOP ",
										String(selectedPoint.order).padStart(2, "0")
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "selected-point-times",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["计划 · ", routePointTimes[selectedPoint.id]] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												selectedPoint.travelMode,
												" · ",
												formatTravel(selectedPoint)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["建议停留 · ", formatMinutes(selectedPoint.visitMinutes)] })
										]
									}),
									selectedPoint.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "point-note",
										children: selectedPoint.note
									})
								] })]
							}),
							activeHotel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "planner-hotel",
								href: activeHotel.website,
								target: "_blank",
								rel: "noreferrer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"STAY · ",
										activeHotel.dates,
										" · ",
										activeHotel.nights,
										" 晚"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: activeHotel.cn }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										activeHotel.name,
										" · 入住 ",
										activeHotel.checkIn
									] })
								]
							}),
							selectedDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "route-sequence",
								"aria-label": `第 ${selectedDay.day} 天推荐顺序`,
								children: selectedDay.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: `${point.id === selectedPointId ? "is-active" : ""} ${point.status === "closed" ? "is-closed" : ""}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedPointId(point.id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sequence-number",
												children: String(point.order).padStart(2, "0")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sequence-place",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: routePointTimes[point.id] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: point.name }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
														"DAY ",
														String(point.day).padStart(2, "0"),
														" · STOP ",
														String(point.order).padStart(2, "0")
													] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sequence-time",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: point.travelMode }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: formatTravel(point) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sequence-visit",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "观光" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: formatMinutes(point.visitMinutes) })]
											})
										]
									})
								}, point.id))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "all-days-index",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"地图已显示 14 天的 ",
									allRoutePoints.length,
									" 个坐标点；选择某一天，可查看当天的最优顺序与每一段时间。"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: optimizedDays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => selectRouteDay(day.day),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["D", String(day.day).padStart(2, "0")] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: day.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [day.points.length, " 站"] })
									]
								}, day.day)) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "planner-disclaimer",
								children: "时间为非实时规划估算，不含停车、排队、用餐和临时封路；出发当天请用导航复核。"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "route-method",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "路线逻辑" }), " 同一片区按地理方向串联，步行街区集中处理，日落点放在每日最后；每天首段从当晚酒店或对应城市中心估算。地图连线表达顺序，不代替逐路口导航。"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "状态依据" }),
							" 新版已经取消 Death Valley；国家公园路况仍会快速变化。出发前查看",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.nps.gov/yose/planyourvisit/index.htm",
								target: "_blank",
								rel: "noreferrer",
								children: " Yosemite 行前信息"
							}),
							" 与",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.nps.gov/seki/planyourvisit/visitorcenters.htm",
								target: "_blank",
								rel: "noreferrer",
								children: "Sequoia 游客中心"
							}),
							"。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "时长参考" }),
							" 恶魔岛按官方建议保留 2–3 小时；Griffith Observatory 按周六 10:00 开放安排上午到达。查看",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://home.nps.gov/alca/planyourvisit/things2do.htm",
								target: "_blank",
								rel: "noreferrer",
								children: " Alcatraz 建议"
							}),
							" 与",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://griffithobservatory.org/?topic_id=17",
								target: "_blank",
								rel: "noreferrer",
								children: "Griffith 开放信息"
							}),
							"。"
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "stays-section",
			id: "stays",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stays-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow blue",
						children: "SIX STAYS / ONE CONTINUOUS ROUTE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "从转机夜，到太平洋边" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "住宿完全按新版日期同步：旧金山四晚、Yosemite 两晚、Visalia 两晚、Santa Monica 两晚，最后转到 Koreatown 连住三晚。" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stays-list",
				children: hotelStays.map((hotel, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: hotel.website,
					target: "_blank",
					rel: "noreferrer",
					className: "stay-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "stay-index",
							children: ["H", String(index + 1).padStart(2, "0")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "stay-dates",
							children: [hotel.dates, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								hotel.nights,
								" NIGHT",
								hotel.nights > 1 ? "S" : ""
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "stay-name",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hotel.cn }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: hotel.name })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "stay-address",
							children: [hotel.address, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"IN ",
								hotel.checkIn,
								" · OUT ",
								hotel.checkOut
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "stay-arrow",
							"aria-hidden": "true",
							children: "↗"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "stay-note",
							children: hotel.note
						})
					]
				}, hotel.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "journal-section",
			id: "journal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "journal-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow red",
						children: "THE DAILY LOG / SEP 21 — OCT 5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "从 Day 0 开始，每小时都有去处" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "新版表格里的航班、景点、入住时间和驾驶节点已经排进时间轴。点开 D1—D14，地图会同步移动到当天路线。" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "day-list",
				children: days.map((plan) => {
					const isOpen = plan.day === openDay;
					const planHotel = hotelStays.find((hotel) => hotel.id === plan.hotelId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `day-card ${isOpen ? "is-open" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => selectDay(plan),
							"aria-expanded": isOpen,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "day-number",
									children: String(plan.day).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "day-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: plan.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: plan.place })]
								}),
								plan.drive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "drive-time",
									children: ["DRIVE · ", plan.drive]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "day-toggle",
									"aria-hidden": "true",
									children: isOpen ? "−" : "+"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "day-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: plan.events.map((event, eventIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(eventIndex + 1).padStart(2, "0") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: event.time }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: event.label })
								] }, `${plan.day}-${event.label}`)) }),
								planHotel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "day-hotel",
									href: planHotel.website,
									target: "_blank",
									rel: "noreferrer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAY" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: planHotel.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											planHotel.dates,
											" · 入住 ",
											planHotel.checkIn
										] })
									]
								}),
								plan.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "field-note",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "FIELD NOTE" }), plan.note]
								})
							]
						})]
					}, plan.day);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CALIFORNIA / 2026" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
			"See you where",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"the road bends."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"路线依据《Trip planning_260801_SF_LA_extra_days.xlsx》整理，开放时间与住宿信息以表格 Sources 页及各机构官方页面为准。封面摄影来自 Unsplash：",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-3_o3u8AeQw8",
				target: "_blank",
				rel: "noreferrer",
				children: "Yosemite Valley"
			}),
			"。"
		] })] })
	] });
}
//#endregion
export { Home as default };
