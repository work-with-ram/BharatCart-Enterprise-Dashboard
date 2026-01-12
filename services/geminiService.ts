
import { GoogleGenAI, Type } from "@google/genai";
import { DashboardStats, InsightReport } from "../types";

export const getBusinessInsights = async (stats: DashboardStats): Promise<InsightReport> => {
  // Use process.env.API_KEY directly for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following e-commerce dashboard statistics and provide professional business insights:
    Total Revenue: $${stats.totalRevenue}
    Revenue Growth: ${stats.revenueGrowth}%
    Total Orders: ${stats.totalOrders}
    Order Growth: ${stats.orderGrowth}%
    Total Customers: ${stats.totalCustomers}
    Active Products: ${stats.activeProducts}

    Format the response as a JSON object with:
    1. summary (a paragraph of business analysis)
    2. recommendations (an array of 3 actionable business strategies)
    3. trendingCategories (an array of 3 categories likely to grow based on current performance)
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            trendingCategories: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "recommendations", "trendingCategories"]
        }
      }
    });

    // Access .text property directly as it returns the string output
    const data = JSON.parse(response.text || '{}');
    return data as InsightReport;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      summary: "We couldn't generate insights at this moment, but your revenue growth shows positive momentum. Keep focusing on customer retention strategies.",
      recommendations: [
        "Review your top-performing products for cross-selling opportunities.",
        "Launch a targeted email campaign for dormant customers.",
        "Optimize product descriptions for better SEO ranking."
      ],
      trendingCategories: ["Smart Home", "Sustainability", "Wellness"]
    };
  }
};
