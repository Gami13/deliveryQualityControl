export type ElementJSON = {
	code: string;
	name: string;
	properties: PropertyJSON[];
};
export type ElementPretty = {
	code: string;
	name: string;
	allNeededValues: ValueIn[];
	properties: PropertyPretty[];
};
type PropertyPretty = {
	property: string;
	propertySymbol: string;
	propertyUnit: string;
	propertySecond: string | null;
	propertySecondSymbol: string | null;
	propertiesOperation: string | null;
	ranges: RangePretty[];
};
type RangePretty = {
	rangeUnit: string;
	rangeProperty: string;
	rangePropertySymbol: string;
	toleranceProperty: string | null;
	tolerancePropertySymbol: string | null;
	toleranceUnit: string;
	canAgreeTolerance: boolean;
	rangeFrom: number;
	rangeTo: number;
	toleranceStart: number;
	toleranceEnd: number;
	toleranceStartAgreement: number;
	toleranceEndAgreement: number;
};
type ValueIn = {
	name: string;
	symbol: string;
	unit: string;
	isOrderable: boolean;
};
type PropertyJSON = {
	property: string;
	propertySymbol: string;
	propertyUnit: string;
	isSecondProperty: boolean;
	propertySecond?: string;
	propertySecondSymbol?: string;
	propertiesOperation?: string;
	ranges: RangeJSON[];
};
type RangeJSON = {
	rangeUnit: string;
	rangeProperty: string;
	rangePropertySymbol: string;
	toleranceProperty: string;
	tolerancePropertySymbol: string;
	toleranceUnit: string;
	canAgreeTolerance: boolean;
	rangeFrom: string;
	rangeTo: string;
	toleranceStart: string;
	toleranceEnd: string;
	toleranceStartAgreement: string;
	toleranceEndAgreement: string;
};

export type DBRange = {
	id: number;
	code: string;
	property: string;
	propertysymbol: string;
	propertysecond: null | string;
	propertysecondsymbol: null | string;
	propertiesoperation: null | string;
	propertyunit: string;
	rangefrom: null | string;
	rangeto: null | string;
	rangeunit: string;
	rangeproperty: string;
	rangepropertysymbol: string;
	tolerancestart: string;
	toleranceend: string;
	toleranceunit: string;
	toleranceproperty: string;
	tolerancepropertysymbol: string;
	illustration: null | string;
	tolerancestartagreement: null | string;
	toleranceendagreement: null | string;
	name: string;
};
export type Value = {
	ordered: number;
	measured: number;
	symbol: string;
	property: string;
	isCorrect?: boolean;
	isOrderable?: boolean;
	inputOrdered?: string;
	inputMeasured?: string;
};
