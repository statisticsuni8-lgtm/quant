import { 
  NewsArticle, 
  EconomicIndicator, 
  CalendarEvent, 
  AssetResearchDetail, 
  ElectionAssetImpact 
} from "./types";

// 1. Employment Indicators Table (investing.com vs Actuals and Meanings)
export const employmentIndicatorsData: EconomicIndicator[] = [
  {
    id: "ind_1",
    name: "비농업 고용 지수 (Non-farm Payrolls)",
    indicatorKey: "NFP",
    forecast: "175K",
    actual: "185K",
    previous: "160K",
    significance: "미 연준이 금리 인하 속도를 조절할 수 있는 여지를 주는 '골디락스' 지표입니다. 침체 우려(150K 미만)를 불식시키는 동시에, 과도한 임금 상승 및 인플레이션 재점화 우려(220K 초과)가 없어 성장주와 유동성 랠리에 가장 최적의 시나리오를 구성합니다.",
    meaningKorean: "예상치(175K)를 상회하며 경제 펀더멘털이 튼튼함을 증명했습니다. 급격한 경기 후퇴 우려를 제거하여 주식 시장에 우호적입니다.",
    status: "better"
  },
  {
    id: "ind_2",
    name: "실업률 (Unemployment Rate)",
    indicatorKey: "UR",
    forecast: "4.0%",
    actual: "4.1%",
    previous: "3.9%",
    significance: "실업률이 4.1%로 전월보다 소폭 올랐다는 점은 노동 시장의 과열이 진정되고 있음을 나타냅니다. 이는 임금 상승 압력을 낮춤으로써 연준이 금리 인하를 자신감 있게 추진할 수 있도록 뒷받침하는 강력한 매크로적 명분이 됩니다.",
    meaningKorean: "예상치(4.0%)보다 0.1%p 상승하여 노동 긴장이 소폭 완화되었습니다. 연준의 비둘기파적 스탠스(금리 인하)를 부추기는 신호입니다.",
    status: "neutral"
  },
  {
    id: "ind_3",
    name: "신규 실업수당 청구 건수 (Initial Jobless Claims)",
    indicatorKey: "IJC",
    forecast: "215K",
    actual: "222K",
    previous: "210K",
    significance: "매주 발표되는 고빈도 지표로, 222K로 증가한 것은 고용 해고가 심각하지 않은 수준에서 점진적 둔화세에 있음을 확인해 줍니다. 급격한 스파이크가 없어 시스템적 리스크는 매우 낮은 상태로 안정적입니다.",
    meaningKorean: "예상 및 이전 치를 소폭 상회하며 완만한 고용 시장 냉각을 가리킵니다. 금리 인하 기대감 유지를 지지합니다.",
    status: "neutral"
  }
];

// 2. Economic Calendar
export const calendarEventsData: CalendarEvent[] = [
  {
    id: "cal_1",
    time: "2026-07-08 21:30",
    country: "USA",
    event: "핵심 소비자물가지수 (Core CPI) (MoM) (6월)",
    importance: "High",
    forecast: "0.2%",
    previous: "0.2%",
    actual: "0.2%",
    impactTicker: "SPY, QQQ, DXY"
  },
  {
    id: "cal_2",
    time: "2026-07-08 21:30",
    country: "USA",
    event: "소비자물가지수 (CPI) (YoY) (6월)",
    importance: "High",
    forecast: "2.9%",
    previous: "3.0%",
    actual: "2.9%",
    impactTicker: "SPY, TLT"
  },
  {
    id: "cal_3",
    time: "2026-07-09 10:30",
    country: "CHN",
    event: "소비자물가지수 (CPI) (YoY) (6월)",
    importance: "Medium",
    forecast: "0.4%",
    previous: "0.3%",
    actual: "0.4%",
    impactTicker: "FXI, MCHI"
  },
  {
    id: "cal_4",
    time: "2026-07-09 21:30",
    country: "USA",
    event: "신규 실업수당 청구 건수",
    importance: "High",
    forecast: "218K",
    previous: "222K",
    actual: "---",
    impactTicker: "QQQ, TBT"
  },
  {
    id: "cal_5",
    time: "2026-07-10 21:30",
    country: "USA",
    event: "생산자물가지수 (PPI) (YoY) (6월)",
    importance: "High",
    forecast: "2.1%",
    previous: "2.2%",
    actual: "---",
    impactTicker: "SPY, US10Y"
  },
  {
    id: "cal_6",
    time: "2026-07-11 02:00",
    country: "USA",
    event: "미국 베이지북 (Beige Book) 발표",
    importance: "Medium",
    forecast: "---",
    previous: "---",
    actual: "---",
    impactTicker: "ALL ASSETS"
  }
];

// 3. Asset-Specific In-Depth Research
export const tickerResearchData: AssetResearchDetail[] = [
  {
    ticker: "BTC",
    name: "비토코인 (Bitcoin)",
    currentPrice: "$71,240",
    change: "+4.12%",
    isPositive: true,
    industry: "가상자산 / 글로벌 디지털 대안 자산",
    macroFactors: [
      "미국 M2 유동성 전월비 1.8% 반등으로 글로벌 통화 팽창 속도 가속화",
      "달러 인덱스(DXY)가 101.2선 지지선을 하방 돌파하며 실물 화폐 약세 수혜 극대화",
      "폴리마켓 친가상자산 공화당 정권 획득 확률(56%) 상승에 따른 제도적 완화 기대"
    ],
    bullCase: "글로벌 통화량 M2가 재팽창 주기에 진입하고 달러가 약화되는 이중 수혜 환경입니다. 여기에 콜옵션 파생 시장에서 감마 스퀴즈 발동 역치가 75,000달러 선에 임박하여 숏커버와 마켓메이커의 기계적 현물 매입이 겹치는 폭발적인 포물선 랠리가 전개될 수 있습니다.",
    bearCase: "미국 내 고금리가 예상보다 길어지거나 마운트곡스 채권 상환 물량, 연준의 예상치 못한 서비스 물가 폭등 대응용 매파적 발언 시 단기 $65,000선까지 변동성이 확대될 리스크가 상존합니다.",
    technicalAnalysis: "일봉 기준 20일 이평선 지지 확인 후 볼린저 밴드 상단 돌파 시도 중. $72,500 저항선 상방 돌파 시 옵션 딜러들의 매수세(감마 스퀴즈)가 본격 유입되며 $78,000 영역까지 급등할 기술적 토대가 마련되어 있습니다.",
    quantScore: 88
  },
  {
    ticker: "NVDA",
    name: "엔비디아 (NVIDIA)",
    currentPrice: "$128.50",
    change: "-1.85%",
    isPositive: false,
    industry: "글로벌 반도체 GPU / AI 인프라 독점",
    macroFactors: [
      "중국 외교부의 대만 해협 관련 공급망 무기화 발언으로 TSMC 파운드리 병목 리스크 상승",
      "빅테크 기업들의 AI 데이터센터 자본지출(CAPEX) 강도 유지",
      "단기 밸류에이션 부담 및 대선 전 해외 관세 정책(중국 타겟)에 따른 선제적 위험 기피"
    ],
    bullCase: "블랙웰(Blackwell) 차세대 아키텍처의 전량 선주문 완판 및 하이퍼스케일러들의 자본지출 증가는 펀더멘탈의 훼손이 전혀 없음을 가리킵니다. 달러 약세에 따른 다국적 IT 기업의 해외 매출 환산 이익 증가 역시 긍정적입니다.",
    bearCase: "중국의 대만 봉쇄 가능성 및 미-중 갈등 고조는 공급망의 심장인 TSMC를 타겟하여 칩 인도 지연 사태를 유발할 수 있습니다. 관세 압박 또한 마진율을 저해하는 강력한 지정학적 하방 압력입니다.",
    technicalAnalysis: "피보나치 0.382 되돌림 선인 $125에서 지지 흐름 연출 중. 60일 이평선이 강력한 하방 지지대로 작용하며 대만 공급망 노이즈가 해결되기 전까지 $120-$135 박스권 횡보 흐름이 유력합니다.",
    quantScore: 82
  },
  {
    ticker: "TSLA",
    name: "테슬라 (Tesla)",
    currentPrice: "$242.10",
    change: "+5.82%",
    isPositive: true,
    industry: "전기차 (EV) 및 AI 로보틱스 / 에너지 저장장치(ESS)",
    macroFactors: [
      "유가 폭락(배럴당 $68선 붕괴)에도 불구하고 금리 인하 기대감에 따른 할부금융 비용 부담 완화",
      "중국 상하이 공장 생산량 회복 및 완전 자율주행(FSD) 글로벌 상용화 라이센스 계약 가시화",
      "미 대선 후보들의 친환경 보조금 및 전기차 특별 규제 향방 주시"
    ],
    bullCase: "연준의 점진적인 금리 하향 궤도는 자동차 구매 리스 금리를 내려 판매량 턴어라운드를 유도합니다. 특히 ESS 부문의 전년비 100% 성장세와 로보택시(Robotaxi) 가치 반영이 본격화되고 있습니다.",
    bearCase: "공화당 집권 시 인플레이션감축법(IRA) 보조금 전면 축소 가능성이 대두되어 미국 내 세제 혜택 손실이 마진 악화로 이어질 우려가 있습니다. 유가 급락으로 친환경 대체제 매력도가 일시 하락할 수 있습니다.",
    technicalAnalysis: "골든 크로스(50일 이평선이 200일 이평선 돌파) 발생 완료. 저항 매물대였던 $235를 대량 거래량과 함께 강력하게 상향 돌파하였으며 차기 목표가는 $265 영역입니다.",
    quantScore: 85
  },
  {
    ticker: "DXY",
    name: "미국 달러 인덱스 (Dollar Index)",
    currentPrice: "101.12",
    change: "-0.68%",
    isPositive: false,
    industry: "글로벌 기축통화 지표",
    macroFactors: [
      "연준의 하반기 금리 피벗 신뢰성 확고화 및 물가 둔화",
      "유럽 및 일본중앙은행의 매파적 금리 정책 격차 축소",
      "글로벌 위험자산 선호 심리 회복에 따른 안전자산 도피 자금 이탈"
    ],
    bullCase: "지정학적 충격(대만 해협 군사 봉쇄 등) 발생 시 안전 자산인 달러화로의 글로벌 유동성이 순간 급격히 유입되어 강력한 기술적 반등을 전개할 수 있습니다.",
    bearCase: "미국 CPI 및 PPI가 점진적 하락 안정화 궤도에 정착하고, 고용 과열 해소로 연준이 지속 인하 신호를 보내며 미국-글로벌 금리 스프레드가 좁혀질 때 DXY는 $100 마지노선 붕괴를 테스트할 것입니다.",
    technicalAnalysis: "주봉상 데드크로스 진행형. 101.2 아래에서 마감 시 $99.5선까지 중장기 낙폭을 열어두는 중이며 역상관 자산군인 비트코인 및 테크 성장주에 강력한 유동성 바람을 공급하는 형국입니다.",
    quantScore: 35
  }
];

// 4. US Midterm Elections Asset Impact Matrix
export const electionImpactMatrix: ElectionAssetImpact[] = [
  {
    assetClass: "성장주 및 빅테크 (QQQ)",
    republicanScenario: {
      outlook: "Bullish",
      description: "법인세 인하(21% -> 15% 감면론) 영구화 및 연방 규제 완화 수혜를 받습니다. 단, 강도 높은 보편 관세 도입 시 글로벌 Tech 공급망(TSMC 등) 비용 상승 우려가 있습니다.",
      targetSectors: ["반도체", "인공지능", "플랫폼 빅테크"]
    },
    democraticScenario: {
      outlook: "Neutral",
      description: "기존 보조금 정책(반도체칩법, 인프라법) 기조가 견고하게 유지되어 정책 불확실성이 제거됩니다. 단, 대기업 및 고소득층 증세 리스크가 주가 상단을 제한합니다.",
      targetSectors: ["친환경 인프라", "바이오시밀러", "그린 에너지"]
    }
  },
  {
    assetClass: "가상자산 (BTC, ETH)",
    republicanScenario: {
      outlook: "Strongly Bullish",
      description: "트럼프의 '친비트코인 미국 기조' 및 SEC 위원장 교체 공약으로 가상자산 규제 환경이 180도 전향적 완화 흐름을 맞이하여 기관 자금 유입이 대폭 증폭됩니다.",
      targetSectors: ["비트코인 레이어2", "웹3 인프라", "채굴 기업"]
    },
    democraticScenario: {
      outlook: "Neutral",
      description: "투자자 보호 및 규제 준수 프레임워크가 계속 엄격하게 유지됩니다. 급진적인 규제 완화는 없으나 비트코인 ETF 등 이미 인가된 연계 상품의 안정적 성장은 보장됩니다.",
      targetSectors: ["규제 준수 보관업", "토큰화 금융자산(RWA)"]
    }
  },
  {
    assetClass: "전통 에너지 및 원자재",
    republicanScenario: {
      outlook: "Strongly Bullish",
      description: "전통 석유/가스 시추 허가 확대 및 파이프라인 규제 해제(Drill, Baby, Drill)로 미국 내 화석연료 생산량이 극대화됩니다. 유가는 공급 과잉으로 다소 약세일 수 있으나 정유 산업 가치는 뜁니다.",
      targetSectors: ["정유 및 가스 시추", "파이프라인 운송", "석탄 제조"]
    },
    democraticScenario: {
      outlook: "Strongly Bullish",
      description: "기후 변화 예산 유지 및 전기차 의무화 목표 고수로 태양광, 풍력, 전기차 배터리 생태계 보조금 혜택이 고도화되며 장기 성장이 유효합니다.",
      targetSectors: ["태양광/풍력 패널", "EV 배터리 소재", "원자력 발전"]
    }
  },
  {
    assetClass: "채권 시장 (TLT, US10Y)",
    republicanScenario: {
      outlook: "Bearish",
      description: "세제 감면 연장으로 인한 재정 적자 확대 우려와 보편 관세로 인한 수입 물가 상승(인플레 재점화) 우려로 인해 장기 국채 금리가 오르고(채권 가격 하락) 커브 스티프닝이 진행됩니다.",
      targetSectors: ["초단기 국채", "금리 연계 파생상품"]
    },
    democraticScenario: {
      outlook: "Neutral",
      description: "예측 가능한 재정 적자 규모와 점진적 인플레이션 하락세가 유지되어 연준의 금리 인하 궤도가 훼손되지 않으며 장기 국채 가격의 꾸준한 회복세를 견인합니다.",
      targetSectors: ["장기 국채 (TLT)", "투자등급 회사채"]
    }
  }
];

// 5. Historical DXY vs Bitcoin & Nasdaq (Simulation for Dollar falling flow to Risk Assets)
export const historicalDxyRiskAssetsData = [
  { month: "1월", DXY: 104.2, BTC: 42000, NDX: 16500 },
  { month: "2월", DXY: 103.8, BTC: 48500, NDX: 17200 },
  { month: "3월", DXY: 103.1, BTC: 64000, NDX: 18100 },
  { month: "4월", DXY: 103.5, BTC: 61000, NDX: 17600 },
  { month: "5월", DXY: 102.1, BTC: 68000, NDX: 18500 },
  { month: "6월", DXY: 101.8, BTC: 66500, NDX: 18900 },
  { month: "7월", DXY: 101.12, BTC: 71240, NDX: 19800 }
];

// 6. US M2 Money Supply Growth vs S&P 500 (Simulation for M2 pump)
export const historicalM2Sp500Data = [
  { month: "1월", M2: 20.8, SP500: 4800, liquidityLevel: "안정" },
  { month: "2월", M2: 20.9, SP500: 5000, liquidityLevel: "안정" },
  { month: "3월", M2: 21.0, SP500: 5150, liquidityLevel: "완만" },
  { month: "4월", M2: 20.8, SP500: 5050, liquidityLevel: "일시위축" },
  { month: "5월", M2: 21.2, SP500: 5300, liquidityLevel: "확장" },
  { month: "6월", M2: 21.4, SP500: 5450, liquidityLevel: "확장" },
  { month: "7월", M2: 21.8, SP500: 5620, liquidityLevel: "고유동성" }
];

// 7. Options Gamma Curve Squeeze Data
// Shows Gamma vs Spot Price (centered around strike price K = 70,000)
export const gammaCurveData = [
  { price: 65000, gamma: 0.05, explanation: "외가격(OTM) 영역: 딜러 델타 조정 헤징 미미" },
  { price: 66000, gamma: 0.12, explanation: "외가격(OTM) 영역: 헤징 압력 서서히 상승" },
  { price: 67000, gamma: 0.28, explanation: "외가격 근접: 딜러 델타 민감도 가속화" },
  { price: 68000, gamma: 0.55, explanation: "스퀴즈 위험 구간: 가격 상승에 따른 기계적 현물 매수 폭증" },
  { price: 69000, gamma: 0.88, explanation: "초고위험 감마 구간: 현물 가격 상승 시 마켓메이커 무차별 폭매수 유발" },
  { price: 70000, gamma: 1.00, explanation: "등가격(ATM) 감마 피크: 델타 변동성이 최대치에 도달하는 순간" },
  { price: 71000, gamma: 0.85, explanation: "내가격(ITM) 진입: 스퀴즈 압력 유지되나 추가 델타 상승률 둔화" },
  { price: 72000, gamma: 0.50, explanation: "내가격(ITM) 영역: 딜러 헤징 기완료 국면" },
  { price: 73000, gamma: 0.22, explanation: "깊은 내가격: 델타가 1.0에 수렴하며 단순 1대1 헤징" },
  { price: 74000, gamma: 0.08, explanation: "안정화 국면" }
];

// 8. Coinglass style Order Book Candlestick & Wall Overlay Data
// A simulated timeframe of BTC Price action with overlaid major Buy/Sell walls
export const coinglassOrderBookData = [
  { time: "09:00", open: 70100, high: 70800, low: 70000, close: 70600, volume: 1500 },
  { time: "10:00", open: 70600, high: 71200, low: 70500, close: 71000, volume: 1800 },
  { time: "11:00", open: 71000, high: 71800, low: 70900, close: 71400, volume: 2200 },
  { time: "12:00", open: 71400, high: 71500, low: 70800, close: 71100, volume: 1400 },
  { time: "13:00", open: 71100, high: 72100, low: 71000, close: 71900, volume: 3100 },
  { time: "14:00", open: 71900, high: 72500, low: 71600, close: 72200, volume: 2800 },
  { time: "15:00", open: 72200, high: 72800, low: 72100, close: 72400, volume: 2000 },
  { time: "16:00", open: 72400, high: 73300, low: 72300, close: 73100, volume: 3500 },
  { time: "17:00", open: 73100, high: 73400, low: 72700, close: 72950, volume: 1900 },
  { time: "18:00", open: 72950, high: 73600, low: 72800, close: 73500, volume: 4100 }
];

export const orderBookWalls = [
  { price: 74500, type: "sell", volume: "480M", intensity: 0.9, description: "기관 헤지펀드 이익실현 매도벽" },
  { price: 74000, type: "sell", volume: "620M", intensity: 1.0, description: "역사적 최고점 인근 매도벽 (감마 스퀴즈 방어벽)" },
  { price: 73500, type: "sell", volume: "350M", intensity: 0.7, description: "마이너 마이너 저항선 매도벽" },
  { price: 72000, type: "buy", volume: "280M", intensity: 0.5, description: "중단기 피벗 지지 매수벽" },
  { price: 71000, type: "buy", volume: "450M", intensity: 0.8, description: "M2 통화 수급 기반 강력 기관 지지 매수벽" },
  { price: 70000, type: "buy", volume: "750M", intensity: 1.0, description: "라운드 피겨(심리적 초강력 지지) 매수벽" }
];
