export type ElementJSON = {
	code: string;
	name: string;
	properties: PropertyJSON[];
};
export type ElementPretty = {
	code: string;
	name: string;
	allNeededValues: Value[];
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
	isPropertyOrderable: boolean;
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
type Value = {
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
	isPropertyOrderable: boolean;
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
	isPropertyOrderable: boolean;
};
