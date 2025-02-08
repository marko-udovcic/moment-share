import { useEffect, useState } from "react";
import { shuffleUsers } from "../../../utils/arrayUtils";
export function useShuffledUsers(discoverUsers) {
  const [listShuffledUsers, setListShuffledUsers] = useState([]);
  useEffect(() => {
    if (discoverUsers && discoverUsers.length > 0) {
      const shuffledUsers = shuffleUsers(discoverUsers).slice(0, 6);
      setListShuffledUsers(shuffledUsers);
    }
  }, [discoverUsers]);
  return listShuffledUsers;
}
