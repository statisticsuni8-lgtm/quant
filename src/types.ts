// Types for Quant Research Platform

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: 'Geopolitics' | 'Macro' | 'Labor' | 'Election' | 'Research' | string;
  ticker: string;
  timestamp: string;
  source: string;
  impact: string;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  indicatorKey: string;
  forecast: string;
  actual: string;
  previous: string;
  significance: string;
  meaningKorean: string;
  status: 'better' | 'worse' | 'neutral';
}

export interface CalendarEvent {
  id: string;
  time: string;
  country: string;
  event: string;
  importance: 'High' | 'Medium' | 'Low';
  forecast: string;
  previous: string;
  actual: string;
  impactTicker: string;
}

export interface AssetResearchDetail {
  ticker: string;
  name: string;
  currentPrice: string;
  change: string;
  isPositive: boolean;
  industry: string;
  macroFactors: string[];
  bullCase: string;
  bearCase: string;
  technicalAnalysis: string;
  quantScore: number; // 0-100
}

export interface ElectionAssetImpact {
  assetClass: string;
  republicanScenario: {
    outlook: 'Strongly Bullish' | 'Bullish' | 'Bearish' | 'Neutral';
    description: string;
    targetSectors: string[];
  };
  democraticScenario: {
    outlook: 'Strongly Bullish' | 'Bullish' | 'Bearish' | 'Neutral';
    description: string;
    targetSectors: string[];
  };
}
