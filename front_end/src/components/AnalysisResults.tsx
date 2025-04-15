import { Box, Typography, Paper } from '@mui/material';
import { AnalysisResult } from '../types/FormTypes';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Business Analysis Report
      </Typography>

      {/* Market Position */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="secondary">
          Market Position Analysis
        </Typography>
        <ul>
          {results.analysis.market_position.map((insight: string, index: number) => (
            <li key={index}>
              <Typography>{insight}</Typography>
            </li>
          ))}
        </ul>
      </Box>

      {/* Growth Potential */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="secondary">
          Growth Potential
        </Typography>
        <ul>
          {results.analysis.growth_potential.map((insight: string, index: number) => (
            <li key={index}>
              <Typography>{insight}</Typography>
            </li>
          ))}
        </ul>
      </Box>

      {/* Operational Insights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="secondary">
          Operational Insights
        </Typography>
        <ul>
          {results.analysis.operational_insights.map((insight: string, index: number) => (
            <li key={index}>
              <Typography>{insight}</Typography>
            </li>
          ))}
        </ul>
      </Box>

      {/* Strategic Recommendations */}
      <Box>
        <Typography variant="h6" color="secondary">
          Strategic Recommendations
        </Typography>
        <ul>
          {results.analysis.strategic_recommendations.map((rec: string, index: number) => (
            <li key={index}>
              <Typography>{rec}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

export default AnalysisResults;