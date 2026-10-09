import React from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../theme/colores";
import { useNavigation } from '@react-navigation/native';

export default function AppNavigator() {
    const abrirConfiguracion = () => {/*Por ahora nada, luego lo cambio cuando
        las funciones */};

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.topBar}>
                <View style={styles.espaciador} />
                <Text style={styles.tituloPantalla}>AHORCADO</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.configButton,
                        pressed && styles.configButtonPresionado,
                    ]}
                    onPress={abrirConfiguracion}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir configuracion"
                >
                    <Ionicons name='settings-outline' size={24} color={colores.encabezado} />
                </Pressable>

                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    tituloPantalla: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colores.encabezado,
    },

    configButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },

    configButtonPresionado: {
        opacity: 0.6,
    },
});
