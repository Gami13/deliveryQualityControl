type Element = {
  id?: number;
  code?: string;
  property?: string;
  propertySymbol?: string;
  propertySecond?: string;
  propertySecondSymbol?: string;
  propertiesOperation?: string;
  propertyUnit?: string;
  rangeFrom?: number;
  rangeTo?: number;
  rangeUnit?: string;
  rangeProperty?: string;
  rangePropertySymbol?: string;
  toleranceStart?: number;
  toleranceEnd?: number;
  toleranceUnit?: string;
  toleranceProperty?: string;
  tolerancePropertySymbol?: string;
  illustration?: string;
  toleranceStartAgreement?: number;
  toleranceEndAgreement?: number;
  name?: string;
};
type ElementName = {
  name: string;
  code: string;
};

type Property = {
  property: string;
};
export type { Element, ElementName, Property };
