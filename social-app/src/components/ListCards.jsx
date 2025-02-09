import { RxDotsVertical } from "react-icons/rx";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { getLuminance } from "../utils/colorUtils";
import Reveal from "./ui/Reveal";
import { useDeleteMoment } from "../features/profile/hooks/useDeleteMoment";
import moment from "moment";
import { useProfile } from "../context/ProfileContext";

export default function ListCards() {
  let { myMoments } = useProfile();
  myMoments = myMoments?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const { deleteMoment, isLoading } = useDeleteMoment();

  async function handleRemoveMoment(id) {
    const confirm = window.confirm("are you sure you want remove moment");
    if (!confirm) return;
    deleteMoment(id);
  }

  return (
    <div
      className="z-0 m-auto mx-3 grid min-h-[50vh] grid-cols-1 gap-10 rounded-lg sm:grid-cols-2 md:mx-10 md:grid-cols-2
        lg:grid-cols-4 lg:p-5"
    >
      {myMoments && myMoments.length > 0 ? (
        myMoments.map((myMoment) => {
          const textColor = getLuminance(myMoment.color) > 128 ? "text-black" : "text-white";
          const date = moment(myMoment.created_at).calendar();

          return (
            <Card
              key={myMoment.id}
              className={
                "relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[4px] p-3 text-center "
              }
              style={{ backgroundColor: myMoment.color }}
            >
              <Button
                disabled={isLoading}
                onClick={() => handleRemoveMoment(myMoment.id)}
                className={
                  "mt-3 self-end p-1 transition duration-300 font-semibold text-white bg-[#000000] bg-opacity-30 rounded-full"
                }
              >
                <RxDotsVertical className="text-[1.2rem]" />
              </Button>
              <div
                className="relative flex flex-grow items-center justify-center overflow-auto rounded-[20px]"
                style={{ backgroundColor: myMoment.color }}
              >
                <Reveal>
                  <div className="max-h-full overflow-y-auto text-center">
                    <h3 className={`break-words text-lg font-medium ${textColor}`}>{myMoment.content}</h3>
                  </div>
                </Reveal>
              </div>
              <p className={`absolute bottom-0 left-0 m-4 text-sm ${textColor}`}>{date}</p>
            </Card>
          );
        })
      ) : (
        <div className="grid place-items-center text-white text-3xl col-span-full xl:text-4xl">
          No moments yet
        </div>
      )}
    </div>
  );
}
