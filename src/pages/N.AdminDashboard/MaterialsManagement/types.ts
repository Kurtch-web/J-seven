export type MaterialStatus = "Approved" | "Pending" | "Rejected";

export type Material = {
  id: number;
  name: string;
  spec: string;
  price: string;
  supplier: string;
  category: string;
  image?: string;
  stockDate: string; // YYYY-MM-DD
  creator: string;
  status: MaterialStatus;
  availableStock: number;
};
