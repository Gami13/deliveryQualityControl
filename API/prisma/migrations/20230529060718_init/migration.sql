BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[elements] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] VARCHAR(255) NOT NULL,
    [property] VARCHAR(255) NOT NULL,
    [propertysymbol] VARCHAR(3) NOT NULL,
    [propertysecond] VARCHAR(255),
    [propertysecondsymbol] VARCHAR(3),
    [propertiesoperation] VARCHAR(255),
    [propertyunit] VARCHAR(10) NOT NULL,
    [rangefrom] DECIMAL(19,4),
    [rangeto] DECIMAL(19,4),
    [rangeunit] VARCHAR(10) NOT NULL,
    [rangeproperty] VARCHAR(255) NOT NULL,
    [rangepropertysymbol] VARCHAR(3) NOT NULL,
    [tolerancestart] DECIMAL(19,4),
    [toleranceend] DECIMAL(19,4),
    [toleranceunit] VARCHAR(10) NOT NULL,
    [toleranceproperty] VARCHAR(255),
    [tolerancepropertysymbol] VARCHAR(3),
    [illustration] VARCHAR(255),
    [tolerancestartagreement] DECIMAL(19,4),
    [toleranceendagreement] DECIMAL(19,4),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [elements_pkey] PRIMARY KEY CLUSTERED ([id])
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
