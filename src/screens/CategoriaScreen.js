import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useTema } from '../hooks/useTema';

export default function CategoriaScreen({ route }) {
    const navigation = useNavigation();
    const nombre = route.params ? route.params.nombre : '';
    const [categoria, setCategoria] = useState('');
    const [nivel, setNivel] = useState('');
    const tema = useTema();

    const abrirConfiguracion = () => {
        navigation.navigate('Configuracion', { nombre: 'Configuracion' });
    };

    const abrirJuego = () => {
        if (categoria === '' || nivel === '') {
            alert('Elige una categoria  y un nivel para jugar');
            return;
        }
        navigation.navigate('Juego', { nombre: nombre, categoria: categoria, nivel: nivel });
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: tema.fondo }]} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={[styles.tituloPantalla, { color: tema.encabezado }]}>CATEGORIA Y NIVEL</Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.configButton,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirConfiguracion}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir configuracion"
                >
                    <Ionicons name='settings-outline' size={24} color={colores.encabezado} />
                </Pressable>
            </View>

            <View>
                <Text style={[styles.saludo, { color: tema.texto }]}>
                    ¡Hola, <Text style={{ color: colores.boton, fontWeight: 'bold' }}>{nombre}</Text>! Elige tu reto
                </Text>
            </View>
            <View style={styles.seccionCate}>
                <Text style={styles.tituloPantalla}>CATEGORIA</Text>

                <Pressable style={[
                    styles.Button,
                    categoria === 'capitales' && styles.ButtonActivo
                ]}
                    onPress={() => setCategoria('capitales')}>
                    <Text style={styles.textButton}> Capitales </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        categoria === 'Animales Colombia' && styles.ButtonActivo
                    ]}
                    onPress={() => setCategoria('Animales Colombia')}>
                    <Text style={styles.textButton}> Animales </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        categoria === 'Frutas' && styles.ButtonActivo,
                    ]}
                    onPress={() => setCategoria('Frutas')}>
                    <Text style={styles.textButton}> Frutas </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        categoria === 'Comidas Tipicas' && styles.ButtonActivo,
                    ]}
                    onPress={() => setCategoria('Comidas Tipicas')}>
                    <Text style={styles.textButton}> Comidas </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        categoria === 'Aleatoria' && styles.ButtonActivo,
                    ]}
                    onPress={() => setCategoria('Aleatoria')}>
                    <Text style={styles.textButton}> Aleatoria </Text>
                </Pressable>

                <View style={styles.seccionDifi}>
                    <Text style={styles.tituloPantalla}>Niveles</Text>
                    <View style={styles.filaNiveles}>
                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                nivel === 'Facil' && styles.ButtonActivo,
                            ]}
                            onPress={() => setNivel('Facil')}>
                            <Text style={styles.textButton}> Facil </Text>
                        </Pressable>

                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                nivel === 'Medio' && styles.ButtonActivo,
                            ]}
                            onPress={() => setNivel('Medio')}>
                            <Text style={styles.textButton}> Medio </Text>
                        </Pressable>

                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                nivel === 'Dificil' && styles.ButtonActivo,
                            ]}
                            onPress={() => setNivel('Dificil')}>
                            <Text style={styles.textButton}> Dificil </Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.continuar}>
                    <Pressable style={({ pressed }) =>
                        [
                            styles.buttonContinuar,
                            pressed && styles.ButtonPresionado,
                        ]}
                        onPress={abrirJuego}>
                        <Text style={styles.textButton}> CONTINUAR </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    espaciador: {
        width: 48,
        height: 48,
    },

    tituloPantalla: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colores.encabezado,
    },

    saludo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colores.encabezado,
        marginVertical: 8
    },

    configButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },

    ButtonPresionado: {
        opacity: 0.6,
    },

    seccionCate: {
        flex: 1,
        gap: 12,
        paddingBottom: 16,
    },

    Button: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12
    },

    ButtonActivo: {
        backgroundColor: colores.encabezado,
    },

    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    seccionDifi: {
        marginTop: 8,
    },

    filaNiveles: {
        flexDirection: 'row',
        gap: 8,
    },

    buttonLevel: {
        flex: 1,
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },

    continuar: {
        marginTop: 12,
    },

    buttonContinuar: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
});