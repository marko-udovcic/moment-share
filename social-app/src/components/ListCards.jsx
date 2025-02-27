import { RxDotsVertical } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { getLuminance } from "../utils/colorUtils";
import Reveal from "./ui/Reveal";
import { useDeleteMoment } from "../features/profile/hooks/useDeleteMoment";
import moment from "moment";
import { useProfile } from "../context/ProfileContext";
import { useProfileStore } from "../context/zustand/useProfileStore";
import { truncateContent } from "../utils/truncateContent";
import Modal from "./ui/Modal";
import ConfirmDelete from "./ui/ConfirmDelete";

export default function ListCards() {
  const { myMoments } = useProfile();
  const { userProfile } = useProfileStore();
  const { deleteMoment, isLoading } = useDeleteMoment();

  const sortedMoments = myMoments?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="grid-cards">
      {sortedMoments && sortedMoments.length > 0 ? (
        sortedMoments.map((myMoment) => {
          const textColor = getLuminance(myMoment.color) > 128 ? "text-black" : "text-white";
          const date = moment(myMoment.created_at).calendar();
          const displayContent = truncateContent(myMoment.content, 70);

          return (
            <div key={myMoment.id} className="relative">
              {!userProfile && (
                <div className="absolute right-4 top-4 z-10">
                  <Modal>
                    <Modal.Open opens={`delete-${myMoment.id}`}>
                      <Button
                        disabled={isLoading}
                        onClick={handleDeleteClick}
                        className="p-1 transition duration-300 font-semibold text-white bg-[#000000] bg-opacity-30 rounded-full"
                      >
                        <RxDotsVertical className="text-[1.2rem]" />
                      </Button>
                    </Modal.Open>
                    <Modal.Window name={`delete-${myMoment.id}`}>
                      <ConfirmDelete onConfirm={() => deleteMoment(myMoment.id)} name="moment" />
                    </Modal.Window>
                  </Modal>
                </div>
              )}

              <NavLink to={`/moment/${myMoment.id}`}>
                <Card
                  className="relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[4px] p-3 text-center"
                  style={{ backgroundColor: myMoment.color }}
                >
                  <div className="relative flex flex-grow w-full items-center justify-center rounded-[20px] mb-6 p-3 text-center">
                    <Reveal>
                      <h3 className={`break-words text-lg font-medium leading-normal ${textColor}`}>
                        {displayContent}
                      </h3>
                    </Reveal>
                  </div>
                  <p className={`absolute bottom-0 left-0 m-4 text-sm ${textColor}`}>{date}</p>
                </Card>
              </NavLink>
            </div>
          );
        })
      ) : (
        <div className="grid place-items-center text-white text-3xl col-span-full xl:text-4xl">
          <h2> No moments yet</h2>
        </div>
      )}
    </div>
  );
}
