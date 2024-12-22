import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../components/Card";
import Button from "../components/Button";
const users = [
  { id: 1, name: "User1", bgColor: "bg-gray-700" },
  { id: 2, name: "User2", bgColor: "bg-blue-400" },
  { id: 3, name: "User3", bgColor: "bg-green-400" },
  { id: 4, name: "User4", bgColor: "bg-yellow-400" },
  { id: 5, name: "User5", bgColor: "bg-purple-400" },
  { id: 6, name: "User6", bgColor: "bg-orange-400" },
];

export default function Explore() {
  return (
    <div className="text-white m-5 p-2">
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {users.map((user) => (
          <SwiperSlide key={user.id} className="cursor-pointer">
            <Card
              className={
                "bg-gray-700 w-full h-64 flex items-center justify-center flex-col rounded-lg relative"
              }
            >
              <div className="text-[2rem] absolute top-0 right-3 text-gray-400">&times;</div>
              <h3 className="text-xl">{user.name}</h3>
              <Button className="bg-blue-500 p-2 w-1/2 absolute bottom-7 rounded-md hover:bg-blue-600 font-semibold">
                Follow
              </Button>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
