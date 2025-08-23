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

export default function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-400 hover:underline">
        Terms of Service
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow-lg max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-700 space-y-3 max-h-[50vh] overflow-y-auto">
          <p>
            Welcome to JSEVEN. By using our platform, you agree to abide by these
            Terms of Service. Please read carefully.
          </p>
          <p>1. Users must provide accurate information when signing up.</p>
          <p>2. Unauthorized use of this system is strictly prohibited.</p>
          <p>3. JSEVEN reserves the right to update terms at any time.</p>
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
