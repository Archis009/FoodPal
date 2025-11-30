import axios from 'axios';

const API_KEY = '419f38b7553444588e6960fe89d3a0c6'; // ⚠️ In a real app, use .env
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    },
});

export const searchRecipesByIngredients = async (ingredients) => {
    try {
        const response = await api.get('/findByIngredients', {
            params: {
                ingredients,
                number: 10,
                ranking: 1,
                ignorePantry: true,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

export const getRecipeDetails = async (id) => {
    try {
        const response = await api.get(`/${id}/information`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};

export default api;
