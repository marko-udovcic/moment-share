import { RxDotsVertical } from "react-icons/rx";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { useProfile } from "../context/ProfileContext";
import { getLuminance } from "../utils/colorUtils";
import Reveal from "./ui/Reveal";
export default function ListCards() {
  const { listMoments, fetchData, setListMoments } = useProfile();
  const filteredListMoments = listMoments.filter((moment) => moment.username === "m.udovcic");

  async function deleteMoment(id, url) {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    } else {
      fetchData("/posts", setListMoments);
      console.log("Successfully deleted");
    }
  }
  function handleRemoveMoment(id) {
    const confirm = window.confirm("are you sure you want remove moment");
    if (!confirm) return;
    deleteMoment(id, "/posts");
  }

  return (
    <div
      className="z-0 m-auto mx-3 grid min-h-[50vh] grid-cols-1 gap-10 rounded-lg sm:grid-cols-2 md:mx-10 md:grid-cols-3
        lg:grid-cols-4 lg:p-5"
    >
      {filteredListMoments && filteredListMoments.length > 0 ? (
        filteredListMoments.map((moment) => {
          const textColor = getLuminance(moment.color) > 128 ? "text-black" : "text-white";
          const date = moment.created_at.split(" ")[0];

          return (
            <Card
              key={moment.id}
              className={`relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[4px] p-3 text-center ${textColor} `}
              style={{ backgroundColor: moment.color }}
            >
              <Button
                onClick={() => handleRemoveMoment(moment.id)}
                className={
                  "mt-3 self-end p-1 transition duration-300 font-semibold text-white bg-[#000000] bg-opacity-30 rounded-full"
                }
              >
                <RxDotsVertical className="text-[1.2rem]" />
              </Button>
              <div
                className="relative flex flex-grow items-center justify-center overflow-auto rounded-[20px]"
                style={{ backgroundColor: moment.color }}
              >
                <Reveal>
                  <div className="max-h-full overflow-y-auto text-center">
                    <h3 className="break-words text-lg font-medium">{moment.moment}</h3>
                  </div>
                </Reveal>
              </div>
              <p className={`absolute bottom-0 left-0 m-4 text-sm ${textColor}`}>{date}</p>
            </Card>
          );
        })
      ) : (
        <div className="text-white">No moments available</div>
      )}
    </div>
  );
}
