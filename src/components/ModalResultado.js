import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { colores } from "../theme/colores";

export default function ModalResultado({visible, ganado, palabra, puntaje, onNuevo, onMenu}) {
    return(
        <Modal visible = {visible} transparent animationType="slide">
            <View style = {styles.fondo}>
                <View style={styles.caja}>
                    <Text style={styles.titulo}> {ganado ? 'Ganaste' : 'Perdiste'}</Text>
                    <Text>Palabra: {palabra}</Text>
                    <Text>Puntaje: {puntaje}</Text>

                    <Pressable style={styles.boton} onPress={onNuevo}>
                        <Text style={styles.textoBoton}>Jugar de nuevo</Text>
                    </Pressable>

                    <Pressable style={styles.boton} onPress={onMenu}>
                        <Text style={styles.textoBoton}>Menú</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    fondo:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 24,
    },

    caja:{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        gap: 12
    },

    titulo:{
        fontSize: 22,
        fontWeight: 'bold',
        color: colores.encabezado,
        textAlign: 'center'
    },

    boton:{
        minHeight: 48,
        borderRadius: 8,
        backgroundColor: colores.boton,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBoton:{
        color: '#fff',
        fontWeight: 'bold'
    },
});