import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tMemberCreate,
  tMemberFilter,
  zMemberCreate,
  zMemberFilter,
} from "@/validations/partner/member";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tMemberModel } from "@/models/partner/member";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsMemberService extends ClsAbstractService {
  public async addAsync(
    memberCreate: tMemberCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedMemberCreate: tMemberCreate =
        zMemberCreate.parse(memberCreate);

      const formData: FormData = new FormData();
      formData.append("avatar", parsedMemberCreate.avatar);
      formData.append("role", parsedMemberCreate.role);
      formData.append("branch", parsedMemberCreate.branch);
      formData.append("username", parsedMemberCreate.username);
      formData.append("email", parsedMemberCreate.email);
      formData.append("password", parsedMemberCreate.password);
      formData.append("status", parsedMemberCreate.status.toString());

      const response: Response = await this._fetch.post(
        "/partner/dashboard/members",
        formData,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  public async getOneAsync(
    uuid: tUuid,
  ): Promise<tResponseOneService<tMemberModel>> {
    return await this._catchAsync<tMemberModel>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/members/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tMemberModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getManyAsync(
    filter: tMemberFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tMemberModel>> {
    return await this._catchAsync<tMemberModel>(async () => {
      const parsedFilter: tMemberFilter = zMemberFilter.parse(filter);
      const parsedPagination: tPagination = zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", parsedFilter.search);

      clsQuery.set("filter.roles", parsedFilter.roles);

      clsQuery.set("filter.branches", parsedFilter.branches);

      clsQuery.set("filter.status", parsedFilter.status?.toString());

      clsQuery.set("pagination.page", parsedPagination.page?.toString());
      clsQuery.set(
        "pagination.page-size",
        parsedPagination.pageSize?.toString(),
      );

      const response: Response = await this._fetch.get(
        `/partner/dashboard/members${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tMemberModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }
  public async deleteOneAsync(uuid: tUuid): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.delete(
        `/partner/dashboard/members/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
}

export { ClsMemberService };
