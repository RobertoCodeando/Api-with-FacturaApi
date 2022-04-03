type CommonUser = {
  legal_name: string;
  email: string;
  tax_id: string;
  tax_system: string;
};

export type CreateUser = CommonUser & {
  zip: string;
};

export type Address = {
  street: string;
  interior: string;
  exterior: string;
  country: string;
  zip: string;
  city: string;
  municipality: string;
  state: string;
};

export type UserDetail = CommonUser & {
  address: Address;
  organization: string;
  created_at: string;
  livemode: boolean;
  id: string;
};

export type GetUserDetail = {
  page: number;
  total_pages: number;
  total_results: number;
  data: UserDetail[];
};

export type UpdateUserResponse = {
  msg: string;
  data: UserDetail;
};
