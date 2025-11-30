import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    // Ensure fonts exist (fallback for MD2/MD3 compatibility)
    fonts: {
        ...DefaultTheme?.fonts,
        medium: { fontFamily: 'System', fontWeight: '500' },
        regular: { fontFamily: 'System', fontWeight: '400' },
        light: { fontFamily: 'System', fontWeight: '300' },
        thin: { fontFamily: 'System', fontWeight: '100' },
    },
    colors: {
        ...DefaultTheme?.colors,
        primary: '#FF6B6B', // Modern coral/red for food
        secondary: '#4ECDC4', // Fresh teal
        background: '#121212', // Deep black background
        surface: '#1E1E1E', // Dark gray surface
        error: '#CF6679',
        text: '#FFFFFF',
        onSurface: '#FFFFFF',
        placeholder: '#BBBBBB',
        elevation: {
            level1: '#1E1E1E',
            level2: '#232323',
            level3: '#252525',
            level4: '#272727',
            level5: '#2C2C2C',
        },
    },
    roundness: 16,
};
