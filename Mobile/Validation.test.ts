import { Validate } from "./Validation";
import { Value } from "./Types";
import { PNEN10024, PNEN100562, PNEN10058, PNEN10279 } from "./MockData";
test("Attempts validation for PNEN10024", () => {
	const element = PNEN10024;
	const values: Value[] = [];
	expect(() => Validate(element, values)).toBe(true);
});
