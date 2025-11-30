import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Card, ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchRecipesByIngredients } from '../services/api';

export default function RecipesScreen({ navigation, route }) {
    const theme = useTheme();
    const { ingredients } = route.params;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, [ingredients]);

    const fetchRecipes = async () => {
        try {
            const data = await searchRecipesByIngredients(ingredients);
            setRecipes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconColor={theme.colors.onSurface} />
                <Text variant="titleLarge" style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
                    Results
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{ marginTop: 20, color: theme.colors.placeholder }}>Finding the best recipes...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.list}>
                    <Text variant="labelLarge" style={[styles.resultCount, { color: theme.colors.primary }]}>
                        Found {recipes.length} recipes for "{ingredients}"
                    </Text>

                    {recipes.map((recipe) => (
                        <Card
                            key={recipe.id}
                            style={[styles.card, { backgroundColor: theme.colors.surface }]}
                            onPress={() => navigation.navigate('RecipeDetails', { recipeId: recipe.id })}
                        >
                            <Card.Cover source={{ uri: recipe.image }} />
                            <Card.Title
                                title={recipe.title}
                                titleStyle={{ color: theme.colors.onSurface, fontWeight: 'bold' }}
                                subtitle={`Missing Ingredients: ${recipe.missedIngredientCount}`}
                                subtitleStyle={{ color: theme.colors.error }}
                            />
                        </Card>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    resultCount: {
        marginBottom: 16,
        opacity: 0.8,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
    },
});
