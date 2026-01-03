import { NextRequest, NextResponse } from "next/server";

import { apiCatch } from "@/utilities/api";

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/api/fetch";

import { tNullable } from "@/types/nullish";

import { tJwt } from "@/validations/jwt";

import { tMemberFilter, zMemberFilter } from "@/validations/partner/member";
import { tPagination, zPagination } from "@/validations/pagination";

import { zMemberCreate } from "@/validations/partner/member";

import { eRoleStatusModel } from "@/models/partner/role";
import { eBranchStatusModel } from "@/models/partner/branch";

import { eMemberStatusModel, tMemberModel } from "@/models/partner/member";

import { ClsErrorModel } from "@/models/error";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneModel, tResponseManyModel } from "@/models/response";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<tResponseManyModel<tMemberModel>>> {
  return await apiCatch<tMemberModel>(async () => {
    const [
      minBirthday,
      maxBirthday,
      status,
      page,
      pageSize,
    ]: tNullable<string>[] = [
      request.nextUrl.searchParams.get("filter.birthday.min"),
      request.nextUrl.searchParams.get("filter.birthday.max"),
      request.nextUrl.searchParams.get("filter.status"),
      request.nextUrl.searchParams.get("pagination.page"),
      request.nextUrl.searchParams.get("pagination.page-size"),
    ];

    const filter: tMemberFilter = {
      search: request.nextUrl.searchParams.get("filter.search") ?? undefined,
      location:
        request.nextUrl.searchParams.get("filter.location") ?? undefined,
      birthday: {
        min: minBirthday !== null ? new Date(minBirthday) : undefined,
        max: maxBirthday !== null ? new Date(maxBirthday) : undefined,
      },
      status: status !== null ? Number(status) : undefined,
    };
    const pagination: tPagination = {
      page: page === null ? undefined : Number(page),
      pageSize: pageSize === null ? undefined : Number(pageSize),
    };

    const parsedFilter: tMemberFilter = zMemberFilter.parse(filter);
    const parsedPagination: tPagination = zPagination.parse(pagination);

    const clsQuery: ClsQuery = new ClsQuery();

    clsQuery.set("Filter.Search.Value", parsedFilter.search);

    clsQuery.set("Filter.Location.Value", parsedFilter.location);

    clsQuery.set(
      "Filter.Birthday.Min.Value",
      parsedFilter.birthday.min?.toString(),
    );
    clsQuery.set(
      "Filter.Birthday.Max.Value",
      parsedFilter.birthday.max?.toString(),
    );

    clsQuery.set("Filter.Status.Value", parsedFilter.status?.toString());

    clsQuery.set("Pagination.Page.Value", parsedPagination.page?.toString());
    clsQuery.set(
      "Pagination.PageSize.Value",
      parsedPagination.pageSize?.toString(),
    );

    return NextResponse.json<tSuccessManyModel<tMemberModel>>({
      data: [
        {
          uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          avatar: {
            uuid: "a1b2c3d4-1111-4aaa-9999-0e1f2a3b4c5d",
            url: "https://avatar.vercel.sh/james_wilson.svg?size=200",
          },
          location: {
            uuid: "b2c3d4e5-2222-4bbb-8888-1f2a3b4c5d6e",
            country: "United States",
            city: "Austin",
            street: "201 E 6th St",
            latitude: 30.267153,
            longitude: -97.743094,
          },
          username: "james.wilson",
          birthday: "1988-04-12",
          phoneNumber: "+1 512-555-0198",
          email: "james.wilson@partnerfleet.com",
          role: {
            uuid: "c3d4e5f6-3333-4ccc-7777-2a3b4c5d6e7f",
            name: "Vehicle Operator",
            permissions: [
              {
                uuid: "d4e5f6a7-4444-4ddd-6666-3b4c5d6e7f8a",
                name: "Vehicle Instances Create",
                description: "Register new vehicle units.",
              },
              {
                uuid: "e5f6a7b8-5555-4eee-5555-4c5d6e7f8a9b",
                name: "Vehicle Instances Update",
                description: "Update vehicle status or assignment.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2024-03-15T10:20:00Z",
            updatedAt: "2024-11-28T14:35:10Z",
          },
          branch: {
            uuid: "f6a7b8c9-6666-4fff-4444-5d6e7f8a9b0c",
            country: "United States",
            city: "Austin",
            street: "201 E 6th St",
            latitude: 30.267153,
            longitude: -97.743094,
            name: "Austin Downtown Branch",
            phoneNumber: "+1 512-555-0198",
            email: "austin.downtown@partnerfleet.com",
            status: eBranchStatusModel.active,
            createdAt: "2023-06-12T10:30:00Z",
            updatedAt: "2024-11-30T14:22:10Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2024-01-10T08:30:00Z",
          updatedAt: "2024-12-01T09:15:22Z",
        },
        {
          uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
          avatar: {
            uuid: "g7h8i9j0-7777-4ggg-3333-6e7f8a9b0c1d",
            url: "https://avatar.vercel.sh/lena_schmidt.svg?size=200&text=LS",
          },
          location: {
            uuid: "h8i9j0k1-8888-4hhh-2222-7f8a9b0c1d2e",
            country: "Germany",
            city: "Berlin",
            street: "Friedrichstraße 68",
            latitude: 52.517036,
            longitude: 13.38886,
          },
          username: "lena.schmidt",
          birthday: "1992-07-23",
          phoneNumber: "+49 30 55578901",
          email: "lena.schmidt@partnerfleet.eu",
          role: {
            uuid: "i9j0k1l2-9999-4iii-1111-8a9b0c1d2e3f",
            name: "HR Specialist",
            permissions: [
              {
                uuid: "j0k1l2m3-aaaa-4jjj-0000-9b0c1d2e3f4a",
                name: "Members Create",
                description: "Add new team members.",
              },
              {
                uuid: "k1l2m3n4-bbbb-4kkk-ffff-0c1d2e3f4a5b",
                name: "Members Update",
                description: "Edit member profiles.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2024-02-10T09:15:00Z",
            updatedAt: "2024-10-05T11:40:22Z",
          },
          branch: {
            uuid: "l2m3n4o5-cccc-4lll-eeee-1d2e3f4a5b6c",
            country: "Germany",
            city: "Berlin",
            street: "Friedrichstraße 68",
            latitude: 52.517036,
            longitude: 13.38886,
            name: "Berlin Mitte Hub",
            phoneNumber: "+49 30 55578901",
            email: "berlin.mitte@partnerfleet.eu",
            status: eBranchStatusModel.active,
            createdAt: "2023-08-05T09:15:00Z",
            updatedAt: "2024-10-18T11:40:22Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2023-09-18T11:20:00Z",
          updatedAt: "2024-11-02T13:10:45Z",
        },
        {
          uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
          avatar: null,
          location: {
            uuid: "m3n4o5p6-dddd-4mmm-dddd-2e3f4a5b6c7d",
            country: "Canada",
            city: "Toronto",
            street: "123 Queen St W",
            latitude: 43.648749,
            longitude: -79.380432,
          },
          username: "michael.toronto",
          birthday: "1985-11-30",
          phoneNumber: "+1 416-555-0134",
          email: "michael.toronto@partnerfleet.ca",
          role: {
            uuid: "n4o5p6q7-eeee-4nnn-cccc-3f4a5b6c7d8e",
            name: "Branch Coordinator",
            permissions: [
              {
                uuid: "o5p6q7r8-ffff-4ooo-bbbb-4a5b6c7d8e9f",
                name: "Branches Read",
                description: "View all branch details.",
              },
              {
                uuid: "p6q7r8s9-gggg-4ppp-aaaa-5b6c7d8e9f0a",
                name: "Branches Update",
                description: "Modify branch info.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2023-12-01T14:30:00Z",
            updatedAt: "2024-12-02T09:10:45Z",
          },
          branch: {
            uuid: "q7r8s9t0-hhhh-4qqq-9999-6c7d8e9f0a1b",
            country: "Canada",
            city: "Toronto",
            street: "123 Queen St W",
            latitude: 43.648749,
            longitude: -79.380432,
            name: "Toronto Financial District",
            phoneNumber: "+1 416-555-0134",
            email: "toronto.fd@partnerfleet.ca",
            status: eBranchStatusModel.active,
            createdAt: "2023-11-20T13:45:00Z",
            updatedAt: "2024-12-01T09:30:15Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2023-11-25T10:00:00Z",
          updatedAt: "2024-10-14T16:22:30Z",
        },
        {
          uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
          avatar: {
            uuid: "r8s9t0u1-iiii-4rrr-8888-7d8e9f0a1b2c",
            url: "https://avatar.vercel.sh/sarah_sydney.svg?size=200&text=SS",
          },
          location: {
            uuid: "s9t0u1v2-jjjj-4sss-7777-8e9f0a1b2c3d",
            country: "Australia",
            city: "Sydney",
            street: "456 George St",
            latitude: -33.865004,
            longitude: 151.208336,
          },
          username: "sarah.sydney",
          birthday: "1990-02-14",
          phoneNumber: "+61 2 5550 1923",
          email: "sarah.sydney@partnerfleet.com.au",
          role: {
            uuid: "t0u1v2w3-kkkk-4ttt-6666-9f0a1b2c3d4e",
            name: "Fleet Supervisor",
            permissions: [
              {
                uuid: "u1v2w3x4-llll-4uuu-5555-0a1b2c3d4e5f",
                name: "Vehicle Instances Read",
                description: "View fleet status.",
              },
              {
                uuid: "v2w3x4y5-mmmm-4vvv-4444-1b2c3d4e5f6a",
                name: "Vehicle Models Update",
                description: "Edit vehicle specs.",
              },
            ],
            status: eRoleStatusModel.inactive,
            createdAt: "2024-01-10T08:45:00Z",
            updatedAt: "2024-12-01T10:20:15Z",
          },
          branch: {
            uuid: "w3x4y5z6-nnnn-4www-3333-2c3d4e5f6a7b",
            country: "Australia",
            city: "Sydney",
            street: "456 George St",
            latitude: -33.865004,
            longitude: 151.208336,
            name: "Sydney Central Branch",
            phoneNumber: "+61 2 5550 1923",
            email: "sydney.central@partnerfleet.com.au",
            status: eBranchStatusModel.inactive,
            createdAt: "2023-05-18T08:20:00Z",
            updatedAt: "2024-09-10T16:05:30Z",
          },
          status: eMemberStatusModel.inactive,
          createdAt: "2023-05-20T09:10:00Z",
          updatedAt: "2024-09-12T11:30:00Z",
        },
        {
          uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
          avatar: {
            uuid: "x4y5z6a7-oooo-4xxx-2222-3d4e5f6a7b8c",
            url: "https://avatar.vercel.sh/ahmed_dubai.svg?size=200&text=AD",
          },
          location: {
            uuid: "y5z6a7b8-pppp-4yyy-1111-4e5f6a7b8c9d",
            country: "United Arab Emirates",
            city: "Dubai",
            street: "Sheikh Zayed Rd, Business Bay",
            latitude: 25.189827,
            longitude: 55.273522,
          },
          username: "ahmed.dubai",
          birthday: "1987-09-03",
          phoneNumber: "+971 4 555 0187",
          email: "ahmed.dubai@partnerfleet.ae",
          role: {
            uuid: "z6a7b8c9-qqqq-4zzz-0000-5f6a7b8c9d0e",
            name: "Partner Administrator",
            permissions: [
              {
                uuid: "a7b8c9d0-rrrr-4aaa-ffff-6a7b8c9d0e1f",
                name: "Partner Update",
                description: "Edit partner org settings.",
              },
              {
                uuid: "b8c9d0e1-ssss-4bbb-eeee-7b8c9d0e1f2a",
                name: "Roles Create",
                description: "Create new roles.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2023-09-18T08:00:00Z",
            updatedAt: "2024-11-15T16:22:30Z",
          },
          branch: {
            uuid: "c9d0e1f2-tttt-4ccc-dddd-8c9d0e1f2a3b",
            country: "United Arab Emirates",
            city: "Dubai",
            street: "Sheikh Zayed Rd, Business Bay",
            latitude: 25.189827,
            longitude: 55.273522,
            name: "Dubai Business Bay Office",
            phoneNumber: "+971 4 555 0187",
            email: "dubai.bb@partnerfleet.ae",
            status: eBranchStatusModel.active,
            createdAt: "2024-01-10T11:00:00Z",
            updatedAt: "2024-12-05T10:15:45Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2024-01-12T10:30:00Z",
          updatedAt: "2024-12-06T08:45:10Z",
        },
        {
          uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
          avatar: null,
          location: {
            uuid: "d0e1f2a3-uuuu-4ddd-cccc-9d0e1f2a3b4c",
            country: "Brazil",
            city: "São Paulo",
            street: "Av. Paulista, 1000",
            latitude: -23.561238,
            longitude: -46.65551,
          },
          username: "carlos.sp",
          birthday: "1993-12-07",
          phoneNumber: "+55 11 5555-0176",
          email: "carlos.sp@partnerfleet.br",
          role: {
            uuid: "e1f2a3b4-vvvv-4eee-bbbb-0e1f2a3b4c5d",
            name: "HR Specialist",
            permissions: [
              {
                uuid: "f2a3b4c5-wwww-4fff-aaaa-1f2a3b4c5d6e",
                name: "Members Delete",
                description: "Remove members from system.",
              },
              {
                uuid: "g3b4c5d6-xxxx-4ggg-9999-2a3b4c5d6e7f",
                name: "Members Read",
                description: "View all member profiles.",
              },
            ],
            status: eRoleStatusModel.inactive,
            createdAt: "2023-07-22T15:30:00Z",
            updatedAt: "2024-08-14T13:20:00Z",
          },
          branch: {
            uuid: "h4c5d6e7-yyyy-4hhh-8888-3b4c5d6e7f8a",
            country: "Brazil",
            city: "São Paulo",
            street: "Av. Paulista, 1000",
            latitude: -23.561238,
            longitude: -46.65551,
            name: "São Paulo Paulista Branch",
            phoneNumber: "+55 11 5555-0176",
            email: "saopaulo.paulista@partnerfleet.br",
            status: eBranchStatusModel.inactive,
            createdAt: "2023-07-22T15:30:00Z",
            updatedAt: "2024-08-14T13:20:00Z",
          },
          status: eMemberStatusModel.inactive,
          createdAt: "2023-07-25T14:20:00Z",
          updatedAt: "2024-08-15T09:10:00Z",
        },
        {
          uuid: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
          avatar: {
            uuid: "i5d6e7f8-zzzz-4iii-7777-4c5d6e7f8a9b",
            url: "https://avatar.vercel.sh/emily_van.svg?size=200&text=EV",
          },
          location: {
            uuid: "j6e7f8g9-1111-4jjj-6666-5d6e7f8a9b0c",
            country: "Canada",
            city: "Vancouver",
            street: "789 Granville St",
            latitude: 49.2819,
            longitude: -123.1187,
          },
          username: "emily.vancouver",
          birthday: "1991-06-18",
          phoneNumber: "+1 604-555-0142",
          email: "emily.vancouver@partnerfleet.ca",
          role: {
            uuid: "k7f8g9h0-2222-4kkk-5555-6e7f8a9b0c1d",
            name: "Vehicle Operator",
            permissions: [
              {
                uuid: "l8g9h0i1-3333-4lll-4444-7f8a9b0c1d2e",
                name: "Vehicle Models Create",
                description: "Add new vehicle models.",
              },
              {
                uuid: "m9h0i1j2-4444-4mmm-3333-8a9b0c1d2e3f",
                name: "Vehicle Instances Create",
                description: "Register new vehicles.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2024-03-15T10:20:00Z",
            updatedAt: "2024-11-28T14:35:10Z",
          },
          branch: {
            uuid: "n0i1j2k3-5555-4nnn-2222-9b0c1d2e3f4a",
            country: "Canada",
            city: "Vancouver",
            street: "789 Granville St",
            latitude: 49.2819,
            longitude: -123.1187,
            name: "Vancouver Downtown Office",
            phoneNumber: "+1 604-555-0142",
            email: "vancouver.dt@partnerfleet.ca",
            status: eBranchStatusModel.active,
            createdAt: "2023-10-05T12:00:00Z",
            updatedAt: "2024-11-20T15:40:30Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2023-10-10T11:15:00Z",
          updatedAt: "2024-11-22T10:30:00Z",
        },
        {
          uuid: "g7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
          avatar: {
            uuid: "o1j2k3l4-6666-4ooo-1111-0c1d2e3f4a5b",
            url: "https://avatar.vercel.sh/thomas_berlin.svg?size=200&text=TB",
          },
          location: {
            uuid: "p2k3l4m5-7777-4ppp-0000-1d2e3f4a5b6c",
            country: "Germany",
            city: "Munich",
            street: "Marienplatz 8",
            latitude: 48.137154,
            longitude: 11.576124,
          },
          username: "thomas.munich",
          birthday: "1989-03-22",
          phoneNumber: "+49 89 55567890",
          email: "thomas.munich@partnerfleet.eu",
          role: {
            uuid: "q3l4m5n6-8888-4qqq-ffff-2e3f4a5b6c7d",
            name: "Branch Coordinator",
            permissions: [
              {
                uuid: "r4m5n6o7-9999-4rrr-eeee-3f4a5b6c7d8e",
                name: "Branches Create",
                description: "Add new branches.",
              },
              {
                uuid: "s5n6o7p8-aaaa-4sss-dddd-4a5b6c7d8e9f",
                name: "Branches Delete",
                description: "Remove branches.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2023-12-01T14:30:00Z",
            updatedAt: "2024-12-02T09:10:45Z",
          },
          branch: {
            uuid: "t6o7p8q9-bbbb-4ttt-cccc-5b6c7d8e9f0a",
            country: "Germany",
            city: "Munich",
            street: "Marienplatz 8",
            latitude: 48.137154,
            longitude: 11.576124,
            name: "Munich City Center",
            phoneNumber: "+49 89 55567890",
            email: "munich.cc@partnerfleet.eu",
            status: eBranchStatusModel.active,
            createdAt: "2024-02-14T10:00:00Z",
            updatedAt: "2024-11-28T13:20:10Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2024-02-20T09:45:00Z",
          updatedAt: "2024-11-29T11:15:30Z",
        },
        {
          uuid: "h8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
          avatar: null,
          location: {
            uuid: "u7p8q9r0-cccc-4uuu-bbbb-6c7d8e9f0a1b",
            country: "United States",
            city: "New York",
            street: "350 5th Ave",
            latitude: 40.748441,
            longitude: -73.985664,
          },
          username: "david.nyc",
          birthday: "1986-08-15",
          phoneNumber: "+1 212-555-0167",
          email: "david.nyc@partnerfleet.com",
          role: {
            uuid: "v8q9r0s1-dddd-4vvv-aaaa-7d8e9f0a1b2c",
            name: "Fleet Supervisor",
            permissions: [
              {
                uuid: "w9r0s1t2-eeee-4www-9999-8e9f0a1b2c3d",
                name: "Vehicle Instances Update",
                description: "Update vehicle assignments.",
              },
              {
                uuid: "x0s1t2u3-ffff-4xxx-8888-9f0a1b2c3d4e",
                name: "Vehicle Models Read",
                description: "View vehicle catalog.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2024-01-10T08:45:00Z",
            updatedAt: "2024-12-01T10:20:15Z",
          },
          branch: {
            uuid: "y1t2u3v4-gggg-4yyy-7777-0a1b2c3d4e5f",
            country: "United States",
            city: "New York",
            street: "350 5th Ave",
            latitude: 40.748441,
            longitude: -73.985664,
            name: "NYC Midtown Branch",
            phoneNumber: "+1 212-555-0167",
            email: "nyc.midtown@partnerfleet.com",
            status: eBranchStatusModel.active,
            createdAt: "2023-09-01T11:30:00Z",
            updatedAt: "2024-12-03T14:10:20Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2023-09-05T10:00:00Z",
          updatedAt: "2024-12-04T09:25:15Z",
        },
        {
          uuid: "i9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
          avatar: {
            uuid: "z2u3v4w5-hhhh-4zzz-6666-1b2c3d4e5f6a",
            url: "https://avatar.vercel.sh/anna_melb.svg?size=200&text=AM",
          },
          location: {
            uuid: "a3v4w5x6-iiii-4aaa-5555-2c3d4e5f6a7b",
            country: "Australia",
            city: "Melbourne",
            street: "120 Collins St",
            latitude: -37.818264,
            longitude: 144.968789,
          },
          username: "anna.melbourne",
          birthday: "1994-01-30",
          phoneNumber: "+61 3 5550 1987",
          email: "anna.melbourne@partnerfleet.com.au",
          role: {
            uuid: "b4w5x6y7-jjjj-4bbb-4444-3d4e5f6a7b8c",
            name: "HR Specialist",
            permissions: [
              {
                uuid: "c5x6y7z8-kkkk-4ccc-3333-4e5f6a7b8c9d",
                name: "Members Create",
                description: "Onboard new staff.",
              },
              {
                uuid: "d6y7z8a9-llll-4ddd-2222-5f6a7b8c9d0e",
                name: "Members Update",
                description: "Update employee records.",
              },
            ],
            status: eRoleStatusModel.active,
            createdAt: "2024-02-10T09:15:00Z",
            updatedAt: "2024-10-05T11:40:22Z",
          },
          branch: {
            uuid: "e7z8a9b0-mmmm-4eee-1111-6a7b8c9d0e1f",
            country: "Australia",
            city: "Melbourne",
            street: "120 Collins St",
            latitude: -37.818264,
            longitude: 144.968789,
            name: "Melbourne CBD Office",
            phoneNumber: "+61 3 5550 1987",
            email: "melbourne cbd@partnerfleet.com.au",
            status: eBranchStatusModel.active,
            createdAt: "2023-11-10T13:00:00Z",
            updatedAt: "2024-11-25T12:15:40Z",
          },
          status: eMemberStatusModel.active,
          createdAt: "2023-11-15T10:30:00Z",
          updatedAt: "2024-11-26T14:20:00Z",
        },
      ],
      pagination: { page: 1, pageSize: 10, totalItems: 10 },
    });

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.get(
      `/partner/dashboard/members${clsQuery.toString()}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    const response: tSuccessManyModel<tMemberModel> =
      await backendResponse.json();
    return NextResponse.json<tSuccessManyModel<tMemberModel>>(response, {
      status: backendResponse.status,
    });
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<tResponseOneModel<null>>> {
  return await apiCatch<null>(async () => {
    const memberCreate = await request.json();
    const parsedMemberCreate = zMemberCreate.parse(memberCreate);

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: 201 },
    );

    const token: tJwt = request.cookies.get("partner-token")!.value;
    const backendResponse: Response = await clsFetch.post(
      `/partner/dashboard/members/`,
      {
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(parsedMemberCreate),
      },
    );

    if (!backendResponse.ok) {
      const errorText: string = await backendResponse.text();
      throw new ClsErrorModel(backendResponse.status, errorText);
    }

    return NextResponse.json<tSuccessOneModel<null>>(
      { data: null },
      { status: backendResponse.status },
    );
  });
}
