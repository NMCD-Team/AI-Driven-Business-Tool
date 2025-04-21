import React from "react";

// AnalysisResults.tsx
interface AnalysisResultsProps {
  results: {
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
  };
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  if (!results) {
    return <div>Loading... or No data available.</div>; // Appropriate message
  }

  const analysis = results.analysis;  
  const renderList = (data: string[] | undefined, noDataMessage: string) => {
    return Array.isArray(data) ? (
      data.map((item, index) => <li key={index}>{item}</li>)
    ) : (
      <li>{noDataMessage}</li>
    );
  };
  
  return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Business Analysis Results</h2>
        
          {/* Market Position Section */}
          <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Market Position</h3>
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium">Competitors</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.market_position?.competitors, "No competitors data available.")}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Market Share</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.market_position?.market_share, "No market share data available.")}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Positioning</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.market_position?.positioning, "No positioning data available.")}
              </ul>
            </div>
          </div>
        </section>

        {/* Growth Potential Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Growth Potential</h3>
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium">Opportunities</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.growth_potential?.opportunities, "No opportunities data available.")}
              </ul>
            </div>
            {/* ... Risks and Growth Indicators (use renderList similarly) */}
            <div>
              <h4 className="font-medium">Risks</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.growth_potential?.risks, "No risks data available.")}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Growth Indicators</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.growth_potential?.growth_indicators, "No growth indicators data available.")}
              </ul>
            </div>
          </div>
        </section>

        {/* Operational Insights Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Operational Insights</h3>
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium">Processes</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.operational_insights?.processes, "No processes data available.")}
              </ul>
            </div>
            {/* ... Resources and Efficiency Metrics (use renderList similarly) */}
            <div>
              <h4 className="font-medium">Resources</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.operational_insights?.resources, "No resources data available.")}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Efficiency Metrics</h4>
              <ul className="list-disc pl-5">
                {renderList(analysis?.operational_insights?.efficiency_metrics, "No efficiency metrics data available.")}
              </ul>
            </div>
          </div>
        </section>

        {/* Strategic Recommendations Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Strategic Recommendations</h3>
          <div className="grid gap-4">
            {analysis?.strategic_recommendations?.map((rec, index) => (
              <div key={index} className="p-4 border rounded">
                <h4 className="font-medium">{rec.action}</h4>
                <p className="text-gray-600">{rec.context}</p>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Priority: {rec.priority}
                </span>
              </div>
            )) || <p>No recommendations available.</p>} {/* Conditional rendering */}
          </div>
        </section>
      </div>
    );
  };

export default AnalysisResults;