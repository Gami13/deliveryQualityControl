USE [QualityControl]
GO

/****** Object:  Table [dbo].[elements]    Script Date: 17.05.2023 10:39:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[elements](
	[id] [int] NOT NULL IDENTITY(1,1),
	[code] [varchar](max) NOT NULL,
	[property] [varchar](max) NOT NULL,
	[propertySymbol] [varchar](3) NOT NULL,
	[propertySecond] [varchar](max) NULL,
	[propertySecondSymbol] [varchar](3)  NULL,
	[propertiesOperation] [varchar](1) NULL,
	[propertyUnit] [varchar](10) NOT NULL,
	[rangeFrom] [decimal] NOT NULL,
	[rangeTo] [decimal] NOT NULL,
	[rangeUnit] [varchar](10) NOT NULL,
	[rangeProperty] [varchar](max) NOT NULL,
	[rangePropertySymbol] [varchar](3) NOT NULL,
	[toleranceStart] [decimal] NULL,
	[toleranceEnd] [decimal] NULL,
	[toleranceUnit] [varchar](10) NOT NULL,
	[toleranceProperty] [varchar](max) NULL,
	[tolerancePropertySymbol] [varchar](3) NULL,
	[illustration] [varchar](max) NULL,
	[toleranceStartAgreement] [decimal] NULL,
	[toleranceEndAgreement] [decimal] NULL,
	[name] [varchar](max) NOT NULL,
 CONSTRAINT [idIndex] UNIQUE NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

INSERT INTO dbo.elements(code,property,propertySymbol,propertySecond, propertySecondSymbol, propertiesOperation, propertyUnit,rangeFrom,rangeTo,rangeUnit,rangeProperty,rangePropertySymbol,toleranceStart,toleranceEnd,toleranceUnit,toleranceProperty,tolerancePropertySymbol,illustration,toleranceStartAgreement,toleranceEndAgreement,name) VALUES ('PN-EN 10024','prostość','qxx','prostość','qyy',NULL,80,180,'wysokość','h',0%,0.3%,'długość','L',NULL,NULL,NULL, 'yes sir')

INSERT INTO dbo.elements(code,property,propertySymbol,rangeFrom,rangeTo,rangeProperty,rangePropertySymbol,toleranceStart,toleranceEnd,toleranceProperty,tolerancePropertySymbol,illustration,toleranceStartAgreement,toleranceEndAgreement,name) VALUES ('PN-EN 10024','prostość','qxx',180,360,'wysokość','h',0%,0.15%,'długość','L','sdf',32,2, 'yes sir')



