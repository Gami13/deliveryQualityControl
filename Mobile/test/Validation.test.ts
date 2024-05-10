import { Validate } from "../Validation";
import type { Value } from "../Types";
import { describe, expect, it } from "vitest";
import { PNEN10024, PNEN100562, PNEN10058, PNEN10279 } from "./MockData";
describe("Validation testing", () => {
	it("Validating PNEN10024 - Should Pass", () => {
		const element = PNEN10024;
		const values: Value[] = [
			{
				ordered: 400,
				measured: 400,
				symbol: "h",
				property: "wysokość",
			},
			{
				ordered: 0,
				measured: 0.5,
				symbol: "qyy",
				property: "prostość",
			},
			{
				ordered: 0,
				measured: 0.5,
				symbol: "qxx",
				property: "prostość",
			},
			{
				ordered: 80,
				measured: 81,
				symbol: "b",
				property: "szerokość stopki",
			},
			{
				ordered: 8,
				measured: 9,
				symbol: "t",
				property: "grubość stopki",
			},
			{
				ordered: 8,
				measured: 8,
				symbol: "s",
				property: "grubość środnika",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k`",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "e",
				property: "niesymetryczność stopek",
			},
			{
				ordered: 100,
				measured: 102,
				symbol: "m",
				property: "masa",
			},
			{
				ordered: 1200,
				measured: 1240,
				symbol: "L",
				property: "długość",
			},
		];
		const result: boolean | Value[] = Validate(element, values);
		expect(result).toBe(true);
	});
	it("Validating PNEN10024 - Should Pass", () => {
		const element = PNEN10024;
		const values: Value[] = [
			{
				ordered: 200,
				measured: 202,
				symbol: "h",
				property: "wysokość",
			},
			{
				ordered: 0,
				measured: 0.5,
				symbol: "qyy",
				property: "prostość",
			},
			{
				ordered: 0,
				measured: 0.5,
				symbol: "qxx",
				property: "prostość",
			},
			{
				ordered: 100,
				measured: 102,
				symbol: "b",
				property: "szerokość stopki",
			},
			{
				ordered: 20,
				measured: 22.5,
				symbol: "t",
				property: "grubość stopki",
			},
			{
				ordered: 7,
				measured: 6,
				symbol: "s",
				property: "grubość środnika",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k`",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "e",
				property: "niesymetryczność stopek",
			},
			{
				ordered: 100,
				measured: 104,
				symbol: "m",
				property: "masa",
			},
			{
				ordered: 1703,
				measured: 1653,
				symbol: "L",
				property: "długość",
			},
		];
		const result: boolean | Value[] = Validate(element, values);
		expect(result).toBe(true);
	});
	it("Validating PNEN10024 - Dumb", () => {
		const element = PNEN10024;
		const values: Value[] = [
			{
				ordered: 1,
				measured: 1,
				symbol: "h",
				property: "wysokość",
			},
			{
				ordered: 0,
				measured: 0,
				symbol: "qyy",
				property: "prostość",
			},
			{
				ordered: 0,
				measured: 0,
				symbol: "qxx",
				property: "prostość",
			},
			{
				ordered: 1,
				measured: 1,
				symbol: "b",
				property: "szerokość stopki",
			},
			{
				ordered: 1,
				measured: 1,
				symbol: "t",
				property: "grubość stopki",
			},
			{
				ordered: 1,
				measured: 1,
				symbol: "s",
				property: "grubość środnika",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "k`",
				property: "skośność stopek",
			},
			{
				ordered: 0,
				measured: 1,
				symbol: "e",
				property: "niesymetryczność stopek",
			},
			{
				ordered: 1,
				measured: 1,
				symbol: "m",
				property: "masa",
			},
			{
				ordered: 1,
				measured: 1,
				symbol: "L",
				property: "długość",
			},
		];
		const result: boolean | Value[] = Validate(element, values);
		expect(result).toBe(true);
	});
	
});
