// pages/N.AdminDashboard/Clients/types.ts
export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type Client = {
  id: number;
  logo?: string;
  businessName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  address: Address;
  shippingAddresses: Address[];
  attachments: string[];
  dateAdded: string; // MM/DD/YYYY
};

export type ClientDisplayKeys = "businessName" | "email" | "phone" | "dateAdded";
