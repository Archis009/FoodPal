import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import { Text, ActivityIndicator, useTheme, IconButton, Chip, Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipeDetails } from '../services/api';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure expo-linear-gradient is installed if using it, or fallback to View

import { useFavorites } from '../context/FavoritesContext';

export default function RecipeDetailsScreen({ navigation, route }) {
    const theme = useTheme();
    const { recipeId } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const isFav = details ? isFavorite(details.id) : false;

    const toggleFavorite = () => {
        if (!details) return;
        if (isFav) {
            removeFavorite(details.id);
        } else {
            addFavorite({
                id: details.id,
                title: details.title,
                image: details.image,
                missedIngredientCount: 0, // Fallback or store actual if passed
            });
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [recipeId]);

    const fetchDetails = async () => {
        try {
            const data = await getRecipeDetails(recipeId);
            setDetails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!details) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={{ color: theme.colors.error }}>Failed to load recipe.</Text>
                <Button onPress={() => navigation.goBack()}>Go Back</Button>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: details.image }} style={styles.image} />
                    <IconButton
                        icon="arrow-left"
                        iconColor="white"
                        containerColor="rgba(0,0,0,0.5)"
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    />
                    <IconButton
                        icon={isFav ? "heart" : "heart-outline"}
                        iconColor={isFav ? theme.colors.error : "white"}
                        containerColor="rgba(0,0,0,0.5)"
                        style={styles.favoriteButton}
                        onPress={toggleFavorite}
                    />
                </View>

                <View style={styles.content}>
                    <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                        {details.title}
                    </Text>

                    <View style={styles.metaContainer}>
                        <Chip icon="clock-outline" style={styles.chip} textStyle={{ color: theme.colors.onSurface }}>
                            {details.readyInMinutes} mins
                        </Chip>
                        <Chip icon="account-group-outline" style={styles.chip} textStyle={{ color: theme.colors.onSurface }}>
                            {details.servings} servings
                        </Chip>
                        <Chip icon="thumb-up-outline" style={styles.chip} textStyle={{ color: theme.colors.onSurface }}>
                            {details.aggregateLikes} likes
                        </Chip>
                    </View>

                    <Divider style={styles.divider} />

                    <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Ingredients
                    </Text>
                    {details.extendedIngredients?.map((ing) => (
                        <View key={ing.id} style={styles.ingredientRow}>
                            <Text style={[styles.bullet, { color: theme.colors.primary }]}>•</Text>
                            <Text style={[styles.ingredientText, { color: theme.colors.onSurface }]}>
                                {ing.original}
                            </Text>
                        </View>
                    ))}

                    <Divider style={styles.divider} />

                    <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Instructions
                    </Text>
                    {details.analyzedInstructions?.[0]?.steps ? (
                        details.analyzedInstructions[0].steps.map((step) => (
                            <View key={step.number} style={styles.stepContainer}>
                                <View style={[styles.stepNumber, { backgroundColor: theme.colors.surface }]}>
                                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{step.number}</Text>
                                </View>
                                <Text style={[styles.stepText, { color: theme.colors.onSurface }]}>
                                    {step.step}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: theme.colors.onSurface }}>
                            {details.instructions?.replace(/<\/?[^>]+(>|$)/g, '') || 'No instructions available.'}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    imageContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 40,
        right: 10,
    },
    content: {
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#121212', // Match theme background
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#2C2C2C',
    },
    divider: {
        marginVertical: 20,
        backgroundColor: '#333',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    ingredientRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    bullet: {
        fontSize: 20,
        marginRight: 10,
        lineHeight: 22,
    },
    ingredientText: {
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepText: {
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
    },
});
