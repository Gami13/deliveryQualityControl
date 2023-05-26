data = {
  code: 'PN-EN 1058',
  name: 'PRĘTY STALOWE PŁASKIE WALCOWANE NA GORĄCO OGÓLNEGO ZASTOSOWANIA',
  properties: [
    {
      property: 'szerokość',
      propertySymbol: 'b',
      propertyUnit: 'mm',
      isSecondProperty: false,
      ranges: [
        {
          rangeProperty: 'szerokość',
          rangePropertySymbol: 'b',
          toleranceProperty: 'szerokość',
          tolerancePropertySymbol: 'b',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '10',
          rangeTo: '40',
          toleranceStart: '0.75',
          toleranceEnd: '0.75',
        },
        {
          rangeProperty: 'szerokość',
          rangePropertySymbol: 'b',
          toleranceProperty: 'szerokość',
          tolerancePropertySymbol: 'b',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '40',
          rangeTo: '80',
          toleranceStart: '1',
          toleranceEnd: '1',
        },
        {
          rangeProperty: 'szerokość',
          rangePropertySymbol: 'b',
          toleranceProperty: 'szerokość',
          tolerancePropertySymbol: 'b',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '80',
          rangeTo: '100',
          toleranceStart: '1.5',
          toleranceEnd: '1.5',
        },
        {
          rangeProperty: 'szerokość',
          rangePropertySymbol: 'b',
          toleranceProperty: 'szerokość',
          tolerancePropertySymbol: 'b',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '100',
          rangeTo: '120',
          toleranceStart: '2',
          toleranceEnd: '2',
        },
        {
          rangeProperty: 'szerokość',
          rangePropertySymbol: 'b',
          toleranceProperty: 'szerokość',
          tolerancePropertySymbol: 'b',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '120',
          rangeTo: '150',
          toleranceStart: '2.5',
          toleranceEnd: '2.5',
        },
      ],
    },
    {
      property: 'grubość',
      propertySymbol: 't',
      propertyUnit: 'mm',
      isSecondProperty: false,
      ranges: [
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'grubość',
          tolerancePropertySymbol: 't',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '0',
          rangeTo: '20',
          toleranceStart: '0.5',
          toleranceEnd: '0.5',
        },
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'grubość',
          tolerancePropertySymbol: 't',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '20',
          rangeTo: '40',
          toleranceStart: '1',
          toleranceEnd: '1',
        },
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'grubość',
          tolerancePropertySymbol: 't',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '40',
          rangeTo: '80',
          toleranceStart: '1.5',
          toleranceEnd: '1.5',
        },
      ],
    },
    {
      property: 'prostość',
      propertySymbol: 'q',
      propertyUnit: 'mm',
      isSecondProperty: false,
      ranges: [
        {
          rangeUnit: 'mm',
          rangeProperty: 'przekrój poprzeczny',
          rangePropertySymbol: 'pp',
          toleranceProperty: 'długość',
          tolerancePropertySymbol: 'l',
          toleranceUnit: '%',
          canAgreeTolerance: false,
          rangeFrom: '0',
          rangeTo: '1000',
          toleranceStart: '0',
          toleranceEnd: '0.4',
        },
        {
          rangeUnit: 'mm',
          rangeProperty: 'przekrój poprzeczny',
          rangePropertySymbol: 'pp',
          toleranceProperty: 'długość',
          tolerancePropertySymbol: 'l',
          toleranceUnit: '%',
          canAgreeTolerance: false,
          rangeFrom: '1000',
          rangeTo: 'null',
          toleranceStart: '0',
          toleranceEnd: '0.25',
        },
      ],
    },
    {
      property: 'skośność',
      propertySymbol: 'u',
      propertyUnit: 'mm',
      isSecondProperty: false,
      ranges: [
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'skośność',
          tolerancePropertySymbol: 'u',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '10',
          rangeTo: '25',
          toleranceStart: '0',
          toleranceEnd: '0.5',
        },
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'skośność',
          tolerancePropertySymbol: 'u',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '25',
          rangeTo: '40',
          toleranceStart: '0',
          toleranceEnd: '1',
        },
        {
          rangeUnit: 'mm',
          rangeProperty: 'grubość',
          rangePropertySymbol: 't',
          toleranceProperty: 'skośność',
          tolerancePropertySymbol: 'u',
          toleranceUnit: 'mm',
          canAgreeTolerance: false,
          rangeFrom: '40',
          rangeTo: '80',
          toleranceStart: '0',
          toleranceEnd: '1.5',
        },
      ],
    },
  ],
};

console.log(data);
/*INSERT INTO dbo.elements(
	code,name,property,propertySymbol,propertySecond, propertySecondSymbol, propertiesOperation, propertyUnit,rangeFrom,rangeTo,rangeUnit,rangeProperty,rangePropertySymbol,toleranceStart,toleranceEnd,toleranceUnit,toleranceProperty,tolerancePropertySymbol,illustration,toleranceStartAgreement,toleranceEndAgreement
	) VALUES*/
function str(inp) {
  return "'" + inp + "'";
}
if (data.code == undefined) {
  data.code = 'NULL';
} else {
  data.code = str(data.code);
}
if (data.name == undefined) {
  data.name = 'NULL';
} else {
  data.name = str(data.name);
}
for (i in data.properties) {
  let property = data.properties[i].property;
  let propertySymbol = data.properties[i].propertySymbol;
  let propertyUnit = data.properties[i].propertyUnit;
  let isSecondProperty = data.properties[i].isSecondProperty;
  let propertySecond = data.properties[i].propertySecond;
  let propertySecondSymbol = data.properties[i].propertySecondSymbol;
  let propertiesOperation = data.properties[i].propertiesOperation;
  let illustration = data.illustration;

  if (property == undefined) {
    property = 'NULL';
  } else {
    property = str(property);
  }
  if (propertySymbol == undefined) {
    propertySymbol = 'NULL';
  } else {
    propertySymbol = str(propertySymbol);
  }
  if (propertySecond == undefined) {
    propertySecond = 'NULL';
  } else {
    propertySecond = str(propertySecond);
  }
  if (propertySecondSymbol == undefined) {
    propertySecondSymbol = 'NULL';
  } else {
    propertySecondSymbol = str(propertySecondSymbol);
  }
  if (propertiesOperation == undefined) {
    propertiesOperation = 'NULL';
  } else {
    propertiesOperation = str('SEPARATE');
  }

  if (propertyUnit == undefined) {
    propertyUnit = 'NULL';
  } else {
    propertyUnit = str(propertyUnit);
  }
  if (illustration == undefined) {
    illustration = 'NULL';
  } else {
    illustration = str(illustration);
  }
  for (j in data.properties[i].ranges) {
    let rangeUnit = data.properties[i].ranges[j].rangeUnit;
    let rangeProperty = data.properties[i].ranges[j].rangeProperty;
    let rangePropertySymbol = data.properties[i].ranges[j].rangePropertySymbol;
    let toleranceProperty = data.properties[i].ranges[j].toleranceProperty;
    let tolerancePropertySymbol =
      data.properties[i].ranges[j].tolerancePropertySymbol;
    let canAgreeTolerance = data.properties[i].ranges[j].canAgreeTolerance;
    let rangeFrom = data.properties[i].ranges[j].rangeFrom;
    let rangeTo = data.properties[i].ranges[j].rangeTo;
    let toleranceStart = data.properties[i].ranges[j].toleranceStart;
    let toleranceEnd = data.properties[i].ranges[j].toleranceEnd;
    let toleranceUnit = data.properties[i].ranges[j].toleranceUnit;
    let toleranceStartAgreement =
      data.properties[i].ranges[j].toleranceStartAgreement;
    let toleranceEndAgreement =
      data.properties[i].ranges[j].toleranceEndAgreement;
    //change all undefined and NULL to NULL

    if (rangeFrom == undefined || rangeFrom == '') {
      rangeFrom = 'NULL';
    }
    if (rangeTo == undefined || rangeTo == '') {
      rangeTo = 'NULL';
    }
    if (rangeUnit == undefined) {
      rangeUnit = 'mm';
      rangeUnit = str(rangeUnit);
    } else {
      rangeUnit = str(rangeUnit);
    }
    if (rangeProperty == undefined) {
      rangeProperty = 'NULL';
    } else {
      rangeProperty = str(rangeProperty);
    }
    if (rangePropertySymbol == undefined) {
      rangePropertySymbol = 'NULL';
    } else {
      rangePropertySymbol = str(rangePropertySymbol);
    }
    if (toleranceStart == undefined) {
      toleranceStart = 'NULL';
    }
    if (toleranceEnd == undefined) {
      toleranceEnd = 'NULL';
    }
    if (toleranceProperty == undefined) {
      toleranceProperty = 'NULL';
    } else {
      toleranceProperty = str(toleranceProperty);
    }
    if (tolerancePropertySymbol == undefined) {
      tolerancePropertySymbol = 'NULL';
    } else {
      tolerancePropertySymbol = str(tolerancePropertySymbol);
    }

    if (toleranceStartAgreement == undefined) {
      toleranceStartAgreement = 'NULL';
    }
    if (toleranceEndAgreement == undefined) {
      toleranceEndAgreement = 'NULL';
    }
    if (toleranceUnit == undefined) {
      toleranceUnit = 'mm';
      toleranceUnit = str(toleranceUnit);
    } else {
      toleranceUnit = str(toleranceUnit);
    }

    let sql = `INSERT INTO elements(
	code,name,property,propertySymbol,propertySecond, \n propertySecondSymbol, propertiesOperation, propertyUnit,rangeFrom,rangeTo,rangeUnit, \n rangeProperty,rangePropertySymbol,toleranceStart, \n toleranceEnd,toleranceUnit,toleranceProperty,tolerancePropertySymbol,illustration, \n toleranceStartAgreement,toleranceEndAgreement
	) VALUES(
	${data.code},${data.name}, \n ${property},${propertySymbol},${propertySecond},${propertySecondSymbol},${propertiesOperation}, \n ${propertyUnit},${rangeFrom},${rangeTo},${rangeUnit},${rangeProperty}, \n ${rangePropertySymbol},${toleranceStart},${toleranceEnd},${toleranceUnit},${toleranceProperty}, \n ${tolerancePropertySymbol},${illustration},${toleranceStartAgreement},${toleranceEndAgreement}
	),\n`;
    console.log(sql);
  }
}
