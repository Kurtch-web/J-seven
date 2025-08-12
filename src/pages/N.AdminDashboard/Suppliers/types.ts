// pages/N.AdminDashboard/Suppliers/types.ts

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

export type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
};

export type Supplier = {
  id: number;
  logo?: string;
  businessName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  address: Address;
  bankDetails: BankDetails;
  attachments: string[]; // base64 images
  dateAdded: string; // MM/DD/YYYY
};

export type SupplierDisplayKeys = "businessName" | "email" | "phone" | "dateAdded";
