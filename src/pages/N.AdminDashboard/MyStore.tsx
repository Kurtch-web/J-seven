import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const handleAttachments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleBusinessHoursChange = (day: string, value: string) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: value,
    }));
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
        {/* LEFT COLUMN */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
          {/* Store Name */}
          <div>
            <h4 className="text-md font-bold mb-2 text-white">Store Name</h4>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
          </div>

          {/* Store Logo */}
          <div>
            <h4 className="text-md font-bold mb-2 text-white">Store Logo</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 
                         file:rounded file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
          </div>

          {/* Accordion Sections */}
          <Accordion type="single" collapsible className="w-full">
            {/* Tax Info */}
            <AccordionItem value="tax">
              <AccordionTrigger>Tax Information</AccordionTrigger>
              <AccordionContent>
                <label className="block mb-1 text-sm font-semibold text-slate-300">
                  VAT Number
                </label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                />
              </AccordionContent>
            </AccordionItem>

            {/* Address */}
            <AccordionItem value="address">
              <AccordionTrigger>Address</AccordionTrigger>
              <AccordionContent>
                {[
                  { label: "Street Address", value: streetAddress, setValue: setStreetAddress },
                  { label: "City / Town", value: city, setValue: setCity },
                  { label: "State / Province", value: state, setValue: setState },
                  { label: "Postal / Zip Code", value: postalCode, setValue: setPostalCode },
                ].map((field, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block mb-1 text-sm font-semibold text-slate-300">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Additional Details */}
            <AccordionItem value="details">
              <AccordionTrigger>Additional Details</AccordionTrigger>
              <AccordionContent>
                {[
                  { label: "Display Name", type: "text", value: displayName, setValue: setDisplayName },
                  { label: "Email", type: "email", value: email, setValue: setEmail },
                  { label: "Phone Number", type: "tel", value: phone, setValue: setPhone },
                ].map((field, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block mb-1 text-sm font-semibold text-slate-300">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Business Hours */}
            <AccordionItem value="hours">
              <AccordionTrigger>Business Hours</AccordionTrigger>
              <AccordionContent>
                {Object.entries(businessHours).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center gap-2 mb-2">
                    <span className="text-slate-300 w-28">{day}</span>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
                      className="flex-1 p-2 rounded bg-slate-900 border border-slate-600 text-white"
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Attachments */}
            <AccordionItem value="attachments">
              <AccordionTrigger>Attachments</AccordionTrigger>
              <AccordionContent>
                <input
                  type="file"
                  multiple
                  onChange={handleAttachments}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 
                             file:rounded file:border-0 file:text-sm file:font-semibold
                             file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                />
                {attachments.length > 0 && (
                  <ul className="mt-2 text-sm text-slate-400 space-y-1">
                    {attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Save Changes */}
          <Button
            onClick={() => alert("Changes saved!")}
            className="bg-orange-500 hover:bg-orange-600 text-white mt-4 w-full"
          >
            Save Changes
          </Button>
        </div>

        {/* RIGHT COLUMN - PREVIEW */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center text-center">
            {logo ? (
              <img
                src={logo}
                alt="Store Logo"
                className="w-20 h-20 rounded-full object-cover border border-slate-600"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {storeName.charAt(0).toUpperCase()}
              </div>
            )}
            <h3 className="mt-4 text-xl font-bold text-white">{storeName}</h3>
            <p className="text-slate-400">{displayName || "No display name set"}</p>
          </div>

          <div className="border-t border-slate-700 pt-4 space-y-2 text-slate-300 text-sm">
            <p><strong>Email:</strong> {email || "Not provided"}</p>
            <p><strong>Phone:</strong> {phone || "Not provided"}</p>
            <p><strong>Address:</strong> {streetAddress} {city} {state} {postalCode}</p>
            <p><strong>VAT:</strong> {vatNumber || "Not provided"}</p>
          </div>

          {/* Business Hours Preview */}
          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-white font-semibold mb-2">Business Hours</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              {Object.entries(businessHours).map(([day, time]) => (
                <li key={day}>
                  <strong>{day}:</strong> {time}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-slate-700 pt-4 space-y-2 text-slate-300 text-sm">
            <p><strong>Uploaded Materials:</strong> 128</p>
            <p><strong>Approved Materials:</strong> 104</p>
            <p><strong>Active Quotations:</strong> 6</p>
            <p><strong>Member Since:</strong> Jan 2024</p>
          </div>

          {attachments.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <h4 className="text-white font-semibold mb-2">Attachments</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                {attachments.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
