import { StyleSheet } from 'react-native';
import ElementList from './Components/ElementList';

import { NavigationContainer } from '@react-navigation/native';
import Validation from './Components/Validation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ElementPretty } from './Types';
import { ELEMENTS_URL } from './Constants';
import { createContext, useEffect, useState } from 'react';
const Stack = createNativeStackNavigator();
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const AppState = createContext<any>(undefined);

export default function App() {
  const [elements, setElements] = useState<ElementPretty[] | undefined>();
  useEffect(() => {
    fetch(ELEMENTS_URL)
      .then((response) => response.json())
      .then((data) => setElements(data));
  }, []);
  return (
    <NavigationContainer>
      <AppState.Provider value={[elements, setElements]}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgb(14,16,17)',
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'rgb( 70,150, 200)',
            },
            headerTintColor: 'rgb( 70,150, 200)',
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              title: 'Lista Elementów',
            }}
            component={ElementList}
          />
          <Stack.Screen
            name="Validation"
            component={Validation}
            options={{
              title: 'Walidacja',
            }}
          />
        </Stack.Navigator>
      </AppState.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(24, 26, 27)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 40,
  },

  list: {
    flex: 1,

    flexDirection: 'column',
  },
});
