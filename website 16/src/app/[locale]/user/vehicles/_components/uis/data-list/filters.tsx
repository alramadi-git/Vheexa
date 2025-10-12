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
import { Card } from "@/components/shadcn/card";
import { Checkbox } from "@/components/shadcn/checkbox";

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

export default function Filters() {
  const form = useForm<TVehiclesFilter>({
    defaultValues: {
      Vehicles: {
        Search: undefined,
        Transmission: undefined,
        MinCapacity: undefined,
        MaxCapacity: undefined,
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
    <Card className="relative min-h-full w-1/4 rounded-md">
      <ReactHookForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sticky top-[125px] left-0 space-y-8 p-6"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Vehicles.Search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Search your vehicle..."
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="col-span-6">
              <FormField
                control={form.control}
                name=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your email settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>

          <FormField
            control={form.control}
            name="Vehicles.Transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Automatic, Manual etc..." type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Vehicles.Fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Gasoline, Diesel etc..." type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Vehicles.MinCapacity"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Min Capacity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set min capacity"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Vehicles.MaxCapacity"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set max capacity"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Vehicles.MinPrice"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set min price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Vehicles.MaxPrice"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set max price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="Vehicles.HasDiscount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Only show vehicles with discounts</FormLabel>
                  <FormDescription>
                    When checked, only show vehicles with discounts, otherwise
                    show all vehicles.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" variant="outline" className="w-full">
            Apply
          </Button>
        </form>
      </ReactHookForm>
    </Card>
  );
}
