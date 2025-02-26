import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import MomentContent from "../features/moment/components/MomentContent";
import { useMoment } from "../hooks/useMoment";
import UserInfo from "../features/moment/components/UserInfo";
import { useGetUser } from "../features/moment/hooks/useGetUser";
import Comments from "../features/moment/components/Comments";

function Moment() {
  const { id: momentId } = useParams();
  const { data: userMoment, isLoading } = useMoment(momentId);
  const momentAuthorId = userMoment?.[0]?.user_id;
  const { data: user, isLoading: userLoading } = useGetUser(momentAuthorId);

  if (isLoading || userLoading) return <div>Loading...</div>;

  if (!userMoment || userMoment.length === 0) {
    return <div>Moment not found.</div>;
  }

  return (
    <>
      <Nav />
      <section className="w-full xl:w-[75%] h-full m-auto mt-16 lg:mt-10 p-3 2xl:w-[60%] lg:bg-secondary rounded-xl text-white">
        <UserInfo username={user?.username} date={userMoment[0].created_at} momentAuthorId={momentAuthorId} />
        <MomentContent userMoment={userMoment} />
        <Comments momentId={momentId} />
      </section>
    </>
  );
}

export default Moment;
