BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[elements] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] VARCHAR(max) NOT NULL,
    [property] VARCHAR(max) NOT NULL,
    [propertySymbol] VARCHAR(3) NOT NULL,
    [propertySecond] VARCHAR(max),
    [propertySecondSymbol] VARCHAR(3),
    [propertiesOperation] VARCHAR(25),
    [propertyUnit] VARCHAR(10) NOT NULL,
    [rangeFrom] DECIMAL(18,0),
    [rangeTo] DECIMAL(18,0),
    [rangeUnit] VARCHAR(10) NOT NULL,
    [rangeProperty] VARCHAR(max) NOT NULL,
    [rangePropertySymbol] VARCHAR(3) NOT NULL,
    [toleranceStart] DECIMAL(18,0),
    [toleranceEnd] DECIMAL(18,0),
    [toleranceUnit] VARCHAR(10) NOT NULL,
    [toleranceProperty] VARCHAR(max),
    [tolerancePropertySymbol] VARCHAR(3),
    [illustration] VARCHAR(max),
    [toleranceStartAgreement] DECIMAL(18,0),
    [toleranceEndAgreement] DECIMAL(18,0),
    [name] VARCHAR(max) NOT NULL,
    CONSTRAINT [idIndex] UNIQUE NONCLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

