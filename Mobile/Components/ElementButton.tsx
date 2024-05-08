import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Utils from '../Utils';

type Props = {
  name: string;
  code: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  navigation: any;
};
const ElementButton = ({ name, code, navigation }: Props) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate('Validation', { code: code });
    }}
  >
    <Text style={styles.code}>{code}</Text>
    <Text style={styles.name}>{Utils.toSentenceCase(name)}</Text>
  </TouchableOpacity>
);

export function SubmitButton({ onSubmit }: { onSubmit: () => void }) {
  return (
    <TouchableOpacity style={styles.submit} onPress={onSubmit}>
      <Text style={styles.submitText}>Zweryfikuj dane</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  submit: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'comicsans',
    backgroundColor: 'rgb(12, 111, 240)',
    width: '100%',
    paddingVertical: 20,
  },
  submitText: {
    width: '100%',
    fontSize: 20,
    color: 'rgb(240,240,240)',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
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
