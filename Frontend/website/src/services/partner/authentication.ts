import { ClsAbstractService, tResponseOneService } from "@/services/service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { tSuccessOneModel } from "@/models/success";
import { tPartnerAccountModel } from "@/models/partner/account";

class ClsAuthenticationService extends ClsAbstractService {
  public async registerAsync(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<tPartnerAccountModel["account"]>> {
    return this._catchAsync<tPartnerAccountModel["account"]>(async () => {
      const parsedCredentials = zRegisterCredentials.parse(credentials);

      const credentialsFormData =new FormData();

      credentialsFormData.append("partner.logo", parsedCredentials.partner.logo);
      credentialsFormData.append("partner.banner", parsedCredentials.partner.banner);
      credentialsFormData.append("partner.handle", parsedCredentials.partner.handle);
      credentialsFormData.append("partner.name", parsedCredentials.partner.name);
      credentialsFormData.append("partner.phoneNumber", parsedCredentials.partner.phoneNumber);
      credentialsFormData.append("partner.email", parsedCredentials.partner.email);
      credentialsFormData.append("partner.password", parsedCredentials.partner.password);

      credentialsFormData.append("branch.location", parsedCredentials.branch.location.city);
      credentialsFormData.append("branch.location", parsedCredentials.branch.location.country);
      credentialsFormData.append("branch.location", parsedCredentials.branch.location.latitude.toString());
      credentialsFormData.append("branch.location", parsedCredentials.branch.location.longitude.toString());
      credentialsFormData.append("branch.location", parsedCredentials.branch.location.street);
      credentialsFormData.append("branch", parsedCredentials.branch.name);
      credentialsFormData.append("branch", parsedCredentials.branch.phoneNumber);
      credentialsFormData.append("branch", parsedCredentials.branch.email);

      credentialsFormData.append("member.", parsedCredentials.member.);
      credentialsFormData.append("member.", parsedCredentials.member.);
      credentialsFormData.append("member.", parsedCredentials.member.);
      credentialsFormData.append("member.", parsedCredentials.member.);

      credentialsFormData.append("rememberMe", parsedCredentials.rememberMe);


      const response: Response = await this._fetch.post(
        "/partner/authentication/register",
        parsedCredentials,
      );
      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      const data: tSuccessOneModel<tPartnerAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  public async loginAsync(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tPartnerAccountModel["account"]>> {
    return this._catchAsync<tPartnerAccountModel["account"]>(async () => {
      const parsedCredentials = zLoginCredentials.parse(credentials);

      const response: Response = await this._fetch.post(
        "/partner/authentication/login",
        parsedCredentials,
      );
      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tPartnerAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  public async getAccount(): Promise<
    tResponseOneService<tPartnerAccountModel["account"]>
  > {
    return this._catchAsync<tPartnerAccountModel["account"]>(async () => {
      const response: Response = await this._fetch.get(
        "/partner/authentication/me",
      );
      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tPartnerAccountModel["account"]> =
        await response.json();

      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
}

export { ClsAuthenticationService };
