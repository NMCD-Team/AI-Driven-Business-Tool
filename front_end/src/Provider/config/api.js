export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ai-driven-business-tool.onrender.com';

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};