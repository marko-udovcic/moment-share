import { useState, useEffect, useMemo, useCallback } from "react";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useDiscoverUsers } from "../../../hooks/useDiscoverUsers";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useShuffledUsers } from "../../profile/hooks/useShuffledUsers";
import { useFollowUser } from "../../../hooks/useFollowUser";
import { NavLink } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce"; // Import debounce hook

function ListRecommendedUsers() {
  const { currentUser } = useProfileStore();
  const { discoverUsers, isLoading } = useDiscoverUsers(currentUser?.id);
  const [isShuffled, setIsShuffled] = useState(false);
  const [followedUsers, setFollowedUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { followUser } = useFollowUser();
  const debouncedSearchQuery = useDebounce(searchQuery);

  const shuffleDiscoverUsers = useCallback(() => {
    setIsShuffled((prev) => !prev);
  }, []);

  const filteredUsers = useMemo(
    () =>
      discoverUsers.filter((user) =>
        user.username.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      ),
    [discoverUsers, debouncedSearchQuery],
  );

  const shuffledUsers = useShuffledUsers(filteredUsers, isShuffled ? 100 : 80);

  const handleFollowUser = useCallback(
    (user) => {
      followUser({ followerId: currentUser.id, followingId: user.id });
      setFollowedUsers((prev) => ({
        ...prev,
        [user.id]: !prev[user.id],
      }));
    },
    [currentUser.id, followUser],
  );

  useEffect(() => {
    setIsShuffled(true);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-32 text-white text-xl">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search users"
        />
      </div>

      <h2 className="text-white text-xl mb-5">People you may know</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledUsers.map((user) => (
          <NavLink key={user.id} to={`/user/${user.id}/${user.username}`}>
            <Card className="bg-slate-800 w-full h-64 flex items-center justify-center flex-col rounded-lg relative text-white">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  shuffleDiscoverUsers();
                }}
                className="text-[2rem] absolute top-0 right-3 text-gray-400"
                aria-label="Shuffle users"
              >
                &times;
              </Button>

              <div className="w-[6rem] h-[6rem] rounded-full bg-blue-500 flex justify-center items-center">
                <h2 className="text-4xl uppercase font-bold">{user.username[0]}</h2>
              </div>

              <h3 className="text-xl m-5">{user.username}</h3>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleFollowUser(user);
                }}
                className={`p-2 w-[90%] absolute bottom-5 rounded-md font-semibold ${
                followedUsers[user.id]
                    ? "bg-transparent hover:bg-transparent"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={followedUsers[user.id]}
              >
                {followedUsers[user.id] ? "Following" : "Follow"}
              </Button>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ListRecommendedUsers;
