import * as React from 'react';
import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, TextInput, Button, Text } from 'react-native-paper';

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSearch = () => {
    setSubmitted(ingredients);
  }

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

          <Button mode="contained" onPress={handleSearch}>
            Find Recipes
          </Button>

          {submitted ? (
            <Text variant="bodyLarge" style={styles.result}>
              You entered: {submitted}
            </Text>
          ) : null}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inner: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  result: {
    marginTop: 20,
    textAlign: 'center',
  },
});