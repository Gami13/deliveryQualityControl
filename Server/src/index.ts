import express, { Response } from "express";
const cors = require("cors");
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
import { elements } from "./schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import type { ElementJSON, ElementPretty } from "./types";

const fs = require("node:fs");
dotenv.config();

const conn = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(conn);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/migrate", async (req, res) => {
	await migrate(db, { migrationsFolder: "./drizzle" });
	res.send("Migration complete");
});

app.get("/reset-elements", async (req, res) => {
	await db.delete(elements);

	const fileNames: string[] = fs.readdirSync("./elems");
	console.log(fileNames);
	let rangeCount = 0;
	for (const fileName of fileNames) {
		if (!fileName.includes(".json")) {
			continue;
		}

		const fileJSON = JSON.parse(
			fs.readFileSync(`./elems/${fileName}`, "utf8"),
		) as ElementJSON;

		for (const prop of fileJSON.properties) {
			for (const rg of prop.ranges) {
				rangeCount++;

				await db.insert(elements).values({
					code: fileJSON.code,
					name: fileJSON.name,
					property: prop.property,
					propertysymbol: prop.propertySymbol,
					propertysecond: prop.propertySecond || null,
					propertysecondsymbol: prop.propertySecondSymbol || null,
					propertiesoperation: prop.propertiesOperation || null,
					propertyunit: prop.propertyUnit,
					rangefrom:
						rg.rangeFrom?.toLowerCase() === "null" || rg.rangeFrom === ""
							? null
							: rg.rangeFrom,
					rangeto:
						rg.rangeTo?.toLowerCase() === "null" ||
						rg.rangeTo.toLowerCase() === ""
							? null
							: rg.rangeTo,
					rangeunit:
						rg.rangeUnit === undefined ? prop.propertyUnit : rg.rangeUnit,
					rangeproperty: rg.rangeProperty,
					rangepropertysymbol: rg.rangePropertySymbol,
					tolerancestart: rg.toleranceStart,
					toleranceend: rg.toleranceEnd,
					toleranceunit:
						rg.toleranceUnit === undefined
							? prop.propertyUnit
							: rg.toleranceUnit,
					toleranceproperty: rg.toleranceProperty,
					tolerancepropertysymbol: rg.tolerancePropertySymbol,
					illustration: null,
					tolerancestartagreement: rg.toleranceStartAgreement || null,
					toleranceendagreement: rg.toleranceEndAgreement || null,
					ispropertyorderable: prop.isPropertyOrderable,
				});
			}
		}
	}
	console.log("Range count", rangeCount);
	res.send("Reset complete");
});
app.get("/elements", async (req, res) => {
	const allElements = await db
		.select()
		.from(elements)
		.orderBy(asc(elements.code), asc(elements.name));

	if (!allElements) {
		res.status(404).send("Not found");
		return;
	}
	//Converting to ElementPretty
	const elementsPretty: ElementPretty[] = [];
	for (const elem of allElements) {
		const range = {
			rangeUnit: elem.rangeunit,
			rangeProperty: elem.rangeproperty,
			rangePropertySymbol: elem.rangepropertysymbol,
			toleranceProperty: elem.toleranceproperty,
			tolerancePropertySymbol: elem.tolerancepropertysymbol,
			toleranceUnit: elem.toleranceunit,
			canAgreeTolerance: elem.tolerancestartagreement !== null,
			rangeFrom: Number.parseFloat(elem.rangefrom || "0"),
			rangeTo: Number.parseFloat(elem.rangeto || "0"),
			toleranceStart: Number.parseFloat(elem.tolerancestart || "0"),
			toleranceEnd: Number.parseFloat(elem.toleranceend || "0"),
			toleranceStartAgreement: Number.parseFloat(
				elem.tolerancestartagreement || "0",
			),
			toleranceEndAgreement: Number.parseFloat(
				elem.toleranceendagreement || "0",
			),
		};
		const property = {
			property: elem.property,
			propertySymbol: elem.propertysymbol,
			propertyUnit: elem.propertyunit,
			propertySecond: elem.propertysecond || null,
			propertySecondSymbol: elem.propertysecondsymbol || null,
			propertiesOperation: elem.propertiesoperation || null,
			isPropertyOrderable: elem.ispropertyorderable,
			ranges: [range],
		};

		if (elementsPretty[elementsPretty.length - 1]?.code === elem.code) {
			if (
				elementsPretty[elementsPretty.length - 1].properties[
					elementsPretty[elementsPretty.length - 1].properties.length - 1
				].property === elem.property
			) {
				elementsPretty[elementsPretty.length - 1].properties[
					elementsPretty[elementsPretty.length - 1].properties.length - 1
				].ranges.push(range);
			} else {
				//add property
				elementsPretty[elementsPretty.length - 1].properties.push(property);
			}
		} else {
			//add element
			elementsPretty.push({
				code: elem.code,
				name: elem.name,
				properties: [property],
				allNeededValues: [],
			});
		}
		elementsPretty[elementsPretty.length - 1].allNeededValues.push({
			name: elem.rangeproperty,
			symbol: elem.rangepropertysymbol,
			unit: elem.rangeunit,
			isOrderable: true,
		});
		// elementsPretty[elementsPretty.length - 1].allNeededValues.push({
		// 	name: elem.toleranceproperty || "",
		// 	symbol: elem.tolerancepropertysymbol || "",
		// 	unit: elem.toleranceunit,
		// });
		elementsPretty[elementsPretty.length - 1].allNeededValues.push({
			name: elem.property,
			symbol: elem.propertysymbol,
			unit: elem.propertyunit,
			isOrderable: elem.ispropertyorderable,
		});

		if (elem.propertysecond) {
			elementsPretty[elementsPretty.length - 1].allNeededValues.push({
				name: elem.propertysecond || "",
				symbol: elem.propertysecondsymbol || "",
				unit: elem.propertyunit,
				isOrderable: elem.ispropertyorderable,
			});
		}
	}
	//remove duplicate allNeededValues
	for (const elem of elementsPretty) {
		elem.allNeededValues = elem.allNeededValues.filter(
			(v, i, a) =>
				a.findIndex((t) => t.name === v.name && t.symbol === v.symbol) === i,
		);
	}
	res.send(elementsPretty);
});
app.get("/", (req, res) => {
	return res.send("IT WORKY WORKY pls pls pls psl");
});
app.listen(8080, () => {
	console.log("Server started on port 3000");
});
// sql.end();
