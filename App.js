import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';

import HomeScreen from './src/screens/HomeScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import RecipesScreen from './src/screens/RecipesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <NavigationContainer theme={{ colors: { background: theme.colors.background } }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Ingredients" component={IngredientsScreen} />
          <Stack.Screen name="Recipes" component={RecipesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
