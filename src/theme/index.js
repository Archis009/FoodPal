import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF6B6B', // Modern coral/red for food
        secondary: '#4ECDC4', // Fresh teal
        background: '#F7F9FC', // Light gray/blue background
        surface: '#FFFFFF',
        error: '#B00020',
        text: '#2D3436',
        onSurface: '#2D3436',
        placeholder: '#A4B0BE',
    },
    roundness: 12,
};
