import { useEffect, useState } from "react";
import { getCurrentUser } from "../../auth/services/apiAuth";

export function useCurrentUser() {
  const [user, setUser] = useState(null); // Stores the user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const fetchedUser = await getCurrentUser();
        if (fetchedUser) {
          setUser({
            username: fetchedUser.user_metadata.username,
            email: fetchedUser.email,
            id: fetchedUser.id,
          });
        }
      } catch (err) {
        console.error("Error during loading user:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return { user, loading };
}
