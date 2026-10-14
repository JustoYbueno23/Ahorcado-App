import React, { useState, useEffect } from 'react';
import { Text, Pressable, View, StyleSheet, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics'
import { createAudioPlayer } from "expo-audio";
import useJuego, { normalizar } from '../hooks/useJuego'
import Teclado from '../components/Teclado';
import Marcador from '../components/Marcador';
import { colores } from "../theme/colores";
import PalabraOculta from '../components/PalabraOculta';
import ModalResultado from "../components/ModalResultado";
import { useNavigation } from '@react-navigation/native';
import Ahorcado from "../components/Ahorcado";
import { guardarStats, guardarRanking, leerRanking, leerStats, leerConfig } from '../storage/almacenamiento';
import { useTema } from '../hooks/useTema';
import { Ionicons } from "@expo/vector-icons";

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
    const [sonar, setSonar] = useState(true);
    const tema = useTema();

    useEffect(() => {
        elegirPalabra();
    }, []);

    useEffect(() => {
        async function cargar() {
            const config = await leerConfig();
            setVibrar(config.vibracion);
            setSonar(config.sonido)
        }
        cargar();
    }, []);

    useEffect(() => {
        function atras() {
            if (!ganado && !perdido && palabra !== '') {
                Alert.alert('Salir', '¿Salir de la partida?', [
                    { text: 'No' },
                    { text: 'Si', onPress: () => navigation.popToTop() },
                ]);
                return true;
            }
        }
        const sub = BackHandler.addEventListener('hardwareBackPress', atras);
        return () => sub.remove();
    }, [ganado, perdido, palabra]);

    async function tocar(tipo) {
        if (!sonar) {
            return
        }
        try {
            let archivo = require('../../assets/sonidos/Aciertos.mp3');
            if (tipo === 'error') archivo = require('../../assets/sonidos/Error.mp3');
            if (tipo === 'victoria') archivo = require('../../assets/sonidos/Victorias.mp3');
            if (tipo === 'derrota') archivo = require('../../assets/sonidos/Derrota.mp3');
            const player = createAudioPlayer(archivo);
            player.play()
        } catch (e) {
            console.log('No sono', e);
        }
    }

    async function manejarLetra(letra) {
        procesar(letra);
        const acierto = normalizar(palabra).includes(normalizar(letra));
        if (vibrar && !ganado && !perdido) {
            try {
                if (acierto) {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                }
            } catch (e) { }
        }
        if (acierto) {
            await tocar('acierto');
        } else {
            await tocar('error')
        }
    }

    useEffect(() => {
        if (ganado) {
            tocar('victoria');
        }
        if (perdido) {
            tocar('derrota');
        }
    }, [ganado, perdido])


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
        <SafeAreaView style={[styles.container, { backgroundColor: tema.fondo }]} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={[styles.categoria, { color: tema.texto }]}>{categoria} • {nivel}</Text>
                <Pressable style={styles.configButton} onPress={() => navigation.navigate('Configuracion')}>
                    <Ionicons name="settings-outline" size={24} color={tema.encabezado} />
                </Pressable>
            </View>
            <Marcador vidas={Math.max(0, 6 - errores)} puntaje={puntaje} tiempo={tiempo} />
            <Ahorcado errores={errores} />
            <PalabraOculta palabra={palabra} aciertos={aciertos} />
            <Teclado procesar={manejarLetra} aciertos={aciertos} fallos={fallos} />
            <View style={[styles.cajaPista, { backgroundColor: tema.superficie }]}>
                <Text style={[styles.tituloPista, { color: tema.encabezado }]}>PISTA ({pistas})</Text>
                <Text style={[styles.textoAyuda, { color: tema.texto }]}>
                    {pistaVisible ? pista : 'Toca el botón para ver ayuda'}
                </Text>
                <Pressable
                    style={[styles.botonPista, (pistas <= 0 || ganado || perdido) && { opacity: 0.4 }]}
                    onPress={usarPista}
                    disabled={pistas <= 0 || ganado || perdido}
                >
                    <Text style={styles.textoBoton}>USAR PISTA -15</Text>
                </Pressable>
            </View>
            <ModalResultado
                visible={ganado || perdido}
                ganado={ganado}
                palabra={palabra}
                puntaje={puntaje}
                onNuevo={() => { elegirPalabra(); setGuardado(false); }}
                onMenu={() => navigation.popToTop()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    espaciador: {
        width: 48,
        height: 48
    },
    configButton:
    {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoria: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    cajaPista: {
        borderRadius: 12,
        padding: 12,
        gap: 8,
        marginTop: 8
    },
    tituloPista: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textoPistaAyuda: {
        fontSize: 16,
        textAlign: 'center'
    },
    botonPista: {
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoBotonPista: {
        color: '#fff',
        fontWeight: 'bold'
    },
    tecladoAbajo: {
        flex: 1,
        justifyContent: 'flex-end'
    },
})

