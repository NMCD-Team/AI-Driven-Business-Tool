def generate_analysis_prompt(assessment):
    def safe(field):
        return field if field else "Not provided."

    prompt = f"""
You are a senior business strategist. Based on the following intake form, provide an expert analysis with insights across the following areas:

1. Market Position:
   - Competitors
   - Market Share
   - Positioning

2. Growth Potential:
   - Opportunities
   - Risks
   - Growth Indicators

3. Operational Insights:
   - Processes
   - Resources
   - Efficiency Metrics

4. Strategic Recommendations

---

General Info:
Company Name: {safe(assessment.get('company_name'))}
Industry/Niche: {safe(assessment.get('industry_niche'))}
Years in Business: {safe(assessment.get('years_in_business'))}
Number of Employees: {safe(assessment.get('number_of_employees'))}
Annual Revenue: {safe(assessment.get('annual_revenue'))}
Geographic Locations: {safe(assessment.get('geographic_locations'))}

Current State:
Main Products/Services: {safe(assessment.get('main_products'))}
Performance: {safe(assessment.get('current_performance'))}
Challenges: {safe(assessment.get('biggest_challenges'))}

Vision:
Business Vision: {safe(assessment.get('business_vision'))}
Primary Goals: {safe(assessment.get('primary_goals'))}
Specific Outcomes: {safe(assessment.get('specific_outcomes'))}

Market Research:
Market Research: {safe(assessment.get('market_research'))}
Target Customers: {safe(assessment.get('target_customers'))}
Main Competitors: {safe(assessment.get('main_competitors'))}

Branding:
Brand Identity: {safe(assessment.get('brand_identity'))}
Brand Values: {safe(assessment.get('brand_values'))}
Brand Assets: {safe(assessment.get('brand_assets'))}

Operations:
Organizational Structure: {safe(assessment.get('organizational_structure'))}
Operations Management: {safe(assessment.get('operations_management'))}
Operational Challenges: {safe(assessment.get('operational_challenges'))}

Business Plans:
Business Plan: {safe(assessment.get('business_plan'))}
Business Goals: {safe(assessment.get('business_goals'))}
Progress Tracking: {safe(assessment.get('progress_tracking'))}
Business Description: {safe(assessment.get('business_description'))}

Additional Info:
Other Details: {safe(assessment.get('additional_info'))}
Questions: {safe(assessment.get('specific_questions'))}

Please provide your analysis in a clear, structured format using bullet points or short paragraphs under each section.
"""
    return prompt


def create_narrative_text(data):
    narrative = []
    
    if data.get('company_name'):
        narrative.append(f"Company Name: {data['company_name']}")
    if data.get('industry_niche'):
        narrative.append(f"Industry: {data['industry_niche']}")
    if data.get('years_in_business'):
        narrative.append(f"Years in Business: {data['years_in_business']}")
    if data.get('number_of_employees'):
        narrative.append(f"Number of Employees: {data['number_of_employees']}")
    if data.get('main_products'):
        narrative.append(f"Main Products/Services: {data['main_products']}")
    if data.get('current_performance'):
        narrative.append(f"Current Performance: {data['current_performance']}")
    if data.get('biggest_challenges'):
        narrative.append(f"Biggest Challenges: {data['biggest_challenges']}")
    if data.get('target_customers'):
        narrative.append(f"Target Customers: {data['target_customers']}")
    if data.get('primary_goals'):
        narrative.append(f"Primary Goals: {data['primary_goals']}")
    if data.get('operations_management'):
        narrative.append(f"Operations Management: {data['operations_management']}")
    if data.get('operational_challenges'):
        narrative.append(f"Operational Challenges: {data['operational_challenges']}")
    if data.get('market_research'):
        narrative.append(f"Market Research: {data['market_research']}")
    if data.get('additional_info'):
        narrative.append(f"Additional Info: {data['additional_info']}")
    if data.get('specific_questions'):
        narrative.append(f"Specific Questions: {data['specific_questions']}")

    # Join all valid narrative data into a single string
    return "\n".join(narrative) if narrative else "No valid business information provided."

