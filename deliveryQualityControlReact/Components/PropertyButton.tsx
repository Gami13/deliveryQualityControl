import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Utils from '../Utils';
import { ElementName } from '../Types';

import { NavigationProp } from '@react-navigation/native';
type Props = {
  property: string;
  code: string;
  navigation: NavigationProp<any, any>;
};
const PropertyButton = ({ property, code, navigation }: Props) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate('Property', { code: code, property: property });
    }}
  >
    <Text style={styles.property}>{Utils.toSentenceCase(property)}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  item: {
    height: 44,
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Calibri',
    backgroundColor: '#242424',
    width: '100%',
  },

  property: {
    width: '100%',
    fontSize: 20,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',
  },
});
export default PropertyButton;
