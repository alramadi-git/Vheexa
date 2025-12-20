import { ClsAbstractService, tResponseOneService } from "@/services/service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { tMemberModel } from "@/models/partner/member";
import { tSuccessOneModel } from "@/models/success";

class ClsAuthenticationService extends ClsAbstractService {
  public async registerAsync(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this._catchAsync<tMemberModel>(async () => {
      const parsedCredentials = zRegisterCredentials.parse(credentials);

      const response: Response = await this._fetch.post(
        "/partner/authentication/register",
        parsedCredentials,
      );
      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      const data: tSuccessOneModel<tMemberModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return this._catchAsync<tMemberModel>(async () => {
      const parsedCredentials = zLoginCredentials.parse(credentials);

      const response: Response = await this._fetch.post(
        "/partner/authentication/login",
        parsedCredentials,
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

  public async getAccount(): Promise<tResponseOneService<tMemberModel>> {
    return this._catchAsync<tMemberModel>(async () => {
      const response: Response = await this._fetch.get(
        "/partner/authentication/me",
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
}

export { ClsAuthenticationService };
