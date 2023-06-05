import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ElementButton from './ElementButton';
import { useEffect, useRef, useState } from 'react';
import { Property } from '../Types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import PropertyButton from './PropertyButton';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
type Props = {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
};
type Value = {
  type: string;
  value: number | null;
  symbol: string;
  property: string;
};
type Range = {
  property: string;
  propertySymbol: string;
  rangeSymbol: string;
  rangeFrom: number;
  rangeTo: number;
  toleranceStart: number;
  toleranceEnd: number;
  toleranceUnit: string;
  toleranceProperty: string;
  tolerancePropertySymbol: string;
  propertiesOperation?: string;
};
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
  const submitter = useRef();
  const code = route.params?.code;
  const [requiredValues, setRequiredValues] = useState([] as Value[]);
  const property = route.params?.property;
  const [ranges, setRanges] = useState([] as Element[]);
  const [isValid, setIsValid] = useState(0); //0 = not checked, 1 = valid, 2 = invalid
  const fetchProperties = async () => {
    console.log('fetching');
    const response = await fetch(
      'http://localhost:3000/ranges/' + code + '/' + property
    );
    const data = await response.json();
    console.log(data);

    let values = [] as Value[];
    values.push({
      value: null,
      symbol: data[0].propertysymbol,
      property: data[0].property,
      type: 'property',
    });
    values.push({
      value: null,
      symbol: data[0].propertysecondsymbol,
      property: data[0].propertysecond,
      type: 'secondProperty',
    });
    values.push({
      value: null,
      symbol: data[0].rangepropertysymbol,
      property: data[0].rangeproperty,
      type: 'range',
    });

    values.push({
      value: null,
      symbol: data[0].tolerancepropertysymbol,
      property: data[0].toleranceproperty,
      type: 'tolerance',
    });

    //filter out duplicates
    values = values.filter(
      (value, index, self) =>
        self.findIndex(
          (v) => v.symbol === value.symbol && v.type == value.type
        ) === index
    );

    values = values.filter((value) => value.symbol != null);

    let tempVal = values.find((value) => value.type == 'tolerance');
    let tempValIndex = values.findIndex((value) => value.type == 'tolerance');
    let didRemove = false;
    values.forEach((value) => {
      if (
        value.type != 'tolerance' &&
        value.symbol == tempVal?.symbol &&
        !didRemove
      ) {
        values.splice(tempValIndex, 1);
        didRemove = true;
      }
    });

    setRequiredValues(values);

    let ranges = [] as Range[];
    data.forEach((element: any) => {
      console.log('element', element);
      ranges.push({
        property: element.rangeproperty,
        rangeSymbol: element.rangepropertysymbol,
        rangeFrom: element.rangefrom,
        rangeTo: element.rangeto,
        propertySymbol: element.propertysymbol,
        toleranceStart: element.tolerancestart,
        toleranceEnd: element.toleranceend,
        toleranceUnit: element.toleranceunit,
        toleranceProperty: element.toleranceproperty,
        tolerancePropertySymbol: element.tolerancepropertysymbol,
        propertiesOperation: element.propertiesoperation,
      });
    });
    ranges.forEach((range) => {
      if (range.rangeFrom == null) {
        range.rangeFrom = -Infinity;
      }
      if (range.rangeTo == null) {
        range.rangeTo = Infinity;
      }
    });
    setRanges(ranges);
    console.log(ranges);
  };
  useEffect(() => {
    if (isValid == 0) {
      setValidateWrapperStyle({
        width: '100%',
        backgroundColor: '#242424',
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 16,
      });

      console.log('not checked');
      return;
    }
    if (isValid == 1) {
      setValidateWrapperStyle({
        width: '100%',
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 16,
      });
      console.log('valid');
    } else {
      setValidateWrapperStyle({
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 16,
      });
      console.log('invalid');
    }
  }, [isValid]);
  useEffect(() => {
    console.log(route.params);
    fetchProperties();
  }, []);
  console.log(requiredValues);
  async function validate() {
    //check if any value is not entered
    let isAnyValueNotEntered = false;
    requiredValues.forEach((value) => {
      if (value.value == null) {
        isAnyValueNotEntered = true;
      }
    });

    if (isAnyValueNotEntered) {
      Alert.alert('Prosze wypełnić wszystkie pola');
      alert('Prosze wypełnić wszystkie pola'); //please ignore :)
      setValidateWrapperStyle({
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 16,
      });

      console.log('invalid');
      return;
    }

    let orderedValue =
      requiredValues.find((value) => value.type == 'range')?.value ?? 0;
    //find correct range
    let range: Range = ranges.find((range) => {
      return (
        orderedValue > (range as Range).rangeFrom &&
        orderedValue <= (range as Range).rangeTo
      );
    }) as Range;
    console.log(range);
    let measuredValue =
      requiredValues.find((value) => value.type == 'property')?.value ?? 0;
    let secondMeasuredValue =
      requiredValues.find((value) => value.type == 'secondProperty')?.value ??
      0;
    let toleranceStart;
    let toleranceEnd;
    let propertiesOperation = range.propertiesOperation;
    let toleranceUnit = range.toleranceUnit;
    let toleranceProperty = range.toleranceProperty;
    let tolerancePropertySymbol = range.tolerancePropertySymbol;
    if (
      (tolerancePropertySymbol == range.propertySymbol &&
        range.propertySymbol != range.rangeSymbol) ||
      toleranceUnit == '%'
    ) {
      console.log('detected percentage');
      toleranceStart = range.toleranceStart;
      toleranceEnd = range.toleranceEnd;
    } else {
      console.log('detected normal');
      toleranceStart = orderedValue - range.toleranceStart;
      toleranceEnd = orderedValue * 1.0 + range.toleranceEnd * 1.0;
    }
    console.log(toleranceUnit);
    console.log(
      toleranceStart,
      toleranceEnd,
      measuredValue,
      secondMeasuredValue,
      propertiesOperation,
      orderedValue
    );
    if (toleranceUnit == '%') {
      let valueToPercent =
        requiredValues.find((value) => value.symbol == tolerancePropertySymbol)
          ?.value ?? 0;

      toleranceStart = (valueToPercent * toleranceStart) / 100;
      toleranceEnd = (valueToPercent * toleranceEnd) / 100;
    }

    if (propertiesOperation == 'ADDITION') {
      measuredValue = measuredValue + secondMeasuredValue;
    }
    if (propertiesOperation == 'SUBTRACTION') {
      measuredValue = measuredValue - secondMeasuredValue;
    }
    if (propertiesOperation == 'MULTIPLICATION') {
      measuredValue = measuredValue * secondMeasuredValue;
    }
    if (propertiesOperation == 'DIVISION') {
      measuredValue = measuredValue / secondMeasuredValue;
    }
    if (propertiesOperation == 'SEPARATE') {
      if (
        toleranceStart <= measuredValue &&
        toleranceEnd >= measuredValue &&
        toleranceStart <= secondMeasuredValue &&
        toleranceEnd >= secondMeasuredValue
      ) {
        setIsValid(1);
        return true;
      } else {
        setIsValid(2);
        return false;
      }
    }
    if (propertiesOperation != 'SEPARATE') {
      if (toleranceStart <= measuredValue && toleranceEnd >= measuredValue) {
        setIsValid(1);
        return true;
      } else {
        setIsValid(2);
        return false;
      }
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={requiredValues}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'property':
              return (
                <View>
                  <Text style={styles.label}>
                    {'Zmierzona ' + item.property + ' - ' + item.symbol}
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholderTextColor="rgb(164,164,164)"
                    placeholder={
                      'Zmierzona ' + item.property + ' - ' + item.symbol
                    }
                    onChange={(e) => {
                      if (e.nativeEvent.text == '') {
                        item.value = null;
                      } else {
                        item.value = parseFloat(e.nativeEvent.text);
                      }
                    }}
                  />
                </View>
              );
            case 'secondProperty':
              return (
                <View>
                  <Text style={styles.label}>
                    {'Zmierzona ' + item.property + ' - ' + item.symbol}
                  </Text>
                  <TextInput
                    placeholderTextColor="rgb(164,164,164)"
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder={
                      'Zmierzona ' + item.property + ' - ' + item.symbol
                    }
                    onChange={(e) => {
                      if (e.nativeEvent.text == '') {
                        item.value = null;
                      } else {
                        item.value = parseFloat(e.nativeEvent.text);
                      }
                    }}
                  />
                </View>
              );
            case 'range':
              return (
                <View>
                  <Text style={styles.label}>
                    {'Zamówiona ' + item.property + ' - ' + item.symbol}
                  </Text>
                  <TextInput
                    placeholderTextColor="rgb(164,164,164)"
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder={
                      'Zamówiona ' + item.property + ' - ' + item.symbol
                    }
                    onChange={(e) => {
                      if (e.nativeEvent.text == '') {
                        item.value = null;
                      } else {
                        item.value = parseFloat(e.nativeEvent.text);
                      }
                    }}
                  />
                </View>
              );
            case 'tolerance':
              return (
                <View>
                  <Text style={styles.label}>
                    {item.property + ' - ' + item.symbol}
                  </Text>
                  <TextInput
                    placeholderTextColor="rgb(164,164,164)"
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder={item.property + ' - ' + item.symbol}
                    onChange={(e) => {
                      if (e.nativeEvent.text == '') {
                        item.value = null;
                      } else {
                        item.value = parseFloat(e.nativeEvent.text);
                      }
                    }}
                  />
                </View>
              );
            default:
              return <Text>error</Text>;
          }
        }}
        ListFooterComponent={
          <TouchableOpacity style={validateWrapperStyle} onPress={validate}>
            <Text style={styles.validate}>Sprawdź</Text>
          </TouchableOpacity>
        }
        ListFooterComponentStyle={{
          marginTop: 30,
        }}
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
    flexDirection: 'column',
    flexWrap: 'wrap',

    padding: 40,
    width: '100%',
  },

  list: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingBottom: 20,
  },

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
  label: {
    fontSize: 18,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  validate: {
    fontSize: 18,
    color: 'rgb(151,187, 223)',
    fontWeight: 'bold',

    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Validation;
