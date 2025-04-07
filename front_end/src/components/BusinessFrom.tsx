import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { BusinessFormData, AnalysisResult } from '../types/FormTypes';

const BusinessForm = () => {
  const [formData, setFormData] = useState<BusinessFormData>({
    email: '',
    full_name: '',
    company_name: '',
    industry_niche: '',
    years_in_business: '',
    number_of_employees: '',
    annual_revenue: '',
    geographic_locations: '',
    main_products: '',
    current_performance: '',
    biggest_challenges: '',
    business_vision: '',
    primary_goals: '',
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
      console.log('Analysis result:', data);
    } catch (error) {
      console.error('Error:', error);
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
        Business Assessment Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            required
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            name="full_name"
            label="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
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
            label="Industry Niche"
            value={formData.industry_niche}
            onChange={handleChange}
          />
          {/* Add section headers */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Business Information
          </Typography>
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
            label="Annual Revenue"
            value={formData.annual_revenue}
            onChange={handleChange}
          />
          <TextField
            required
            name="geographic_locations"
            label="Geographic Locations"
            value={formData.geographic_locations}
            onChange={handleChange}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Current State Assesment
          </Typography>
          <TextField
            required
            name="main_products"
            label="Main Products"
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
          {/* Add more fields with section headers */}
          
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

      {/* Add this section to display results */}
      {analysisResult && (
        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="h5" gutterBottom>
            Analysis Results
          </Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>
            Key Entities
          </Typography>
          <ul>
            {analysisResult.analysis.key_entities.map((entity, index) => (
              <li key={index}>{entity[0]} - {entity[1]}</li>
            ))}
          </ul>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Key Phrases
          </Typography>
          <ul>
            {analysisResult.analysis.key_phrases.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Recommendations
          </Typography>
          <ul>
            {analysisResult.analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </Box>
      )}   
    </Paper>
  );
};

export default BusinessForm;