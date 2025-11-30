import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Card,
  IconButton,
  Portal,
  Modal,
  ActivityIndicator,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch (e) {
      console.error('loadFavorites', e);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const updated = favorites.filter((f) => f.id !== id);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (e) {
      console.error('removeFavorite', e);
    }
  };

  const fetchDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: { apiKey: '419f38b7553444588e6960fe89d3a0c6' },
      });
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
        <Text variant="headlineMedium" style={styles.title}>❤️ Favorites</Text>
        <ScrollView style={{ marginTop: 10 }}>
          {favorites.map((r) => (
            <Card key={r.id} style={styles.card} onPress={() => openRecipe(r)}>
              <Card.Title
                title={r.title}
                right={(props) => <IconButton {...props} icon="delete" onPress={() => removeFavorite(r.id)} />}
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
  title: { textAlign: 'center', marginBottom: 10 },
  card: { marginBottom: 15, borderRadius: 12, elevation: 3 },
  modal: { backgroundColor: 'white', padding: 20 },
});