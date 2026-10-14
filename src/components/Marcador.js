import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colores } from '../theme/colores';
import { useTema } from '../hooks/useTema';

export default function Marcador({vidas, puntaje, tiempo}) {
    const tema = useTema();
    return(
        <View style={styles.contenedor}>
            <Text style={[styles.texto, { color: tema.texto }]}>Vidas: {vidas}</Text>
            <Text style={[styles.texto, { color: tema.texto }]}>Puntos: {puntaje}</Text>
            <Text style={[styles.texto, { color: tema.texto }]}>Tiempo: {tiempo == null ? '--': tiempo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },

    texto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colores.encabezado 
    },
})