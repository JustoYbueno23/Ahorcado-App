import { StyleSheet, Text, View, SectionList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { colores } from '../theme/colores';

const DATA = [
    {
        title: 'Adivina la palabra',
        data: [
            '• Descubre la palabra oculta letra por letra.',
            '• Toca el teclado en pantalla (cada letra se usa una vez).',
            '• Tienes un límite de 6 errores antes de perder.',
            '• ¡Gana puntos extra si completas el juego con vidas!'
        ],
    },
];

export default function InstruccionesScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Text style={styles.text}>Reglas del juego</Text>

                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}

                    ListFooterComponent={() => (
                        <View style={styles.footerContainer}>
                            <Text style={styles.header}>Dificultades</Text>
                            <View style={styles.tabla}>
                                <View style={[styles.fila, styles.cabecera]}>
                                    <View style={styles.celda}>
                                        <Text style={[styles.textoCelda, styles.textoCabecera]}>Nivel</Text>
                                    </View>
                                    <View style={styles.celda}>
                                        <Text style={[styles.textoCelda, styles.textoCabecera]}>Pistas</Text>
                                    </View>
                                    <View style={styles.celda}>
                                        <Text style={[styles.textoCelda, styles.textoCabecera]}>Tiempo</Text>
                                    </View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Facil</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>2 Pistas</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Sin Limite</Text></View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Medio</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>1 Pistas</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Sin Limite</Text></View>
                                </View>
                                <View style={[styles.fila, styles.ultimaFila]}>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Dificil</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>Sin Pistas</Text></View>
                                    <View style={styles.celda}><Text style={styles.textoCelda}>90s</Text></View>
                                </View>
                            </View>

                            <Text style={styles.header}> Sistema de Puntos </Text>
                            <View style={styles.tabla}>
                                <View style={[styles.fila, styles.cabecera]}>
                                    <View style={[styles.celda, styles.colAccion]}>
                                        <Text style={[styles.textoCelda, styles.textoCabecera, { textAlign: 'left' }]}>Acción</Text>
                                    </View>
                                    <View style={[styles.celda, styles.colPuntos]}>
                                        <Text style={[styles.textoCelda, styles.textoCabecera]}>Puntos</Text>
                                    </View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={[styles.celda, styles.colAccion]} ><Text style={[styles.textoCelda, { textAlign: 'left' }]}>Letra Correcta</Text></View>
                                    <View style={[styles.celda, styles.colPuntos]} ><Text style={[styles.textoCelda, styles.colPuntos]}>+10</Text></View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={[styles.celda, styles.colAccion]} ><Text style={[styles.textoCelda, { textAlign: 'left' }]}>Letra Incorrecta</Text></View>
                                    <View style={[styles.celda, styles.colPuntos]} ><Text style={[styles.textoCelda]}>-5</Text></View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={[styles.celda, styles.colAccion]} ><Text style={[styles.textoCelda, { textAlign: 'left' }]}>Pista</Text></View>
                                    <View style={[styles.celda, styles.colPuntos]} ><Text style={[styles.textoCelda]}>-15</Text></View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={[styles.celda, styles.colAccion]} ><Text style={[styles.textoCelda, { textAlign: 'left' }]}>Ganar Partida</Text></View>
                                    <View style={[styles.celda, styles.colPuntos]} ><Text style={[styles.textoCelda,]}>+50 + (Vidas restantes x 10)</Text></View>
                                </View>
                                <View style={styles.fila}>
                                    <View style={[styles.celda, styles.colAccion]} ><Text style={[styles.textoCelda, { textAlign: 'left' }]}>Puntaje Final</Text></View>
                                    <View style={[styles.celda, styles.colPuntos]} ><Text style={[styles.textoCelda,]}>Subtotal x Nivel</Text></View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>

        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        padding: 12,
        textAlign: 'center',
        backgroundColor: colores.encabezado,
        color: 'white',
        borderRadius: 10,
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 6,
        color: colores.encabezado,
        textAlign: 'center',
    },
    item: {
        paddingVertical: 6,
    },
    itemText: {
        fontSize: 17,
        color: '#334155',
        textAlign: 'center',
    },
    footerContainer: {
        marginTop: 5,
        marginBottom: 30,
    },
    tabla: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f8fafc',
    },
    fila: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBlockColor: '#cbd5e1'
    },
    ultimaFila: {
        borderBottomWidth: 0,
    },
    cabecera: {
        borderBlockColor: '#e2e8f0'
    },
    celda: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    textoCelda: {
        fontSize: 14,
        color: '#334155',
        textAlign: 'center'
    },
    textoCabecera: {
        fontWeight: 'bold',
    },
    colAccion: {
        flex: 2,
    },
    colPuntos: {
        flex: 1,
    },
});