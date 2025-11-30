import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TextInput,
  Button,
  Text,
  Card,
  IconButton,
  Portal,
  Modal,
  ActivityIndicator,
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleSearch = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/findByIngredients',
        {
          params: {
            ingredients,
            number: 8,
            apiKey: '419f38b7553444588e6960fe89d3a0c6', // replace with your key or env
          },
        }
      );
      setRecipes(response.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async (recipe) => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      const list = saved ? JSON.parse(saved) : [];
      if (list.some((f) => f.id === recipe.id)) return;
      const updated = [...list, recipe];
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (e) {
      console.error('saveFavorite', e);
    }
  };

  const fetchDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: { apiKey: '419f38b7553444588e6960fe89d3a0c6' },
        }
      );
      setDetails(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    fetchDetails(recipe.id);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    setDetails(null);
  };

  return (
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
          {recipes.map((r) => (
            <Card key={r.id} style={styles.card} onPress={() => openRecipe(r)}>
              <Card.Title
                title={r.title}
                right={(props) => (
                  <IconButton {...props} icon="heart" onPress={() => saveFavorite(r)} />
                )}
              />
              <Card.Cover source={{ uri: r.image }} />
            </Card>
          ))}
        </ScrollView>

        <Portal>
          <Modal visible={!!selectedRecipe} onDismiss={closeRecipe} contentContainerStyle={styles.modal}>
            {detailsLoading ? (
              <ActivityIndicator animating />
            ) : details ? (
              <ScrollView>
                <Text variant="headlineSmall">{details.title}</Text>
                <Card.Cover source={{ uri: details.image }} />
                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Ingredients:</Text>
                {details.extendedIngredients?.map((ing) => <Text key={ing.id}>- {ing.original}</Text>)}
                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Instructions:</Text>
                <Text>
                  {details.instructions ? details.instructions.replace(/<\/?[^>]+(>|$)/g, '') : 'No instructions available.'}
                </Text>
              </ScrollView>
            ) : (
              <Text>No details available.</Text>
            )}
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  card: { marginBottom: 15, borderRadius: 12, elevation: 3 },
  modal: { backgroundColor: 'white', padding: 20 },
});