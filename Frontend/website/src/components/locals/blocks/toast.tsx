import { tFailedService } from "@/services/service";

import { LuCircleAlert } from "react-icons/lu";

type tErrorToast = {
  error: tFailedService;
};
export function ErrorToast({ error }: tErrorToast) {
  return (
    <div className="bg-background cursor-pointer rounded-md border border-red-500/50 px-4 py-3 text-red-600">
      <div className="flex gap-3">
        <LuCircleAlert
          className="mt-0.5 shrink-0 opacity-60"
          size={16}
          aria-hidden="true"
        />
        <div className="grow space-y-1">
          <p className="text-sm font-medium">{error.message}</p>
        </div>
      </div>
    </div>
  );
}
