import { useEffect, useState } from "react";
import { getCurrentUser } from "../../auth/services/apiAuth";
export function useCurrentUser() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function displayUserInfo() {
      try {
        const fetchedUser = await getCurrentUser();
        if (fetchedUser) {
          setUser({ username: fetchedUser.user_metadata.username, email: fetchedUser.email });
        }
      } catch (err) {
        console.error("Erorr during loading user:", err.message);
      }
    }

    displayUserInfo();
  }, []);
  return user;
}
