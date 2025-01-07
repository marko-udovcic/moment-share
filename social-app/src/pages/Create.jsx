import { useRef, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { useAddPost } from "../features/create/hooks/useAddPost";
import Button from "../components/ui/Button";

export default function Create() {
  const { refreshData } = useProfile();
  const [moment, setMoment] = useState("");
  const [color, setColor] = useState("#f1f5a2");
  const inputEl = useRef(null);
  const addPost = useAddPost();
  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!moment) return;
    const id = crypto.randomUUID();
    const username = "m.udovcic";
    const newPost = {
      id,
      moment,
      color,
      username,
      created_at: new Date().toLocaleString("en-GB"),
    };
    addPost(newPost, {
      onSuccess: () => {
        setMoment("");
        navigator("/profile");
        refreshData();
      },
    });
  }

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        e.preventDefault();
        setMoment("");
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <div className="flex min-h-80 w-full items-center justify-center text-white">
      <form className="mx-auto mt-9 flex w-full flex-col rounded-xl p-7 md:w-1/2" onSubmit={handleSubmit}>
        <label className="p-3 font-sans text-xl">Choose color of card: </label>
        <input className="mx-3" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <label className="p-3 font-sans text-xl">Enter your moment </label>
        <textarea
          className="mb-5 h-[200px] rounded-xl p-5 bg-blue-950 text-white"
          value={moment}
          ref={inputEl}
          onChange={(e) => setMoment(e.target.value)}
          placeholder="Share your current moment..."
        ></textarea>
        <Button
          className="rounded-xl border border-transparent p-2 font-sans font-semibold duration-700 hover:border-white bg-blue-400
            md:mx-auto md:w-1/2 focus:border-blue-500"
        >
          Add moment
        </Button>
      </form>
    </div>
  );
}
