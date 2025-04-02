import {
  Dialog as DialogShadcn,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogProps as DialogShadcnProps } from "@radix-ui/react-dialog";
import { Spinner } from "../Spinner";

interface DialogProps extends DialogShadcnProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  description?: string;
}

export const Dialog = ({
  title,
  children,
  isLoading,
  description,
  ...props
}: DialogProps) => {
  return (
    <DialogShadcn {...props}>
      <DialogContent>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-950/50 z-50">
            <Spinner />
          </div>
        )}
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </DialogShadcn>
  );
};
