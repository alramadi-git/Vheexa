"use client";

import { tMemberModel } from "@/models/[partner]/member";

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
  public constructor() {
    super("/partner/authentication");
  }

  private async _login(
    credentials: tLoginCredentials,
  ): Promise<tSuccessOneService<tMemberModel>> {
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

    const responseBody: tSuccessOneModel<tMemberModel> = await response.json();
    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
    };
  }

  public async login(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tMemberModel>> {
    return {
      isSuccess: true,
      statusCode: 200,
      statusText: "OK",
      data: {
        uuid: "6fbd18f3-2cc4-4e92-b32c-1a9fa3d78b6c",
        avatar: {
          uuid: "b7ccfe23-c46e-4d43-9dc8-4f62e5d24872",
          url: "https://example.com/avatar.jpg",
        },
        location: {
          uuid: "3e8cf8e2-f7c5-4fa5-9af8-715047ef8b42",
          country: "Saudi Arabia",
          city: "Jeddah",
          street: "North Corniche Road",
          latitude: 21.543333,
          longitude: 39.172778,
        },
        username: "member",
        dateOfBirth: "2006-09-09",
        phoneNumber: "+966512345678",
        email: "member@vheexa.com",
        createdAt: "2025-01-10T10:00:00.000Z",
        updatedAt: "2025-01-15T14:20:00.000Z",
        partner: {
          uuid: "f6c6a0e6-b7ea-4dd8-9ce5-2e5fb7f932aa",
          logo: {
            uuid: "db5ac926-8f71-4dc8-9b2e-30d74c22bc65",
            url: "https://example.com/partner-logo.png",
          },
          banner: {
            uuid: "4a8dfb2c-ef25-4dc0-912e-3f11cf3572d4",
            url: "https://example.com/partner-banner.png",
          },
          handle: "partner",
          name: "partner",
          phoneNumber: "+966500000000",
          email: "partner@vheexa.com",
          createdAt: "2025-01-01T09:00:00.000Z",
          updatedAt: "2025-01-10T13:00:00.000Z",
        },
        role: {
          uuid: "bb309e6e-969e-42a4-993a-f8c8fd89c857",
          name: "Partner Manager",
          permissions: [
            {
              uuid: "ce7cb3f0-ec2c-4e67-b6b1-2e4e4b8d4291",
              name: "partner.view",
              description: "Allows viewing partner dashboard",
            },
            {
              uuid: "f4e3fa3b-d96e-4d70-b3b4-3b987c2149d2",
              name: "member.manage",
              description: "Allows managing members",
            },
            {
              uuid: "d5fc9cbd-437c-4f37-a933-a203839f667d",
              name: "vehicle.update",
              description: "Allows editing vehicles",
            },
          ],
          createdAt: "2025-01-05T10:00:00.000Z",
          updatedAt: "2025-01-06T08:00:00.000Z",
        },
      },
    };

    return this.catcher<tSuccessOneService<tMemberModel>>(
      async () => await this._login(credentials),
    );
  }
}

export { ClsAuthenticationService };
