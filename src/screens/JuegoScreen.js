import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import useJuego from '../hooks/useJuego'
import Teclado from '../components/Teclado';
import Marcador from '../components/Marcador';
import { colores } from "../theme/colores";
import PalabraOculta from '../components/PalabraOculta';
import ModalResultado from "../components/ModalResultado";
import { useNavigation } from '@react-navigation/native';
import  Ahorcado  from "../components/Ahorcado";

export default function JuegoScreen({ route }) {
    const categoria = route.params ? route.params.categoria : 'Aleatoria';
    const nivel = route.params ? route.params.nivel : 'Facil';
    const { palabra, pista, pistas, pistaVisible, elegirPalabra, procesar, aciertos, fallos,
        errores, puntaje, tiempo, usarPista, ganado, perdido,
    } = useJuego(categoria, nivel);
    const navigation = useNavigation();

    React.useEffect(() => {
        elegirPalabra();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
            {pistaVisible ? <Text>{pista}</Text> : <Text> Toca pista Para ver ayuda</Text>}
            <ModalResultado
                visible={ganado || perdido}
                ganado={ganado}
                palabra={palabra}
                puntaje={puntaje}
                onNuevo={() => { elegirPalabra() }}
                onMenu={() => navigation.popToTop()}
            />
            <Marcador vidas={6 - errores} puntaje={puntaje} tiempo={tiempo} />
            <PalabraOculta palabra={palabra} aciertos={aciertos} />
            <Ahorcado errores={errores}/>
            <Teclado procesar={procesar} aciertos={aciertos} fallos={fallos} />
            

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

