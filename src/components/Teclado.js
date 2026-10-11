import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colores } from '../theme/colores';

export const LETRAS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
]

export default function Teclado({ procesar, aciertos, fallos }) {
    return (
        <View style={styles.contenedor}>

            <View style={styles.fila}>
                {LETRAS.slice(0, 7).map((letra) =>
                    <Pressable key={letra} style={[styles.tecla, aciertos.includes(letra) && styles.teclaAcierto,
                    fallos.includes(letra) && styles.teclaFallo
                    ]}
                        onPress={() => procesar(letra)}
                        disabled={aciertos.includes(letra) || fallos.includes(letra)}
                    >
                        <Text style={(aciertos.includes(letra) || fallos.includes(letra))
                            ? styles.textoTeclaClaro : styles.textoTecla}>{letra}</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.fila}>
                {LETRAS.slice(7, 14).map((letra) =>
                    <Pressable key={letra} style={[styles.tecla, aciertos.includes(letra) && styles.teclaAcierto,
                    fallos.includes(letra) && styles.teclaFallo
                    ]}
                        onPress={() => procesar(letra)}
                        disabled={aciertos.includes(letra) || fallos.includes(letra)}
                    >
                        <Text style={(aciertos.includes(letra) || fallos.includes(letra))
                            ? styles.textoTeclaClaro : styles.textoTecla}>{letra}</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.fila}>
                {LETRAS.slice(14, 21).map((letra) =>
                    <Pressable key={letra} style={[styles.tecla, aciertos.includes(letra) && styles.teclaAcierto,
                    fallos.includes(letra) && styles.teclaFallo
                    ]}
                        onPress={() => procesar(letra)}
                        disabled={aciertos.includes(letra) || fallos.includes(letra)}
                    >
                        <Text style={(aciertos.includes(letra) || fallos.includes(letra))
                            ? styles.textoTeclaClaro : styles.textoTecla}>{letra}</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.fila}>
                {LETRAS.slice(21, 27).map((letra) =>
                    <Pressable key={letra} style={[styles.tecla, aciertos.includes(letra) && styles.teclaAcierto,
                    fallos.includes(letra) && styles.teclaFallo
                    ]}
                        onPress={() => procesar(letra)}
                        disabled={aciertos.includes(letra) || fallos.includes(letra)}
                    >
                        <Text style={(aciertos.includes(letra) || fallos.includes(letra))
                            ? styles.textoTeclaClaro : styles.textoTecla}>{letra}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    contenedor: {
        width: '100%',
        padding: 8,
    },

    fila: {
        flexDirection: 'row',
        gap: 4,
    },

    tecla: {
        flex: 1,
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: colores.superficie,
        borderWidth: 1,
        borderColor: '#CBD5E1'
    },

    textoTecla: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colores.encabezado
    },

    teclaAcierto: {
        backgroundColor: colores.acertada,
        borderColor: colores.acertada,
    },

    teclaFallo: {
        backgroundColor: colores.fallada,
        borderColor: colores.fallada,
    },

    textoTeclaClaro: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

}); 