import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NotificationSettings() {
  const [notificationTypes, setNotificationTypes] = useState({
    systemAlerts: true,
    quotationUpdates: true,
    orderUpdates: true,
    promotional: false,
  });

  const [frequency, setFrequency] = useState("realtime");

  const handleToggle = (key: keyof typeof notificationTypes) => {
    setNotificationTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Notification preferences saved ✅");
    console.log({ notificationTypes, frequency });
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Notification Settings
        </h2>

        {/* Notification Types */}
        <div className="space-y-4 bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-2">Email Preferences</h3>
          <div className="flex items-center justify-between">
            <Label>System Alerts</Label>
            <Switch
              checked={notificationTypes.systemAlerts}
              onCheckedChange={() => handleToggle("systemAlerts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Quotation Updates</Label>
            <Switch
              checked={notificationTypes.quotationUpdates}
              onCheckedChange={() => handleToggle("quotationUpdates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Order Updates</Label>
            <Switch
              checked={notificationTypes.orderUpdates}
              onCheckedChange={() => handleToggle("orderUpdates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Promotional Updates</Label>
            <Switch
              checked={notificationTypes.promotional}
              onCheckedChange={() => handleToggle("promotional")}
            />
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-4 bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-2">Notification Frequency</h3>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="realtime" id="realtime" />
              <Label htmlFor="realtime">Real-time (Immediate)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily Digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly Summary</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
