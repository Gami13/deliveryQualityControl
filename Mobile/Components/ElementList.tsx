import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import ElementButton from './ElementButton';
import { useEffect, useState } from 'react';
import { ElementName } from '../Types';

const ElementList = ({ navigation }: any) => {
  const [allElements, setAllElements] = useState([] as ElementName[]); // [
  const [elements, setElements] = useState([] as ElementName[]);
  const [search, setSearch] = useState('');
  const fetchElems = async () => {
    const response = await fetch(
      'https://temporary-dqcapi-izur.vercel.app/allElements'
    );
    const data = await response.json();
    setElements(data);
    setAllElements(data);
  };
  useEffect(() => {
    const filtered = allElements.filter((element) =>
      element.name.toLowerCase().includes(search.toLowerCase())
    );
    const filtered2 = allElements.filter((element) =>
      element.code.toLowerCase().includes(search.toLowerCase())
    );
    filtered.push(...filtered2);
    //remove duplicates
    const filtered3 = filtered.filter(
      (element, index, self) =>
        index === self.findIndex((t) => t.code === element.code)
    );

    setElements(filtered3);
  }, [search]);
  useEffect(() => {
    fetchElems();
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wyszukaj"
        placeholderTextColor="rgb(164,164,164)"
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        style={styles.list}
        data={elements}
        renderItem={({ item }) => (
          <ElementButton
            name={item.name}
            code={item.code}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#242424',
    borderRadius: 10,
    color: 'white',
    padding: 10,
    marginBottom: 30,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
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
    width: '100%',
  },
});

export default ElementList;
