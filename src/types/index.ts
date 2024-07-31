

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;
}

export interface Customer {
  id: string;
  pan: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  addresses: Address[];
}
