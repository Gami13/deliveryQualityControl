import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ElementList from './Components/ElementList';
import PropertyList from './Components/PropertyList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Validation from './Components/Validation';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
          headerBackTitleStyle: {
            color: 'rgb( 70,150, 200)',
          },
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
          name="Properties"
          component={PropertyList}
          options={{
            title: 'Właściwości',
          }}
        />
        <Stack.Screen
          name="Validation"
          component={Validation}
          options={{
            title: 'Walidacja',
          }}
        />
      </Stack.Navigator>
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
