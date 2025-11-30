import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, IconButton, Chip } from 'react-native-paper';
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
                <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconColor={theme.colors.onSurface} size={28} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View>
                    <Text variant="displaySmall" style={[styles.title, { color: theme.colors.onSurface }]}>
                        What's in your pantry?
                    </Text>
                    <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.placeholder }]}>
                        Enter ingredients separated by commas to find the perfect recipe.
                    </Text>

                    <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]}>
                        <TextInput
                            mode="flat"
                            placeholder="e.g. chicken, rice, tomatoes"
                            value={ingredients}
                            onChangeText={setIngredients}
                            style={styles.input}
                            textColor={theme.colors.onSurface}
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            placeholderTextColor={theme.colors.placeholder}
                            autoFocus
                        />
                    </View>

                    {ingredients.length > 0 && (
                        <View style={styles.chipContainer}>
                            {ingredients.split(',').map((ing, index) => (
                                ing.trim() ? (
                                    <Chip key={index} style={styles.chip} textStyle={{ color: theme.colors.onSurface }}>
                                        {ing.trim()}
                                    </Chip>
                                ) : null
                            ))}
                        </View>
                    )}
                </View>

                <Button
                    mode="contained"
                    onPress={handleSearch}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
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
        paddingTop: 10,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        marginBottom: 32,
        opacity: 0.7,
    },
    inputContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'transparent',
        fontSize: 18,
        height: 60,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#2C2C2C',
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
    },
});
