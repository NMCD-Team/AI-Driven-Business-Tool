
def create_narrative_text(data):
    return (
        f"Company Name: {data.get('company_name', 'N/A')}\n"
        f"Industry/Niche: {data.get('industry_niche', 'N/A')}\n"
        f"Years in Business: {data.get('years_in_business', 'N/A')}\n"
        f"Number of Employees: {data.get('number_of_employees', 'N/A')}\n"
        f"Main Products/Services: {data.get('main_products', 'N/A')}\n"
        f"Current Performance: {data.get('current_performance', 'N/A')}\n"
        f"Biggest Challenges: {data.get('biggest_challenges', 'N/A')}\n"
        f"Opportunities for Locations: {data.get('geographic_locations', 'N/A')}\n"
        f"Target Market/Customer Segments: {data.get('target_customers', 'N/A')}\n"
        f"Marketing Strategies: {data.get('marketing_research', 'N/A')}\n"
        f"Brand Identity: {data.get('brand_identity', 'N/A')}\n"
        f"Competitors: {data.get('main_competitors', 'N/A')}\n"
        f"Brand Values: {data.get('brand_values', 'N/A')}\n"
        f"Brand Assets: {data.get('brand_assets', 'N/A')}\n"
        f"Organizational Structure: {data.get('organizational_structure', 'N/A')}\n"
        f"Operations Management: {data.get('operations_management', 'N/A')}\n"
        f"Business Plan: {data.get('business_plan', 'N/A')}\n"
        f"Business Goals: {data.get('business_goals', 'N/A')}\n"
        f"Operational Bottlenecks: {data.get('operational_challenges', 'N/A')}\n"
        f"Progress Tracking: {data.get('progress_tracking', 'N/A')}\n"
        f"Business Description: {data.get('business_description', 'N/A')}\n"
        f"Additional Info: {data.get('additional_info', 'N/A')}\n"
        f"Specific Questions: {data.get('specific_questions', 'N/A')}\n"

    )


