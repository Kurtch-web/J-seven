import { Button } from "@/components/ui/button";

export default function StoreHeader({ onBack }: { onBack: () => void }) {
  return (
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
  );
}
