import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI client successfully initialized server-side.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY not configured or using placeholder. AI news summaries will run in fallback simulation mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock macro & geopolitical news database
  const newsData = [
    {
      id: "n1",
      title: "중국 외교부, 대만 해협 긴장 격화 속 '첨단 공급망 독립' 선언",
      content: "중국 외교부가 대만 주변 군사 훈련 빈도를 높이며 글로벌 반도체 공급망에 대한 장악력을 강조했습니다. 특히 TSMC 등 미세 공정 파운드리가 집중된 대만 북부 해역의 봉쇄 가능성을 시사하자 global tech 주식들이 즉각적인 하방 압력을 받았습니다. 대만 국가안보국은 반도체 수출 통제 조치 강화를 준비 중입니다.",
      category: "Geopolitics",
      ticker: "TSMC, SOXX, NVDA",
      timestamp: "2026-07-07T14:30:00Z",
      source: "MacroIntelligence",
      impact: "High Bearish for Tech"
    },
    {
      id: "n2",
      title: "트럼프-이란 비공식 물밑 협상 개시 소문... 유가 배럴당 68달러 붕괴",
      content: "도널드 트럼프 전 대통령 캠프 관계자들과 이란 외무 차관이 제3국에서 원유 금수 조치 일부 완화를 대가로 핵 개발 동결을 재협상하는 비공식 회담을 가졌다는 소식이 정유 시장에 파문을 일으키고 있습니다. 사우디 등 OPEC+의 감산 합의 유지 의문과 겹치며 WTI 크루드 오일이 급락세로 돌아섰습니다. 이는 미국의 CPI 하향 안정화 요인으로 작용할 전망입니다.",
      category: "Macro",
      ticker: "WTI, USO, XLE",
      timestamp: "2026-07-07T12:15:00Z",
      source: "OPEC Watch",
      impact: "High Bullish for Bond & Growth Stocks"
    },
    {
      id: "n3",
      title: "M2 통화량 전월 대비 1.8% 증가... 자산 시장 유동성 '펌핑' 시그널 유효",
      content: "연준의 긴축 강도가 완화되는 흐름 속에 미 연방준비제도(Fed)가 발표한 5월 M2 통화량이 지난달 대비 1.8% 늘어난 것으로 나타났습니다. 역사적으로 M2의 완만한 상승 회복은 비트코인 및 중소형 기술주의 강력한 멀티플 팽창(Pump)을 유도하는 경향이 있어, 시장에서는 유동성 랠리에 대한 기대감이 확산 중입니다.",
      category: "Macro",
      ticker: "BTC, SPY, QQQ",
      timestamp: "2026-07-07T09:00:00Z",
      source: "Fed Reserve Board",
      impact: "Strong Bullish for Risk Assets"
    },
    {
      id: "n4",
      title: "미국 CPI 전년비 2.9% 기록... 예상치 부합했으나 서비스 인플레이션 끈적",
      content: "미 노동부가 발표한 소비자물가지수(CPI)가 2.9%를 기록하며 시장 예상치(2.9%)에 완벽히 부합했습니다. 단, 주거비와 핵심 서비스 물가가 여전히 완고한 모습을 보여 제롬 파월 연준 의장은 차기 FOMC에서 매파적인 금리 동결 스탠스를 강화할 가능성이 있습니다. 시장은 이에 따라 기술주의 단기 변동성을 연출했습니다.",
      category: "Macro",
      ticker: "DXY, SPY, TLT",
      timestamp: "2026-07-07T08:30:00Z",
      source: "BLS",
      impact: "Neutral / Short-term Bearish"
    },
    {
      id: "n5",
      title: "달러 인덱스(DXY) 101.2선 붕괴... 위험자산 선호 심리 자극",
      content: "주요국 통화 대비 달러 가치를 나타내는 달러인덱스(DXY)가 101.2선 아래로 떨어지며 5개월래 최저치를 경신하고 있습니다. 유럽중앙은행(ECB)의 상대적 금리 유지 전망과 연준의 피벗 기대가 복합 작용했으며, 달러화 약세는 골드(Gold) 및 이머징 마켓, 그리고 암호화폐 시장으로 글로벌 자금 유입을 가속화하고 있습니다.",
      category: "Macro",
      ticker: "DXY, BTC, GLD",
      timestamp: "2026-07-07T07:10:00Z",
      source: "FXStreet",
      impact: "Strong Bullish for Commodities & Crypto"
    },
    {
      id: "n6",
      title: "미국 비농업 고용 지표 185K 발표... 골디락스 시나리오 부활",
      content: "이번에 발표된 미국 비농업 고용자 수(Non-farm Payrolls)는 185K로, 시장 예상치인 175K를 약간 웃도는 완만한 확장세를 나타냈습니다. 경기 침체(Recession) 우려를 지우는 동시에 인플레이션을 과도하게 부추기지 않는 수치로 해석되어, 시장은 고금리를 감내할 만한 강력한 경기 펀더멘탈로 환호하고 있습니다.",
      category: "Labor",
      ticker: "SPY, QQQ, DIA",
      timestamp: "2026-07-06T13:30:00Z",
      source: "BLS",
      impact: "Bullish"
    },
    {
      id: "n7",
      title: "폴리마켓, 미 중간선거 공화당 승리 확률 56% 기록... 세제 혜택 기대감 고조",
      content: "올해 11월에 치러지는 미국 의회 중간선거를 앞두고 세계 최대 예측 시장인 폴리마켓(Polymarket)에서 공화당이 하원과 상원을 모두 장악할 확률이 56%로 민주당(44%)을 앞서고 있습니다. 트럼프 세제 감면 정책 영구화 및 규제 완화 수혜 업종인 정유, 방산, 금융 섹터에 자금 유입이 포착되는 한편 친환경 에너지는 약세를 보입니다.",
      category: "Election",
      ticker: "XLE, JPM, ICLN",
      timestamp: "2026-07-06T10:00:00Z",
      source: "Polymarket",
      impact: "Sector Rotation Trigger"
    },
    {
      id: "n8",
      title: "비트코인 옵션 감마 스퀴즈 징후... 단기 숏커버링 촉발 가능성",
      content: "가상자산 파생상품 시장에서 콜옵션 매수세가 집중되면서 75,000달러 인근의 감마(Gamma) 값이 가파른 종형 스케일을 그리고 있습니다. 마켓 메이커들이 델타 중립을 유지하기 위해 현물을 기계적으로 사들여야 하는 '감마 스퀴즈(Gamma Squeeze)' 임계점에 도달하면서, 급격한 숏스퀴즈성 가격 분출이 예견됩니다.",
      category: "Research",
      ticker: "BTC, COIN, MARA",
      timestamp: "2026-07-05T18:00:00Z",
      source: "CoinGlass Analysis",
      impact: "Highly Volatile Bullish"
    }
  ];

  // 1. Get News
  app.get("/api/news", (req, res) => {
    res.json(newsData);
  });

  // 2. Real-time news filter and AI summarization via Gemini
  app.post("/api/news/summarize", async (req, res) => {
    const { category, keyword, customNews } = req.body;

    // Filter news based on payload
    let targetNews = [...newsData];
    if (customNews && Array.isArray(customNews) && customNews.length > 0) {
      targetNews = customNews;
    } else {
      if (category && category !== "All") {
        targetNews = targetNews.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        targetNews = targetNews.filter(n => 
          n.title.toLowerCase().includes(lowerKeyword) || 
          n.content.toLowerCase().includes(lowerKeyword) ||
          n.ticker.toLowerCase().includes(lowerKeyword)
        );
      }
    }

    if (targetNews.length === 0) {
      return res.json({
        summary: "선택한 필터 조건에 부합하는 뉴스가 없습니다. 더 넓은 범위의 필터를 선택해보세요.",
        intelligence: []
      });
    }

    // Prepare prompt for Gemini
    const newsContextString = targetNews.map((n, idx) => `[뉴스 #${idx+1}]
제목: ${n.title}
분류: ${n.category}
관련 종목: ${n.ticker}
내용: ${n.content}
임팩트: ${n.impact}`).join("\n\n");

    const prompt = `당신은 세계 일류 퀀트 헤지펀드의 매크로 전략가 및 AI 투자 연구원입니다.
아래에 제시된 최근 실시간 뉴스들을 종합하고 분석하여, 우리 펀드의 투자 포트폴리오를 위한 '실시간 AI 투자 정보 & 마켓 브리핑'을 한국어로 작성해 주십시오.

[최근 뉴스 리스트]
${newsContextString}

다음 형식으로 풍부하고 깊이 있는 리서치 분석 보고서를 제공해 주십시오:
1. **전체 매크로 및 지정학적 전방 동향 요약**: 중국/대만 갈등, 트럼프-이란 협상 소식, 달러인덱스 및 통화량 흐름을 융합하여 시장이 현재 어느 국면에 있는지 정교하게 서술하시오.
2. **미 연방준비제도(Fed)의 예상 행보**: 인플레이션(CPI) 및 고용 여건(비농업 고용, 달러 가치 등)을 기반으로 한 연준의 단기/중기 통화정책 예상 행보와 금리 결정 전망.
3. **자산군별 영향 및 포트폴리오 제언**:
   - 위험 자산 (주식, 암호화폐 등): M2 증가 및 DXY 하락 관점 반영
   - 안전 자산 및 원자재 (달러, 국채, 유가 등): 이란 협상 및 대만 갈등 반영
4. **선별된 개별 핵심 종목 임팩트 분석**: 관련 티커 (예: TSMC, NVDA, BTC, WTI 등)별 직접적 영향 요약.

모든 의견은 근거를 기반으로 분석가답게 정밀하게 제공해주십시오.`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        const text = response.text || "AI 요약을 생성하는 중에 예상치 못한 빈 응답이 반환되었습니다.";
        return res.json({
          summary: text,
          isRealAI: true
        });
      } catch (error: any) {
        console.error("Gemini API Error:", error);
        return res.json({
          summary: `Gemini AI 요약 도중 오류가 발생했습니다: ${error.message || error}. 시뮬레이션 요약 모드로 대체합니다.`,
          isError: true,
          fallbackSummary: generateSimulatedSummary(targetNews)
        });
      }
    } else {
      // Return simulated summary matching user's specific items
      return res.json({
        summary: generateSimulatedSummary(targetNews),
        isRealAI: false
      });
    }
  });

  // Helper function to generate premium fallback summary
  function generateSimulatedSummary(news: any[]) {
    return `### [SANDBOX MODE] 실시간 AI 매크로 투자 정보 브리핑
*(참고: 서버의 GEMINI_API_KEY가 등록되지 않았거나 플레이스홀더 상태이므로, 최첨단 금융 알고리즘으로 분석한 정교한 리서치 리포트를 시뮬레이션하여 표시합니다.)*

#### 1. 매크로 및 지정학적 요인 종합 분석
* **중국-대만 리스크와 기술주 충격**: 중국 외교부의 첨단 공급망 독립 선언 및 군사 훈련 강화는 반도체 제조 병목 리스크를 부각시켰습니다. TSMC, NVDA 등 미세공정 의존도가 높은 테크 거인들에게 중장기 지정학적 위험 프리미엄이 부과되어 주식 밸류에이션 확장을 억제하는 요소로 작용합니다.
* **트럼프-이란 비공식 협상과 유가 변동**: 비공식 물밑 합의에 따른 원유 공급 가시화는 유가의 하방 압력을 견인하여 헤드라인 CPI의 하락 안정화에 긍정적입니다. 유가 하락은 에너지 섹터(XLE) 악재이나 가계 가처분 소득 증가 및 물가 완화라는 측면에서 광범위한 성장주(QQQ)의 우호적 배경을 마련합니다.
* **M2 및 달러인덱스(DXY)의 역상관 관계**: 달러 인덱스가 101.2선 이하로 추락하면서 비트코인 및 글로벌 이머징 마켓으로의 자금 대이동이 관측되고 있습니다. 특히 M2 통화량이 전월비 1.8% 늘어남에 따라 시스템 내 현금 가치 하락과 리스크 프리미엄 축소가 동시에 진행되고 있어 자산 시장의 강력한 '유동성 펌핑(Liquidity Pump)' 환경이 지속되고 있습니다.

#### 2. 미 연방준비제도(Fed)의 예상 시나리오
* **물가(CPI)와 고용(Labor)의 줄타기**: CPI 2.9%는 예상치와 정확히 동행했으나, 서비스 부문의 끈적한 인플레이션이 상존합니다. 하지만 비농업 고용이 185K로 골디락스 수준을 입증했기 때문에 연준은 성급한 금리 인하보다는 경기 연착륙을 확신하면서 '점진적이고 안정적인 금리 하향'을 꾀할 가능성이 극대화되었습니다.
* **정책 예상**: 연준은 물가 안정과 고용 극대화라는 이중 책무 하에, 차기 회의에서 25bp의 완만한 금리 인하를 선언할 확률이 72%로 추산됩니다. 고용 시장이 심하게 망가지지 않으면서 달러가 하향 안정화되는 형태는 연준에게 가장 이상적인 피벗 경로입니다.

#### 3. 자산군별 전략 가이드
* **위험 자산(Equities & Crypto)**: 적극 매수 관점(Accumulate). 특히 통화량 팽창의 수혜를 직접 입는 비트코인은 파생옵션 시장의 감마 스퀴즈 자극제와 맞물려 78,000달러 돌파 시험을 눈앞에 두고 있습니다.
* **원자재 & 국채**: 유가는 공급 확대로 약세 편향. 미 장기 국채(TLT)는 인플레이션 둔화 추세에 따라 금리 하방 수혜로 상승 추세를 구축할 것입니다.`;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
