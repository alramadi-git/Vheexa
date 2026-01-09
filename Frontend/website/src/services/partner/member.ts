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
    member: tMemberCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      zMemberCreate.parse(member);

      const formData: FormData = new FormData();
      formData.append("avatar", member.avatar);
      formData.append("role", member.role);
      formData.append("branch", member.branch);
      formData.append("username", member.username);
      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("status", member.status.toString());

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
      zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/members/${uuid}`,
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
      zMemberFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", filter.search);

      clsQuery.set("filter.roles", filter.roles);

      clsQuery.set("filter.branches", filter.branches);

      clsQuery.set("filter.status", filter.status?.toString());

      clsQuery.set("pagination.page", pagination.page?.toString());
      clsQuery.set("pagination.page-size", pagination.pageSize?.toString());

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
      zUuid.parse(uuid);

      const response: Response = await this._fetch.delete(
        `/partner/dashboard/members/${uuid}`,
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
