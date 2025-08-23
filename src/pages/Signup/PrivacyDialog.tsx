import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-400 hover:underline">
        Privacy Policy
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow-lg max-w-lg">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-700 space-y-3 max-h-[50vh] overflow-y-auto">
          <p>JSEVEN values your privacy. This policy explains how we handle your personal data.</p>
          <p>- We collect only essential information for account creation and usage.</p>
          <p>- We do not sell or share your information with third parties without consent.</p>
          <p>- Users can request data deletion by contacting support.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
