import { SafeAreaProvider } from 'react-native-safe-area-context';
import InstruccionesScreen from './src/screens/InstruccionesScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <InstruccionesScreen />
    </SafeAreaProvider>
  );
}   