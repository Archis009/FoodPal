import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
    const theme = useTheme();
    const { favorites } = useFavorites();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, marginBottom: 10 }}>
                    Favorites
                </Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyContent}>
                    <Text variant="bodyLarge" style={{ color: theme.colors.placeholder }}>
                        No favorites yet. Start exploring!
                    </Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.list}>
                    {favorites.map((recipe) => (
                        <Card
                            key={recipe.id}
                            style={[styles.card, { backgroundColor: theme.colors.surface }]}
                            onPress={() => navigation.navigate('Home', {
                                screen: 'RecipeDetails',
                                params: { recipeId: recipe.id }
                            })}
                        >
                            <Card.Cover source={{ uri: recipe.image }} />
                            <Card.Title
                                title={recipe.title}
                                titleStyle={{ color: theme.colors.onSurface, fontWeight: 'bold' }}
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
        padding: 20,
        paddingBottom: 10,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
    },
});
