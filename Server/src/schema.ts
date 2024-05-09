import { pgTable, serial, text, decimal } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";

export const elements = pgTable("elements", {
	id: serial("id").primaryKey().notNull(),
	code: text("code").notNull(),
	property: text("property").notNull(),
	propertysymbol: text("propertysymbol").notNull(),
	propertysecond: text("propertysecond"),
	propertysecondsymbol: text("propertysecondsymbol"),
	propertiesoperation: text("propertiesoperation"),
	propertyunit: text("propertyunit").notNull(),
	rangefrom: decimal("rangefrom", { precision: 19, scale: 4 }),
	rangeto: decimal("rangeto", { precision: 19, scale: 4 }),
	rangeunit: text("rangeunit").notNull(),
	rangeproperty: text("rangeproperty").notNull(),
	rangepropertysymbol: text("rangepropertysymbol").notNull(),
	tolerancestart: decimal("tolerancestart", { precision: 19, scale: 4 }),
	toleranceend: decimal("toleranceend", { precision: 19, scale: 4 }),
	toleranceunit: text("toleranceunit").notNull(),
	toleranceproperty: text("toleranceproperty"),
	tolerancepropertysymbol: text("tolerancepropertysymbol"),
	illustration: text("illustration"),
	tolerancestartagreement: decimal("tolerancestartagreement", {
		precision: 19,
		scale: 4,
	}),
	toleranceendagreement: decimal("toleranceendagreement", {
		precision: 19,
		scale: 4,
	}),
	name: text("name").notNull(),
	ispropertyorderable: boolean("ispropertyorderable").notNull(),
});
