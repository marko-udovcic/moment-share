import { useState } from "react";
import { useAddPost } from "../features/create/hooks/useAddPost";
import Button from "../components/ui/Button";
import Nav from "../components/Nav";
import { useCurrentUser } from "../features/profile/hooks/useCurrentUser";

export default function Create() {
  const { user: currentUser } = useCurrentUser();
  const addPost = useAddPost();
  const [moment, setMoment] = useState("");
  const [color, setColor] = useState("#1F2937");

  function handleSubmit(e) {
    e.preventDefault();
    if (!moment) return;

    const newPost = {
      content: moment,
      user_id: currentUser.id,
      color,
    };

    addPost(newPost);
  }

  return (
    <>
      <Nav />
      <div className="flex min-h-80 w-full items-center justify-center text-white">
        <form className="mx-auto mt-9 flex w-full flex-col rounded-xl p-7 md:w-1/2" onSubmit={handleSubmit}>
          <label className="p-3 font-sans text-xl">Choose color of card: </label>
          <input className="mx-3" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <div className="flex flex-col bg-slate-800 rounded-sm relative mt-4">
            <textarea
              className="mb-5 h-[15rem] rounded-xl p-7 bg-slate-800 text-white focus:outline-none"
              value={moment}
              onChange={(e) => setMoment(e.target.value)}
              placeholder="Share your current moment..."
            ></textarea>
            <Button
              className="w-1/2 mx-auto mb-5 flex items-center justify-center rounded-xl border border-transparent p-2 font-sans
                font-semibold duration-700 hover:border-white bg-blue-400 md:mx-auto md:w-1/2 focus:outline-none lg:absolute
                lg:right-5 lg:bottom-5 lg:w-[200px]"
            >
              Add moment
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
