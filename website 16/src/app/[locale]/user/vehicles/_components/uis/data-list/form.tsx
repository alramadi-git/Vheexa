import { TVehiclesFilter, zVehiclesFilter } from "@/validations/vehicles";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/utilities/cn";

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/shadcn/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ReactHookForm,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

// function SearchFilter() {
//   return (
//     <div className="w-full *:not-first:mt-2">
//       <div className="relative">
//         <InputShadcn
//           className="peer px-9"
//           placeholder="What are you waiting search you vehicle..."
//           type="search"
//         />
//         <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
//           <SearchIcon size={16} />
//         </div>
//         <button
//           className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//           aria-label="Submit search"
//           type="submit"
//         >
//           <ArrowRightIcon size={16} aria-hidden="true" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function SortingFilter() {
//   const [open, setOpen] = useState<boolean>(false);
//   const [value, setValue] = useState<SortingQuery["ID"]>(sortingOptions[0].ID);

//   return (
//     <div className="*:not-first:mt-2">
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
//           >
//             <span className={cn("truncate", !value && "text-muted-foreground")}>
//               {value
//                 ? sortingOptions.find((sorting) => sorting.ID === value)?.Label
//                 : "Select organization"}
//             </span>
//             <ChevronDownIcon
//               size={16}
//               className="text-muted-foreground/80 shrink-0"
//               aria-hidden="true"
//             />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
//           align="end"
//         >
//           <Command>
//             <CommandInput placeholder="Find organization" />
//             <CommandList>
//               <CommandEmpty>No organization found.</CommandEmpty>
//               <CommandGroup>
//                 {sortingOptions.map((sorting) => (
//                   <CommandItem
//                     key={sorting.ID}
//                     value={sorting.ID}
//                     onSelect={(sortingID) => {
//                       setValue(
//                         sortingID === value ? sortingOptions[0].ID : sortingID,
//                       );
//                       setOpen(false);
//                     }}
//                   >
//                     {sorting.Label}
//                     {value === sorting.ID && (
//                       <CheckIcon size={16} className="ml-auto" />
//                     )}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//               <CommandSeparator />
//               <CommandGroup>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start font-normal"
//                 >
//                   <PlusIcon
//                     size={16}
//                     className="-ms-2 opacity-60"
//                     aria-hidden="true"
//                   />
//                   New organization
//                 </Button>
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

export default function Form() {
  const form = useForm<TVehiclesFilter>({
    defaultValues: {
      Vehicles: {
        Search: undefined,
        Transmission: undefined,
        MinCapacity: 0,
        MaxCapacity: 0,
        Fuel: undefined,
        MinPrice: undefined,
        MaxPrice: undefined,
        HasDiscount: undefined,
      },
    },
    resolver: zodResolver(zVehiclesFilter),
  });

  function onSubmit(vehilczVehiclesFilter: z.infer<typeof zVehiclesFilter>) {}

  return (
    <ReactHookForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky top-[125px] left-0 space-y-8 p-6"
      >
        <FormField
          shouldUnregister
          control={form.control}
          name="Vehicles.Search"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className={cn({
                    "text-destructive placeholder:text-destructive":
                      fieldState.invalid,
                  })}

                  type="text"
                />
              </FormControl>
              <FormMessage className="w-fit" /> 
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
        </div>

        <Button type="submit" variant="outline" className="w-full">
          Apply
        </Button>
      </form>
    </ReactHookForm>
  );
}
