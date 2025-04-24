import React from "react";

export interface AnalysisResultsProps {
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
  const { analysis } = results;

  const renderList = (data: string[] | undefined, noDataMessage: string) => {
    if (!data || data.length === 0) {
      return <li>{noDataMessage}</li>;
    }
    return data.map((item, idx) => <li key={idx}>{item}</li>);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Business Analysis Results</h2>

      {/* Market Position Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Market Position</h3>
        <div className="grid gap-4">
          <div>
            <ul className="list pl-5">
              {renderList(analysis.market_position.competitors, "No competitors data available.")}
            </ul>
          </div>
        </div>
      </section>

      {/* Growth Potential Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Growth Potential</h3>
        <div className="grid gap-4">
          <div>
            <ul className="list pl-5">
              {renderList(analysis.growth_potential.opportunities, "No opportunities data available.")}
            </ul>
          </div>
        </div>
      </section>

      {/* Operational Insights Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Operational Insights</h3>
        <div className="grid gap-4">
          <div>
            <ul className="list pl-5">
              {renderList(analysis.operational_insights.processes, "No processes data available.")}
            </ul>
          </div>
        </div>
      </section>

      {/* Strategic Recommendations Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Strategic Recommendations</h3>
        <div className="grid gap-4">
          {analysis.strategic_recommendations.length > 0 ? (
            analysis.strategic_recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 border rounded">
                <h4 className="font-medium">{rec.action}</h4>
                <p className="text-gray-600">{rec.context}</p>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Priority: {rec.priority}
                </span>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AnalysisResults;
