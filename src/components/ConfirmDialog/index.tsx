import {
  Dialog as DialogShadcn,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogProps as DialogShadcnProps } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface ConfirmDialogProps extends DialogShadcnProps {
  title: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmDialog = ({
  title,
  description,
  confirmText = "Sim",
  cancelText = "Não",
  onConfirm,
  onCancel,
  ...props
}: ConfirmDialogProps) => {
  return (
    <DialogShadcn {...props}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex justify-center gap-5 mt-4">
          <Button variant="outline" onClick={onCancel} className="px-10">
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="px-10">
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </DialogShadcn>
  );
};
