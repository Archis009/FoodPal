import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from './src/theme';

import HomeScreen from './src/screens/HomeScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetailsScreen from './src/screens/RecipeDetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Ingredients" component={IngredientsScreen} />
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: 'rgba(255,255,255,0.1)',
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// ... imports

import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  console.log('Theme fonts:', theme.fonts);

  const navigationTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: theme.colors.background,
      primary: theme.colors.primary,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: 'rgba(255,255,255,0.1)',
      notification: theme.colors.error,
    },
    // Pass fonts to Navigation theme in case v7 or some component needs them
    fonts: theme.fonts,
  };

  return (
    <FavoritesProvider>
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <MaterialCommunityIcons {...props} />,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        <NavigationContainer theme={navigationTheme}>
          <MainTabs />
        </NavigationContainer>
      </PaperProvider>
    </FavoritesProvider>
  );
}
