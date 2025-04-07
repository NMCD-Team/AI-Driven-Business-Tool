// types/FormTypes.ts
export interface AnalysisResult {
    status: string;
    message: string;
    data: {
      [key: string]: string;
    };
    analysis: {
      key_entities: [string, string][];
      key_phrases: string[];
      recommendations: string[];
    };
  }
  
  export interface BusinessFormData {
    email: string;
    full_name: string;
    company_name: string;
    industry_niche: string;
    years_in_business: string;
    number_of_employees: string;
    annual_revenue: string;
    geographic_locations: string;
    main_products: string;
    current_performance: string;
    biggest_challenges: string;
    business_vision: string;
    primary_goals: string;
  }