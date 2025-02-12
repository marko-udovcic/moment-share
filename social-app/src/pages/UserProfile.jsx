import Nav from "../components/Nav";
import Header from "../components/Header";
import { useProfileUser } from "../features/explore/hooks/useProfileUser";
import { useProfileStore } from "../context/zustand/useProfileStore";
import { useEffect } from "react";
import ListCards from "../components/ListCards";
function UserProfile() {
  const profileUser = useProfileUser();
  const { resetProfile } = useProfileStore();

  useEffect(() => {
    return () => {
      resetProfile();
    };
  }, [resetProfile]);
  return (
    <>
      <Nav />
      <Header profileUser={profileUser} />
      <ListCards />
    </>
  );
}

export default UserProfile;
