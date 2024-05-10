import { Validate } from "../Validation";
import type { Value } from "../Types";
import { describe, expect, it } from "vitest";
import { PNEN10024, PNEN100562, PNEN10058, PNEN10279 } from "./MockData";
describe("Validation testing", () => {
	// it("Validating PNEN10024 - Should Pass", () => {
	// 	const element = PNEN10024;
	// 	const values: Value[] = [
	// 		{
	// 			ordered: 400,
	// 			measured: 400,
	// 			symbol: "h",
	// 			property: "wysokość",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 0.5,
	// 			symbol: "qyy",
	// 			property: "prostość",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 0.5,
	// 			symbol: "qxx",
	// 			property: "prostość",
	// 		},
	// 		{
	// 			ordered: 80,
	// 			measured: 81,
	// 			symbol: "b",
	// 			property: "szerokość stopki",
	// 		},
	// 		{
	// 			ordered: 8,
	// 			measured: 9,
	// 			symbol: "t",
	// 			property: "grubość stopki",
	// 		},
	// 		{
	// 			ordered: 8,
	// 			measured: 8,
	// 			symbol: "s",
	// 			property: "grubość środnika",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 1,
	// 			symbol: "k",
	// 			property: "skośność stopek",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 1,
	// 			symbol: "k`",
	// 			property: "skośność stopek",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 1,
	// 			symbol: "e",
	// 			property: "niesymetryczność stopek",
	// 		},
	// 		{
	// 			ordered: 100,
	// 			measured: 102,
	// 			symbol: "m",
	// 			property: "masa",
	// 		},
	// 		{
	// 			ordered: 1200,
	// 			measured: 1240,
	// 			symbol: "L",
	// 			property: "długość",
	// 		},
	// 	];
	// 	const result: boolean | Value[] = Validate(element, values);
	// 	expect(result).toBe(true);
	// });
	// it("Validating PNEN10024 - Dumb", () => {
	// 	const element = PNEN10024;
	// 	const values: Value[] = [
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "h",
	// 			property: "wysokość",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 0,
	// 			symbol: "qyy",
	// 			property: "prostość",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			measured: 0,
	// 			symbol: "qxx",
	// 			property: "prostość",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "b",
	// 			property: "szerokość stopki",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "t",
	// 			property: "grubość stopki",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "s",
	// 			property: "grubość środnika",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "k",
	// 			property: "skośność stopek",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "k`",
	// 			property: "skośność stopek",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "e",
	// 			property: "niesymetryczność stopek",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "m",
	// 			property: "masa",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			measured: 1,
	// 			symbol: "L",
	// 			property: "długość",
	// 		},
	// 	];
	// 	const result: boolean | Value[] = Validate(element, values);
	// 	expect(result).toBe(true);
	// });
	// it("Validating PNEN10056-2 - Dumb", () => {
	// 	const element = PNEN100562;
	// 	const values: Value[] = [
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "a",
	// 			property: "długość",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "a",
	// 			property: "długość ramienia",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "t",
	// 			property: "grubość",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "t",
	// 			property: "grubość ramienia",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			inputMeasured: "0",
	// 			measured: 0,
	// 			symbol: "k",
	// 			property: "skośność",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			inputMeasured: "0",
	// 			measured: 0,
	// 			symbol: "q",
	// 			property: "prostość (całość)",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			inputMeasured: "6",
	// 			measured: 6,
	// 			symbol: "q",
	// 			property: "prostość (część)",
	// 		},
	// 	];
	// 	const result: boolean | Value[] = Validate(element, values);
	// 	expect(result).toBe(true);
	// });
	// it("Validating PNEN10058 - Should Pass", () => {
	// 	const element = PNEN10058;
	// 	const values: Value[] = [
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "b",
	// 			property: "szerokość",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "t",
	// 			property: "grubość",
	// 		},
	// 		{
	// 			ordered: 1,
	// 			inputMeasured: "1",
	// 			inputOrdered: "1",
	// 			measured: 1,
	// 			symbol: "pp",
	// 			property: "przekrój poprzeczny",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			inputMeasured: "0",
	// 			measured: 0,
	// 			symbol: "q",
	// 			property: "prostość",
	// 		},
	// 		{
	// 			ordered: 0,
	// 			inputMeasured: "0",
	// 			measured: 0,
	// 			symbol: "u",
	// 			property: "skośność",
	// 		},
	// 	];
	// 	const result: boolean | Value[] = Validate(element, values);
	// 	expect(result).toBe(true);
	// });
	it("Validating PNEN10279 - Dumb", () => {
		const element = PNEN10279;
		const values: Value[] = [
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "h",
				property: "wysokość",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "b",
				property: "szerokość stopki",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "s",
				property: "grubość środnika",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "t",
				property: "grubość stopki",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "r3",
				property: "promień naroża",
			},
			{
				inputMeasured: "0",
				ordered: 0,
				measured: 0,
				symbol: "k",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				inputMeasured: "0",
				measured: 0,
				symbol: "k1",
				property: "skośność stopek",
			},
			{
				inputMeasured: "0",
				ordered: 0,
				measured: 0,
				symbol: "f",
				property: "wygięcie środnika",
			},
			{
				inputMeasured: "0",
				ordered: 0,
				measured: 0,
				symbol: "qxx",
				property: "prostość x",
			},
			{
				ordered: 0,
				inputMeasured: "0",
				measured: 0,
				symbol: "qyy",
				property: "prostość y",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "l",
				property: "długość",
			},
			{
				ordered: 1,
				inputMeasured: "1",
				inputOrdered: "1",
				measured: 1,
				symbol: "kg/m",
				property: "masa",
			},
		];
		const result: boolean | Value[] = Validate(element, values);
		expect(result).toBe(true);
	});
});
