import moment from "moment";
import { useFollowingMoments } from "../hooks/useFollowingMoments";
import Card from "../../../components/ui/Card";
import { NavLink } from "react-router-dom";
import Reveal from "../../../components/ui/Reveal";
import { getLuminance } from "../../../utils/colorUtils";
import { truncateContent } from "../../../utils/truncateContent";
import UserAvatar from "./UserAvatar";
import DateDisplay from "./DateDisplay";
function ListFollowingCard() {
  const moments = useFollowingMoments();

  const preventDefaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="grid-cards mt-[5rem] md:mt-[1rem] gap-2 md:gap-5">
      {moments && moments.length > 0 ? (
        moments.map((momentObject) => {
          const textColor = getLuminance(momentObject.color) > 128 ? "text-black" : "text-white";
          const date = moment(momentObject.created_at).calendar();
          const displayContent = truncateContent(momentObject.content, 70);
          return (
            <div key={momentObject.id} className="relative">
              <Card
                className="relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[4px] p-3 text-center"
                style={{ backgroundColor: momentObject.color }}
              >
                <UserAvatar
                  userId={momentObject.users.id}
                  username={momentObject.users.username}
                  textColor={textColor}
                  preventDefaultBehavior={preventDefaultBehavior}
                >
                  <DateDisplay date={date} textColor={textColor} isMobile={true} />
                </UserAvatar>

                <NavLink
                  to={`/moment/${momentObject.id}`}
                  className="relative flex flex-grow w-full items-center justify-center rounded-[20px] mb-6 p-3 text-center"
                >
                  <div>
                    <Reveal>
                      <h3 className={`break-words break-all text-lg font-medium leading-normal ${textColor}`}>
                        {displayContent}
                      </h3>
                    </Reveal>
                  </div>
                </NavLink>
                <DateDisplay date={date} textColor={textColor} isMobile={false} />
              </Card>
            </div>
          );
        })
      ) : (
        <div className="grid place-items-center text-white text-3xl col-span-full xl:text-4xl">
          <h2> No moments yet</h2>
        </div>
      )}
    </section>
  );
}

export default ListFollowingCard;
