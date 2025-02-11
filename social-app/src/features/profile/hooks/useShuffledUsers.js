import { useEffect, useState } from "react";
import { shuffleUsers } from "../../../utils/arrayUtils";
export function useShuffledUsers(discoverUsers, n = 6) {
  const [listShuffledUsers, setListShuffledUsers] = useState([]);
  useEffect(() => {
    if (discoverUsers && discoverUsers.length > 0) {
      const shuffledUsers = shuffleUsers(discoverUsers).slice(0, n);
      setListShuffledUsers(shuffledUsers);
    }
  }, [discoverUsers, n]);
  return listShuffledUsers;
}
