import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                <View style={styles.hero}>
                    <Text variant="displayMedium" style={[styles.title, { color: theme.colors.primary }]}>
                        FoodPal
                    </Text>
                    <Text variant="headlineSmall" style={[styles.subtitle, { color: theme.colors.onSurface }]}>
                        Cook with what you have.
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
                        Get Started
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
        alignItems: 'center',
    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 10,
    },
    subtitle: {
        opacity: 0.8,
        fontWeight: '300',
    },
    actionContainer: {
        width: '100%',
    },
    button: {
        borderRadius: 30,
    },
    buttonContent: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
