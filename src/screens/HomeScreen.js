import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Keyboard } from 'react-native';
import { Text, TextInput, Button, Card, ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchRecipesByIngredients } from '../services/api';

export default function HomeScreen({ navigation }) {
    const theme = useTheme();
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!ingredients.trim()) return;

        Keyboard.dismiss();
        setLoading(true);
        try {
            const data = await searchRecipesByIngredients(ingredients);
            setRecipes(data);
        } catch (error) {
            // Error handling is managed in api service logs for now
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
                    FoodPal 🍴
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    What's in your fridge today?
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    mode="outlined"
                    label="Enter ingredients (e.g. chicken, rice)"
                    value={ingredients}
                    onChangeText={setIngredients}
                    style={styles.input}
                    right={<TextInput.Icon icon="food-apple" />}
                />
                <Button
                    mode="contained"
                    onPress={handleSearch}
                    loading={loading}
                    style={styles.button}
                    contentStyle={{ height: 50 }}
                >
                    Find Recipes
                </Button>
            </View>

            <ScrollView contentContainerStyle={styles.listContent}>
                {recipes.map((recipe) => (
                    <Card
                        key={recipe.id}
                        style={styles.card}
                        onPress={() => console.log('Navigate to details', recipe.id)}
                    >
                        <Card.Cover source={{ uri: recipe.image }} />
                        <Card.Title
                            title={recipe.title}
                            subtitle={`Used Ingredients: ${recipe.usedIngredientCount}`}
                            titleVariant="titleMedium"
                        />
                    </Card>
                ))}
                {recipes.length === 0 && !loading && (
                    <View style={styles.emptyState}>
                        <Text variant="bodyMedium" style={{ color: theme.colors.placeholder }}>
                            Enter ingredients to see magic happen!
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingBottom: 10,
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        opacity: 0.7,
        marginTop: 5,
    },
    inputContainer: {
        padding: 24,
        paddingTop: 10,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 12,
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
    card: {
        marginBottom: 16,
        overflow: 'hidden',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 40,
    },
});
