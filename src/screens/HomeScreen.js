import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient
                colors={['rgba(255, 107, 107, 0.1)', 'transparent']}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.content}>
                <View style={styles.hero}>
                    <Text variant="displayLarge" style={[styles.title, { color: theme.colors.primary }]}>
                        FoodPal
                    </Text>
                    <Text variant="headlineSmall" style={[styles.subtitle, { color: theme.colors.onSurface }]}>
                        Turn your fridge into a feast.
                    </Text>
                    <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.placeholder }]}>
                        Discover delicious recipes based on the ingredients you already have at home.
                    </Text>
                </View>

                <View style={styles.actionContainer}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Ingredients')}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                    >
                        Start Cooking
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 32,
        paddingBottom: 60,
    },
    hero: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '900',
        letterSpacing: -1,
        marginBottom: 16,
    },
    subtitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        opacity: 0.7,
        lineHeight: 24,
        maxWidth: '80%',
    },
    actionContainer: {
        width: '100%',
    },
    button: {
        borderRadius: 30,
        elevation: 4,
    },
    buttonContent: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
