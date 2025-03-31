import { toastError } from "@/lib/toast";
import { AuthUserWithGoogle } from "@/services/users";
import { useAuthStore } from "@/store/authStore";
import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSocialGoogleLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const navigate = useNavigate();
  const [isLoadingAuthGoogle, setIsLoadingAuthGoogle] = useState(false);

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      const token = response.credential;

      if (!token) {
        toastError("Token de autenticação não encontrado");
        return false;
      }

      setIsLoadingAuthGoogle(true);
      const responseAuth = await AuthUserWithGoogle(token);

      setAuthData({
        user: responseAuth.data.user,
        token: responseAuth.data.token,
      });

      navigate("/dashboard");
    } catch {
      toastError("Erro ao fazer login com o Google");
    } finally {
      setIsLoadingAuthGoogle(false);
    }
  };

  return {
    isLoadingAuthGoogle,
    handleSuccess,
  };
};
