import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores";
import { useNavigation } from '@react-navigation/native';

export default function InicioScreen() {
    const [text, onChangeText] = useState('');
    const navigation = useNavigation();

    const abrirConfiguracion = () => {
        navigation.navigate('Configuracion', {nombre: 'Configuracion'});
    };

    const abrirJuego = () => {
        if (text === '') {
            alert('Escribe tu nombre para jugar')
            return;
        }
        navigation.navigate('Categoria', {nombre: text});
    };
    
    const abrirEstadisticas = () => {
        navigation.navigate('Estadisticas', {nombre: 'Estadisticas'});
    }

    const abrirInstrucciones = () => {
        navigation.navigate('Instrucciones', {nombre: 'Instrucciones'});
    }


    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={styles.tituloPantalla}>AHORCADO</Text>

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

            <Image source={require('../../assets/Icono-Ahorcado.png')}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="Logo ahorcado"
            />

            <View style={styles.formulario}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Escriba un nombre"
                    placeholderTextColor="#94A3B8"
                />
                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirJuego}>
                    <Text style={styles.textButton}> JUGAR </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirEstadisticas}>
                    <Text style={styles.textButton}> ESTADISTICAS </Text>
                </Pressable>

                <Pressable style={({ pressed }) =>
                    [
                        styles.Button,
                        pressed && styles.ButtonPresionado,
                    ]}
                    onPress={abrirInstrucciones}>
                    <Text style={styles.textButton}> INSTRUCCIONES </Text>
                </Pressable>
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

    formulario: {
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

});
