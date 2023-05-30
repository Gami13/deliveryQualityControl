import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ElementButton from './ElementButton';
import { useEffect, useState } from 'react';
import { Property } from '../Types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import PropertyButton from './PropertyButton';
import { TextInput } from 'react-native-gesture-handler';
type Props = {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
};
type Value = {
  type: string;
  value: number;
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
  const code = route.params?.code;
  const [requiredValues, setRequiredValues] = useState([] as Value[]);
  const property = route.params?.property;
  const [ranges, setRanges] = useState([] as Element[]);
  const fetchProperties = async () => {
    console.log('fetching');
    const response = await fetch(
      'http://localhost:3000/ranges/' + code + '/' + property
    );
    const data = await response.json();
    console.log(data);

    let values = [] as Value[];
    values.push({
      value: 0,
      symbol: data[0].propertysymbol,
      property: data[0].property,
      type: 'property',
    });
    values.push({
      value: 0,
      symbol: data[0].propertysecondsymbol,
      property: data[0].propertysecond,
      type: 'secondProperty',
    });
    values.push({
      value: 0,
      symbol: data[0].rangepropertysymbol,
      property: data[0].rangeproperty,
      type: 'range',
    });

    values.push({
      value: 0,
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
    console.log(route.params);
    fetchProperties();
  }, []);
  console.log(requiredValues);
  async function validate() {
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
    let toleranceUnit = range.toleranceUnit;
    let toleranceProperty = range.toleranceProperty;
    let tolerancePropertySymbol = range.tolerancePropertySymbol;
    if (range.tolerancePropertySymbol == range.propertySymbol) {
      toleranceStart = range.toleranceStart;
      toleranceEnd = range.toleranceEnd;
    } else {
      toleranceStart = orderedValue - range.toleranceStart;
      toleranceEnd = orderedValue * 1.0 + range.toleranceEnd * 1.0;
    }
    console.log(toleranceUnit);
    if (toleranceUnit == '%') {
      let valueToPercent =
        requiredValues.find((value) => value.symbol == tolerancePropertySymbol)
          ?.value ?? 0;
      console.log(valueToPercent);
      let temp0 = valueToPercent * toleranceStart;
      let temp1 = valueToPercent * toleranceEnd;
      toleranceStart = temp0 / 100;
      toleranceEnd = temp1 / 100;
      console.log(
        'tester',
        toleranceStart,
        toleranceEnd,
        measuredValue,
        orderedValue
      );
    }

    if (range.propertiesOperation == 'ADDITION') {
      measuredValue = measuredValue + secondMeasuredValue;
    }

    console.log(toleranceStart, toleranceEnd, measuredValue, orderedValue);
    if (toleranceStart <= measuredValue && toleranceEnd >= measuredValue) {
      console.log('ok');
    } else {
      console.log('not ok');
    }
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
                <TextInput
                  style={styles.input}
                  placeholder={
                    'Zmierzona ' + item.property + ' - ' + item.symbol
                  }
                  onChange={(e) => {
                    item.value = parseFloat(e.nativeEvent.text);
                  }}
                />
              );
            case 'secondProperty':
              return (
                <TextInput
                  style={styles.input}
                  placeholder={
                    'Zmierzona ' + item.property + ' - ' + item.symbol
                  }
                  onChange={(e) => {
                    item.value = parseFloat(e.nativeEvent.text);
                  }}
                />
              );
            case 'range':
              return (
                <TextInput
                  style={styles.input}
                  placeholder={
                    'Zamówiona ' + item.property + ' - ' + item.symbol
                  }
                  onChange={(e) => {
                    item.value = parseFloat(e.nativeEvent.text);
                  }}
                />
              );
            case 'tolerance':
              return (
                <TextInput
                  style={styles.input}
                  placeholder={item.property + ' - ' + item.symbol}
                  onChange={(e) => {
                    item.value = parseFloat(e.nativeEvent.text);
                  }}
                />
              );
            default:
              return <Text>error</Text>;
          }
        }}
      />
      <Button
        onPress={() => {
          validate();
        }}
        color="blue"
        title="test"
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
  input: {
    backgroundColor: '#fff',
  },
});

export default Validation;
