"use client";

import useToken from "@/partner/hooks/token";
import usePartnerService from "./use-partner-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tBranchCreate,
  tBranchFilter,
  zBranchCreate,
  zBranchFilter,
} from "@/partner/validators/branch";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { eEnvironment } from "@/enums/environment";

import { eStatusModel } from "../models/enums/status";

import { tBranchModel } from "@/partner/models/branch";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessModel, tPaginatedSuccessModel } from "@/models/success";
import { tSuccessService, tPaginatedSuccessService } from "@/services/success";

export default function useBranchService() {
  const { token } = useToken();
  const service = usePartnerService();

  async function create(
    branch: tBranchCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zBranchCreate.parse(branch);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.post(
        "/partner/dashboard/branches",
        JSON.stringify(branch),
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
  async function read(
    uuid: tUuid,
  ): Promise<tSuccessService<tBranchModel> | tErrorService> {
    return await service.catch<tBranchModel>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: {
            uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            location: {
              country: "United States",
              city: "New York",
              street: "123 Main Street",
              latitude: 40.7128,
              longitude: -74.006,
            },
            name: "New York Headquarters",
            phoneNumber: "+12125550123",
            email: "ny.headquarters@vheexa.com",
            memberCount: 22,
            status: eStatusModel.active,
            createdAt: "2023-06-12T10:30:00Z",
            updatedAt: "2024-11-30T14:22:10Z",
          },
        };
      }

      const response = await service.fetch.get(
        `/partner/dashboard/branches/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tBranchModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.delete(
        `/partner/dashboard/branches/${uuid}`,
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
  async function search(
    filter: tBranchFilter,
    pagination: tPagination,
  ): Promise<tPaginatedSuccessService<tBranchModel>> {
    return await service.catch<tBranchModel>(async () => {
      zBranchFilter.parse(filter);
      zPagination.parse(pagination);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              location: {
                country: "United States",
                city: "New York",
                street: "123 Main Street",
                latitude: 40.7128,
                longitude: -74.006,
              },
              name: "New York Headquarters",
              phoneNumber: "+12125550123",
              email: "ny.headquarters@vheexa.com",
              memberCount: 22,
              status: eStatusModel.active,
              createdAt: "2023-06-12T10:30:00Z",
              updatedAt: "2024-11-30T14:22:10Z",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              location: {
                country: "United States",
                city: "Austin",
                street: "201 E 6th Street",
                latitude: 30.2672,
                longitude: -97.7431,
              },
              name: "Austin Downtown Branch",
              phoneNumber: "+15125550198",
              email: "austin.downtown@vheexa.com",
              memberCount: 15,
              status: eStatusModel.active,
              createdAt: "2023-08-05T09:15:00Z",
              updatedAt: "2024-10-18T11:40:22Z",
            },
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              location: {
                country: "United States",
                city: "Los Angeles",
                street: "456 Sunset Boulevard",
                latitude: 34.0522,
                longitude: -118.2437,
              },
              name: "Los Angeles West Branch",
              phoneNumber: "+13105550167",
              email: "la.west@vheexa.com",
              memberCount: 18,
              status: eStatusModel.active,
              createdAt: "2023-09-22T14:20:00Z",
              updatedAt: "2024-11-25T09:45:30Z",
            },
            {
              uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
              location: {
                country: "United States",
                city: "Chicago",
                street: "789 Michigan Avenue",
                latitude: 41.8781,
                longitude: -87.6298,
              },
              name: "Chicago Lakeside Hub",
              phoneNumber: "+13125550145",
              email: "chicago.lakeside@vheexa.com",
              memberCount: 12,
              status: eStatusModel.active,
              createdAt: "2023-11-15T11:10:00Z",
              updatedAt: "2024-12-03T16:20:15Z",
            },
            {
              uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8g",
              location: {
                country: "United States",
                city: "Miami",
                street: "321 Ocean Drive",
                latitude: 25.7617,
                longitude: -80.1918,
              },
              name: "Miami Beach Office",
              phoneNumber: "+13055550132",
              email: "miami.beach@vheexa.com",
              memberCount: 10,
              status: eStatusModel.inactive,
              createdAt: "2024-01-08T13:45:00Z",
              updatedAt: "2024-09-28T14:35:40Z",
            },
            {
              uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8g9h",
              location: {
                country: "United States",
                city: "Seattle",
                street: "555 Pine Street",
                latitude: 47.6062,
                longitude: -122.3321,
              },
              name: "Seattle Downtown Center",
              phoneNumber: "+12065550189",
              email: "seattle.downtown@vheexa.com",
              memberCount: 14,
              status: eStatusModel.active,
              createdAt: "2024-02-20T10:05:00Z",
              updatedAt: "2024-11-12T12:15:25Z",
            },
            {
              uuid: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8g9h0i",
              location: {
                country: "United States",
                city: "Denver",
                street: "777 Broadway Street",
                latitude: 39.7392,
                longitude: -104.9903,
              },
              name: "Denver Mountain Hub",
              phoneNumber: "+13035550176",
              email: "denver.mountain@vheexa.com",
              memberCount: 11,
              status: eStatusModel.active,
              createdAt: "2024-03-10T08:30:00Z",
              updatedAt: "2024-10-22T15:10:50Z",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 7 },
        };
      }

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("Filter.Search", filter.search);

      clsQuery.set("Filter.Status", filter.status?.toString());

      clsQuery.set("Pagination.Page", pagination.page?.toString());
      clsQuery.set("Pagination.PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/partner/dashboard/branches${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedSuccessModel<tBranchModel> =
        await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    read,
    delete: _delete,
    search,
  };
}
