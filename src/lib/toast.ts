import { ExternalToast, toast } from "sonner";

const defaultOptions: ExternalToast = {
  classNames: { title: "text-sm" },
  className: "shadow-lg",
  position: "bottom-center",
};

const createToast = (
  type: "success" | "error",
  text: string,
  props?: ExternalToast
) => {
  toast[type](text, {
    ...defaultOptions,
    className: `${defaultOptions.className} ${
      type === "success" ? "text-emerald-700" : "text-red-700"
    }`,
    ...props,
  });
};

export const toastSuccess = (text: string, props?: ExternalToast) =>
  createToast("success", text, props);

export const toastError = (text: string, props?: ExternalToast) =>
  createToast("error", text, props);
