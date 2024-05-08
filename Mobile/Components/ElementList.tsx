import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import ElementButton from './ElementButton';
import { useContext, useEffect, useState } from 'react';
import type { ElementPretty } from '../Types';
import { AppState } from '../App';
import type { NavigationAction } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const ElementList = ({
  navigation,
}: {
  navigation: NativeStackScreenProps<Record<string, object>, 'Navigation'>;
}) => {
  const [allElements, setAllElements] = useContext(AppState);
  const [search, setSearch] = useState('');

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
        data={allElements}
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
