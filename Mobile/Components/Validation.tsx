import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useState } from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import { AppState } from '../App';
import type { ElementPretty, Value } from '../Types';
import Utils from '../Utils';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SubmitButton } from './ElementButton';
import { Validate } from '../Validation';
type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  route: RouteProp<any, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  navigation: NavigationProp<any, any>;
};

type ItemType = ElementPretty['allNeededValues'][0];

const Validation = ({ navigation, route }: Props) => {
  const [validateWrapperStyle, setValidateWrapperStyle] = useState({
    width: '100%',
    backgroundColor: '#242424',
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
  });

  const code = route.params?.code;
  const [elements, setElements]: [
    ElementPretty[],
    React.Dispatch<React.SetStateAction<ElementPretty[] | undefined>>
  ] = useContext(AppState);
  const [values, setValues] = useState<Value[]>([]);
  const [invalidValues, setInvalidValues] = useState<Value[]>([]);
  const [invalidValuesSymbols, setInvalidValuesSymbols] = useState<string[]>(
    []
  );
  const element = elements?.find((element) => element.code === code);
  console.log(elements, code);
  console.log(values);
  if (!elements || !code || !element) {
    return null;
  }
  function onSubmit() {
    let areAllFilled = false;
    for (let i = 0; i < values.length; i++) {
      if (
        !values[i].property ||
        !values[i].symbol ||
        !values[i].ordered ||
        !values[i].measured
      ) {
        areAllFilled = true;
      }
    }
    if (!areAllFilled) {
      alert('Nie wszystkie pola są wypełnione');
      return;
    }
    if (!element) return;
    const result = Validate(element, values);
    if (typeof result === 'boolean' && result) {
      alert('Jest git');
      return;
    }
    alert('Nie jest git');
    console.log(result);
    if (!result) return;
    setInvalidValues(result);
    setInvalidValuesSymbols(result.map((value) => value.symbol));
    //TODO: Change colors of invalid inputs
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={element.allNeededValues}
        renderItem={({ item, index }) => (
          <View key={(item as ItemType).symbol} style={styles.inputGroup}>
            <View>
              <Text style={styles.label}>
                {`${Utils.toSentenceCase((item as ItemType).name)} - ${
                  (item as ItemType).symbol
                }`}
                <Text style={styles.unit}>{` [${
                  (item as ItemType).unit
                }]`}</Text>
              </Text>
            </View>
            <View style={styles.inputRow}>
              {item.isOrderable && (
                <TextInput
                  style={[styles.input]}
                  placeholder="Zamówiona"
                  value={values[index]?.inputOrdered?.toString() || ''}
                  onChangeText={(text) => {
                    const newValues = [...values];
                    newValues[index] = {
                      ordered: Number(text.replace(/[^0-9.]/g, '')),
                      inputOrdered: text.replace(/[^0-9.]/g, ''),
                      inputMeasured: values[index]?.inputMeasured,
                      measured: values[index]?.measured,
                      symbol: (item as ItemType).symbol,
                      property: (item as ItemType).name,
                    };

                    setValues(newValues);
                  }}
                  placeholderTextColor="#6f7c8f"
                />
              )}

              <TextInput
                placeholderTextColor="#6f7c8f"
                style={[
                  styles.input,
                  invalidValuesSymbols.includes(item.symbol) && {
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  },
                ]}
                placeholder="Zmierzona"
                value={values[index]?.inputMeasured?.toString() || ''}
                onChangeText={(text) => {
                  const newValues = [...values];
                  newValues[index] = {
                    ordered: values[index]?.ordered,
                    inputMeasured: text.replace(/[^0-9.]/g, ''),
                    inputOrdered: values[index]?.inputOrdered,
                    measured: Number(text.replace(/[^0-9.]/g, '')),
                    symbol: (item as ItemType).symbol,
                    property: (item as ItemType).name,
                  };

                  setValues(newValues);
                }}
              />
            </View>
          </View>
        )}
      />
      <SubmitButton onSubmit={onSubmit} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'column',
    gap: 10,
  },
  container: {
    backgroundColor: '#181a1b',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    minHeight: '100%',
    width: '100%',
  },

  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    rowGap: 4,
    columnGap: 2,
    paddingBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: '#242424',
    borderRadius: 10,
    color: 'white',
    padding: 5,

    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputGroup: {
    minWidth: 250,
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  unit: {
    fontSize: 14,
    color: 'rgb(151,187, 223)',
    marginBottom: 10,
  },
});

export default Validation;
