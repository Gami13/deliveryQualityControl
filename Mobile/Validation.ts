import type { ElementPretty, Value } from "./Types";

export function Validate(element: ElementPretty, values: Value[]) {
	for (let i = 0; i < values.length; i++) {
		const value = values[i];
		const property = element.properties.find(
			(property) => property.property === value.property,
		);
		console.log(property);
		if (property === undefined)
			throw new Error("One of the properties wasnt found");

		const range = property.ranges.find((range) => {
			if (range.rangeFrom <= value.ordered && range.rangeTo >= value.ordered) {
				return true;
			}
		});
		console.log(value, range);
	}
}
