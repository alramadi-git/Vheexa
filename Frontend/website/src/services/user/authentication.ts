"use client";

import { tFailedModel } from "@/models/failed";
import { tSuccessOneModel } from "@/models/success";
import { tUserModel } from "@/models/user/user";

import {
  Service,
  ErrorService,
  tResponseOneService,
  tSuccessOneService,
} from "@/services/service";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication";

class AuthenticationService extends Service {
  public async login(
    loginCredentials: tLoginCredentials,
  ): Promise<tResponseOneService<tUserModel>> {
    return this.catcher<tSuccessOneService<tUserModel>>(async () => {
      const loginCredentialsResult = zLoginCredentials.parse(loginCredentials);
      const response = await fetch(
        `${this._APIUrl}/user/authentication/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentialsResult),
        },
      );

      if (response.ok === false) {
        const responseBody: tFailedModel = await response.json();
        throw new ErrorService(
          responseBody.statusCode,
          response.statusText,
          responseBody.message,
          responseBody.issues,
        );
      }

      const responseBody: tSuccessOneModel<tUserModel> = await response.json();
      return {
        isSuccess: true,
        statusCode: response.status,
        statusText: response.statusText,
        data: responseBody.data,
      };
    });
  }
}

export { AuthenticationService };
