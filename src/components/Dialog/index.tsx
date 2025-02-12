import {
  Dialog as DialogShadcn,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogProps as DialogShadcnProps } from "@radix-ui/react-dialog";

interface DialogProps extends DialogShadcnProps {
  title: string;
  children: React.ReactNode;
}

export const Dialog = ({ title, children, ...props }: DialogProps) => {
  return (
    <DialogShadcn {...props}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogDescription></DialogDescription>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogShadcn>
  );
};
