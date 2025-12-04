import { create } from "zustand";

import { eBranchStatusModel } from "@/models/partner/branch";
import { eMemberRoleStatusModel } from "@/models/partner/member-role";
import { eMemberStatusModel } from "@/models/partner/member";

import { tNullable } from "@/types/nullish";
import { tMemberAccountModel } from "@/models/partner/account";

type tUseAccountStore = {
  account: tNullable<tMemberAccountModel["account"]>;
  login: (account: tMemberAccountModel["account"]) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: {
      member: {
        uuid: "6fbd18f3-2cc4-4e92-b32c-1a9fa3d78b6c",
        avatar: {
          uuid: "b7ccfe23-c46e-4d43-9dc8-4f62e5d24872",
          url: "https://example.com/avatar.jpg",
        },
        branch: {
          uuid: "550e8400-e29b-41d4-a716-446655440000",
          country: "United States",
          city: "New York",
          street: "123 Broadway St",
          latitude: 40.7837,
          longitude: -73.9772,
          status: eBranchStatusModel.active,
          updatedAt: "2025-12-04T10:30:00Z",
          createdAt: "2023-01-15T09:00:00Z",
        },
        role: {
          status: eMemberRoleStatusModel.active,
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
        status: eMemberStatusModel.active,
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
      },
      partner: {
        uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        settings: {
          receiveNews: false,
        },
        logo: {
          uuid: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          url: "https://example.com/logos/partner-1-logo.png",
        },
        banner: {
          uuid: "b2c3d4e5-f6g7-8901-2345-67890abcdef1",
          url: "https://example.com/banners/partner-1-banner.jpg",
        },
        handle: "techcorp",
        name: "TechCorp Solutions",
        phoneNumber: "+1-555-123-4567",
        email: "contact@techcorp.com",
        updatedAt: "2025-12-04T09:15:00Z",
        createdAt: "2023-05-20T14:30:00Z",
      },
    },

    login: (account: tMemberAccountModel["account"]) => {
      if (get().account !== null) return;

      set({ account });
    },
    logout: () => {
      if (get().account === null) return;

      set({ account: null });
    },
  };
});

export default useAccountStore;
