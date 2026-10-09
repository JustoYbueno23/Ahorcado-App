import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "../screens/InicioScreen";
import CategoriaScreen from "../screens/CategoriaScreen";
import JuegoScreen from "../screens/JuegoScreen";
import InstruccionesScreen from "../screens/InstruccionesScreen";
import EstadisticasScreen from "../screens/EstadisticasScreen";
import ConfiguracionScreen from "../screens/ConfiguracionScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={InicioScreen} 
            options={{
                headerShown: false
            }} />

            <Stack.Screen name="Categoria" component={InicioScreen} 
            options={{
                tittle: 'Categoria y nivel'
            }} />

            <Stack.Screen name="Juego" component={InicioScreen} 
            options={{
                tittle: 'Juego'
            }} />

            <Stack.Screen name="Instrucciones" component={InicioScreen} 
            options={{
                tittle: 'Instrucciones'
            }} />

            <Stack.Screen name="Estadisticas" component={InicioScreen} 
            options={{
                tittle: 'Estadisticas'
            }} />
            
            <Stack.Screen name="Configuracion" component={InicioScreen} 
            options={{
                tittle: 'Estadisticas'
            }} />
        </Stack.Navigator>
    );
}