import express, { Response } from "express";
const cors = require("cors");
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
import { elements } from "./schema";
import { and, desc, eq, sql } from "drizzle-orm";
import type { ElementJSON } from "./types";

const fs = require("node:fs");
dotenv.config();

const conn = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(conn);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/resetElements", async (req, res) => {
	await db.delete(elements);

	const fileNames: string[] = fs.readdirSync("./elems");
	console.log(fileNames);
	let rangeCount = 0;
	for (const fileName of fileNames) {
		if (!fileName.includes(".json")) {
			continue;
		}

		const fileContent = fs.readFileSync(`./elems/${fileName}`, "utf8");
		const fileJSON = JSON.parse(fileContent) as ElementJSON;
		for (const prop of fileJSON.properties) {
			for (const rg of prop.ranges) {
				rangeCount++;

				await db
					.insert(elements)
					.values({
						code: fileJSON.code,
						name: fileJSON.name,
						property: prop.property,
						propertysymbol: prop.propertySymbol,
						propertysecond: prop.propertySecond || null,
						propertysecondsymbol: prop.propertySecondSymbol || null,
						propertiesoperation: prop.propertySecondOperation || null,
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
					})
					.execute();
			}
		}
	}
	console.log("Range count", rangeCount);
	res.send("Reset complete");
});
app.get("/allElements", async (req, res) => {
	const allElements = await db
		.select()
		.from(elements)
		.orderBy(desc(elements.code), desc(elements.name));

	if (!allElements) {
		res.status(404).send("Not found");
		return;
	}
	res.json(allElements);
	return true;
});
app.get("/allProperties/:code", async (req, res) => {
	const code: string = req.params.code;
	console.log(code);
	const allProperties = await db
		.select()
		.from(elements)
		.where(eq(elements.code, code))
		.orderBy(desc(elements.property), desc(elements.propertysymbol));

	if (!allProperties) {
		res.status(404).send("Not found");
		return;
	}
	res.json(allProperties);
	return true;
});
app.get("/ranges/:code/:property", async (req, res) => {
	const code: string = req.params.code;
	const property: string = req.params.property;
	console.log(code, property);
	const ranges = await db
		.select()
		.from(elements)
		.where(and(eq(elements.code, code), eq(elements.property, property)))
		.orderBy(desc(elements.rangefrom), desc(elements.rangeto));
	if (!ranges) {
		res.status(404).send("Not found");
		return;
	}
	res.json(ranges);
	return true;
});
app.get("/", (req, res) => {
	return res.send("IT WORKY WORKY pls pls pls psl");
});
app.listen(8080, () => {
	console.log("Server started on port 3000");
});
// sql.end();
