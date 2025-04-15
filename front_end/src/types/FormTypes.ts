export interface AnalysisResult {
  status: string;
  analysis: {
    market_position: {
      competitors: string[];
      market_share: string[];
      positioning: string[];
    };
    growth_potential: {
      opportunities: string[];
      risks: string[];
      growth_indicators: string[];
    };
    operational_insights: {
      processes: string[];
      resources: string[];
      efficiency_metrics: string[];
    };
    strategic_recommendations: Array<{
      action: string;
      context: string;
      priority: string;
    }>;
  };
}
export interface BusinessFormData {
  // Section 1
  email: string;
  full_name: string;

  // Section 2 - General Business Information
  company_name: string;
  industry_niche: string;
  years_in_business: string;
  number_of_employees: string;
  annual_revenue: string;
  geographic_locations: string;

  // Section 3 - Current State Assessment
  main_products: string;
  current_performance: string;
  biggest_challenges: string;

  // Section 4 - Ideal State Vision
  business_vision: string;
  primary_goals: string;
  specific_outcomes: string;

  // Section 5 - Market Research and Analysis
  market_research: string;
  target_customers: string;
  main_competitors: string;

  // Section 6 - Branding
  brand_identity: string;
  brand_values: string;
  brand_assets: string;

  // Section 7 - Operations Setup
  organizational_structure: string;
  operations_management: string;
  operational_challenges: string;

  // Section 8 - Business Plan and Goals
  business_plan: string;
  business_goals: string;
  progress_tracking: string;

  // Section 9 - Additional Information
  additional_info: string;
  specific_questions: string;
}