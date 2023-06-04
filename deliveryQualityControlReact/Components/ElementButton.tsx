import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Utils from '../Utils';
import { ElementName } from '../Types';
import { StackNavigationProp } from '@react-navigation/stack';
type Props = {
  name: string;
  code: string;
  navigation: StackNavigationProp<any, any>;
};
const ElementButton = ({ name, code, navigation }: Props) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate('Properties', { code: code });
    }}
  >
    <Text style={styles.code}>{code}</Text>
    <Text style={styles.name}>{Utils.toSentenceCase(name)}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'comicsans',
    backgroundColor: '#242424',
    width: '100%',
  },
  name: {
    fontSize: 15,
    width: '100%',
    color: 'rgb(240,240,240)',
  },
  code: {
    width: '100%',
    fontSize: 18,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',
  },
});
export default ElementButton;
