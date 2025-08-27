-- =========================
-- ENUMS
-- =========================
CREATE TYPE task_action_option_entity AS ENUM ('CREATE', 'UPDATE', 'DELETE');
CREATE TYPE task_table_option_entity AS ENUM ('USERS', 'REQUESTS_TO_BE_A_PARTNER');
CREATE TYPE request_to_be_a_partner_status AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');


-- =========================
-- Images Table
-- =========================
CREATE TABLE "Images" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "URL" TEXT NOT NULL,
    "Alternate" TEXT NOT NULL
);


-- =========================
-- Addresses Table
-- =========================
CREATE TABLE "Addresses" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "URL" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Street" TEXT NOT NULL
);

CREATE INDEX idx_addresses_country ON "Addresses" ("Country");
CREATE INDEX idx_addresses_city ON "Addresses" ("City");


-- =========================
-- Humans Table
-- =========================
CREATE TABLE "Humans" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ImageID" INT REFERENCES "Images"("ID") ON DELETE SET NULL,
    "AddressID" INT NOT NULL UNIQUE REFERENCES "Addresses"("ID") ON DELETE CASCADE,
    "FirstName" TEXT NOT NULL,
    "MidName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "DateOfBirth" DATE NOT NULL,
    "PhoneNumber" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL
);

CREATE UNIQUE INDEX unique_image_id_not_null
ON "Humans" ("ImageID")
WHERE "ImageID" IS NOT NULL;

CREATE INDEX idx_humans_phone ON "Humans" ("PhoneNumber");
CREATE INDEX idx_humans_email ON "Humans" ("Email");


-- =========================
-- Users Table
-- =========================
CREATE TABLE "Users" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "HumanID" INT NOT NULL UNIQUE REFERENCES "Humans"("ID") ON DELETE CASCADE,
    "AverageRates" FLOAT NOT NULL DEFAULT 0,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "DeletedAt" TIMESTAMPTZ,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_isdeleted ON "Users" ("IsDeleted");

-- =========================
-- Tasks Table
-- =========================
CREATE TABLE "Tasks" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Action" task_action_option_entity NOT NULL,
    "Table" task_table_option_entity NOT NULL,
    "RowID" INT NOT NULL
);

CREATE INDEX idx_tasks_action ON "Tasks" ("Action");

-- =========================
-- Admins Table
-- =========================
CREATE TABLE "Admins" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "HumanID" INT NOT NULL UNIQUE REFERENCES "Humans"("ID") ON DELETE CASCADE,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "DeletedAt" TIMESTAMPTZ,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admins_isdeleted ON "Admins" ("IsDeleted");

-- =========================
-- AdminTasks Table
-- =========================
CREATE TABLE "AdminTasks" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "AdminID" INT NOT NULL REFERENCES "Admins"("ID") ON DELETE CASCADE,
    "TaskID" INT NOT NULL UNIQUE REFERENCES "Tasks"("ID") ON DELETE CASCADE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- Partners Table
-- =========================
CREATE TABLE "Partners" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ImageID" INT NOT NULL REFERENCES "Images"("ID") ON DELETE CASCADE,
    "Handle" TEXT NOT NULL UNIQUE,
    "Name" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL UNIQUE,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL,
    "AverageRates" FLOAT NOT NULL DEFAULT 0,
    "IsPublished" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "DeletedAt" TIMESTAMPTZ,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_partners_ispublished ON "Partners" ("IsPublished");
CREATE INDEX idx_partners_isdeleted ON "Partners" ("IsDeleted");
CREATE INDEX idx_partners_averagerates ON "Partners" ("AverageRates");


-- =========================
-- RequestsToBeAPartner Table
-- =========================
CREATE TABLE "RequestsToBeAPartner" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "PartnerID" INT NOT NULL REFERENCES "Partners"("ID") ON DELETE CASCADE,
    "Status" request_to_be_a_partner_status NOT NULL,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_requeststobeapartner_partnerid ON "RequestsToBeAPartner" ("PartnerID");
CREATE INDEX idx_requeststobeapartner_status ON "RequestsToBeAPartner" ("Status");

-- =========================
-- PartnerSupportedLocations Table
-- =========================
CREATE TABLE "PartnerSupportedLocations" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "PartnerID" INT NOT NULL REFERENCES "Partners"("ID") ON DELETE CASCADE,
    "AddressID" INT NOT NULL REFERENCES "Addresses"("ID") ON DELETE CASCADE,
    "IsPickup" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsDropoff" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsPublished" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "DeletedAt" TIMESTAMPTZ,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_partnersupportedlocations_partnerid ON "PartnerSupportedLocations" ("PartnerID");
CREATE INDEX idx_partnersupportedlocations_ispickup ON "PartnerSupportedLocations" ("IsPickup");
CREATE INDEX idx_partnersupportedlocations_isdropoff ON "PartnerSupportedLocations" ("IsDropoff");
CREATE INDEX idx_partnersupportedlocations_ispublished ON "PartnerSupportedLocations" ("IsPublished");
CREATE INDEX idx_partnersupportedlocations_isdeleted ON "PartnerSupportedLocations" ("IsDeleted");


-- =========================
-- Members Table
-- =========================
CREATE TABLE "Members" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "PartnerID" INT NOT NULL REFERENCES "Partners"("ID") ON DELETE CASCADE,
    "HumanID" INT NOT NULL UNIQUE REFERENCES "Humans"("ID") ON DELETE CASCADE,
    "IsPublished" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "DeletedAt" TIMESTAMPTZ,
    "UpdatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_members_ispublished ON "Members" ("IsPublished");
CREATE INDEX idx_members_isdeleted ON "Members" ("IsDeleted");


-- =========================
-- MemberTasks Table
-- =========================
CREATE TABLE "MemberTasks" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "MemberID" INT NOT NULL REFERENCES "Members"("ID") ON DELETE CASCADE,
    "TaskID" INT NOT NULL UNIQUE REFERENCES "Tasks"("ID") ON DELETE CASCADE,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
