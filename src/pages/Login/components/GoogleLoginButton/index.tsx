import { Button } from "@/components/ui/button";
import { useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import { useSocialGoogleLogin } from "./useSocialGoogleLogin";
import { jwtDecode } from "jwt-decode";

export const GoogleLoginButton = () => {
  const { handleSuccess } = useSocialGoogleLogin();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      // handleSuccess(response);
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => login()}
      className="border-gray-300 dark:border-gray-700"
    >
      <img src="/google.png" alt="Google" className="w-8 h-8" />
    </Button>
  );
};
