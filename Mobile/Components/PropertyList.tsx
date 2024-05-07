import { FlatList, StyleSheet, Text, View } from 'react-native';
import ElementButton from './ElementButton';
import { useEffect, useState } from 'react';
import { Property } from '../Types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import PropertyButton from './PropertyButton';
type Props = {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
};
const PropertyList = ({ navigation, route }: Props) => {
  const code = route.params?.code;
  const [properties, setProperties] = useState([] as Property[]);
  const fetchProperties = async () => {
    console.log('fetching');
    const response = await fetch(
      'https://temporary-dqcapi-izur.vercel.app/allProperties/' + code
    );
    const data = await response.json();
    setProperties(data);
  };
  useEffect(() => {
    console.log(route.params);
    fetchProperties();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={properties}
        renderItem={({ item }) => (
          <PropertyButton
            navigation={navigation}
            property={item.property}
            code={code}
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
  property: {},
});

export default PropertyList;
