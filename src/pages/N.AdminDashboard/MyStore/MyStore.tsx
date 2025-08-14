import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import StoreAccordionSections from "./StoreAccordionSections";
import StorePreview from "./StorePreview";




type Props = {
  onBack: () => void;
};

export default function MyStore({ onBack }: Props) {
  const [storeName, setStoreName] = useState("My Building Supplies Store");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [logo, setLogo] = useState<string | null>(null);

  const [businessHours, setBusinessHours] = useState({
    Monday: "9:00 AM - 6:00 PM",
    Tuesday: "9:00 AM - 6:00 PM",
    Wednesday: "9:00 AM - 6:00 PM",
    Thursday: "9:00 AM - 6:00 PM",
    Friday: "9:00 AM - 6:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <section className="font-manrope space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">My Store</h2>
        <Button
          variant="outline"
          onClick={onBack}
          className="border border-slate-600 text-white hover:bg-slate-800"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT COLUMN — Store Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
          
          {/* Store Name */}
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-white font-bold">
              Store Name
            </Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="bg-slate-900 border-slate-600 text-white"
              placeholder="Enter store name"
            />
          </div>

          {/* Store Logo */}
          <div className="space-y-2">
            <Label htmlFor="storeLogo" className="text-white font-bold">
              Store Logo
            </Label>
            <Input
              id="storeLogo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="cursor-pointer file:mr-4 file:py-2 file:px-4 
                         file:rounded file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
          </div>

          {/* Accordion Sections */}
          <StoreAccordionSections
            vatNumber={vatNumber}
            setVatNumber={setVatNumber}
            streetAddress={streetAddress}
            setStreetAddress={setStreetAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            displayName={displayName}
            setDisplayName={setDisplayName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            businessHours={businessHours}
            onBusinessHoursChange={(day, value) =>
              setBusinessHours((prev) => ({ ...prev, [day]: value }))
            }
            attachments={attachments}
            setAttachments={setAttachments}
          />

          {/* Save Button */}
          <Button
            onClick={() => alert("Changes saved!")}
            className="bg-orange-500 hover:bg-orange-600 text-white mt-4 w-full"
          >
            Save Changes
          </Button>
        </div>

        {/* RIGHT COLUMN — Store Preview */}
        <StorePreview
          storeName={storeName}
          displayName={displayName}
          email={email}
          phone={phone}
          streetAddress={streetAddress}
          city={city}
          state={state}
          postalCode={postalCode}
          vatNumber={vatNumber}
          logo={logo}
          attachments={attachments}
          businessHours={businessHours}
        />
      </div>
    </section>
  );
}
