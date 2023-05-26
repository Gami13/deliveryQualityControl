import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Utils from '../Utils';
import { ElementName } from '../Types';

const ElementButton = ({ name, code }: ElementName) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      console.log(code);
    }}
  >
    <Text style={styles.code}>{code}</Text>
    <Text style={styles.name}>{Utils.toSentenceCase(name)}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  item: {
    height: 44,
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    fontFamily: 'Calibri',
    backgroundColor: '#242424',
  },
  name: {
    fontSize: 15,
    color: 'rgb(240,240,240)',
  },
  code: {
    fontSize: 18,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',
  },
});
export default ElementButton;
