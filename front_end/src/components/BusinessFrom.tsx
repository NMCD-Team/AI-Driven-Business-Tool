import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import AnalysisResults from './AnalysisResults';
import { AnalysisResult } from '../types/FormTypes';


const BusinessForm = () => {
  const [formData, setFormData] = useState({
    // Section 1
    email: '',
    full_name: '',

    // Section 2 - General Business Information
    company_name: '',
    industry_niche: '',
    years_in_business: '',
    number_of_employees: '',
    annual_revenue: '',
    geographic_locations: '',

    // Section 3 - Current State Assessment
    main_products: '',
    current_performance: '',
    biggest_challenges: '',

    // Section 4 - Ideal State Vision
    business_vision: '',
    primary_goals: '',
    specific_outcomes: '',

    // Section 5 - Market Research
    market_research: '',
    target_customers: '',
    main_competitors: '',

    // Section 6 - Branding
    brand_identity: '',
    brand_values: '',
    brand_assets: '',

    // Section 7 - Operations Setup
    organizational_structure: '',
    operations_management: '',
    operational_challenges: '',

    // Section 8 - Business Plan and Goals
    business_plan: '',
    business_goals: '',
    progress_tracking: '',

    // Section 9 - Additional Information
    additional_info: '',
    specific_questions: ''
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting data:', JSON.stringify(formData, null, 2));
      
      const response = await fetch('http://localhost:8000/api/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      setAnalysisResult(data);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please make sure the backend server is running.');
    }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        NMCD Inc. Online Consultation Intake Form
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Time: 15 to 30 minutes to thoroughly complete the assessment.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Section 1 */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Section 1 of 9
          </Typography>
          <TextField
            required
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            helperText="This form is collecting emails"
          />
          <TextField
            required
            name="full_name"
            label="Your Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />


          {/* Section 2 */}
          <Typography variant="h5">
            Section 2 of 9 - General Business Information
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Description (optional)
          </Typography>
          <TextField
            required
            name="company_name"
            label="Company Name"
            value={formData.company_name}
            onChange={handleChange}
          />
          <TextField
            required
            name="industry_niche"
            label="Industry/Niche"
            value={formData.industry_niche}
            onChange={handleChange}
          />
          <TextField
            required
            name="years_in_business"
            label="Years in Business"
            value={formData.years_in_business}
            onChange={handleChange}
          />
          <TextField
            required
            name="number_of_employees"
            label="Number of Employees"
            value={formData.number_of_employees}
            onChange={handleChange}
          />
          <TextField
            required
            name="annual_revenue"
            label="Annual Revenue (approximate)"
            value={formData.annual_revenue}
            onChange={handleChange}
          />
          <TextField
            required
            name="geographic_locations"
            label="Geographic Location(s) of Operations"
            value={formData.geographic_locations}
            onChange={handleChange}
          />
{/* 

          {/* Section 3 */}
          <Typography variant="h5">
            Section 3 of 9 - Current State Assessment
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Description (optional)
          </Typography>
          <TextField
            required
            multiline
            rows={3}
            name="main_products"
            label="What are the main products/services offered by your business?"
            value={formData.main_products}
            onChange={handleChange}
          />
          <TextField
            required
            name="current_performance"
            label="Current Performance"
            value={formData.current_performance}
            onChange={handleChange}
          />
          <TextField
            required
            name="biggest_challenges"
            label="Biggest Challenges"
            value={formData.biggest_challenges}
            onChange={handleChange}
          />

          <Typography variant="h5">
            Section 4 of 9 - Ideal State Vision
          </Typography>
          <TextField
            required
            name="business_vision"
            label="Business Vision"
            value={formData.business_vision}
            onChange={handleChange}
          />
          <TextField
            required
            name="primary_goals"
            label="* Primary Goals"
            value={formData.primary_goals}
            onChange={handleChange}
          />
          <TextField
            required
            name="specific_outcomes"
            label="Specific Outcomes"
            value={formData.specific_outcomes}
            onChange={handleChange}
          />
          <Typography variant="h5">
            Section 5 of 9 - Market Research Analysis
          </Typography>        
          <TextField
            required
            name="market_research"
            label="Market Research"
            value={formData.market_research}
            onChange={handleChange}
          />
          <TextField
            required
            name="target_customers"
            label="Target Customers"
            value={formData.target_customers}
            onChange={handleChange}
          />
          <TextField
            required
            name="main_competitors"
            label="Main Competitors"
            value={formData.main_competitors}
            onChange={handleChange}
          />
          <Typography variant="h5">
            Section 5 of 9 - Brand Research
          </Typography>
          <TextField
            required
            name="market_research"
            label="Market Research"
            value={formData.market_research}
            onChange={handleChange}
          />
          <TextField
            required
            name="target_customers"
            label="Target Customers"
            value={formData.target_customers}
            onChange={handleChange}
          />
          <TextField
            required
            name="main_competitors"
            label="Main Competitors"
            value={formData.main_competitors}
            onChange={handleChange}
          />

          <Typography variant="h5">
            Section 6 of 9 - Branding
          </Typography>  
          <TextField
            required
            name="brand_identity"
            label="Brand Identity"
            value={formData.brand_identity}
            onChange={handleChange}
          />
          <TextField
            required
            name="brand_values"
            label="Brand Values"
            value={formData.brand_values}
            onChange={handleChange}
          />
          <TextField
            required
            name="brand_assets"
            label="Brand Assets"
            value={formData.brand_assets}
            onChange={handleChange}
          />

<Typography variant="h5">
            Section 7 of 9 - Operations Setup
          </Typography>  
          <TextField
            required
            name="organizational_structure"
            label="Organizational Structure"
            value={formData.organizational_structure}
            onChange={handleChange}
          />
          <TextField
            required
            name="operations_management"
            label="Operations Management"
            value={formData.operations_management}
            onChange={handleChange}
          />
          <TextField
            required
            name="operational_challenges"
            label="Operational Challenges"
            value={formData.operational_challenges}
            onChange={handleChange}
          />

          <Typography variant="h5">
            Section 8 of 9 - Business Goals and Plans
          </Typography>  
          <TextField
            required
            name="business_plan"
            label="Business Plan"
            value={formData.business_plan}
            onChange={handleChange}
          />
          <TextField
            required
            name="business_goals"
            label="Business Goals"
            value={formData.business_goals}
            onChange={handleChange}
          />
          <TextField
            required
            name="progress_tracking"
            label="Progress Tracking"
            value={formData.progress_tracking}
            onChange={handleChange}
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mt: 2 }}
          >
            Submit Assessment
          </Button>
        </Box>
      </form>
      // Remove the inline results section and replace it with:
      {analysisResult && <AnalysisResults results={analysisResult} />}
    </Paper>
  );
};

export default BusinessForm;