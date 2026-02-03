-- =============================================================
-- DROP TABLES IN ORDER (to avoid FK errors)
-- =============================================================
DROP TABLE IF EXISTS "Images" "Locations",
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
"VehicleModelGalleries",
CASCADE;
-- =============================================================
-- ENUMS
-- =============================================================
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "HISTORY_ACTION" AS ENUM ('CREATE', 'UPDATE', 'DELETE');
CREATE TYPE "HISTORY_ENTITY" AS ENUM (
    'PARTNERS',
    'PARTNER_ROLES',
    'BRANCHES',
    'MEMBERS',
    'VEHICLE_MODELS',
);
CREATE TYPE "VEHICLE_MODEL_CATEGORY" AS ENUM (
    "CAR",
    "VAN",
    "TRUCK",
    "MOTORCYCLE",
    "BOAT",
    "YACHT",
    "JET_SKI",
    "HELICOPTER"
);
-- =============================================================
-- TABLES
-- =============================================================
CREATE TABLE "Images" (
    "Id" TEXT PRIMARY KEY,
    "Url" TEXT NOT NULL
);
CREATE TABLE "Locations" (
    "Uuid" UUID PRIMARY KEY,
    "Country" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "Latitude" DECIMAL(8, 6) NOT NULL,
    "Longitude" DECIMAL(9, 6) NOT NULL
);
CREATE TABLE "Roles" (
    "Uuid" UUID PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "IsDefault" BOOLEAN NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL
);
CREATE TABLE "Permissions" (
    "Uuid" UUID PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL,
    UNIQUE ("Name", "IsAdmin")
);
CREATE TABLE "RolePermissions" (
    "Uuid" UUID PRIMARY KEY,
    "RoleUuid" UUID NOT NULL REFERENCES "Roles"("Uuid"),
    "PermissionUuid" UUID NOT NULL REFERENCES "Permissions"("Uuid"),
    UNIQUE ("RoleUuid", "PermissionUuid")
);
CREATE TABLE "Histories" (
    "Uuid" UUID PRIMARY KEY,
    "Action" "HISTORY_ACTION" NOT NULL,
    "Entity" "HISTORY_ENTITY" NOT NULL,
    "EntityUuid" UUID NOT NULL
);
CREATE TABLE "Users" (
    "Uuid" UUID PRIMARY KEY,
    "AvatarId" TEXT REFERENCES "Images"("Id"),
    "LocationUuid" UUID NOT NULL REFERENCES "Locations"("Uuid"),
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
-- =============================================================
-- TODO
CREATE TABLE "Partners" (
    "Uuid" UUID PRIMARY KEY,
    "LogoId" TEXT REFERENCES "Images"("Id"),
    "BannerId" TEXT REFERENCES "Images"("Id"),
    "Handle" TEXT NOT NULL UNIQUE,
    "OrganizationName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "PartnersHandleIndex" ON "Partners" ("Handle");
CREATE INDEX "PartnersPhoneNumberIndex" ON "Partners" ("PhoneNumber");
CREATE INDEX "PartnersEmailIndex" ON "Partners" ("Email");
CREATE INDEX "PartnersIsDeletedIndex" ON "Partners" ("IsDeleted");
CREATE INDEX "PartnersCreatedAtIndex" ON "Partners" ("CreatedAt");
-- PartnerRoles table
CREATE TABLE "PartnerRoles" (
    "Uuid" UUID PRIMARY DEFAULT gen_random_uuid(),
    "PartnerUuid" UUID NOT NULL REFERENCES "Partners"("Uuid"),
    "RoleUuid" UUID NOT NULL REFERENCES "Roles"("Uuid"),
    "AssignedCount" INTEGER NOT NULL DEFAULT 0,
    "Status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    UNIQUE ("PartnerUuid", "RoleUuid")
);
CREATE INDEX "PartnerRolesPartnerUuidIndex" ON "PartnerRoles" ("PartnerUuid");
CREATE INDEX "PartnerRolesRoleUuidIndex" ON "PartnerRoles" ("RoleUuid");
CREATE INDEX "PartnerRolesStatusIndex" ON "PartnerRoles" ("Status");
CREATE INDEX "PartnerRolesIsDeletedIndex" ON "PartnerRoles" ("IsDeleted");
CREATE INDEX "PartnerRolesCreatedAtIndex" ON "PartnerRoles" ("CreatedAt");
-- Branches table
CREATE TABLE "Branches" (
    "Uuid" UUID PRIMARY KEY,
    "PartnerUuid" UUID NOT NULL REFERENCES "Partners"("Uuid"),
    "LocationUuid" UUID NOT NULL REFERENCES "Locations"("Uuid"),
    "Name" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "MemberCount" INTEGER NOT NULL DEFAULT 0,
    "Status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    UNIQUE ("PartnerUuid", "LocationUuid")
);
CREATE INDEX "BranchesPartnerUuidIndex" ON "Branches" ("PartnerUuid");
CREATE INDEX "BranchesLocationUuidIndex" ON "Branches" ("LocationUuid");
CREATE INDEX "BranchesStatusIndex" ON "Branches" ("Status");
CREATE INDEX "BranchesIsDeletedIndex" ON "Branches" ("IsDeleted");
CREATE INDEX "BranchesCreatedAtIndex" ON "Branches" ("CreatedAt");
-- Members table
CREATE TABLE "Members" (
    "Uuid" UUID PRIMARY KEY,
    "PartnerUuid" UUID NOT NULL REFERENCES "Partners"("Uuid"),
    "RoleUuid" UUID NOT NULL REFERENCES "Roles"("Uuid"),
    "BranchUuid" UUID NOT NULL REFERENCES "Branches"("Uuid"),
    "AvatarId" TEXT REFERENCES "Images"("Id"),
    "Username" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL,
    "Status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    UNIQUE ("PartnerUuid", "Username"),
    UNIQUE ("PartnerUuid", "Email")
);
CREATE INDEX "MembersPartnerUuidIndex" ON "Members" ("PartnerUuid");
CREATE INDEX "MembersRoleUuidIndex" ON "Members" ("RoleUuid");
CREATE INDEX "MembersBranchUuidIndex" ON "Members" ("BranchUuid");
CREATE INDEX "MembersUsernameIndex" ON "Members" ("Username");
CREATE INDEX "MembersEmailIndex" ON "Members" ("Email");
CREATE INDEX "MembersStatusIndex" ON "Members" ("Status");
CREATE INDEX "MembersIsDeletedIndex" ON "Members" ("IsDeleted");
CREATE INDEX "MembersCreatedAtIndex" ON "Members" ("CreatedAt");
-- MemberHistories junction table
CREATE TABLE "MemberHistories" (
    "Uuid" UUID PRIMARY KEY,
    "MemberUuid" UUID NOT NULL REFERENCES "Members"("Uuid"),
    "HistoryUuid" UUID NOT NULL REFERENCES "Histories"("Uuid"),
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("MemberUuid", "HistoryUuid")
);
CREATE INDEX "MemberHistoriesMemberUuidIndex" ON "MemberHistories" ("MemberUuid");
CREATE INDEX "MemberHistoriesHistoryUuidIndex" ON "MemberHistories" ("HistoryUuid");
CREATE INDEX "MemberHistoriesCreatedAtIndex" ON "MemberHistories" ("CreatedAt");
-- VehicleModels table
CREATE TABLE "VehicleModels" (
    "Uuid" UUID PRIMARY KEY,
    "PartnerUuid" UUID NOT NULL REFERENCES "Partners"("Uuid"),
    "ThumbnailId" TEXT REFERENCES "Images"("Id"),
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Category" "CATEGORY" NOT NULL,
    "Manufacturer" TEXT NOT NULL,
    "MarketLaunch" DATE NOT NULL,
    "Capacity" INTEGER NOT NULL,
    "Transmission" TEXT NOT NULL,
    "Fuel" TEXT NOT NULL,
    "Price" DECIMAL(10, 2) NOT NULL,
    "Discount" DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    "Tags" TEXT NOT NULL,
    "Status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "UpdatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    UNIQUE (
        "PartnerUuid",
        "Name",
        "Manufacturer",
        "MarketLaunch"
    )
);
CREATE INDEX "VehicleModelsPartnerUuidIndex" ON "VehicleModels" ("PartnerUuid");
CREATE INDEX "VehicleModelsNameIndex" ON "VehicleModels" ("Name");
CREATE INDEX "VehicleModelsCategoryIndex" ON "VehicleModels" ("Category");
CREATE INDEX "VehicleModelsManufacturerIndex" ON "VehicleModels" ("Manufacturer");
CREATE INDEX "VehicleModelsPriceIndex" ON "VehicleModels" ("Price");
CREATE INDEX "VehicleModelsStatusIndex" ON "VehicleModels" ("Status");
CREATE INDEX "VehicleModelsIsDeletedIndex" ON "VehicleModels" ("IsDeleted");
CREATE INDEX "VehicleModelsCreatedAtIndex" ON "VehicleModels" ("CreatedAt");
-- VehicleModelGalleries junction table
CREATE TABLE "VehicleModelGalleries" (
    "Guid" UUID PRIMARY KEY,
    "VehicleModelUuid" UUID NOT NULL REFERENCES "VehicleModels"("Uuid"),
    "ImageId" TEXT NOT NULL REFERENCES "Images"("Id"),
    "Index" INTEGER NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP,
    UNIQUE ("VehicleModelUuid", "ImageId")
);
CREATE INDEX "VehicleModelGalleriesVehicleModelUuidIndex" ON "VehicleModelGalleries" ("VehicleModelUuid");
CREATE INDEX "VehicleModelGalleriesIndexIndex" ON "VehicleModelGalleries" ("Index");
CREATE INDEX "VehicleModelGalleriesIsDeletedIndex" ON "VehicleModelGalleries" ("IsDeleted");
-- =============================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW."UpdatedAt" = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$ $ language 'plpgsql';
-- Create triggers for tables with UpdatedAt column
CREATE TRIGGER update_partners_updated_at BEFORE
UPDATE ON "Partners" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE
UPDATE ON "Branches" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE
UPDATE ON "Users" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partner_roles_updated_at BEFORE
UPDATE ON "PartnerRoles" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE
UPDATE ON "Members" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicle_models_updated_at BEFORE
UPDATE ON "VehicleModels" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- =============================================================
-- FUNCTIONS FOR SOFT DELETE
-- =============================================================
CREATE OR REPLACE FUNCTION soft_delete_record() RETURNS TRIGGER AS $ $ BEGIN IF NEW."IsDeleted" = true
    AND OLD."IsDeleted" = false THEN NEW."DeletedAt" = CURRENT_TIMESTAMP;
ELSIF NEW."IsDeleted" = false
AND OLD."IsDeleted" = true THEN NEW."DeletedAt" = NULL;
END IF;
RETURN NEW;
END;
$ $ language 'plpgsql';
-- Create triggers for soft delete
CREATE TRIGGER soft_delete_partners BEFORE
UPDATE ON "Partners" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_branches BEFORE
UPDATE ON "Branches" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_users BEFORE
UPDATE ON "Users" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_partner_roles BEFORE
UPDATE ON "PartnerRoles" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_members BEFORE
UPDATE ON "Members" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_vehicle_models BEFORE
UPDATE ON "VehicleModels" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
CREATE TRIGGER soft_delete_vehicle_model_galleries BEFORE
UPDATE ON "VehicleModelGalleries" FOR EACH ROW EXECUTE FUNCTION soft_delete_record();
-- =============================================================
-- FUNCTIONS FOR AUTO-INCREMENT COUNTERS
-- =============================================================
-- Function to update member count in branches
CREATE OR REPLACE FUNCTION update_branch_member_count() RETURNS TRIGGER AS $ $ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE "Branches"
SET "MemberCount" = "MemberCount" + 1
WHERE "Uuid" = NEW."BranchUuid";
ELSIF TG_OP = 'DELETE' THEN
UPDATE "Branches"
SET "MemberCount" = "MemberCount" - 1
WHERE "Uuid" = OLD."BranchUuid";
END IF;
RETURN NULL;
END;
$ $ language 'plpgsql';
CREATE TRIGGER update_member_count_on_member_change
AFTER
INSERT
    OR DELETE ON "Members" FOR EACH ROW EXECUTE FUNCTION update_branch_member_count();
-- Function to update assigned count in partner roles
CREATE OR REPLACE FUNCTION update_partner_role_assigned_count() RETURNS TRIGGER AS $ $ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE "PartnerRoles"
SET "AssignedCount" = "AssignedCount" + 1
WHERE "PartnerUuid" = NEW."PartnerUuid"
    AND "RoleUuid" = NEW."RoleUuid";
ELSIF TG_OP = 'DELETE' THEN
UPDATE "PartnerRoles"
SET "AssignedCount" = "AssignedCount" - 1
WHERE "PartnerUuid" = OLD."PartnerUuid"
    AND "RoleUuid" = OLD."RoleUuid";
ELSIF TG_OP = 'UPDATE' THEN IF NEW."RoleUuid" != OLD."RoleUuid" THEN -- Decrement old role
UPDATE "PartnerRoles"
SET "AssignedCount" = "AssignedCount" - 1
WHERE "PartnerUuid" = OLD."PartnerUuid"
    AND "RoleUuid" = OLD."RoleUuid";
-- Increment new role
UPDATE "PartnerRoles"
SET "AssignedCount" = "AssignedCount" + 1
WHERE "PartnerUuid" = NEW."PartnerUuid"
    AND "RoleUuid" = NEW."RoleUuid";
END IF;
END IF;
RETURN NULL;
END;
$ $ language 'plpgsql';
CREATE TRIGGER update_assigned_count_on_member_role_change
AFTER
INSERT
    OR
UPDATE
    OR DELETE ON "Members" FOR EACH ROW EXECUTE FUNCTION update_partner_role_assigned_count();