import { SystemConfig } from "@/constants/SystemConfig";
import { useEffect } from "react";

interface UsePageTitleProps {
  title?: string;
}

export const usePageTitle = ({ title }: UsePageTitleProps): void => {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SystemConfig.title}`
      : SystemConfig.title;
  }, [title]);
};
