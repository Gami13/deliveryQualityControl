import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ElementList from './Components/ElementList';
import PropertyList from './Components/PropertyList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
            color: 'rgb(13, 113, 236)',
          },
          headerTintColor: 'rgb(13, 113, 236)',
          headerBackTitleStyle: {
            color: 'rgb(13, 113, 236)',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            title: 'Lista Elementów',
            headerStyle: {
              backgroundColor: 'rgb(14,16,17)',
            },
            headerTitleStyle: {
              color: 'rgb(13, 113, 236)',
            },
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
