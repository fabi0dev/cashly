import { ErrorOption } from "react-hook-form";

type FormErrorProps = {
  error?: ErrorOption;
};

export const FormError = ({ error }: FormErrorProps) => {
  if (!error?.message) return null;

  return <div className="text-red-400 text-xs mt-1">{error.message}</div>;
};
