// N.AdminDashboard/MyStore/types.ts
export type DayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface StoreAccordionSectionsProps {
  vatNumber: string;
  setVatNumber: React.Dispatch<React.SetStateAction<string>>;
  streetAddress: string;
  setStreetAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  businessHours: Record<DayName, string>;
  onBusinessHoursChange: (day: DayName, value: string) => void;
}

export interface StoreFormProps extends StoreAccordionSectionsProps {
  storeName: string;
  setStoreName: React.Dispatch<React.SetStateAction<string>>;
  logo: string | null;
  setLogo: React.Dispatch<React.SetStateAction<string | null>>;
}
