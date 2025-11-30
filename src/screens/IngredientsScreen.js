import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IngredientsScreen({ navigation }) {
    const theme = useTheme();
    const [ingredients, setIngredients] = useState('');

    const handleSearch = () => {
        if (!ingredients.trim()) return;
        navigation.navigate('Recipes', { ingredients });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconColor={theme.colors.onSurface} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View>
                    <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                        What's in your pantry?
                    </Text>
                    <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.placeholder }]}>
                        Enter ingredients separated by commas
                    </Text>

                    <TextInput
                        mode="outlined"
                        placeholder="e.g. chicken, rice, tomatoes"
                        value={ingredients}
                        onChangeText={setIngredients}
                        style={styles.input}
                        textColor={theme.colors.onSurface}
                        theme={{ colors: { onSurfaceVariant: theme.colors.placeholder } }}
                        autoFocus
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={handleSearch}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    disabled={!ingredients.trim()}
                >
                    Find Recipes
                </Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 10,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        marginBottom: 32,
    },
    input: {
        backgroundColor: 'transparent',
        fontSize: 18,
    },
    button: {
        borderRadius: 12,
    },
    buttonContent: {
        height: 56,
    },
});
