import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import AnalysisResults from "./AnalysisResults";
import { AnalysisResult } from "../types/FormTypes";

const parseAnalysisResult = (text: string) => {
  // split into sections
  const sections = text.split('\n\n').reduce((acc, block) => {
    const [titleLine, ...body] = block.split('\n');
    const key = titleLine.replace(':', '').trim().toLowerCase().replace(/\s+/g, '_');
    acc[key] = body.map(line => line.replace(/^- /, '').trim());
    return acc;
  }, {} as Record<string, string[]>);

  return {
    analysis: {
      market_position: {
        competitors: sections['market_position'].filter(l => l.match(/%/)),
        market_share: sections['market_position']
                   .filter(l => /\d+%/.test(l)),
        positioning: sections['market_position']
                   .filter(l => !/\d+%/.test(l)),
      },
      growth_potential: {
        opportunities: sections['growth_potential']
                       .filter(l => l.match(/opportun/i) || /\d+%/.test(l)),
                    risks: sections['growth_potential']
                       .filter(l => /risk/i.test(l) || /\bweeks\b/.test(l)),
                     

        growth_indicators: sections['growth_potential']
                         .filter(l => /\+?\d+%/.test(l)),
      },
      operational_insights: {
        processes: sections['operational_insights']
                  .filter(l => /reduce|streamline/i.test(l)),
        resources: sections['operational_insights']
                  .filter(l => /hire|contract/i.test(l)),
        efficiency_metrics: sections['operational_insights']
                         .filter(l => /track/i.test(l)),
      },
      strategic_recommendations: sections['strategic_recommendations'].map(line => {
        const [action, priorityPart] = line.split('Priority:');
        // simple priority extraction
        const priority = (priorityPart || '').trim().toLowerCase() as 'high'|'medium'|'low';
        return { action: action.trim(), context: '', priority: priority || 'medium' };
      })
    }
  };
};

const BusinessForm = () => {
    const [formData, setFormData] = useState({
        // Section 1
        email: "",
        full_name: "",

        // Section 2 - General Business Information
        company_name: "",
        industry_niche: "",
        years_in_business: "",
        number_of_employees: "",
        annual_revenue: "",
        geographic_locations: "",

        // Section 3 - Current State Assessment
        main_products: "",
        current_performance: "",
        biggest_challenges: "",

        // Section 4 - Ideal State Vision
        business_vision: "",
        primary_goals: "",
        specific_outcomes: "",

        // Section 5 - Market Research
        market_research: "",
        target_customers: "",
        main_competitors: "",

        // Section 6 - Branding
        brand_identity: "",
        brand_values: "",
        brand_assets: "",

        // Section 7 - Operations Setup
        organizational_structure: "",
        operations_management: "",
        operational_challenges: "",

        // Section 8 - Business Plan and Goals
        business_plan: "",
        business_goals: "",
        progress_tracking: "",
        business_description: "",

        // Section 9 - Additional Information
        additional_info: "",
        specific_questions: "",
    });

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const parseAnalysisResult = (text: string) => {
        const sections = text.split("\n\n");

        const extractSection = (section: string, label: string) =>
            section
                .replace(label, "")
                .split("\n")
                .map((line) => line.replace(/^- /, "").trim())
                .filter(Boolean);

        const marketPositionSection =
            sections.find((s) => s.startsWith("Market Position:")) || "";
        const growthSection =
            sections.find((s) => s.startsWith("Growth Potential:")) || "";
        const operationsSection =
            sections.find((s) => s.startsWith("Operational Insights:")) || "";
        const strategySection =
            sections.find((s) => s.startsWith("Strategic Recommendations:")) ||
            "";

        return {
            analysis: {
                market_position: {
                    competitors: extractSection(
                        marketPositionSection,
                        "Market Position:"
                    ),
                    market_share: [], // Fill in with better parsing if needed
                    positioning: [], // Same here
                },
                growth_potential: {
                    opportunities: extractSection(
                        growthSection,
                        "Growth Potential:"
                    ),
                    risks: [],
                    growth_indicators: [],
                },
                operational_insights: {
                    processes: extractSection(
                        operationsSection,
                        "Operational Insights:"
                    ),
                    resources: [],
                    efficiency_metrics: [],
                },
                strategic_recommendations: extractSection(
                    strategySection,
                    "Strategic Recommendations:"
                ).map((line) => ({
                    action: line,
                    context: "General",
                    priority: "medium",
                })),
            },
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state
        setError(null);

        try {
            console.log("Submitting:", formData);
            const response = await fetch("http://localhost:8000/api/analyze/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.error || response.statusText;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("API Response:", data);

            setAnalysisResult(data.analysis_results); // Assuming the response has a structure like { analysis_results: { ... } }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function displayArray(competitors: any): React.ReactNode {
        throw new Error("Function not implemented.");
    }

    const displayObjectArray = (
        arr: { action: string; context: string; priority: string }[]
    ) => {
        return arr.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                    <strong>Action:</strong> {item.action}
                </Typography>
                <Typography variant="body1">
                    <strong>Context:</strong> {item.context}
                </Typography>
                <Typography variant="body1">
                    <strong>Priority:</strong> {item.priority}
                </Typography>
            </Box>
        ));
    };

    return (
        <Paper elevation={3} sx={{ p: 4, m: 2, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                NMCD Inc. Online Consultation Intake Form
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Time: 15 to 30 minutes to thoroughly complete the assessment.
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                company_name: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="industry_niche"
                        label="Industry/Niche"
                        value={formData.industry_niche}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                industry_niche: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="years_in_business"
                        label="Years in Business"
                        value={formData.years_in_business}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                years_in_business: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="number_of_employees"
                        label="Number of Employees"
                        value={formData.number_of_employees}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                number_of_employees: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="annual_revenue"
                        label="Annual Revenue (approximate)"
                        value={formData.annual_revenue}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                annual_revenue: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="geographic_locations"
                        label="Geographic Location(s) of Operations"
                        value={formData.geographic_locations}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                geographic_locations: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                main_products: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="current_performance"
                        label="What are the biggest challenges or obstacles you currently face in your business?"
                        value={formData.current_performance}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                current_performance: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="biggest_challenges"
                        label="Biggest Challenges"
                        value={formData.biggest_challenges}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                biggest_challenges: e.target.value,
                            })
                        }
                    />
                    <Typography variant="h5">
                        Section 4 of 9 - Ideal State Vision
                    </Typography>
                    <TextField
                        required
                        name="business_vision"
                        label="What is your vision for the future of your business? Where do you see your business in the next 1-3 years?"
                        value={formData.business_vision}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                business_vision: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="primary_goals"
                        label="What are your primary goals and objectives for your business in the short term (next 6-12 months) and long term (next 1-3 years)?"
                        value={formData.primary_goals}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                primary_goals: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="specific_outcomes"
                        label="What specific outcomes or achievements would indicate success for your business?"
                        value={formData.specific_outcomes}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                specific_outcomes: e.target.value,
                            })
                        }
                    />
                    <Typography variant="h5">
                        Section 5 of 9 - Brand Research
                    </Typography>
                    <TextField
                        required
                        name="market_research"
                        label="Have you conducted any market research or analysis for your business? If yes, please provide details."
                        value={formData.market_research}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                market_research: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="target_customers"
                        label="Who are your target customers/clients? What are their demographics, preferences, and pain points?"
                        value={formData.target_customers}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                target_customers: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="main_competitors"
                        label="Who are your main competitors, and what sets your business apart from them?"
                        value={formData.main_competitors}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                main_competitors: e.target.value,
                            })
                        }
                    />
                    <Typography variant="h5">
                        Section 6 of 9 - Branding
                    </Typography>
                    <TextField
                        required
                        name="brand_identity"
                        label="How would you describe your current brand identity and positioning in the market?"
                        value={formData.brand_identity}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand_identity: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="brand_values"
                        label="What values or attributes do you want your brand to be associated with?
"
                        value={formData.brand_values}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand_values: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="brand_assets"
                        label="Do you have existing brand assets (logo, tagline, etc.)? If yes, please provide details."
                        value={formData.brand_assets}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand_assets: e.target.value,
                            })
                        }
                    />
                    <Typography variant="h5">
                        Section 7 of 9 - Operations Setup
                    </Typography>
                    <TextField
                        required
                        name="organizational_structure"
                        label="What is your current organizational structure? Who are the key decision-makers and stakeholders in your business?"
                        value={formData.organizational_structure}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                organizational_structure: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="operations_management"
                        label="How do you currently manage day-to-day operations, including workflow, communication, and resource allocation?"
                        value={formData.operations_management}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                operations_management: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="operational_challenges"
                        label="Are there any specific operational challenges or inefficiencies you would like to address?"
                        value={formData.operational_challenges}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                operational_challenges: e.target.value,
                            })
                        }
                    />
                    <Typography variant="h5">
                        Section 8 of 9 - Business Goals and Plans
                    </Typography>
                    <TextField
                        required
                        name="business_plan"
                        label="Do you have a formal business plan in place? If yes, please provide a summary or outline."
                        value={formData.business_plan}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                business_plan: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="business_goals"
                        label="What are your main business goals and objectives for the short term and long term?"
                        value={formData.business_goals}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                business_goals: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        name="progress_tracking"
                        label="How do you plan to measure and track progress toward your business goals?
"
                        value={formData.progress_tracking}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                progress_tracking: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        multiline
                        rows={4}
                        name="business_description"
                        label="How do you describe your business in three words?"
                        value={formData.business_description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                business_description: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        multiline
                        rows={4}
                        name="additional_info"
                        label="Is there any other information or context you believe is important for us to know about your business?"
                        value={formData.additional_info}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                additional_info: e.target.value,
                            })
                        }
                    />
                    <TextField
                        required
                        multiline
                        rows={4}
                        name="specific_questions"
                        label="Do you have any specific questions or areas of focus you would like us to address during our consultation?"
                        value={formData.specific_questions}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                specific_questions: e.target.value,
                            })
                        }
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                        }}
                    >
                        {isLoading && <CircularProgress />}{" "}
                        {/* Loading indicator */}
                        {!isLoading && (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Submit Assessment
                            </Button>
                        )}
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}{" "}
                    {/* Error display */}
                </Box>
            </form>

            {analysisResult && (
              <>
                <Typography variant="h5">Business Analysis</Typography>
                <AnalysisResults results={parseAnalysisResult(analysisResult)} />
              </>
            )}
        </Paper>
    );
};

export default BusinessForm;
