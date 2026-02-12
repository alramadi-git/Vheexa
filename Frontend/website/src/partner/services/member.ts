"use client";

import useToken from "@/partner/hooks/token";
import usePartnerService from "./use-partner-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tMemberCreate,
  tMemberFilter,
  zMemberCreate,
  zMemberFilter,
} from "@/partner/validators/member";

import {
  tOptionFilter,
  tOptionPagination,
  zOptionFilter,
  zOptionPagination,
} from "@/partner/validators/option";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { eEnvironment } from "@/enums/environment";

import { eStatusModel } from "../models/enums/status";
import { ePermissionModel } from "../models/enums/permission";

import { tMemberModel } from "@/partner/models/member";
import { tOptionModel } from "@/partner/models/option";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedSuccessService } from "@/services/success";

export default function useMemberService() {
  const { token } = useToken();
  const service = usePartnerService();

  async function create(
    member: tMemberCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zMemberCreate.parse(member);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const formData = new FormData();

      if (member.avatar) {
        formData.append("avatar", member.avatar);
      }

      formData.append("roleUuid", member.roleUuid);
      formData.append("branchUuid", member.branchUuid);
      formData.append("username", member.username);
      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("status", member.status.toString());

      const response = await service.fetch.post(
        "/api/partner/dashboard/members",
        formData,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  async function readRoles(
    uuids: tUuid[],
  ): Promise<tSuccessService<tOptionModel[]> | tErrorService> {
    return await service.catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              name: "Owner",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
            },
          ].filter((role) => uuids.some((uuid) => uuid === role.uuid)),
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Uuids", uuids);

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/roles${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tOptionModel[] = await response.json();
      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function readBranches(
    uuids: tUuid[],
  ): Promise<tSuccessService<tOptionModel[]> | tErrorService> {
    return await service.catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              name: "New York Headquarters",
            },
            {
              uuid: "550e8400-e29b-41d4-a716-446655440000",
              name: "Austin Downtown Branch",
            },
            {
              uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              name: "Los Angeles West Branch",
            },
            {
              uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
              name: "Chicago Lakeside Hub",
            },
            {
              uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
              name: "Miami Beach Office",
            },
            {
              uuid: "123e4567-e89b-12d3-a456-426614174000",
              name: "Seattle Downtown Center",
            },
            {
              uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
              name: "Denver Mountain Hub",
            },
          ].filter((role) => uuids.some((uuid) => uuid === role.uuid)),
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Uuids", uuids);

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/branches${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tOptionModel[] = await response.json();
      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.delete(
        `/api/partner/dashboard/members/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  async function searchRoles(
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedSuccessService<tOptionModel> | tErrorService> {
    return await service.catch<tOptionModel>(async () => {
      zOptionFilter.parse(filter);
      zOptionPagination.parse(pagination);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              name: "Owner",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 2 },
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);
      clsQuery.set("Page", pagination.page?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/roles/search${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function searchBranches(
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedSuccessService<tOptionModel> | tErrorService> {
    return await service.catch<tOptionModel>(async () => {
      zOptionFilter.parse(filter);
      zOptionPagination.parse(pagination);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              name: "New York Headquarters",
            },
            {
              uuid: "550e8400-e29b-41d4-a716-446655440000",
              name: "Austin Downtown Branch",
            },
            {
              uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              name: "Los Angeles West Branch",
            },
            {
              uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
              name: "Chicago Lakeside Hub",
            },
            {
              uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
              name: "Miami Beach Office",
            },
            {
              uuid: "123e4567-e89b-12d3-a456-426614174000",
              name: "Seattle Downtown Center",
            },
            {
              uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
              name: "Denver Mountain Hub",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 2 },
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);
      clsQuery.set("Page", pagination.page?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/branches/search${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function search(
    filter: tMemberFilter,
    pagination: tPagination,
  ): Promise<tPaginatedSuccessService<tMemberModel> | tErrorService> {
    return await service.catch<tMemberModel>(async () => {
      zMemberFilter.parse(filter);
      zPagination.parse(pagination);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              avatar: null,
              username: "james wilson",
              email: "james.wilson@partnerfleet.com",
              role: {
                name: "Vehicle Operator",
                permissions: [
                  ePermissionModel.VehicleModelsCreate,
                  ePermissionModel.VehicleModelsUpdate,
                ],
              },
              branch: {
                location: {
                  country: "United States",
                  city: "Austin",
                  street: "201 E 6th St",
                  latitude: 30.267153,
                  longitude: -97.743094,
                },
                name: "Austin Downtown Branch",
                phoneNumber: "+14155552671",
                email: "austin.downtown@partnerfleet.com",
              },
              status: eStatusModel.active,
              createdAt: "2024-01-10T08:30:00Z",
              updatedAt: "2024-12-01T09:15:22Z",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              avatar: null,
              username: "lena schmidt",
              email: "lena.schmidt@partnerfleet.eu",
              role: {
                name: "HR Specialist",
                permissions: [
                  ePermissionModel.MembersCreate,
                  ePermissionModel.MembersUpdate,
                ],
              },
              branch: {
                location: {
                  country: "Germany",
                  city: "Berlin",
                  street: "Friedrichstraße 68",
                  latitude: 52.517036,
                  longitude: 13.38886,
                },
                name: "Berlin Mitte Hub",
                phoneNumber: "+14155552671",
                email: "berlin.mitte@partnerfleet.eu",
              },
              status: eStatusModel.active,
              createdAt: "2023-09-18T11:20:00Z",
              updatedAt: "2024-11-02T13:10:45Z",
            },
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              avatar: null,
              username: "michael toronto",
              email: "michael.toronto@partnerfleet.ca",
              role: {
                name: "Branch Coordinator",
                permissions: [
                  ePermissionModel.BranchesCreate,
                  ePermissionModel.BranchesUpdate,
                ],
              },
              branch: {
                location: {
                  country: "Canada",
                  city: "Toronto",
                  street: "123 Queen St W",
                  latitude: 43.648749,
                  longitude: -79.380432,
                },
                name: "Toronto Financial District",
                phoneNumber: "+14155552671",
                email: "toronto.fd@partnerfleet.ca",
              },
              status: eStatusModel.active,
              createdAt: "2023-11-25T10:00:00Z",
              updatedAt: "2024-10-14T16:22:30Z",
            },
            {
              uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
              avatar: null,
              username: "sarah sydney",
              email: "sarah.sydney@partnerfleet.com.au",
              role: {
                name: "Fleet Supervisor",
                permissions: [
                  ePermissionModel.VehicleModelsCreate,
                  ePermissionModel.VehicleModelsUpdate,
                ],
              },
              branch: {
                location: {
                  country: "Australia",
                  city: "Sydney",
                  street: "456 George St",
                  latitude: -33.865004,
                  longitude: 151.208336,
                },
                name: "Sydney Central Branch",
                phoneNumber: "+14155552671",
                email: "sydney.central@partnerfleet.com.au",
              },
              status: eStatusModel.inactive,
              createdAt: "2023-05-20T09:10:00Z",
              updatedAt: "2024-09-12T11:30:00Z",
            },
            {
              uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
              avatar: null,
              username: "ahmed dubai",
              email: "ahmed.dubai@partnerfleet.ae",
              role: {
                name: "Partner Administrator",
                permissions: [
                  ePermissionModel.PartnerUpdate,
                  ePermissionModel.RolesCreate,
                ],
              },
              branch: {
                location: {
                  country: "United Arab Emirates",
                  city: "Dubai",
                  street: "Sheikh Zayed Rd, Business Bay",
                  latitude: 25.189827,
                  longitude: 55.273522,
                },
                name: "Dubai Business Bay Office",
                phoneNumber: "+14155552671",
                email: "dubai.bb@partnerfleet.ae",
              },
              status: eStatusModel.active,
              createdAt: "2024-01-12T10:30:00Z",
              updatedAt: "2024-12-06T08:45:10Z",
            },
            {
              uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
              avatar: null,
              username: "carlos sp",
              email: "carlos.sp@partnerfleet.br",
              role: {
                name: "HR Specialist",
                permissions: [
                  ePermissionModel.MembersUpdate,
                  ePermissionModel.MembersDelete,
                ],
              },
              branch: {
                location: {
                  country: "Brazil",
                  city: "São Paulo",
                  street: "Av. Paulista, 1000",
                  latitude: -23.561238,
                  longitude: -46.65551,
                },
                name: "São Paulo Paulista Branch",
                phoneNumber: "+14155552671",
                email: "saopaulo.paulista@partnerfleet.br",
              },
              status: eStatusModel.inactive,
              createdAt: "2023-07-25T14:20:00Z",
              updatedAt: "2024-08-15T09:10:00Z",
            },
            {
              uuid: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
              avatar: null,
              username: "emily vancouver",
              email: "emily.vancouver@partnerfleet.ca",
              role: {
                name: "Vehicle Operator",
                permissions: [
                  ePermissionModel.VehicleModelsCreate,
                  ePermissionModel.VehicleModelsUpdate,
                ],
              },
              branch: {
                location: {
                  country: "Canada",
                  city: "Vancouver",
                  street: "789 Granville St",
                  latitude: 49.2819,
                  longitude: -123.1187,
                },
                name: "Vancouver Downtown Office",
                phoneNumber: "+14155552671",
                email: "vancouver.dt@partnerfleet.ca",
              },
              status: eStatusModel.active,
              createdAt: "2023-10-10T11:15:00Z",
              updatedAt: "2024-11-22T10:30:00Z",
            },
            {
              uuid: "g7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
              avatar: null,
              username: "thomas munich",
              email: "thomas.munich@partnerfleet.eu",
              role: {
                name: "Branch Coordinator",
                permissions: [
                  ePermissionModel.BranchesCreate,
                  ePermissionModel.BranchesDelete,
                ],
              },
              branch: {
                location: {
                  country: "Germany",
                  city: "Munich",
                  street: "Marienplatz 8",
                  latitude: 48.137154,
                  longitude: 11.576124,
                },
                name: "Munich City Center",
                phoneNumber: "+14155552671",
                email: "munich.cc@partnerfleet.eu",
              },
              status: eStatusModel.active,
              createdAt: "2024-02-20T09:45:00Z",
              updatedAt: "2024-11-29T11:15:30Z",
            },
            {
              uuid: "h8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
              avatar: null,
              username: "david nyc",
              email: "david.nyc@partnerfleet.com",
              role: {
                name: "Fleet Supervisor",
                permissions: [
                  ePermissionModel.VehicleModelsRead,
                  ePermissionModel.VehicleModelsUpdate,
                ],
              },
              branch: {
                location: {
                  country: "United States",
                  city: "New York",
                  street: "350 5th Ave",
                  latitude: 40.748441,
                  longitude: -73.985664,
                },
                name: "NYC Midtown Branch",
                phoneNumber: "+14155552671",
                email: "nyc.midtown@partnerfleet.com",
              },
              status: eStatusModel.active,
              createdAt: "2023-09-05T10:00:00Z",
              updatedAt: "2024-12-04T09:25:15Z",
            },
            {
              uuid: "i9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
              avatar: null,
              username: "anna melbourne",
              email: "anna.melbourne@partnerfleet.com.au",
              role: {
                name: "HR Specialist",
                permissions: [
                  ePermissionModel.MembersCreate,
                  ePermissionModel.MembersUpdate,
                ],
              },
              branch: {
                location: {
                  country: "Australia",
                  city: "Melbourne",
                  street: "120 Collins St",
                  latitude: -37.818264,
                  longitude: 144.968789,
                },
                name: "Melbourne CBD Office",
                phoneNumber: "+14155552671",
                email: "melbourne.cbd@partnerfleet.com.au",
              },
              status: eStatusModel.active,
              createdAt: "2023-11-15T10:30:00Z",
              updatedAt: "2024-11-26T14:20:00Z",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 10 },
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);

      console.log(filter.roleUuids)
      clsQuery.set("RoleUuids", filter.roleUuids);

      clsQuery.set("BranchUuids", filter.branchUuids);

      clsQuery.set("Status", filter.status?.toString());

      clsQuery.set("Page", pagination.page?.toString());
      clsQuery.set("PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedModel<tMemberModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    readRoles,
    readBranches,
    delete: _delete,
    search,
    searchRoles,
    searchBranches,
  };
}
