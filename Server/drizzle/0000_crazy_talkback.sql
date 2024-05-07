-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "elements" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"property" varchar(255) NOT NULL,
	"propertysymbol" varchar(6) NOT NULL,
	"propertysecond" varchar(255),
	"propertysecondsymbol" varchar(6),
	"propertiesoperation" varchar(255),
	"propertyunit" varchar(10) NOT NULL,
	"rangefrom" numeric(19, 4),
	"rangeto" numeric(19, 4),
	"rangeunit" varchar(10) NOT NULL,
	"rangeproperty" varchar(255) NOT NULL,
	"rangepropertysymbol" varchar(6) NOT NULL,
	"tolerancestart" numeric(19, 4),
	"toleranceend" numeric(19, 4),
	"toleranceunit" varchar(10) NOT NULL,
	"toleranceproperty" varchar(255),
	"tolerancepropertysymbol" varchar(6),
	"illustration" varchar(255),
	"tolerancestartagreement" numeric(19, 4),
	"toleranceendagreement" numeric(19, 4),
	"name" varchar(255) NOT NULL
);

*/