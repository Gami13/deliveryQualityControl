import { FlatList, StyleSheet, View } from 'react-native';
import ElementButton from './ElementButton';
import { useEffect, useState } from 'react';
import { ElementName } from '../Types';

const ElementList = ({ navigation }: any) => {
  const [elements, setElements] = useState([] as ElementName[]);
  const fetchElems = async () => {
    const response = await fetch('http://localhost:3000/allElements');
    const data = await response.json();
    setElements(data);
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
