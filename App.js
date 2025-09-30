import * as React from 'react';
import { useState } from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  React.useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const saveFavorite = async (recipe) => {
    try {
      if (favorites.some(fav => fav.id === recipe.id)) return; // prevent dupes
      const updated = [...favorites, recipe];
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save favorite', error);
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      const updated = favorites.filter(fav => fav.id !== recipeId);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove favorite', error);
    }
  };

  const handleSearch = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/findByIngredients',
        {
          params: {
            ingredients: ingredients,
            number: 5,
            apiKey: '419f38b7553444588e6960fe89d3a0c6',
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Text variant="headlineMedium" style={styles.title}>
            🍴 FoodPal
          </Text>

          <TextInput
            label="Enter ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
            mode="outlined"
            style={styles.input}
          />

          <Button mode="contained" onPress={handleSearch} loading={loading}>
            Find Recipes
          </Button>

        <ScrollView style={{ marginTop: 20 }}>
          {recipes
            .filter(recipe => !favorites.some(fav => fav.id === recipe.id)) // remove duplicates
            .map((recipe) => (
              <Card key={`r-${recipe.id}`} style={{ marginBottom: 15 }}>
                <Card.Title 
                  title={recipe.title} 
                  right={(props) => (
                    <IconButton 
                      {...props} 
                      icon="heart" 
                      onPress={() => saveFavorite(recipe)} 
                    />
                  )} 
                />
                <Card.Cover source={{ uri: recipe.image }} />
              </Card>
          ))}

          {favorites.length > 0 && (
            <>
              <Text variant="headlineSmall" style={{ marginTop: 20 }}>
                ❤️ Favorites
              </Text>
          {favorites.map((recipe) => (
            <Card key={`f-${recipe.id}`} style={{ marginBottom: 15 }}>
              <Card.Title 
                title={recipe.title} 
                right={(props) => (
                  <IconButton 
                    {...props} 
                    icon="delete" 
                    onPress={() => removeFavorite(recipe.id)} 
                  />
                )}
              />
              <Card.Cover source={{ uri: recipe.image }} />
            </Card>
          ))}
            </>
          )}
        </ScrollView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
});