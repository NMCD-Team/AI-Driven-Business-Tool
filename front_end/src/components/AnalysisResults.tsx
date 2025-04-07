// components/AnalysisResults.tsx
import { Box, Typography, Paper } from '@mui/material';

interface AnalysisResultsProps {
  results: {
    analysis: {
      key_entities: [string, string][];
      key_phrases: string[];
      recommendations: string[];
    };
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  return (
    <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Business Analysis Results
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="secondary">
          Key Business Entities
        </Typography>
        {results.analysis.key_entities.length > 0 ? (
          <ul>
            {results.analysis.key_entities.map((entity, index) => (
              <li key={index}>
                <Typography>
                  <strong>{entity[0]}</strong> ({entity[1]})
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">No key entities identified</Typography>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="secondary">
          Key Phrases
        </Typography>
        {results.analysis.key_phrases.length > 0 ? (
          <ul>
            {results.analysis.key_phrases.map((phrase, index) => (
              <li key={index}>
                <Typography>{phrase}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">No key phrases identified</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h6" color="secondary">
          Recommendations
        </Typography>
        {results.analysis.recommendations.length > 0 ? (
          <ul>
            {results.analysis.recommendations.map((rec, index) => (
              <li key={index}>
                <Typography>{rec}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">No recommendations available</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AnalysisResults;