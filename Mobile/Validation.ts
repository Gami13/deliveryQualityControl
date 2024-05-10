import type { ElementPretty, Value } from "./Types";
type Measurable = {
	rangeFrom: number;
	rangeTo: number;
	rangeProperty: string;
	rangePropertySymbol: string;
	rangeUnit: string;
	property: string;
	propertySymbol: string;
	propertySecond: string | null;
	propertySecondSymbol: string | null;
	propertiesOperation: string | null;
	propertyMeasured: number;
	propertySecondMeasured: number | null;
	propertyOrdered: number;
	propertySecondOrdered: number | null;
	rangeMeasured: number;
	rangeOrdered: number;
	toleranceStart: number;
	toleranceEnd: number;
	toleranceSymbol: string;
	toleranceUnit: string;
	toleranceProperty: string;
	tolerancePropertyMeasured: number;
	tolerancePropertyOrdered: number;
};

function createMeasurables(
	element: ElementPretty,
	values: Value[],
): Measurable[] {
	const measurables: Measurable[] = [];

	for (const property of element.properties) {
		let correspondingRange:
			| ElementPretty["properties"]["0"]["ranges"][0]
			| undefined = undefined;
		for (let i = 0; i < property.ranges.length; i++) {
			if (
				property.ranges[i].rangeFrom === 0 ||
				property.ranges[i].rangeFrom === undefined
			)
				property.ranges[i].rangeFrom = 0;
			if (
				property.ranges[i].rangeTo === 0 ||
				property.ranges[i].rangeTo === undefined
			)
				property.ranges[i].rangeTo = Number.POSITIVE_INFINITY;
		}
		if (property.propertySymbol === "q") {
			console.log(property.ranges);
		}

		const rangeProperty = property.ranges[0].rangeProperty;
		console.log("rangeProperty", rangeProperty);

		const propertyValue = values.find(
			(value) => value.property === property.property,
		);
		console.log("propertyValue", propertyValue);

		const rangeValue = values.find(
			(rangeValue) => rangeValue.property === rangeProperty,
		);
		console.log("rangeValue", rangeValue);
		if (!rangeValue) {
			console.log(`No range value found for ${property.propertySymbol}`);
			throw new Error("No range value found for ${property.propertySymbol}");
		}

		if (rangeValue) {
			correspondingRange = property.ranges.find(
				(range) =>
					range.rangeProperty === rangeValue.property &&
					range.rangeFrom <= rangeValue.ordered &&
					range.rangeTo >= rangeValue.ordered,
			);
		}
		console.log(correspondingRange);
		if (!correspondingRange) {
			if (property.ranges.length === 1) {
				correspondingRange = property.ranges[0];
			}
		}

		let propertyValueSecond: Value | undefined;
		if (property.propertySecond) {
			propertyValueSecond = values.find(
				(value) => value.property === property.propertySecond,
			);
		}
		const tolerancePropertyMeasured = values.find(
			(value) => value.property === correspondingRange?.toleranceProperty,
		);
		console.log(
			property.propertySymbol,
			`${propertyValue?.ordered}/${propertyValue?.measured}`,
			rangeValue?.symbol,
			`${rangeValue?.ordered}/${rangeValue?.measured}`,
			`${correspondingRange ? correspondingRange.rangeFrom : 0}-${
				correspondingRange
					? correspondingRange.rangeTo
					: Number.POSITIVE_INFINITY
			}`,
			correspondingRange?.tolerancePropertySymbol,

			tolerancePropertyMeasured?.measured || propertyValue?.measured || 0,
			correspondingRange?.toleranceStart,
			correspondingRange?.toleranceEnd,
		);

		const Measurable: Measurable = {
			rangeFrom: correspondingRange ? correspondingRange.rangeFrom : 0,
			rangeTo: correspondingRange
				? correspondingRange.rangeTo
				: Number.POSITIVE_INFINITY,
			rangeProperty: rangeValue?.property,
			rangePropertySymbol: rangeValue?.symbol,
			rangeUnit: correspondingRange?.rangeUnit || "",
			property: property.property,
			propertySymbol: property.propertySymbol,
			propertySecond: property.propertySecond || null,
			propertySecondSymbol: property.propertySecondSymbol || null,
			propertiesOperation: property.propertiesOperation || null,
			propertyMeasured: propertyValue?.measured || 0,
			propertyOrdered: propertyValue?.ordered || 0,
			propertySecondMeasured: propertyValueSecond?.measured || 0,
			propertySecondOrdered: propertyValueSecond?.ordered || 0,
			rangeMeasured: rangeValue?.measured || 0,
			rangeOrdered: rangeValue?.ordered || 0,
			toleranceStart: correspondingRange
				? correspondingRange.toleranceStart
				: 0,
			toleranceEnd: correspondingRange ? correspondingRange.toleranceEnd : 0,
			toleranceSymbol: correspondingRange?.toleranceProperty || "",
			toleranceUnit: correspondingRange?.toleranceUnit || "",
			toleranceProperty: correspondingRange?.tolerancePropertySymbol || "",
			tolerancePropertyMeasured:
				tolerancePropertyMeasured?.measured || propertyValue?.measured || 0,
			tolerancePropertyOrdered:
				tolerancePropertyMeasured?.ordered || propertyValue?.ordered || 0,
		};
		measurables.push(Measurable);
	}

	return measurables;
}
function createRanges(measurable: Measurable) {
	let rangeFrom: number;
	let rangeTo: number;
	if (measurable.toleranceUnit === "%") {
		rangeFrom =
			measurable.propertyOrdered -
			(measurable.toleranceStart * measurable.tolerancePropertyOrdered) / 100;
		rangeTo =
			measurable.propertyOrdered +
			(measurable.toleranceEnd * measurable.tolerancePropertyOrdered) / 100;
	} else {
		rangeFrom = measurable.propertyOrdered - measurable.toleranceStart;

		rangeTo = measurable.propertyOrdered + measurable.toleranceEnd;
	}
	return [rangeFrom, rangeTo];
}
export function Validate(
	element: ElementPretty,
	values: Value[],
): boolean | Value[] {
	let measurables: Measurable[] = [];
	try {
		measurables = createMeasurables(element, values);
	} catch (e) {
		console.log(e);
		return false;
	}
	const invalidValues: Value[] = [];
	for (const measurable of measurables) {
		console.log("measurable", measurable.property);
		console.log(measurable);
		if (
			measurable.propertySecond &&
			measurable.propertySecondOrdered &&
			measurable.propertySecondMeasured &&
			measurable.propertiesOperation === "ADDITION"
		) {
			console.log("ENTERED ADDITION");
			const sum =
				measurable.propertyMeasured + measurable.propertySecondMeasured;
			const [rangeFrom, rangeTo] = createRanges(measurable);
			if (sum <= rangeTo && sum >= rangeFrom) {
				continue;
			}
			console.log(`${sum} <=${rangeTo}&&${sum}>=${rangeFrom}`);
			invalidValues.push({
				property: measurable.property,
				symbol: measurable.propertySymbol,
				measured: sum,
				ordered: measurable.propertyOrdered,
			});
		}
		if (
			measurable.propertySecond &&
			(measurable.propertySecondOrdered ||
				measurable.propertySecondOrdered === 0) &&
			measurable.propertySecondMeasured &&
			measurable.propertySecondSymbol &&
			!measurable.propertiesOperation
		) {
			console.log("SEPARATE");
			const [rangeFrom, rangeTo] = createRanges(measurable);
			console.log(rangeFrom, rangeTo);
			if (
				!(
					measurable.propertyMeasured <= rangeTo &&
					measurable.propertyMeasured >= rangeFrom
				)
			) {
				console.log(
					`${measurable.propertyMeasured}<=${rangeTo}&&${measurable.propertyMeasured}>=${rangeFrom}`,
				);
				console.log(measurable);
				invalidValues.push({
					property: measurable.property,
					symbol: measurable.propertySymbol,
					measured: measurable.propertyMeasured,
					ordered: measurable.propertyOrdered,
				});
			}
			if (
				!(
					measurable.propertySecondMeasured <= rangeTo &&
					measurable.propertySecondMeasured >= rangeFrom
				)
			) {
				console.log(
					`${measurable.propertySecondMeasured}<=${rangeTo}&&${measurable.propertySecondMeasured}>=${rangeFrom}`,
				);
				invalidValues.push({
					property: measurable.propertySecond,
					symbol: measurable.propertySecondSymbol,
					measured: measurable.propertySecondMeasured,
					ordered: measurable.propertySecondOrdered,
				});
			}
		} else {
			const [rangeFrom, rangeTo] = createRanges(measurable);
			if (
				!(
					measurable.propertyMeasured <= rangeTo &&
					measurable.propertyMeasured >= rangeFrom
				)
			) {
				console.log(
					`${measurable.propertyMeasured}<=${rangeTo}&&${measurable.propertyMeasured}>=${rangeFrom}`,
				);
				invalidValues.push({
					property: measurable.property,
					symbol: measurable.propertySymbol,
					measured: measurable.propertyMeasured,
					ordered: measurable.propertyOrdered,
				});
			}
		}
	}
	if (invalidValues.length > 0) {
		console.log("invalidValues:", invalidValues);
		return invalidValues;
	}
	return true;
}
