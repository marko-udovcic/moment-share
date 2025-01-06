import Card from "./ui/Card";
import Button from "./ui/Button";
import { useProfile } from "../context/ProfileContext";

export default function ListCards() {
  const { listMoments, fetchData, setListMoments } = useProfile();
  const filteredListMoments = listMoments.filter((moment) => moment.username === "m.udovcic");

  function getLuminance(color) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  }
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
    const confirm = window.confirm("are you sure you want remove user");
    if (!confirm) return;
    deleteMoment(id, "/posts");
  }

  return (
    <div
      className="z-0 m-auto mx-3 grid min-h-[50vh] grid-cols-1 gap-10 rounded-lg bg-gray-800 sm:grid-cols-2 md:mx-10
        md:grid-cols-3 lg:grid-cols-4 lg:p-5"
    >
      {filteredListMoments && filteredListMoments.length > 0 ? (
        filteredListMoments.map((moment) => {
          const textColor = getLuminance(moment.color) > 128 ? "text-black" : "text-white";
          const date = moment.created_at.split(" ")[0];

          return (
            <Card
              key={moment.id}
              className={`relative flex h-[20rem] flex-col justify-between overflow-hidden rounded-[20px] p-3 text-center ${textColor}
                bg-white`}
            >
              <div
                className="relative flex flex-grow items-center justify-center overflow-auto rounded-[20px]"
                style={{ backgroundColor: moment.color }}
              >
                <div className="max-h-full overflow-y-auto text-center">
                  <h3 className="break-words text-lg font-medium">{moment.moment}</h3>
                </div>
              </div>
              <p className="absolute bottom-0 left-0 m-2 text-sm text-black">{date}</p>
              <Button
                onClick={() => handleRemoveMoment(moment.id)}
                className="mt-3 self-end rounded-lg p-1 hover:bg-red-600 hover:text-white transition duration-300 text-red-600
                  font-semibold"
              >
                Delete moment
              </Button>
            </Card>
          );
        })
      ) : (
        <div className="text-white">No moments available</div>
      )}
    </div>
  );
}
