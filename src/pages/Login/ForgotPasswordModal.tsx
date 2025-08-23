import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecoveryForm from "./RecoveryForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-md rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Password Recovery</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Choose a method below to recover or reset your password.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="recovery" className="mt-6 w-full">
          <TabsList className="grid grid-cols-2 w-full bg-slate-800 rounded-lg p-1">
            <TabsTrigger
              value="recovery"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white 
                         rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              Send Code
            </TabsTrigger>
            <TabsTrigger
              value="reset"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white 
                         rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              Reset Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recovery" className="mt-4">
            <RecoveryForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="reset" className="mt-4">
            <ResetPasswordForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
