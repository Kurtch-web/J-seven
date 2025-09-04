import React from "react";
import jsevenLogo from "@/assets/images/jseven.png";

interface CompanyHeaderProps {
  headerColor?: string;
  quoteNo?: string;
  date?: string;
  companyName?: string;
}

export default function CompanyHeader({
  headerColor = "#0f172a", // default dark slate
  quoteNo = "",
  date = "",
  companyName = "JSEVEN",
}: CompanyHeaderProps) {
  return (
    // use inline style for background color so it always wins over Tailwind classes
    <div
      className="rounded-md overflow-hidden"
      style={{ backgroundColor: headerColor }}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={jsevenLogo}
              alt="JSEVEN Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="text-white">
              <div className="text-lg font-bold">{companyName}</div>
              <div className="text-sm opacity-90">
                2nd Floor Unit-3 Blk 74 Lot 8, C. Arellano, Katarungan Village,
                Muntinlupa
              </div>
              <div className="text-sm opacity-90">
                Tel: (02) 7000 2618 | 0920 804 3301
              </div>
              <div className="text-sm opacity-90">
                Email: jseven@engservices.net
              </div>
            </div>
          </div>

          <div className="text-right text-white">
            <div className="text-sm">
              <span className="opacity-90">Date:</span>{" "}
              <span className="font-semibold">{date || "—"}</span>
            </div>
            <div className="text-sm">
              <span className="opacity-90">Quote No.:</span>{" "}
              <span className="font-semibold">{quoteNo || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
