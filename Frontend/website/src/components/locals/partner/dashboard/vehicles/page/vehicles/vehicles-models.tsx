"use client";
import { eLocale } from "@/i18n/routing";

import {
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
  eVehicleModelTransmissionModel,
  tVehicleModelModel,
} from "@/models/partner/vehicle-model";

import { eCurrency, ClsMonyFormatter } from "@/libraries/mony-formatter";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { cn } from "@/utilities/cn";

import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  LuDot,
  LuUsers,
  LuActivity,
  LuFuel,
  LuEllipsisVertical,
  LuBookOpenText,
  LuPenLine,
  LuTrash2,
  LuCircleCheck,
  LuCircleX,
} from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";

import { TabsContent } from "@/components/shadcn/tabs";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/shadcn/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { Badge } from "@/components/locals/blocks/typography";
import { Badge as ShadcnBadge } from "@/components/shadcn/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";

const data = [
  {
    uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    thumbnail: {
      uuid: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      url: "https://example.com/images/sedan-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "c3d4e5f6-g7h8-9012-cdef-345678901234",
        name: "Midnight Black",
        hexCode: "#0A0A0A",
      },
      {
        uuid: "d4e5f6g7-h8i9-0123-defg-456789012345",
        name: "Arctic White",
        hexCode: "#FFFFFF",
      },
    ],
    name: "Tesla Model 3",
    description: "Standard electric sedan with autopilot",
    manufacturer: "Tesla",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.electric,
    price: 89,
    discount: 0,
    tags: ["electric", "sedan", "premium"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-01-15T10:30:00Z",
    createdAt: "2023-12-01T08:15:00Z",
  },
  {
    uuid: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    thumbnail: {
      uuid: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      url: "https://example.com/images/suv-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "e5f6g7h8-i9j0-1234-efgh-567890123456",
        name: "Ocean Blue",
        hexCode: "#1E40AF",
      },
      {
        uuid: "f6g7h8i9-j0k1-2345-fghi-678901234567",
        name: "Metallic Gray",
        hexCode: "#6B7280",
      },
    ],
    name: "Toyota RAV4",
    description: "Compact SUV with all-wheel drive",
    manufacturer: "Toyota",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.hybrid,
    price: 65,
    discount: 8,
    tags: ["suv", "hybrid", "economical"],
    status: eVehicleModelStatusModel.inactive,
    updatedAt: "2024-01-20T14:45:00Z",
    createdAt: "2023-11-10T09:20:00Z",
  },
  {
    uuid: "c3d4e5f6-g7h8-9012-cdef-345678901234",
    thumbnail: {
      uuid: "d4e5f6g7-h8i9-0123-defg-456789012345",
      url: "https://example.com/images/pickup-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "g7h8i9j0-k1l2-3456-ghij-789012345678",
        name: "Forest Green",
        hexCode: "#166534",
      },
      {
        uuid: "h8i9j0k1-l2m3-4567-hijk-890123456789",
        name: "Silver",
        hexCode: "#D1D5DB",
      },
    ],
    name: "Ford Ranger",
    description: "Mid-size pickup truck",
    manufacturer: "Ford",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 1,
    fuel: eVehicleModelFuelModel.diesel,
    price: 75,
    discount: 12,
    tags: ["pickup", "diesel", "utility"],
    status: eVehicleModelStatusModel.inactive,
    updatedAt: "2024-01-18T11:20:00Z",
    createdAt: "2023-10-25T16:30:00Z",
  },
  {
    uuid: "d4e5f6g7-h8i9-0123-defg-456789012345",
    thumbnail: {
      uuid: "e5f6g7h8-i9j0-1234-efgh-567890123456",
      url: "https://example.com/images/minivan-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "i9j0k1l2-m3n4-5678-ijkl-901234567890",
        name: "Pearl White",
        hexCode: "#F9FAFB",
      },
      {
        uuid: "j0k1l2m3-n4o5-6789-jklm-012345678901",
        name: "Midnight Blue",
        hexCode: "#1E3A8A",
      },
    ],
    name: "Honda Odyssey",
    description: "Family minivan with 7 seats",
    manufacturer: "Honda",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 7,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 85,
    discount: 15,
    tags: ["family", "minivan", "spacious"],
    status: eVehicleModelStatusModel.inactive,
    updatedAt: "2024-01-22T09:15:00Z",
    createdAt: "2023-11-05T14:40:00Z",
  },
  {
    uuid: "e5f6g7h8-i9j0-1234-efgh-567890123456",
    thumbnail: {
      uuid: "f6g7h8i9-j0k1-2345-fghi-678901234567",
      url: "https://example.com/images/economy-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "k1l2m3n4-o5p6-7890-klmn-123456789012",
        name: "Red",
        hexCode: "#DC2626",
      },
      {
        uuid: "l2m3n4o5-p6q7-8901-lmno-234567890123",
        name: "White",
        hexCode: "#F3F4F6",
      },
    ],
    name: "Toyota Corolla",
    description: "Fuel-efficient compact car",
    manufacturer: "Toyota",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 1,
    fuel: eVehicleModelFuelModel.petrol91,
    price: 45,
    discount: 5,
    tags: ["economy", "compact", "fuel-efficient"],
    status: eVehicleModelStatusModel.inactive,
    updatedAt: "2024-01-25T13:20:00Z",
    createdAt: "2023-12-15T10:10:00Z",
  },
  {
    uuid: "f6g7h8i9-j0k1-2345-fghi-678901234567",
    thumbnail: {
      uuid: "g7h8i9j0-k1l2-3456-ghij-789012345678",
      url: "https://example.com/images/luxury-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "m3n4o5p6-q7r8-9012-mnop-345678901234",
        name: "Black Sapphire",
        hexCode: "#000000",
      },
      {
        uuid: "n4o5p6q7-r8s9-0123-nopq-456789012345",
        name: "Silver Metallic",
        hexCode: "#9CA3AF",
      },
    ],
    name: "Mercedes E-Class",
    description: "Executive luxury sedan",
    manufacturer: "Mercedes-Benz",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol98,
    price: 120,
    discount: 20,
    tags: ["luxury", "executive", "premium"],
    status: eVehicleModelStatusModel.inactive,
    updatedAt: "2024-01-28T16:45:00Z",
    createdAt: "2023-12-20T11:30:00Z",
  },
  {
    uuid: "g7h8i9j0-k1l2-3456-ghij-789012345678",
    thumbnail: {
      uuid: "h8i9j0k1-l2m3-4567-hijk-890123456789",
      url: "https://example.com/images/convertible-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "o5p6q7r8-s9t0-1234-opqr-567890123456",
        name: "Bright Red",
        hexCode: "#EF4444",
      },
      {
        uuid: "p6q7r8s9-t0u1-2345-pqrs-678901234567",
        name: "Jet Black",
        hexCode: "#111827",
      },
    ],
    name: "BMW 4 Series Convertible",
    description: "Sporty convertible",
    manufacturer: "BMW",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 4,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 110,
    discount: 0,
    tags: ["convertible", "sport", "premium"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-01-30T10:20:00Z",
    createdAt: "2023-11-25T09:45:00Z",
  },
  {
    uuid: "h8i9j0k1-l2m3-4567-hijk-890123456789",
    thumbnail: {
      uuid: "i9j0k1l2-m3n4-5678-ijkl-901234567890",
      url: "https://example.com/images/van-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "q7r8s9t0-u1v2-3456-qrst-789012345678",
        name: "White",
        hexCode: "#F8FAFC",
      },
      {
        uuid: "r8s9t0u1-v2w3-4567-rstu-890123456789",
        name: "Gray",
        hexCode: "#4B5563",
      },
    ],
    name: "Mercedes Sprinter",
    description: "Commercial passenger van",
    manufacturer: "Mercedes-Benz",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 12,
    fuel: eVehicleModelFuelModel.diesel,
    price: 130,
    discount: 25,
    tags: ["van", "commercial", "passenger"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-01T14:30:00Z",
    createdAt: "2023-10-30T08:15:00Z",
  },
  {
    uuid: "i9j0k1l2-m3n4-5678-ijkl-901234567890",
    thumbnail: {
      uuid: "j0k1l2m3-n4o5-6789-jklm-012345678901",
      url: "https://example.com/images/hatchback-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "s9t0u1v2-w3x4-5678-stuv-901234567890",
        name: "Blue",
        hexCode: "#3B82F6",
      },
      {
        uuid: "t0u1v2w3-x4y5-6789-tuvw-012345678901",
        name: "Silver",
        hexCode: "#E5E7EB",
      },
    ],
    name: "Volkswagen Golf",
    description: "Compact hatchback",
    manufacturer: "Volkswagen",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.manual,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 48,
    discount: 6,
    tags: ["hatchback", "compact", "manual"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-02T11:45:00Z",
    createdAt: "2023-12-10T15:20:00Z",
  },
  {
    uuid: "j0k1l2m3-n4o5-6789-jklm-012345678901",
    thumbnail: {
      uuid: "k1l2m3n4-o5p6-7890-klmn-123456789012",
      url: "https://example.com/images/crossover-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "u1v2w3x4-y5z6-7890-uvwx-123456789012",
        name: "Gray",
        hexCode: "#6B7280",
      },
      {
        uuid: "v2w3x4y5-z6a7-8901-vwxy-234567890123",
        name: "Black",
        hexCode: "#1F2937",
      },
    ],
    name: "Hyundai Tucson",
    description: "Compact crossover SUV",
    manufacturer: "Hyundai",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.hybrid,
    price: 62,
    discount: 8,
    tags: ["crossover", "suv", "hybrid"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-03T09:30:00Z",
    createdAt: "2023-11-20T14:15:00Z",
  },
  {
    uuid: "k1l2m3n4-o5p6-7890-klmn-123456789012",
    thumbnail: {
      uuid: "l2m3n4o5-p6q7-8901-lmno-234567890123",
      url: "https://example.com/images/electric-suv-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "w3x4y5z6-a7b8-9012-wxyz-345678901234",
        name: "White",
        hexCode: "#F9FAFB",
      },
      {
        uuid: "x4y5z6a7-b8c9-0123-xyza-456789012345",
        name: "Blue",
        hexCode: "#2563EB",
      },
    ],
    name: "Kia EV6",
    description: "Electric crossover SUV",
    manufacturer: "Kia",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.electric,
    price: 82,
    discount: 12,
    tags: ["electric", "suv", "crossover"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-04T15:20:00Z",
    createdAt: "2023-12-05T10:45:00Z",
  },
  {
    uuid: "l2m3n4o5-p6q7-8901-lmno-234567890123",
    thumbnail: {
      uuid: "m3n4o5p6-q7r8-9012-mnop-345678901234",
      url: "https://example.com/images/sports-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "y5z6a7b8-c9d0-1234-yzab-567890123456",
        name: "Yellow",
        hexCode: "#FBBF24",
      },
      {
        uuid: "z6a7b8c9-d0e1-2345-zabc-678901234567",
        name: "Black",
        hexCode: "#000000",
      },
    ],
    name: "Porsche 911",
    description: "Sports car",
    manufacturer: "Porsche",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 4,
    fuel: eVehicleModelFuelModel.petrol98,
    price: 250,
    discount: 30,
    tags: ["sports", "luxury", "performance"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-05T12:00:00Z",
    createdAt: "2023-12-25T16:30:00Z",
  },
  {
    uuid: "m3n4o5p6-q7r8-9012-mnop-345678901234",
    thumbnail: {
      uuid: "n4o5p6q7-r8s9-0123-nopq-456789012345",
      url: "https://example.com/images/compact-suv-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "a7b8c9d0-e1f2-3456-abcd-789012345678",
        name: "Red",
        hexCode: "#B91C1C",
      },
      {
        uuid: "b8c9d0e1-f2g3-4567-bcde-890123456789",
        name: "White",
        hexCode: "#FFFFFF",
      },
    ],
    name: "Nissan Rogue",
    description: "Compact SUV",
    manufacturer: "Nissan",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.cvt,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 58,
    discount: 7,
    tags: ["suv", "compact", "cvt"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-06T14:15:00Z",
    createdAt: "2023-11-15T11:20:00Z",
  },
  {
    uuid: "n4o5p6q7-r8s9-0123-nopq-456789012345",
    thumbnail: {
      uuid: "o5p6q7r8-s9t0-1234-opqr-567890123456",
      url: "https://example.com/images/midsize-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "c9d0e1f2-g3h4-5678-cdef-901234567890",
        name: "Gray",
        hexCode: "#9CA3AF",
      },
      {
        uuid: "d0e1f2g3-h4i5-6789-defg-012345678901",
        name: "Blue",
        hexCode: "#1D4ED8",
      },
    ],
    name: "Toyota Camry",
    description: "Midsize sedan",
    manufacturer: "Toyota",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.hybrid,
    price: 55,
    discount: 8,
    tags: ["sedan", "midsize", "hybrid"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-07T10:30:00Z",
    createdAt: "2023-12-12T09:45:00Z",
  },
  {
    uuid: "o5p6q7r8-s9t0-1234-opqr-567890123456",
    thumbnail: {
      uuid: "p6q7r8s9-t0u1-2345-pqrs-678901234567",
      url: "https://example.com/images/luxury-suv-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "e1f2g3h4-i5j6-7890-efgh-123456789012",
        name: "Black",
        hexCode: "#111827",
      },
      {
        uuid: "f2g3h4i5-j6k7-8901-fghi-234567890123",
        name: "Silver",
        hexCode: "#D1D5DB",
      },
    ],
    name: "Range Rover Sport",
    description: "Luxury SUV",
    manufacturer: "Land Rover",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.diesel,
    price: 180,
    discount: 25,
    tags: ["luxury", "suv", "premium"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-08T16:45:00Z",
    createdAt: "2023-12-28T14:20:00Z",
  },
  {
    uuid: "p6q7r8s9-t0u1-2345-pqrs-678901234567",
    thumbnail: {
      uuid: "q7r8s9t0-u1v2-3456-qrst-789012345678",
      url: "https://example.com/images/economy-hatch-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "g3h4i5j6-k7l8-9012-ghij-345678901234",
        name: "Orange",
        hexCode: "#EA580C",
      },
      {
        uuid: "h4i5j6k7-l8m9-0123-hijk-456789012345",
        name: "Gray",
        hexCode: "#6B7280",
      },
    ],
    name: "Suzuki Swift",
    description: "Economy hatchback",
    manufacturer: "Suzuki",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.manual,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol91,
    price: 38,
    discount: 4,
    tags: ["economy", "hatchback", "manual"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-09T11:20:00Z",
    createdAt: "2023-12-08T13:15:00Z",
  },
  {
    uuid: "q7r8s9t0-u1v2-3456-qrst-789012345678",
    thumbnail: {
      uuid: "r8s9t0u1-v2w3-4567-rstu-890123456789",
      url: "https://example.com/images/mid-suv-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "i5j6k7l8-m9n0-1234-ijkl-567890123456",
        name: "Green",
        hexCode: "#065F46",
      },
      {
        uuid: "j6k7l8m9-n0o1-2345-jklm-678901234567",
        name: "White",
        hexCode: "#F9FAFB",
      },
    ],
    name: "Mazda CX-5",
    description: "Midsize crossover SUV",
    manufacturer: "Mazda",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 68,
    discount: 10,
    tags: ["suv", "crossover", "premium"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-10T14:30:00Z",
    createdAt: "2023-11-28T10:45:00Z",
  },
  {
    uuid: "r8s9t0u1-v2w3-4567-rstu-890123456789",
    thumbnail: {
      uuid: "s9t0u1v2-w3x4-5678-stuv-901234567890",
      url: "https://example.com/images/mini-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "k7l8m9n0-o1p2-3456-klmn-789012345678",
        name: "Yellow",
        hexCode: "#FBBF24",
      },
      {
        uuid: "l8m9n0o1-p2q3-4567-lmno-890123456789",
        name: "Black",
        hexCode: "#000000",
      },
    ],
    name: "Mini Cooper",
    description: "Compact premium hatchback",
    manufacturer: "Mini",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 4,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 72,
    discount: 12,
    tags: ["compact", "premium", "hatchback"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-11T09:15:00Z",
    createdAt: "2023-12-18T15:30:00Z",
  },
  {
    uuid: "s9t0u1v2-w3x4-5678-stuv-901234567890",
    thumbnail: {
      uuid: "t0u1v2w3-x4y5-6789-tuvw-012345678901",
      url: "https://example.com/images/fullsize-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "m9n0o1p2-q3r4-5678-mnop-901234567890",
        name: "Black",
        hexCode: "#000000",
      },
      {
        uuid: "n0o1p2q3-r4s5-6789-nopq-012345678901",
        name: "Silver",
        hexCode: "#D1D5DB",
      },
    ],
    name: "Chevrolet Suburban",
    description: "Full-size SUV",
    manufacturer: "Chevrolet",
    modelYear: "2023",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 8,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 145,
    discount: 20,
    tags: ["suv", "fullsize", "family"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-12T16:20:00Z",
    createdAt: "2023-10-20T14:10:00Z",
  },
  {
    uuid: "t0u1v2w3-x4y5-6789-tuvw-012345678901",
    thumbnail: {
      uuid: "u1v2w3x4-y5z6-7890-uvwx-123456789012",
      url: "https://example.com/images/city-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "o1p2q3r4-s5t6-7890-opqr-123456789012",
        name: "Blue",
        hexCode: "#3B82F6",
      },
      {
        uuid: "p2q3r4s5-t6u7-8901-pqrs-234567890123",
        name: "White",
        hexCode: "#FFFFFF",
      },
    ],
    name: "Honda Civic",
    description: "Compact sedan",
    manufacturer: "Honda",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.cvt,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol91,
    price: 52,
    discount: 7,
    tags: ["sedan", "compact", "economical"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-13T11:45:00Z",
    createdAt: "2023-12-22T10:20:00Z",
  },
  {
    uuid: "u1v2w3x4-y5z6-7890-uvwx-123456789012",
    thumbnail: {
      uuid: "v2w3x4y5-z6a7-8901-vwxy-234567890123",
      url: "https://example.com/images/7seater-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "q3r4s5t6-u7v8-9012-qrst-345678901234",
        name: "Gray",
        hexCode: "#6B7280",
      },
      {
        uuid: "r4s5t6u7-v8w9-0123-rstu-456789012345",
        name: "Black",
        hexCode: "#111827",
      },
    ],
    name: "Kia Sorento",
    description: "7-seater SUV",
    manufacturer: "Kia",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 7,
    fuel: eVehicleModelFuelModel.hybrid,
    price: 78,
    discount: 12,
    tags: ["suv", "7-seater", "family"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-14T14:00:00Z",
    createdAt: "2023-11-30T09:35:00Z",
  },
  {
    uuid: "v2w3x4y5-z6a7-8901-vwxy-234567890123",
    thumbnail: {
      uuid: "w3x4y5z6-a7b8-9012-wxyz-345678901234",
      url: "https://example.com/images/compact-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "s5t6u7v8-w9x0-1234-stuv-567890123456",
        name: "Red",
        hexCode: "#DC2626",
      },
      {
        uuid: "t6u7v8w9-x0y1-2345-tuvw-678901234567",
        name: "White",
        hexCode: "#F3F4F6",
      },
    ],
    name: "Mazda 3",
    description: "Compact sedan",
    manufacturer: "Mazda",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.petrol95,
    price: 58,
    discount: 8,
    tags: ["sedan", "compact", "premium"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-15T10:25:00Z",
    createdAt: "2023-12-14T13:45:00Z",
  },
  {
    uuid: "w3x4y5z6-a7b8-9012-wxyz-345678901234",
    thumbnail: {
      uuid: "x4y5z6a7-b8c9-0123-xyza-456789012345",
      url: "https://example.com/images/mid-sedan-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "u7v8w9x0-y1z2-3456-uvwx-789012345678",
        name: "Blue",
        hexCode: "#1D4ED8",
      },
      {
        uuid: "v8w9x0y1-z2a3-4567-vwxy-890123456789",
        name: "Gray",
        hexCode: "#9CA3AF",
      },
    ],
    name: "Hyundai Sonata",
    description: "Midsize sedan",
    manufacturer: "Hyundai",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.hybrid,
    price: 60,
    discount: 9,
    tags: ["sedan", "midsize", "hybrid"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-16T15:30:00Z",
    createdAt: "2023-12-07T11:20:00Z",
  },
  {
    uuid: "x4y5z6a7-b8c9-0123-xyza-456789012345",
    thumbnail: {
      uuid: "y5z6a7b8-c9d0-1234-yzab-567890123456",
      url: "https://example.com/images/electric-compact-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "w9x0y1z2-a3b4-5678-wxyz-901234567890",
        name: "White",
        hexCode: "#FFFFFF",
      },
      {
        uuid: "x0y1z2a3-b4c5-6789-xyza-012345678901",
        name: "Gray",
        hexCode: "#6B7280",
      },
    ],
    name: "Nissan Leaf",
    description: "Electric compact car",
    manufacturer: "Nissan",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 5,
    fuel: eVehicleModelFuelModel.electric,
    price: 68,
    discount: 10,
    tags: ["electric", "compact", "eco-friendly"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-17T12:45:00Z",
    createdAt: "2023-12-28T14:50:00Z",
  },
  {
    uuid: "y5z6a7b8-c9d0-1234-yzab-567890123456",
    thumbnail: {
      uuid: "z6a7b8c9-d0e1-2345-zabc-678901234567",
      url: "https://example.com/images/performance-thumb.jpg",
    },
    images: [],
    colors: [
      {
        uuid: "y1z2a3b4-c5d6-7890-yzab-123456789012",
        name: "Orange",
        hexCode: "#F97316",
      },
      {
        uuid: "z2a3b4c5-d6e7-8901-zabc-234567890123",
        name: "Black",
        hexCode: "#000000",
      },
    ],
    name: "Audi RS5",
    description: "Performance sports sedan",
    manufacturer: "Audi",
    modelYear: "2024",
    transmission: eVehicleModelTransmissionModel.automatic,
    capacity: 4,
    fuel: eVehicleModelFuelModel.petrol98,
    price: 190,
    discount: 25,
    tags: ["performance", "sports", "luxury"],
    status: eVehicleModelStatusModel.active,
    updatedAt: "2024-02-18T16:15:00Z",
    createdAt: "2023-12-30T10:30:00Z",
  },
];

export default function VehicleModels() {
  const locale = useLocale() as eLocale;

  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  const columns: ColumnDef<tVehicleModelModel>[] = useMemo(() => {
    return [
      {
        header: () => <Heading title={tVehicleModels("table.uuid.header")} />,
        accessorKey: "uuid",
        cell: (info) => (
          <Uuid uuid={info.getValue<tVehicleModelModel["uuid"]>()} />
        ),
      },
      {
        id: "vehicle-model",
        header: () => (
          <Heading
            title={tVehicleModels("table.vehicle-model.header")}
          ></Heading>
        ),
        accessorFn: (row) => ({
          name: row.name,
          description: row.description,
          manufacturer: row.manufacturer,
          modelYear: row.modelYear,
        }),

        cell: (info) => {
          const { name, description, modelYear, manufacturer } =
            info.getValue<
              Pick<
                tVehicleModelModel,
                "name" | "description" | "modelYear" | "manufacturer"
              >
            >();

          return (
            <VehicleModel
              title={name}
              description={description}
              modelYear={modelYear}
              manufacturer={manufacturer}
            />
          );
        },
      },
      {
        id: "specs",
        header: () => <Heading title={tVehicleModels("table.specs.header")} />,
        accessorFn: (row) => ({
          capacity: row.capacity,
          transmission: row.transmission,
          fuel: row.fuel,
        }),
        cell: (info) => {
          const { capacity, transmission, fuel } =
            info.getValue<
              Pick<tVehicleModelModel, "capacity" | "transmission" | "fuel">
            >();

          return (
            <Specs
              capacity={capacity}
              transmission={transmission}
              fuel={fuel}
            />
          );
        },
      },
      {
        header: () => <Heading title={tVehicleModels("table.colors.header")} />,
        accessorKey: "colors",
        cell: (info) => (
          <Colors colors={info.getValue<tVehicleModelModel["colors"]>()} />
        ),
      },
      {
        id: "price",
        header: () => <Heading title={tVehicleModels("table.price.header")} />,
        accessorFn: (row) => ({
          price: row.price,
          discount: row.discount,
        }),
        cell: (info) => {
          const { price, discount } =
            info.getValue<Pick<tVehicleModelModel, "price" | "discount">>();

          return <Price price={price} discount={discount} />;
        },
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.discount.header")} />
        ),
        accessorKey: "discount",
        cell: (info) => {
          const discount = info.getValue<tVehicleModelModel["discount"]>();

          return <Discount discount={discount} />;
        },
      },
      {
        header: () => <Heading title={tVehicleModels("table.status.header")} />,
        accessorKey: "status",
        cell: (info) => {
          const status = info.getValue<tVehicleModelModel["status"]>();
          return <Status status={status} />;
        },
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.updated-at.header")} />
        ),
        accessorKey: "updatedAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["updatedAt"]>())}
          />
        ),
      },
      {
        header: () => (
          <Heading title={tVehicleModels("table.created-at.header")} />
        ),
        accessorKey: "createdAt",
        cell: (info) => (
          <Time
            date={new Date(info.getValue<tVehicleModelModel["createdAt"]>())}
          />
        ),
      },
      {
        id: "action",
        header: () => <Heading title={tVehicleModels("table.action.header")} />,
        cell: (info) => <Action vehicleModel={info.row.original} />,
      },
    ];
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TabsContent value={tVehicleModels("label")}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn({
                    "max-w-86": cell.column.id === "vehicle-model",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TabsContent>
  );
}

type tHeadingProps = {
  title: string;
};
function Heading({ title }: tHeadingProps) {
  return <h2 className="text-lg">{title}</h2>;
}

type tUuidProps = {
  uuid: tVehicleModelModel["uuid"];
};
function Uuid({ uuid }: tUuidProps) {
  return <Badge variant="muted">{uuid.slice(0, 8)}</Badge>;
}

type tVehicleModelProps = {
  title: tVehicleModelModel["name"];
  description: tVehicleModelModel["description"];
  modelYear: tVehicleModelModel["modelYear"];
  manufacturer: tVehicleModelModel["manufacturer"];
};
function VehicleModel({
  title,
  description,
  modelYear,
  manufacturer,
}: tVehicleModelProps) {
  return (
    <div>
      <span className="flex items-center gap-3">
        <ShadcnBadge variant="outline">{manufacturer}</ShadcnBadge>
        <h3 className="text-base">
          {title} {modelYear}
        </h3>
      </span>
      <p className="text-muted-foreground truncate">
        {description}
        {description}
      </p>
    </div>
  );
}

type tSpecsProps = {
  capacity: tVehicleModelModel["capacity"];
  transmission: tVehicleModelModel["transmission"];
  fuel: tVehicleModelModel["fuel"];
};
function Specs({ capacity, transmission, fuel }: tSpecsProps) {
  const tSpecs = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.specs.cell",
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <LuUsers size={16} />
          {tSpecs("capacity", {
            capacity: capacity,
          })}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuDot size={16} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <LuActivity size={16} />
          {tSpecs("transmission", {
            transmission: transmission,
          })}
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <LuDot size={16} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <LuFuel size={16} />
          {tSpecs("fuel", {
            fuel: fuel,
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type tColorsProps = {
  colors: tVehicleModelModel["colors"];
};
function Colors({ colors }: tColorsProps) {
  return (
    <ul className="flex gap-1.5">
      {colors.map((color) => (
        <li
          key={color.uuid}
          style={{
            background: `color-mix(in oklab, ${color.hexCode} 20%, transparent)`,
            color: color.hexCode,
          }}
          className="flex items-center justify-center rounded p-1 text-xs font-medium"
        >
          {color.name.split(" ").map((chunk) => chunk.at(0))}
        </li>
      ))}
    </ul>
  );
}

type tPriceProps = {
  price: tVehicleModelModel["price"];
  discount: tVehicleModelModel["discount"];
};
function Price({ price, discount }: tPriceProps) {
  const tPrice = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.price",
  );
  const locale = useLocale() as eLocale;
  const monyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  return discount === 0 ? (
    <span>
      {tPrice.rich("cell", {
        price: monyFormatter.format(price - discount),
        span: (chunk) => (
          <span className="text-muted-foreground text-xs">{chunk}</span>
        ),
      })}
    </span>
  ) : (
    <span className="flex flex-col">
      <del className="text-muted-foreground">{monyFormatter.format(price)}</del>
      <ins className="no-underline">
        {tPrice.rich("cell", {
          price: monyFormatter.format(price - discount),
          span: (chunk) => (
            <span className="text-muted-foreground text-xs">{chunk}</span>
          ),
        })}
      </ins>
    </span>
  );
}

type tDiscountProps = {
  discount: tVehicleModelModel["discount"];
};
function Discount({ discount }: tDiscountProps) {
  const locale = useLocale() as eLocale;
  const monyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  return (
    <span
      className={cn("inline-flex w-full items-center gap-1", {
        "text-blue-500": discount === 0,
        "text-emerald-500": discount !== 0,
      })}
    >
      {monyFormatter.format(discount)}
      <MdOutlineDiscount size={16} />
    </span>
  );
}

type tStatusProps = {
  status: tVehicleModelModel["status"];
};
function Status({ status }: tStatusProps) {
  const tStatus = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.status",
  );

  return (
    <Badge
      variant={status === eVehicleModelStatusModel.active ? "success" : "muted"}
      className="flex items-center gap-1"
    >
      {status === eVehicleModelStatusModel.active ? (
        <LuCircleCheck />
      ) : (
        <LuCircleX />
      )}
      {tStatus("cell", {
        status: status,
      })}
    </Badge>
  );
}

type tTimeProps = {
  date: Date;
};
function Time({ date }: tTimeProps) {
  const locale = useLocale() as eLocale;
  const dateFormatter = new ClsDateFormatter(locale);

  const formattedDate = dateFormatter.format(date);

  return <time dateTime={formattedDate}>{formattedDate}</time>;
}

type tActionProps = {
  vehicleModel: tVehicleModelModel;
};
function Action({ vehicleModel }: tActionProps) {
  const tAction = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.table.action.cell",
  );

  return (
    <DropdownMenu>
      <div className="flex w-full">
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="View, edit and delete"
            variant="ghost"
            size="icon"
            className="ms-auto"
          >
            <LuEllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button className="size-full">
            <LuBookOpenText />
            {tAction("view.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button className="size-full text-blue-500! hover:bg-blue-500/10!">
            <LuPenLine className="text-blue-500" />
            {tAction("edit.label")}
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <button className="size-full">
            <LuTrash2 />
            {tAction("delete.label")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
