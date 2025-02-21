import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useDiscoverUsers } from "../../../hooks/useDiscoverUsers";
import { useEffect, useState } from "react";
import { useFollowUser } from "../../../hooks/useFollowUser";
import { useShuffledUsers } from "../hooks/useShuffledUsers";

export default function ListDiscoverUser() {
  const [listDiscoverUsers, setListDiscoverUsers] = useState([]);
  const { currentUser } = useProfileStore();
  const { discoverUsers, isLoading } = useDiscoverUsers(currentUser?.id);
  const listShuffledUsers = useShuffledUsers(discoverUsers);
  const { followUser } = useFollowUser();

  function handleRemoveDiscoverUser(userId) {
    setListDiscoverUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }
  function handleFollowUser(user) {
    followUser({ followerId: currentUser.id, followingId: user.id });
    handleRemoveDiscoverUser(user.id);
  }

  useEffect(() => {
    setListDiscoverUsers(listShuffledUsers);
  }, [listShuffledUsers]);

  if (isLoading) return <div>Loading</div>;

  return (
    <section className="mx-[1rem] md:mx-[3rem] mb-4 h-14 min-h-[18rem] relative lg:p-4">
      {listDiscoverUsers.length === 0 ? (
        <div className="text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Currently, there are no recommended users.
        </div>
      ) : (
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {listDiscoverUsers.map((user) => (
            <SwiperSlide
              key={user.id}
              className="mr-5 cursor-pointer lg:mr-8 transform transition-transform duration-500 ease-out will-change-transform"
            >
              <Card
                className={
                  "bg-slate-800 w-full h-64 flex items-center justify-center flex-col rounded-lg relative text-white "
                }
              >
                <Button
                  className="text-[2rem] absolute top-0 right-3 text-gray-400"
                  onClick={() => {
                    handleRemoveDiscoverUser(user.id);
                  }}
                >
                  &times;
                </Button>
                <div className="w-[6rem] h-[6rem] rounded-full relative bg-blue-500 flex justify-center items-center">
                  <h2 className="text-4xl uppercase font-bold">{user.username[0]}</h2>
                </div>
                <h3 className="text-xl m-5">{user.username}</h3>
                <Button
                  className="bg-blue-500 p-2 w-1/2 absolute bottom-5 rounded-md hover:bg-blue-600 font-semibold"
                  onClick={() => {
                    handleFollowUser(user);
                  }}
                >
                  Follow
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

ListDiscoverUser.propTypes = {
  listDiscoverUsers: PropTypes.array,
  setListDiscoverUsers: PropTypes.func,
};
