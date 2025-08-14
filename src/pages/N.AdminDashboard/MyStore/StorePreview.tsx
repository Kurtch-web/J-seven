import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  storeName: string;
  displayName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  vatNumber: string;
  logo: string | null;
  attachments: File[];
  businessHours: Record<string, string>;
};

export default function StorePreview(props: Props) {
  return (
    <Card className="bg-slate-800 border-slate-700 text-white">
      <CardHeader>
        <div className="flex flex-col items-center text-center">
          {props.logo ? (
            <img
              src={props.logo}
              alt="Store Logo"
              className="w-20 h-20 rounded-full object-cover border border-slate-600"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {props.storeName.charAt(0).toUpperCase()}
            </div>
          )}
          <CardTitle className="mt-4">{props.storeName}</CardTitle>
          <p className="text-slate-400">{props.displayName || "No display name set"}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-slate-300">
        {/* Contact Info */}
        <div className="space-y-1">
          <p><strong>Email:</strong> {props.email || "Not provided"}</p>
          <p><strong>Phone:</strong> {props.phone || "Not provided"}</p>
          <p><strong>Address:</strong> {props.streetAddress} {props.city} {props.state} {props.postalCode}</p>
          <p><strong>VAT:</strong> {props.vatNumber || "Not provided"}</p>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="font-semibold text-white mb-2">Business Hours</h4>
          <ul className="space-y-1">
            {Object.entries(props.businessHours).map(([day, time]) => (
              <li key={day}>
                <strong>{day}:</strong> {time}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-slate-700 pt-3 space-y-1">
          <p><strong>Uploaded Materials:</strong> 128</p>
          <p><strong>Approved Materials:</strong> 104</p>
          <p><strong>Active Quotations:</strong> 6</p>
          <p><strong>Member Since:</strong> Jan 2024</p>
        </div>

        {/* Attachments */}
        {props.attachments.length > 0 && (
          <div className="border-t border-slate-700 pt-3">
            <h4 className="font-semibold text-white mb-1">Attachments</h4>
            <ul className="space-y-1">
              {props.attachments.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
