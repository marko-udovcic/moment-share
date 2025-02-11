import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
function UserProfile() {
  const { id, username } = useParams();
  const profileUser = {
    id,
    username,
  };

  return (
    <>
      <Nav />
      <Header profileUser={profileUser} />
      <h1 className="text-white">{username}</h1>
    </>
  );
}

export default UserProfile;
