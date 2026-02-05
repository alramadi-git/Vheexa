"use client";

import useService from "@/services/use-service";

import { eServiceRole } from "@/services/enums/service-role";

export default function usePartnerService() {
  const service = useService({
    serviceRole: eServiceRole.Partner,
  });

  return service;
}
