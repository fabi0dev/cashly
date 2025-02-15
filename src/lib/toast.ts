import { ExternalToast, toast } from "sonner";

const optionsDefault = {
  classNames: {
    title: "text-sm",
  },
  className: "shadow-md",
};

export const toastSuccess = (text: string, props?: ExternalToast) => {
  toast.success(text, {
    ...optionsDefault,
    className: "text-ax-success-dark",
    ...props,
  });
};

export const toastError = (text: string, props?: ExternalToast) => {
  toast.error(text, {
    ...optionsDefault,
    className: "text-ax-error",
    ...props,
  });
};
