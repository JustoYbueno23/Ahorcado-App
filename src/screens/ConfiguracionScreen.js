import React, { useState } from 'react';
import { View, Text, Switch, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { leerConfig, guardarConfig, guardarStats, guardarRanking } from '../storage/almacenamiento';
import { colores, oscuro } from '../theme/colores';
import { useTema } from '../hooks/useTema';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracionScreen() {

    const [sonido, setSonido] = useState(true);
    const [vibracion, setVibracion] = useState(true);
    const [temaOscuro, setTemaOscuro] = useState(false);
    const tema = temaOscuro ? oscuro : colores;
    const navigation = useNavigation();

    React.useEffect(() => {
        async function cargar() {
            const config = await leerConfig();
            setSonido(config.sonido);
            setVibracion(config.vibracion);
            setTemaOscuro(config.tema === 'oscuro');
        }
        cargar();
    }, []);

    async function cambiarSonido(valor) {
        setSonido(valor);
        await guardarConfig({ sonido: valor, vibracion: vibracion, tema: temaOscuro ? 'oscuro' : 'claro' });
    }

    async function cambiarVibracion(valor) {
        setVibracion(valor);
        await guardarConfig({ sonido: sonido, vibracion: valor, tema: temaOscuro ? 'oscuro' : 'claro' });
    }

    async function cambiarTema(valor) {
        setTemaOscuro(valor);
        await guardarConfig({ sonido: sonido, vibracion: vibracion, tema: valor ? 'oscuro' : 'claro' });
    }

    function borrarTodo() {
        Alert.alert('Borrar', '¿Seguro que quieres borrar todo?', [
            { text: 'No' },
            {
                text: 'Sí', onPress: async () => {
                    await guardarStats({ jugadas: 0, ganadas: 0, perdidas: 0, racha: 0, mejorRacha: 0 });
                    await guardarRanking([]);
                    alert('Borrado');
                }
            },
        ]);
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: tema.fondo }]} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <Pressable style={styles.botonVolver} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={tema.encabezado} />
                </Pressable>
                <Text style={[styles.titulo, { color: tema.encabezado }]}>Configuración</Text>
                <View style={styles.espaciador} />
            </View>
            <View style={styles.fila}>
                <Text style={{ color: tema.texto }}>Sonido</Text>
                <Switch value={sonido} onValueChange={cambiarSonido} />
            </View>
            <View style={styles.fila}>
                <Text style={{ color: tema.texto }}>Vibración</Text>
                <Switch value={vibracion} onValueChange={cambiarVibracion} />
            </View>
            <View style={styles.fila}>
                <Text style={{ color: tema.texto }}>Tema oscuro</Text>
                <Switch value={temaOscuro} onValueChange={cambiarTema} />
            </View>
            <Pressable style={styles.botonBorrar} onPress={borrarTodo}>
                <Text style={styles.textoBoton}>Borrar estadísticas</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start'
    },

    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colores.encabezado,
        textAlign: 'center'
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 48,
        borderBottomWidth: 1,
        borderColor: '#CBD5E1'
    },

    botonBorrar: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.fallada,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },

    textoBoton: {
        color: '#fff',
        fontWeight: 'bold'
    },

});