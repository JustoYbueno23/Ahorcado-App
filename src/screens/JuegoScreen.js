import React, { useState, useEffect } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics'
import useJuego, { normalizar }  from '../hooks/useJuego'
import Teclado from '../components/Teclado';
import Marcador from '../components/Marcador';
import { colores } from "../theme/colores";
import PalabraOculta from '../components/PalabraOculta';
import ModalResultado from "../components/ModalResultado";
import { useNavigation } from '@react-navigation/native';
import Ahorcado from "../components/Ahorcado";
import { guardarStats, guardarRanking, leerRanking, leerStats, leerConfig } from '../storage/almacenamiento';

export default function JuegoScreen({ route }) {
    const categoria = route.params ? route.params.categoria : 'Aleatoria';
    const nivel = route.params ? route.params.nivel : 'Facil';
    const nombre = route.params ? route.params.nombre : 'Jugador';
    const { palabra, pista, pistas, pistaVisible, elegirPalabra, procesar, aciertos, fallos,
        errores, puntaje, tiempo, usarPista, ganado, perdido,
    } = useJuego(categoria, nivel);
    const navigation = useNavigation();
    const [guardado, setGuardado] = useState(false);
    const [vibrar, setVibrar] = useState(true);

    useEffect(() => {
        elegirPalabra();
    }, []);

    useEffect(() => {
        async function cargar() {
            const config = await leerConfig();
            setVibrar(config.vibracion);
        }
        cargar();
    }, []);

    async function manejarLetra(letra) {
        procesar(letra);
        if (!vibrar || ganado || perdido) {
            return;
        } try {
            if (normalizar(palabra).includes(normalizar(letra))) {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            } else {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        } catch (e) { }
    }

    useEffect(() => {
        async function guardarPartida() {
            if ((ganado || perdido) && !guardado && palabra !== '') {
                const stats = await leerStats();
                const nuevo = {
                    jugadas: stats.jugadas + 1,
                    ganadas: stats.ganadas + (ganado ? 1 : 0),
                    perdidas: stats.perdidas + (perdido ? 1 : 0),
                    racha: ganado ? stats.racha + 1 : 0,
                    mejorRacha: ganado ? Math.max(stats.mejorRacha, stats.racha + 1) :
                        stats.mejorRacha,
                };
                await guardarStats(nuevo);
                const lista = await leerRanking();
                const vidas = 6 - errores;
                let mult = 1;
                if (nivel === 'Medio') mult = 2;
                if (nivel === 'Dificil') mult = 3;
                const final = ganado ? (puntaje + 50 + vidas * 10) * mult : puntaje;
                lista.push({ nombre: nombre, puntaje: final, categoria: categoria, nivel: nivel, fecha: 'hoy' });
                lista.sort((a, b) => b.puntaje - a.puntaje);
                await guardarRanking(lista.slice(0, 10));
                setGuardado(true);
            }
        }
        guardarPartida();
    }, [ganado, perdido]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
            {pistaVisible ? <Text>{pista}</Text> : <Text> Toca pista Para ver ayuda</Text>}
            <ModalResultado
                visible={ganado || perdido}
                ganado={ganado}
                palabra={palabra}
                puntaje={puntaje}
                onNuevo={() => { elegirPalabra(); setGuardado(false) }}
                onMenu={() => navigation.popToTop()}
            />
            <Marcador vidas={Math.max(0, 6 - errores)} puntaje={puntaje} tiempo={tiempo} />
            <PalabraOculta palabra={palabra} aciertos={aciertos} />
            <Ahorcado errores={errores} />
            <Teclado procesar={manejarLetra} aciertos={aciertos} fallos={fallos} />

            <View style={styles.pista}>
                <Pressable
                    style={({ pressed }) => [
                        styles.Botonpista,
                        pressed && { opacity: 0.6 },
                    ]}
                    onPress={usarPista}
                    disabled={pistas <= 0 || ganado || perdido}
                >
                    <Text style={styles.textoPista}> PISTA ({pistas})</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    pista: {
        marginTop: 8,
    },

    Botonpista: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoPista: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
})

