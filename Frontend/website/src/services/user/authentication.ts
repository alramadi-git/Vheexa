"use client";

import { tUserModel } from "@/models/user/user";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication";

import { tSuccessOneModel, tFailedModel } from "@/models/response";
import {
  tSuccessOneService,
  tResponseOneService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsAuthenticationService extends ClsAbstractService {
  protected constructor() {
    super("/user/authentication");
  }

  public async login(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tUserModel>> {
    return this.catcher<tSuccessOneService<tUserModel>>(async () => {
      const credentialsResult = zLoginCredentials.parse(credentials);
      const response = await fetch(`${this._url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialsResult),
      });

      if (response.ok === false) {
        const responseBody: tFailedModel = await response.json();
        throw new ClsErrorService(
          response.status,
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

export { ClsAuthenticationService };
