export type ElementJSON = {
	code: string;
	name: string;
	properties: PropertyJSON[];
};
type PropertyJSON = {
	property: string;
	propertySymbol: string;
	propertyUnit: string;
	isSecondProperty: boolean;
	propertySecond?: string;
	propertySecondSymbol?: string;
	propertySecondOperation?: string;
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
