import { ClsAbstractService, tResponseOneService } from "@/services/service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { tAccountModel } from "@/models/partner/account";
import { tSuccessOneModel } from "@/models/success";

class ClsAuthenticationService extends ClsAbstractService {
  public async registerAsync(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<tAccountModel["account"]>> {
    return this._catchAsync<tAccountModel["account"]>(async () => {
      zRegisterCredentials.parse(credentials);

      const formData = new FormData();
      formData.append(
        "partner.logo",
        credentials.partner.logo,
      );
      formData.append(
        "partner.banner",
        credentials.partner.banner,
      );
      formData.append(
        "partner.handle",
        credentials.partner.handle,
      );
      formData.append(
        "partner.name",
        credentials.partner.name,
      );
      formData.append(
        "partner.phoneNumber",
        credentials.partner.phoneNumber,
      );
      formData.append(
        "partner.email",
        credentials.partner.email,
      );
      formData.append(
        "partner.password",
        credentials.partner.password,
      );

      formData.append(
        "branch.location.country",
        credentials.branch.location.country,
      );
      formData.append(
        "branch.location.city",
        credentials.branch.location.city,
      );
      formData.append(
        "branch.location.street",
        credentials.branch.location.street,
      );
      formData.append(
        "branch.location.latitude",
        credentials.branch.location.latitude.toString(),
      );
      formData.append(
        "branch.location.longitude",
        credentials.branch.location.longitude.toString(),
      );
      formData.append("branch.name", credentials.branch.name);
      formData.append(
        "branch.phoneNumber",
        credentials.branch.phoneNumber,
      );
      formData.append("branch.email", credentials.branch.email);

      formData.append("member.avatar", credentials.member.avatar);
      formData.append(
        "member.username",
        credentials.member.username,
      );
      formData.append("member.email", credentials.member.email);
      formData.append(
        "member.password",
        credentials.member.password,
      );

      formData.append(
        "rememberMe",
        credentials.rememberMe.toString(),
      );

      const response: Response = await this._fetch.post(
        "/partner/authentication/register",
        formData,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      const data: tSuccessOneModel<tAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tAccountModel["account"]>> {
    return this._catchAsync<tAccountModel["account"]>(async () => {
      zLoginCredentials.parse(credentials);

      const response: Response = await this._fetch.post(
        "/partner/authentication/login",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  public async getAccount(): Promise<
    tResponseOneService<tAccountModel["account"]>
  > {
    return this._catchAsync<tAccountModel["account"]>(async () => {
      const response: Response = await this._fetch.get(
        "/partner/authentication/me",
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
}

export { ClsAuthenticationService };
