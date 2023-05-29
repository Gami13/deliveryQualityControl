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
  symbol: string;
  rangeFrom: number;
  rangeTo: number;
  toleranceStart: number;
  toleranceEnd: number;
  toleranceUnit: string;
  toleranceProperty: string;
  tolerancePropertySymbol: string;
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
      ranges.push({
        property: element.rangeproperty,
        symbol: element.rangepropertysymbol,
        rangeFrom: element.rangefrom,
        rangeTo: element.rangeto,

        toleranceStart: element.tolerancestart,
        toleranceEnd: element.toleranceend,
        toleranceUnit: element.toleranceunit,
        toleranceProperty: element.toleranceproperty,
        tolerancePropertySymbol: element.tolerancepropertysymbol,
      });
    });
    console.log(ranges);
  };
  useEffect(() => {
    console.log(route.params);
    fetchProperties();
  }, []);
  console.log(requiredValues);
  async function validate() {
    let orderedValue = requiredValues.find(
      (value) => value.type == 'range'
    )?.value;
    //get range where rangeFrom < orderedValue <= rangeTo
    // let range = ranges.find((range: Range) => {
    //   if (range.rangeTo == null) {
    //     return orderedValue > range.rangeFrom;
    //   }
    //   if (range.rangeFrom == null) {
    //     return orderedValue <= range.rangeTo;
    //   }
    // });
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
                  placeholder={
                    'Zmierzona ' + item.property + ' - ' + item.symbol
                  }
                />
              );
            case 'secondProperty':
              return (
                <TextInput
                  placeholder={
                    'Zmierzona ' + item.property + ' - ' + item.symbol
                  }
                />
              );
            case 'range':
              return (
                <TextInput
                  placeholder={
                    'Zamówiona ' + item.property + ' - ' + item.symbol
                  }
                />
              );
            case 'tolerance':
              return (
                <TextInput placeholder={item.property + ' - ' + item.symbol} />
              );
            default:
              return <Text>error</Text>;
          }
        }}
      />
      <Button onPress={() => {}} color="blue" title="test" />
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

export default Validation;
