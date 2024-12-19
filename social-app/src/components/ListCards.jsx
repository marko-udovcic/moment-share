import { useContext } from "react";
import { myContext } from "../context/Context";
import Card from "./Card";

export default function ListCards() {
  function getLuminance(color) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  }

  const { listMoments } = useContext(myContext);

  const filteredListMoments = listMoments.filter((moment) => moment.username === "m.udovcic");

  return (
    <div className="z-0 m-auto mx-3 grid min-h-[50vh] grid-cols-1 gap-10 rounded-lg bg-gray-800 sm:grid-cols-2 md:mx-10 md:grid-cols-3 lg:grid-cols-4 lg:p-5">
      {filteredListMoments && filteredListMoments.length > 0 ? (
        filteredListMoments.map((moment) => {
          const luminance = getLuminance(moment.color);
          const textColor = luminance > 128 ? "text-black" : "text-white";

          return (
            <Card
              key={moment.id}
              className={`relative h-[20rem] content-center rounded-md text-center ${textColor}`}
              style={{ backgroundColor: moment.color }}
            >
              <h3>{moment.moment}</h3>
              <p className="absolute bottom-0 p-1">{moment.created_at}</p>
            </Card>
          );
        })
      ) : (
        <div className="text-white">No moments available</div>
      )}
    </div>
  );
}
