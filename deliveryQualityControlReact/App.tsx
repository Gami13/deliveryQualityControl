import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Element } from './Types';

export default function App() {
  const [elements, setElements] = useState([] as Element[]);
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
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList
        style={styles.list}
        data={elements}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name + ' -- ' + item.code}</Text>
        )}
      />
      <Text style={styles.test}>Testowy teskst</Text>
      <StatusBar style="auto" backgroundColor="red" />
      <Button title="Press me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    color: 'red',
    alignItems: 'center',
    fontSize: 20,
  },
  item: {
    margin: 10,
    fontSize: 18,
    height: 44,
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',

    flexDirection: 'column',
  },
});
