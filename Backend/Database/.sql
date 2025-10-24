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
-- INSERT DUMMY DATA
-- =============================================================

-- =============================================================
-- USER AVATAR
-- =============================================================
INSERT INTO "Images" ("URL") VALUES
('https://ik.imagekit.io/alramadi/vheexa/website/assets/avatar.png'); -- user avatar

-- =============================================================
-- PARTNER IMAGES (Logo + Banner)
-- =============================================================
INSERT INTO "Images" ("URL") VALUES
('https://ik.imagekit.io/alramadi/vheexa/website/brand/logo.png'),  -- partner logo
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'); -- partner banner

-- =============================================================
-- VEHICLE THUMBNAILS
-- =============================================================
INSERT INTO "Images" ("URL") VALUES
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png');

-- =============================================================
-- VEHICLE IMAGES (separate from thumbnails)
-- =============================================================
INSERT INTO "Images" ("URL") VALUES
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png'),
('https://ik.imagekit.io/alramadi/vheexa/website/assets/placeholder.png');

-- =============================================================
-- LOCATION
-- =============================================================
INSERT INTO "Locations" ("Country", "City", "Street", "Latitude", "Longitude") VALUES
('USA', 'New York', '5th Avenue', 40.7128, -74.0060);

-- =============================================================
-- HUMAN / USER
-- =============================================================
INSERT INTO "Humans" ("AvatarUUID", "LocationUUID", "Username", "DateOfBirth", "PhoneNumber", "Email", "Password") VALUES
((SELECT "UUID" FROM "Images" OFFSET 0 LIMIT 1),
 (SELECT "UUID" FROM "Locations" OFFSET 0 LIMIT 1),
 'user', '1990-01-01', '+10000000000', 'user@vheexa.com', 'AQAAAAIAAYagAAAAEIxLR0r2g0pwsSvrhCJNoGcOHtiHt6eb1Rm90G0m+jjHS9B3RiF4px6sQlvv8N3nEA==');

INSERT INTO "Users" ("HumanUUID", "IsDeleted", "DeletedAt", "UpdatedAt", "CreatedAt") VALUES
((SELECT "UUID" FROM "Humans" OFFSET 0 LIMIT 1), FALSE, NULL, NOW(), NOW());

-- =============================================================
-- PARTNER
-- =============================================================
INSERT INTO "Partners" ("LogoUUID", "BannerUUID", "Handle", "Name", "PhoneNumber", "Email", "Password", "IsDeleted", "DeletedAt", "UpdatedAt", "CreatedAt") VALUES
(
 (SELECT "UUID" FROM "Images" OFFSET 1 LIMIT 1),
 (SELECT "UUID" FROM "Images" OFFSET 2 LIMIT 1),
 'vheexa', 'vheexa.', '+19999999999', 'partner@vheexa.com', 'AQAAAAIAAYagAAAAEIxLR0r2g0pwsSvrhCJNoGcOHtiHt6eb1Rm90G0m+jjHS9B3RiF4px6sQlvv8N3nEA==',
 FALSE, NULL, NOW(), NOW()
);

-- =============================================================
-- Partner Supported Location
-- =============================================================
INSERT INTO "PartnerSupportedLocations" ("PartnerUUID", "LocationUUID", "IsPublished", "IsDeleted", "DeletedAt", "UpdatedAt", "CreatedAt") VALUES
(
 (SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1),
 (SELECT "UUID" FROM "Locations" OFFSET 0 LIMIT 1),
TRUE, FALSE, NULL, NOW(), NOW()
);

-- =============================================================
-- VEHICLES (12 Hard-coded)
-- =============================================================
INSERT INTO "Vehicles" ("PartnerUUID", "ThumbnailUUID", "Name", "Description", "Manufacturer", "ModelYear", "Transmission", "Capacity", "Fuel", "Price", "Discount", "Tags", "IsPublished", "IsDeleted", "DeletedAt", "UpdatedAt", "CreatedAt") VALUES
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 3 LIMIT 1), 'Sedan A', 'Comfortable city sedan.', 'Toyota', '2022-01-01', 'Automatic', 5, 'Petrol', 50.0, 0.1, ARRAY['sedan','comfort'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 4 LIMIT 1), 'Hatchback B', 'Eco-friendly hatchback.', 'Honda', '2021-01-01', 'Manual', 4, 'Hybrid', 45.0, 0.05, ARRAY['eco','hatchback'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 5 LIMIT 1), 'SUV C', 'Spacious SUV for family trips.', 'Ford', '2020-01-01', 'Automatic', 7, 'Diesel', 70.0, 0.1, ARRAY['suv','family'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 6 LIMIT 1), 'Luxury D', 'Luxury sedan with premium comfort.', 'BMW', '2022-06-01', 'Automatic', 5, 'Petrol', 80.0, 0.15, ARRAY['luxury','sedan'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 7 LIMIT 1), 'Coupe E', 'Sporty coupe car.', 'Audi', '2021-03-01', 'Manual', 4, 'Petrol', 60.0, 0.1, ARRAY['coupe','sport'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 8 LIMIT 1), 'Convertible F', 'Convertible for summer drives.', 'Mercedes', '2020-05-01', 'Automatic', 2, 'Petrol', 90.0, 0.2, ARRAY['convertible','sport'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 9 LIMIT 1), 'Van G', 'Spacious van for family trips.', 'Toyota', '2021-07-01', 'Automatic', 8, 'Diesel', 75.0, 0.1, ARRAY['van','family'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 10 LIMIT 1), 'Pickup H', 'Robust pickup truck.', 'Ford', '2022-02-01', 'Manual', 2, 'Diesel', 65.0, 0.05, ARRAY['pickup','utility'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 11 LIMIT 1), 'Sedan I', 'Compact sedan.', 'Honda', '2021-08-01', 'Automatic', 5, 'Petrol', 55.0, 0.1, ARRAY['sedan','compact'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 12 LIMIT 1), 'Hatchback J', 'Efficient city hatchback.', 'Toyota', '2020-09-01', 'Manual', 4, 'Hybrid', 48.0, 0.05, ARRAY['hatchback','eco'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 13 LIMIT 1), 'SUV K', 'Family SUV.', 'Ford', '2022-03-01', 'Automatic', 7, 'Diesel', 72.0, 0.1, ARRAY['suv','family'], TRUE, FALSE, NULL, NOW(), NOW()),
((SELECT "UUID" FROM "Partners" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 14 LIMIT 1), 'Luxury L', 'High-end luxury sedan.', 'BMW', '2023-01-01', 'Automatic', 5, 'Petrol', 85.0, 0.15, ARRAY['luxury','sedan'], TRUE, FALSE, NULL, NOW(), NOW());

-- =============================================================
-- VEHICLE COLORS
-- =============================================================
INSERT INTO "VehicleColors" ("VehicleUUID", "Name", "HexCode", "IsPublished", "IsDeleted", "DeletedAt", "CreatedAt") VALUES
((SELECT "UUID" FROM "Vehicles" OFFSET 0 LIMIT 1), 'Black', '#000000', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 0 LIMIT 1), 'White', '#FFFFFF', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 1 LIMIT 1), 'Black', '#000000', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 2 LIMIT 1), 'Silver', '#C0C0C0', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 3 LIMIT 1), 'Blue', '#0000FF', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 4 LIMIT 1), 'Red', '#FF0000', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 5 LIMIT 1), 'Yellow', '#FFFF00', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 6 LIMIT 1), 'Green', '#008000', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 7 LIMIT 1), 'Gray', '#808080', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 8 LIMIT 1), 'Beige', '#F5F5DC', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 9 LIMIT 1), 'Orange', '#FFA500', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 10 LIMIT 1), 'Brown', '#A52A2A', TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 11 LIMIT 1), 'Purple', '#800080', TRUE, FALSE, NULL, NOW());

-- =============================================================
-- VEHICLE IMAGES
-- =============================================================
INSERT INTO "VehicleImages" ("VehicleUUID", "ImageUUID", "IsPublished", "IsDeleted", "DeletedAt", "CreatedAt") VALUES
((SELECT "UUID" FROM "Vehicles" OFFSET 0 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 14 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 1 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 15 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 2 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 17 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 3 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 18 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 4 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 19 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 5 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 20 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 6 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 21 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 7 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 22 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 8 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 23 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 9 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 24 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 10 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 25 LIMIT 1), TRUE, FALSE, NULL, NOW()),
((SELECT "UUID" FROM "Vehicles" OFFSET 11 LIMIT 1), (SELECT "UUID" FROM "Images" OFFSET 26 LIMIT 1), TRUE, FALSE, NULL, NOW());