import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../auth/services/apiAuth";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const setCurrentUser = useProfileStore((state) => state.setCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    onError: (err) => {
      console.error("Error fetching current user:", err);
    },
  });

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
      setIsAuthenticated(true);
    }
  }, [currentUser, setCurrentUser]);

  return { user: currentUser, isLoading, isAuthenticated };
}
