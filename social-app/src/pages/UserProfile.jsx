import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  return <div className="text-white">UserProfile id : {id}</div>;
}

export default UserProfile;
