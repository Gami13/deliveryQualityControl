import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { ElementName } from './Types';
import Utils from './Utils';
import ElementButton from './Components/ElementButton';

export default function App() {
  const [elements, setElements] = useState([] as ElementName[]);
  const fetchElems = async () => {
    console.log('fetching');
    const response = await fetch('http://localhost:3000/allElements');
    const data = await response.json();
    setElements(data);
    console.log(data);
  };
  useEffect(() => {
    fetchElems();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={elements}
        renderItem={({ item }) => (
          <ElementButton name={item.name} code={item.code} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181a1b',
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
