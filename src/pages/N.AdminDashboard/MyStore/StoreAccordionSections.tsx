// N.AdminDashboard/MyStore/StoreAccordionSections.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { StoreAccordionSectionsProps, DayName } from "./types";

export default function StoreAccordionSections({
  vatNumber,
  setVatNumber,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  state,
  setState,
  postalCode,
  setPostalCode,
  displayName,
  setDisplayName,
  email,
  setEmail,
  phone,
  setPhone,
  attachments,
  setAttachments,
  businessHours,
  onBusinessHoursChange,
}: StoreAccordionSectionsProps) {
  const handleAttachments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
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
                onChange={(e) => onBusinessHoursChange(day as DayName, e.target.value)}
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
  );
}
