import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileStore } from "../../../context/zustand/useProfileStore";

export function useProfileUser() {
  const { id, username } = useParams();
  const { setUserProfile } = useProfileStore();

  const profileUser = useMemo(() => ({ id, username }), [id, username]);

  useEffect(() => {
    if (id && username) {
      setUserProfile(profileUser);
    }
  }, [profileUser, setUserProfile, id, username]);

  return profileUser;
}
