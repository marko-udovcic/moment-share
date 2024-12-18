import { useState } from "react";

export default function Create() {
  const [moment, setMoment] = useState("");
  async function handleAddPost(post) {
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!moment) return;
    const id = crypto.randomUUID();
    const username = "m.udovcic";
    const newPost = {
      id,
      moment,
      username,
      created_at: new Date().toLocaleString("en-GB"),
    };
    handleAddPost(newPost);
    setMoment("");
    console.log(moment);
  }
  return (
    <div className="flex min-h-80 w-full items-center justify-center text-white">
      <form
        className="mx-auto mt-9 flex w-full flex-col rounded-xl bg-blue-400 p-7 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <label className="p-3 font-sans text-xl">Enter your moment </label>
        <textarea
          className="mb-5 h-[200px] rounded-xl p-5 text-black"
          value={moment}
          onChange={(e) => setMoment(e.target.value)}
          placeholder="Share your current moment..."
        ></textarea>
        <button className="rounded-xl border border-transparent bg-blue-950 p-2 font-sans font-semibold duration-700 hover:border-white hover:bg-blue-400 md:mx-auto md:w-1/2">
          Add moment
        </button>
      </form>
    </div>
  );
}
