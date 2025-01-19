import Button from "../../../components/ui/Button";
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../hooks/useLogout";

function Logout() {
  const { logout } = useLogout();

  return (
    <Button onClick={logout}>
      <LuLogOut className="w-8 h-10" />
    </Button>
  );
}

export default Logout;
