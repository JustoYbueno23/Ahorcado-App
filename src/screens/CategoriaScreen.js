import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores";
import { useNavigation } from '@react-navigation/native';

export default function CategoriaScreen({ route }) {
    const navigation = useNavigation();
    //const [text] = route.CategoriaScreen;

    const abrirConfiguracion = () => {
        navigation.navigate('Configuracion', { nombre: 'Configuracion' });
    };

    const abrirJuego = () => {
        navigation.navigate('Juego');
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={styles.tituloPantalla}>CATEGORIA Y NIVEL</Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.configButton,
                        pressed && styles.configButtonPresionado,
                    ]}
                    onPress={abrirConfiguracion}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir configuracion"
                >
                    <Ionicons name='settings-outline' size={24} color={colores.encabezado} />
                </Pressable>
            </View>

            <View style={styles.seccionCate}>
                <Text style={styles.tituloPantalla}>CATEGORIA</Text>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> Capitales </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> Animales </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> Frutas </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> Comidas </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> Aleatorio </Text>
                </Pressable>

                <View style={styles.seccionDifi}>
                    <Text style={styles.tituloPantalla}>Niveles</Text>
                    <View style={styles.filaNiveles}>
                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                pressed && styles.ButtonPresionado,
                            ]}
                            onPress={abrirJuego}>
                            <Text style={styles.textButton}> Facil </Text>
                        </Pressable>

                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                pressed && styles.ButtonPresionado,
                            ]}
                            onPress={abrirJuego}>
                            <Text style={styles.textButton}> Medio </Text>
                        </Pressable>

                        <Pressable style={({ pressed }) =>
                            [
                                styles.buttonLevel,
                                pressed && styles.ButtonPresionado,
                            ]}
                            onPress={abrirJuego}>
                            <Text style={styles.textButton}> Dificil </Text>
                        </Pressable>
                    </View>

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

    logo: {
        width: 370,
        height: 200,
        alignSelf: 'center',
        marginVertical: 8,
    },

    configButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },

    configButtonPresionado: {
        opacity: 0.6,
    },

    seccionCate: {
        flex: 1,
        justifyContent: 'flex-start ',
        gap: 12,
        paddingBottom: 16,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: colores.superficie,
    },

    Button: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
    },

    ButtonPresionado: {
        opacity: 0.6,
    },

    textButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    seccionDifi:{
        marginTop: 8,
    },

    filaNiveles:{
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

});