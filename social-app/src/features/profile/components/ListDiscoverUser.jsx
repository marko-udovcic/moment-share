import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { shuffleUsers } from "../../../utils/arrayUtils";
import { addFollowingUser, deleteUser } from "../../../services/userService";
import { useProfile } from "../../../context/ProfileContext";
import { Autoplay } from "swiper/modules";

export default function ListDiscoverUser({ listDiscoverUsers, setListDiscoverUsers }) {
  const { fetchUsers, fetchData } = useProfile();
  const queryClient = useQueryClient();

  function handleSuccess(queryKey) {
    return () => {
      queryClient.invalidateQueries([queryKey]);
      fetchUsers();
    };
  }
  const addUserMutation = useMutation({
    mutationFn: addFollowingUser,
    onSuccess: handleSuccess("users"),
  });
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: handleSuccess("users"),
  });

  function handleRemoveDiscoverUser(userId) {
    setListDiscoverUsers((listDiscoverUsers) => listDiscoverUsers.filter((user) => user.id !== userId));
  }
  function handleFollowUser(user) {
    addUserMutation.mutate(user);
    handleRemoveDiscoverUser(user.id);
    deleteUserMutation.mutate(user.id);
  }
  useEffect(() => {
    fetchData("/allusers", setListDiscoverUsers);
  }, []);
  listDiscoverUsers = shuffleUsers(listDiscoverUsers).slice(0, 6);

  return (
    <section className="mx-[1rem] md:mx-[3rem] mb-4 h-14 min-h-[18rem] relative lg:p-4">
      {listDiscoverUsers.length === 0 ? (
        <div className="text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Currently, there are no recommended users.
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
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
                  "bg-gray-700 w-full h-64 flex items-center justify-center flex-col rounded-lg relative text-white "
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
