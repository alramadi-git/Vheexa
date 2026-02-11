INSERT INTO "Locations" (
        "Uuid",
        "Country",
        "City",
        "Street",
        "Latitude",
        "Longitude"
    )
VALUES (
        'c9574dfc-7d4a-4592-b901-786911a51c75',
        'USA',
        'New York',
        '123 Broadway',
        40.7128,
        -74.0060
    );
INSERT INTO "Roles" ("Uuid", "Name", "IsDefault", "IsAdmin")
VALUES (
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        'Owner',
        TRUE,
        FALSE
    );
INSERT INTO "Permissions" ("Uuid", "Type", "IsAdmin")
VALUES (
        'dfdbf9b2-b7c7-43bc-8911-0ac1f3ab340b',
        0,
        FALSE
    ),
    (
        '55662026-8286-4566-8c95-30de9f9cb13e',
        1,
        FALSE
    ),
    (
        'd9404cc5-4a67-4433-aec1-57a7dbd0eb48',
        2,
        FALSE
    ),
    (
        '57c81c15-4092-49f3-9c14-a65b1b558ff6',
        3,
        FALSE
    ),
    (
        '0cdb4614-ada9-40a3-bbe6-39608af357b7',
        4,
        FALSE
    ),
    (
        'b42a9e6c-e66a-48b3-9de8-9bdc43a1f6a8',
        5,
        FALSE
    ),
    (
        '3918479a-a73d-4a9a-bdfa-76a3bcdd9b07',
        6,
        FALSE
    ),
    (
        '9f524606-f2fb-4d9f-b121-df52cff42fb9',
        7,
        FALSE
    ),
    (
        '9ceeb1d8-3348-41e6-a4a0-c5a50efe4f0a',
        8,
        FALSE
    ),
    (
        '86c89f2b-18ca-47c9-8f07-c5c34d6a1682',
        9,
        FALSE
    ),
    (
        '8a9e7122-6cdf-4652-a4ef-5ad88248d61f',
        10,
        FALSE
    ),
    (
        '1fca3d0f-bd4f-4f95-8a4a-52142e1887ab',
        11,
        FALSE
    ),
    (
        '4ebbf4c4-89c1-4c0a-a45c-193a0ef5d3ae',
        12,
        FALSE
    ),
    (
        '4d2da27f-6e60-4794-ac8d-ace63987c44f',
        13,
        FALSE
    ),
    (
        '684a4492-3216-4298-b98b-83359f0f0280',
        14,
        FALSE
    ),
    (
        'cfff27e5-0e9f-492e-b0c2-14009781e589',
        15,
        FALSE
    ),
    (
        '987dd5dd-1a1b-4d4f-8392-859f9a9e6656',
        16,
        FALSE
    ),
    (
        'd8b092d3-8cb2-418d-8b00-30c23735b708',
        17,
        FALSE
    ),
    (
        '121bb695-28ed-426f-abcf-eabc44ee3447',
        18,
        FALSE
    );
INSERT INTO "RolePermissions" ("Uuid", "RoleUuid", "PermissionUuid")
VALUES (
        'dd065fcf-b8bc-4135-a229-5e7bbed3aca1',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        'dfdbf9b2-b7c7-43bc-8911-0ac1f3ab340b'
    ),
    (
        'b91dbf26-70ef-49b1-ac84-22aba8299067',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        '55662026-8286-4566-8c95-30de9f9cb13e'
    ),
    (
        'ace11d6f-5e8d-435c-8f9f-82eaf6ace401',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        'd9404cc5-4a67-4433-aec1-57a7dbd0eb48'
    ),
    (
        '6471dc7a-bfdd-4c88-b09e-5317df188e3c',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        '0cdb4614-ada9-40a3-bbe6-39608af357b7'
    ),
    (
        '5eb83b25-9549-4fe4-9a13-2b060781052f',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        '9ceeb1d8-3348-41e6-a4a0-c5a50efe4f0a'
    ),
    (
        'b0e66f1c-115f-4317-965b-4105529ee19b',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        '4ebbf4c4-89c1-4c0a-a45c-193a0ef5d3ae'
    ),
    (
        '66727b94-90c6-4113-8799-cd39398b3453',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        '987dd5dd-1a1b-4d4f-8392-859f9a9e6656'
    );
INSERT INTO "Partners" (
        "Uuid",
        "LogoId",
        "BannerId",
        "Handle",
        "OrganizationName",
        "PhoneNumber",
        "Email",
        "IsDeleted",
        "DeletedAt",
        "UpdatedAt",
        "CreatedAt"
    )
VALUES (
        '550c8d76-1cb0-4647-b66e-99ca0586f771',
        NULL,
        NULL,
        'vheexa',
        'Vheexa',
        '+1234567890',
        'partner@vheexa.com',
        FALSE,
        NULL,
        NOW (),
        NOW ()
    );
INSERT INTO "PartnerRoles" (
        "Uuid",
        "PartnerUuid",
        "RoleUuid",
        "AssignedCount",
        "Status",
        "UpdatedAt",
        "CreatedAt",
        "IsDeleted",
        "DeletedAt"
    )
VALUES (
        'bd273b94-5d47-4639-84b7-8cf4e5015460',
        '550c8d76-1cb0-4647-b66e-99ca0586f771',
        '8d5df272-e00a-4fc4-89a5-f0b6028bb7c0',
        1,
        0,
        NOW (),
        NOW (),
        FALSE,
        NULL
    );
INSERT INTO "Branches" (
        "Uuid",
        "PartnerUuid",
        "LocationUuid",
        "Name",
        "PhoneNumber",
        "Email",
        "MemberCount",
        "Status",
        "UpdatedAt",
        "CreatedAt",
        "IsDeleted",
        "DeletedAt"
    )
VALUES (
        'a3f33f4a-3b0b-45b2-a822-cf9648038f85',
        '550c8d76-1cb0-4647-b66e-99ca0586f771',
        'c9574dfc-7d4a-4592-b901-786911a51c75',
        'Main Branch',
        '+1234567891',
        'main.branch@vheexa.com',
        1,
        0,
        NOW (),
        NOW (),
        FALSE,
        NULL
    );
INSERT INTO "Members" (
        "Uuid",
        "PartnerUuid",
        "RoleUuid",
        "BranchUuid",
        "AvatarId",
        "Username",
        "Email",
        "Password",
        "Status",
        "UpdatedAt",
        "CreatedAt",
        "IsDeleted",
        "DeletedAt"
    )
VALUES (
        'bda46d8a-12ee-450e-972c-3969b36fd48e',
        '550c8d76-1cb0-4647-b66e-99ca0586f771',
        'bd273b94-5d47-4639-84b7-8cf4e5015460',
        'a3f33f4a-3b0b-45b2-a822-cf9648038f85',
        NULL,
        'Nawaf Alramadi',
        'member@vheexa.com',
        'AQAAAAIAAYagAAAAEDW6TiAcivvpHVGtq7+pDVkpOhV6vRVPlvN9aBLwB5RpFJOICJ2Xl8Ysbdekhew92w==',
        0,
        NOW (),
        NOW (),
        FALSE,
        NULL
    );