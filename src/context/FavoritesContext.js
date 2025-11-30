import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    };

    const saveFavorites = async (newFavorites) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    };

    const addFavorite = (recipe) => {
        const newFavorites = [...favorites, recipe];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const removeFavorite = (id) => {
        const newFavorites = favorites.filter((recipe) => recipe.id !== id);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (id) => {
        return favorites.some((recipe) => recipe.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
