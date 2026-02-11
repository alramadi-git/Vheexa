DROP TABLE IF EXISTS "Images",
"Locations",
"Roles",
"Permissions",
"RolePermissions",
"Histories",
"Users",
"Partners",
"PartnerRoles",
"Branches",
"Members",
"MemberHistories",
"VehicleModels",
"VehicleModelGalleries";

CREATE TABLE
    "Images" ("Id" TEXT PRIMARY KEY, "Url" TEXT NOT NULL);

CREATE TABLE
    "Locations" (
        "Uuid" UUID PRIMARY KEY,
        "Country" TEXT NOT NULL,
        "City" TEXT NOT NULL,
        "Street" TEXT NOT NULL,
        "Latitude" DECIMAL(8, 6) NOT NULL,
        "Longitude" DECIMAL(9, 6) NOT NULL
    );

CREATE TABLE
    "Roles" (
        "Uuid" UUID PRIMARY KEY,
        "Name" TEXT NOT NULL,
        "IsDefault" BOOLEAN NOT NULL,
        "IsAdmin" BOOLEAN NOT NULL
    );

CREATE TABLE
    "Permissions" (
        "Uuid" UUID PRIMARY KEY,
        "Type" INT NOT NULL,
        "IsAdmin" BOOLEAN NOT NULL,
        UNIQUE ("Type", "IsAdmin")
    );

CREATE TABLE
    "RolePermissions" (
        "Uuid" UUID PRIMARY KEY,
        "RoleUuid" UUID NOT NULL REFERENCES "Roles" ("Uuid"),
        "PermissionUuid" UUID NOT NULL REFERENCES "Permissions" ("Uuid"),
        UNIQUE ("RoleUuid", "PermissionUuid")
    );

CREATE TABLE
    "Histories" (
        "Uuid" UUID PRIMARY KEY,
        "Action" INT NOT NULL,
        "Entity" INT NOT NULL,
        "EntityUuid" UUID NOT NULL
    );

CREATE TABLE
    "Users" (
        "Uuid" UUID PRIMARY KEY,
        "AvatarId" TEXT REFERENCES "Images" ("Id"),
        "LocationUuid" UUID NOT NULL REFERENCES "Locations" ("Uuid") UNIQUE,
        "Username" TEXT NOT NULL,
        "Birthday" DATE NOT NULL,
        "PhoneNumber" TEXT NOT NULL UNIQUE,
        "Email" TEXT NOT NULL UNIQUE,
        "Password" TEXT NOT NULL,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP
    );

CREATE UNIQUE INDEX "Users_AvatarId_unique_not_null" ON "Users" ("AvatarId")
WHERE
    "AvatarId" IS NOT NULL;

CREATE TABLE
    "Partners" (
        "Uuid" UUID PRIMARY KEY,
        "LogoId" TEXT REFERENCES "Images" ("Id"),
        "BannerId" TEXT REFERENCES "Images" ("Id"),
        "Handle" TEXT NOT NULL UNIQUE,
        "OrganizationName" TEXT NOT NULL,
        "PhoneNumber" TEXT NOT NULL UNIQUE,
        "Email" TEXT NOT NULL UNIQUE,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL
    );

CREATE UNIQUE INDEX "Partners_LogoId_unique_not_null" ON "Partners" ("LogoId")
WHERE
    "LogoId" IS NOT NULL;

CREATE UNIQUE INDEX "Partners_BannerId_unique_not_null" ON "Partners" ("BannerId")
WHERE
    "BannerId" IS NOT NULL;

CREATE TABLE
    "PartnerRoles" (
        "Uuid" UUID PRIMARY KEY,
        "PartnerUuid" UUID NOT NULL REFERENCES "Partners" ("Uuid"),
        "RoleUuid" UUID NOT NULL REFERENCES "Roles" ("Uuid"),
        "AssignedCount" INTEGER NOT NULL,
        "Status" INT NOT NULL,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP,
        UNIQUE ("PartnerUuid", "RoleUuid")
    );

CREATE TABLE
    "Branches" (
        "Uuid" UUID PRIMARY KEY,
        "PartnerUuid" UUID NOT NULL REFERENCES "Partners" ("Uuid"),
        "LocationUuid" UUID NOT NULL REFERENCES "Locations" ("Uuid"),
        "Name" TEXT NOT NULL,
        "PhoneNumber" TEXT NOT NULL,
        "Email" TEXT NOT NULL,
        "MemberCount" INTEGER NOT NULL,
        "Status" INT NOT NULL,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP,
        UNIQUE ("PartnerUuid", "LocationUuid")
    );

CREATE TABLE
    "Members" (
        "Uuid" UUID PRIMARY KEY,
        "PartnerUuid" UUID NOT NULL REFERENCES "Partners" ("Uuid"),
        "RoleUuid" UUID NOT NULL REFERENCES "PartnerRoles" ("Uuid"),
        "BranchUuid" UUID NOT NULL REFERENCES "Branches" ("Uuid"),
        "AvatarId" TEXT REFERENCES "Images" ("Id"),
        "Username" TEXT NOT NULL,
        "Email" TEXT NOT NULL UNIQUE,
        "Password" TEXT NOT NULL,
        "Status" INT NOT NULL,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP
    );

CREATE UNIQUE INDEX "Members_AvatarId_unique_not_null" ON "Members" ("AvatarId")
WHERE
    "AvatarId" IS NOT NULL;

CREATE TABLE
    "MemberHistories" (
        "Uuid" UUID PRIMARY KEY,
        "MemberUuid" UUID NOT NULL REFERENCES "Members" ("Uuid"),
        "HistoryUuid" UUID NOT NULL REFERENCES "Histories" ("Uuid") UNIQUE,
        "CreatedAt" TIMESTAMP NOT NULL
    );

CREATE TABLE
    "VehicleModels" (
        "Uuid" UUID PRIMARY KEY,
        "PartnerUuid" UUID NOT NULL REFERENCES "Partners" ("Uuid"),
        "ThumbnailId" TEXT REFERENCES "Images" ("Id"),
        "Name" TEXT NOT NULL,
        "Description" TEXT NOT NULL,
        "Category" INT NOT NULL,
        "Manufacturer" TEXT NOT NULL,
        "MarketLaunch" DATE NOT NULL,
        "Capacity" INTEGER NOT NULL,
        "Transmission" TEXT NOT NULL,
        "Fuel" TEXT NOT NULL,
        "Price" DECIMAL(10, 2) NOT NULL,
        "Discount" DECIMAL(5, 2) NOT NULL,
        "Tags" TEXT NOT NULL,
        "Status" INT NOT NULL,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP,
        UNIQUE (
            "PartnerUuid",
            "Name",
            "Category",
            "Manufacturer",
            "MarketLaunch",
            "Capacity",
            "Transmission",
            "Fuel"
        )
    );

CREATE UNIQUE INDEX "VehicleModels_ThumbnailId_unique_not_null" ON "VehicleModels" ("ThumbnailId")
WHERE
    "ThumbnailId" IS NOT NULL;

CREATE TABLE
    "VehicleModelGalleries" (
        "Uuid" UUID PRIMARY KEY,
        "VehicleModelUuid" UUID NOT NULL REFERENCES "VehicleModels" ("Uuid"),
        "ImageId" TEXT NOT NULL REFERENCES "Images" ("Id") UNIQUE,
        "Index" INTEGER NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP
    );