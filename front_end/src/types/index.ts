export interface FormData {
    email: '',
    name: '',
    company: '',
    industry: '',
    years: '',
    employees: '',
    revenue: '',
    location: '',
    assesment: '',
    products: '',
    profit: ''
  }
  
  export interface AnalysisResults {
    entities: [string, string][];
    key_phrases: string[];
    recommendations: string[];
  }