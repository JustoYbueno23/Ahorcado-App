import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { leerStats, leerRanking } from '../storage/almacenamiento';
import { useTema } from '../hooks/useTema';

export default function EstadisticasScreen() {
    const [stats, setStats] = useState({ jugadas: 0, ganadas: 0, perdidas: 0, racha: 0, mejorRacha: 0 });
    const [ranking, setRanking] = useState([]);
    const tema = useTema();
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            async function cargar() {
                setStats(await leerStats());
                setRanking(await leerRanking());
            }
            cargar();
        }, [])
    );

    const porcentaje = stats.jugadas > 0 ? Math.round((stats.ganadas / stats.jugadas) * 100) : 0;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: tema.fondo }]}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={[styles.tituloPantalla, { color: tema.encabezado }]}>Estadísticas</Text>
                <Pressable style={styles.configButton} onPress={() => navigation.navigate('Configuracion')}>
                    <Ionicons name="settings-outline" size={24} color={tema.encabezado} />
                </Pressable>
            </View>

            <View style={styles.tarjetas}>
                <View style={[styles.tarjeta, { backgroundColor: tema.superficie }]}>
                    <Text style={[styles.numero, { color: tema.encabezado }]}>{stats.jugadas}</Text>
                    <Text style={{ color: tema.texto }}>Jugadas</Text>
                </View>

                <View style={[styles.tarjeta, { backgroundColor: tema.superficie }]}>
                    <Text style={[styles.numero, { color: tema.encabezado }]}>{stats.ganadas}</Text>
                    <Text style={{ color: tema.texto }}>Ganadas</Text>
                </View>
                <View style={[styles.tarjeta, { backgroundColor: tema.superficie }]}>
                    <Text style={[styles.numero, { color: tema.encabezado }]}>{porcentaje}%</Text>
                    <Text style={{ color: tema.texto }}>Victorias</Text>
                </View>
                <View style={[styles.tarjeta, { backgroundColor: tema.superficie }]}>
                    <Text style={[styles.numero, { color: tema.encabezado }]}>{stats.mejorRacha}</Text>
                    <Text style={{ color: tema.texto }}>Mejor racha</Text>
                </View>
            </View>
            <Text style={[styles.titulo, { color: tema.encabezado }]}>Top 10</Text>
            <FlatList
                data={ranking}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.fila}>
                        <Text style={{ color: tema.texto }}>{index + 1}. {item.nombre}</Text>
                        <Text style={{ color: tema.texto }}>{item.puntaje}</Text>
                    </View>
                )}
            />

        </SafeAreaView >
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

    configButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tituloPantalla: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    tarjetas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12
    },

    tarjeta: {
        flex: 1,
        minWidth: '45%',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },

    numero: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16
    },

    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#CBD5E1',
        minHeight: 48
    },
});