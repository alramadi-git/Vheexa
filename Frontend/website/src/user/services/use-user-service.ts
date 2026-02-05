"use client";

import useService from "@/services/use-service";

import { eServiceRole } from "@/services/enums/service-role";

export default function useUserService() {
  const service = useService({
    serviceRole: eServiceRole.User,
  });

  return service;
}
