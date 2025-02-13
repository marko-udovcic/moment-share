import Nav from "../components/Nav";
import ListRecommendedUsers from "../features/explore/components/ListRecommendedUsers";
function Explore() {
  return (
    <>
      <Nav />
      <section className="w-full xl:w-[75%] h-full m-auto mt-16 lg:mt-10 p-3 2xl:w-1/2">
        <ListRecommendedUsers />
      </section>
    </>
  );
}

export default Explore;
