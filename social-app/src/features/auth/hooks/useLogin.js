import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileStore } from "../../../context/zustand/useProfileStore"; // importuj Zustand store

export function useLogin() {
  const query = useQueryClient();
  const navigate = useNavigate();
  const setCurrentUser = useProfileStore((state) => state.setCurrentUser);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      const currentUser = user.user
        ? {
            username: user.user.user_metadata?.username || "No username",
            email: user.user.email,
            id: user.user.id,
          }
        : null;
      query.setQueryData(["currentUser"], currentUser);

      setCurrentUser(currentUser);

      navigate("/profile", { replace: true });
    },
    onError: (err) => {
      console.log("Error from login:", err);
    },
  });

  return { login, isLoading };
}
