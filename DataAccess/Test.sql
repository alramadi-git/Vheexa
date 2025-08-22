-- =========================
-- Images Table
-- =========================
CREATE TABLE "Images" (
    "ID" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "URL" TEXT NOT NULL,
    "Alternate" TEXT NOT NULL
);

-- Fake Data for Images
INSERT INTO "Images" ("URL", "Alternate") VALUES
('https://cdn.example.com/profiles/john.jpg', 'Profile picture of John Doe'),
('https://cdn.example.com/profiles/mary.jpg', 'Profile picture of Mary Smith'),
('https://cdn.example.com/profiles/alex.jpg', 'Profile picture of Alex Johnson');

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

-- Fake Data for Addresses
INSERT INTO "Addresses" ("URL", "Country", "City", "Street") VALUES
('https://maps.example.com/jeddah-kingfahd', 'Saudi Arabia', 'Jeddah', 'King Fahd Street'),
('https://maps.example.com/riyadh-olaya', 'Saudi Arabia', 'Riyadh', 'Olaya Street'),
('https://maps.example.com/dammam-khalid', 'Saudi Arabia', 'Dammam', 'Khalid Street');

-- Index on Country
CREATE INDEX idx_addresses_country
ON "Addresses" ("Country");

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

-- Partial unique index for optional ImageID
CREATE UNIQUE INDEX unique_image_id_not_null
ON "Humans" ("ImageID")
WHERE "ImageID" IS NOT NULL;

-- Indexes on PhoneNumber and Email (optional because UNIQUE already creates index)
CREATE INDEX idx_humans_phone
ON "Humans" ("PhoneNumber");

CREATE INDEX idx_humans_email
ON "Humans" ("Email");

-- Fake Data for Humans
INSERT INTO "Humans" ("ImageID", "AddressID", "FirstName", "MidName", "LastName", "DateOfBirth", "PhoneNumber", "Email", "Password") VALUES
(1, 1, 'John', 'Ali', 'Doe', '1990-05-14', '+966500000001', 'john.doe@example.com', 'hashedpassword1'),
(2, 2, 'Mary', 'Saleh', 'Smith', '1995-08-22', '+966500000002', 'mary.smith@example.com', 'hashedpassword2'),
(NULL, 3, 'Alex', 'Hassan', 'Johnson', '1988-12-01', '+966500000003', 'alex.johnson@example.com', 'hashedpassword3');

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

-- Indexes on Users
CREATE INDEX idx_users_isdeleted
ON "Users" ("IsDeleted");

CREATE INDEX idx_users_averagerates
ON "Users" ("AverageRates");

-- Fake Data for Users
INSERT INTO "Users" ("HumanID", "AverageRates", "IsDeleted") VALUES
(1, 4.5, FALSE),
(2, 5.0, FALSE),
(3, 3.8, FALSE);
