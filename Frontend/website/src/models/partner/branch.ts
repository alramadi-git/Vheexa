enum eBranchStatusModel {
  active,
  inactive,
}

type tBranchModel = {
  uuid: string;
  location: {
    country: string;
    city: string;
    street: string;
    latitude: number;
    longitude: number;
  };
  name: string;
  phoneNumber: string;
  email: string;
  memberCount: number;
  status: eBranchStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eBranchStatusModel };
export type { tBranchModel };
