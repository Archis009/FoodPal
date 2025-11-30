import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.content}>
                <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, marginBottom: 10 }}>
                    Settings
                </Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.placeholder, marginBottom: 20 }}>
                    App preferences and configurations.
                </Text>

                <Button mode="outlined" onPress={() => { }}>
                    Sign Out
                </Button>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
