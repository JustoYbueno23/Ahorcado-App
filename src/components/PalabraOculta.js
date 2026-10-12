import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colores } from '../theme/colores';
import { normalizar } from '../hooks/useJuego';

export default function PalabraOculta({ palabra, aciertos }) {
    return (
        <View style={styles.fila}>
            {palabra.split('').map((letraOriginal, index) => {
                if (letraOriginal === ' ') {
                    return <View key={index} style={styles.casillaEspacio} />
                }
                const aciertosLimpios = aciertos.map((a) => normalizar(a));
                const mostrar = aciertosLimpios.includes(normalizar(letraOriginal)) ? letraOriginal : '_';

                return (
                    <View key={index} style={styles.casilla}>
                        <Text style={styles.textoCasilla}> {mostrar} </Text>
                    </View>

                );
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    fila: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        flexWrap: 'wrap',
    },

    casilla: {
        width: 40,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        backgroundColor: colores.superficie,
    },

    casillaEspacio: {
        width: 16,
        height: 48,
    },

    textoCasilla: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.encabezado,
    },
});