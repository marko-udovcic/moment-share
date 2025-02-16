import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../auth/services/apiAuth";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const { currentUser, setCurrentUser } = useProfileStore();
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  const { data: fetchedUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUser ? null : getCurrentUser,
    enabled: !currentUser,
    onError: (err) => {
      console.error("Error fetching current user:", err);
    },
  });

  useEffect(() => {
    if (fetchedUser) {
      setCurrentUser(fetchedUser);
      setIsAuthenticated(true);
    }
  }, [fetchedUser, setCurrentUser]);

  return { user: currentUser || fetchedUser, isLoading, isAuthenticated };
}
