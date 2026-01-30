-- =============================================================
-- DROP TABLES IN ORDER (to avoid FK errors)
-- =============================================================
DROP TABLE IF EXISTS "VehicleInstanceSupportedLocations", "VehicleInstances", "VehicleImages", "VehicleColors", "Vehicles", "PartnerSupportedLocations", "Partners", "Users", "Humans", "Locations", "Images" CASCADE;

-- =============================================================
-- EXTENSIONS
-- =============================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================================
-- ENUMS
-- =============================================================
CREATE TYPE "VehicleInstanceStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- =============================================================
-- TABLES
-- =============================================================

CREATE TABLE "Images" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "URL" TEXT NOT NULL
);

CREATE TABLE "Locations" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Country" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "Latitude" DECIMAL(8,6) NOT NULL,
    "Longitude" DECIMAL(9,6) NOT NULL
);

CREATE INDEX "LocationsCountryIndex" ON "Locations" ("Country");
CREATE INDEX "LocationsLatitudeIndex" ON "Locations" ("Latitude");
CREATE INDEX "LocationsLongitudeIndex" ON "Locations" ("Longitude");

CREATE TABLE "Humans" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "AvatarUUID" UUID REFERENCES "Images"("UUID") UNIQUE,
    "LocationUUID" UUID NOT NULL REFERENCES "Locations"("UUID") UNIQUE,
    "Username" TEXT NOT NULL,
    "DateOfBirth" DATE NOT NULL,
    "PhoneNumber" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL
);

CREATE INDEX "HumansPhoneNumberIndex" ON "Humans" ("PhoneNumber");
CREATE INDEX "HumansEmailIndex" ON "Humans" ("Email");

CREATE TABLE "Users" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "HumanUUID" UUID NOT NULL REFERENCES "Humans"("UUID") UNIQUE,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL
);

CREATE INDEX "UsersIsDeletedIndex" ON "Users" ("IsDeleted");
CREATE INDEX "UsersCreatedAtIndex" ON "Users" ("CreatedAt");

CREATE TABLE "Partners" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "LogoUUID" UUID REFERENCES "Images"("UUID") UNIQUE,
    "BannerUUID" UUID REFERENCES "Images"("UUID") UNIQUE,
    "Handle" TEXT NOT NULL UNIQUE,
    "Name" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL
);

CREATE INDEX "PartnersHandleIndex" ON "Partners" ("Handle");
CREATE INDEX "PartnersPhoneNumberIndex" ON "Partners" ("PhoneNumber");
CREATE INDEX "PartnersEmailIndex" ON "Partners" ("Email");
CREATE INDEX "PartnersIsDeletedIndex" ON "Partners" ("IsDeleted");
CREATE INDEX "PartnersCreatedAtIndex" ON "Partners" ("CreatedAt");

CREATE TABLE "PartnerSupportedLocations" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "PartnerUUID" UUID NOT NULL REFERENCES "Partners"("UUID"),
    "LocationUUID" UUID NOT NULL REFERENCES "Locations"("UUID"),
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    UNIQUE ("PartnerUUID", "LocationUUID")
);

CREATE INDEX "PartnerSupportedLocationsPartnerUUIDIndex" ON "PartnerSupportedLocations" ("PartnerUUID");
CREATE INDEX "PartnerSupportedLocationsIsPublishedIndex" ON "PartnerSupportedLocations" ("IsPublished");
CREATE INDEX "PartnerSupportedLocationsIsDeletedIndex" ON "PartnerSupportedLocations" ("IsDeleted");
CREATE INDEX "PartnerSupportedLocationsCreatedAtIndex" ON "PartnerSupportedLocations" ("CreatedAt");

CREATE TABLE "Vehicles" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "PartnerUUID" UUID NOT NULL REFERENCES "Partners"("UUID"),
    "ThumbnailUUID" UUID REFERENCES "Images"("UUID") UNIQUE,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Manufacturer" TEXT NOT NULL,
    "ModelYear" DATE NOT NULL,
    "Transmission" TEXT NOT NULL,
    "Capacity" SMALLINT NOT NULL,
    "Fuel" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Discount" DECIMAL(3,2) NOT NULL,
    "Tags" TEXT[] NOT NULL,
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL,
    UNIQUE ("PartnerUUID", "Name", "Manufacturer", "ModelYear", "Transmission", "Capacity", "Fuel")
);

CREATE INDEX "VehiclesPartnerUUIDIndex" ON "Vehicles" ("PartnerUUID");
CREATE INDEX "VehiclesNameIndex" ON "Vehicles" ("Name");
CREATE INDEX "VehiclesDescriptionIndex" ON "Vehicles" ("Description");
CREATE INDEX "VehiclesPriceIndex" ON "Vehicles" ("Price");
CREATE INDEX "VehiclesTagsIndex" ON "Vehicles" USING GIN ("Tags");
CREATE INDEX "VehiclesIsPublishedIndex" ON "Vehicles" ("IsPublished");
CREATE INDEX "VehiclesIsDeletedIndex" ON "Vehicles" ("IsDeleted");
CREATE INDEX "VehiclesCreatedAtIndex" ON "Vehicles" ("CreatedAt");

CREATE TABLE "VehicleColors" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "VehicleUUID" UUID NOT NULL REFERENCES "Vehicles"("UUID"),
    "Name" TEXT NOT NULL,
    "HexCode" TEXT NOT NULL,
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL,
    UNIQUE ("VehicleUUID", "Name", "HexCode")
);

CREATE INDEX "VehicleColorsVehicleUUIDIndex" ON "VehicleColors" ("VehicleUUID");
CREATE INDEX "VehicleColorsIsPublishedIndex" ON "VehicleColors" ("IsPublished");
CREATE INDEX "VehicleColorsIsDeletedIndex" ON "VehicleColors" ("IsDeleted");
CREATE INDEX "VehicleColorsCreatedAtIndex" ON "VehicleColors" ("CreatedAt");

CREATE TABLE "VehicleImages" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "VehicleUUID" UUID NOT NULL REFERENCES "Vehicles"("UUID"),
    "ImageUUID" UUID NOT NULL REFERENCES "Images"("UUID"),
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL,
    UNIQUE ("VehicleUUID", "ImageUUID")
);

CREATE INDEX "VehicleImagesVehicleUUIDIndex" ON "VehicleImages" ("VehicleUUID");
CREATE INDEX "VehicleImagesIsPublishedIndex" ON "VehicleImages" ("IsPublished");
CREATE INDEX "VehicleImagesIsDeletedIndex" ON "VehicleImages" ("IsDeleted");
CREATE INDEX "VehicleImagesCreatedAtIndex" ON "VehicleImages" ("CreatedAt");

CREATE TABLE "VehicleInstances" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "VehicleUUID" UUID NOT NULL REFERENCES "Vehicles"("UUID"),
    "VehicleColorUUID" UUID NOT NULL REFERENCES "VehicleColors"("UUID"),
    "Plate" TEXT NOT NULL UNIQUE,
    "Status" "VehicleInstanceStatus" NOT NULL,
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL
);

CREATE INDEX "VehicleInstancesVehicleUUIDIndex" ON "VehicleInstances" ("VehicleUUID");
CREATE INDEX "VehicleInstancesVehicleColorUUIDIndex" ON "VehicleInstances" ("VehicleColorUUID");
CREATE INDEX "VehicleInstancesPlateIndex" ON "VehicleInstances" ("Plate");
CREATE INDEX "VehicleInstancesStatusIndex" ON "VehicleInstances" ("Status");
CREATE INDEX "VehicleInstancesIsPublishedIndex" ON "VehicleInstances" ("IsPublished");
CREATE INDEX "VehicleInstancesIsDeletedIndex" ON "VehicleInstances" ("IsDeleted");
CREATE INDEX "VehicleInstancesCreatedAtIndex" ON "VehicleInstances" ("CreatedAt");

CREATE TABLE "VehicleInstanceSupportedLocations" (
    "UUID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "VehicleInstanceUUID" UUID NOT NULL REFERENCES "VehicleInstances"("UUID"),
    "PartnerSupportedLocationUUID" UUID NOT NULL REFERENCES "PartnerSupportedLocations"("UUID"),
    "IsPickup" BOOLEAN NOT NULL,
    "IsDropoff" BOOLEAN NOT NULL,
    "IsPublished" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "DeletedAt" TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL,
    UNIQUE ("VehicleInstanceUUID", "PartnerSupportedLocationUUID")
);

CREATE INDEX "VehicleInstanceSupportedLocationsVehicleInstanceUUIDIndex" ON "VehicleInstanceSupportedLocations" ("VehicleInstanceUUID");
CREATE INDEX "VehicleInstanceSupportedLocationsIsPickupIndex" ON "VehicleInstanceSupportedLocations" ("IsPickup");
CREATE INDEX "VehicleInstanceSupportedLocationsIsDropoffIndex" ON "VehicleInstanceSupportedLocations" ("IsDropoff");
CREATE INDEX "VehicleInstanceSupportedLocationsIsPublishedIndex" ON "VehicleInstanceSupportedLocations" ("IsPublished");
CREATE INDEX "VehicleInstanceSupportedLocationsIsDeletedIndex" ON "VehicleInstanceSupportedLocations" ("IsDeleted");
CREATE INDEX "VehicleInstanceSupportedLocationsCreatedAtIndex" ON "VehicleInstanceSupportedLocations" ("CreatedAt");

-- =============================================================
-- DUMMY DATA
-- =============================================================