import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { FollowerModal } from "../components/FollowerModal";
import PropTypes from "prop-types";
import { myContext } from "../context/Context";
import ListCards from "../components/ListCards";
export default function Profile({ showFollowers, showFollowing, setShowFollowers, setShowFollowing }) {
  const [listFollowers, setListFollowers] = useState([]);
  const [listFollowing, setListFollowing] = useState([]);
  const [listMoments, setListMoments] = useState([]);
  const [showDiscover, setShowDiscover] = useState(false);

  function handleShowFollowers() {
    setShowFollowers((show) => !show);
  }
  function handleShowFollowing() {
    setShowFollowing(showFollowing ? false : true);
  }
  async function fetchMoments() {
    try {
      const res = await fetch("/posts");
      const data = await res.json();
      setListMoments(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  function fetchUsers() {
    Promise.all([
      fetch("/followme")
        .then((response) => response.json())
        .then((data) => setListFollowers(data)),
      fetch("/following")
        .then((response) => response.json())
        .then((data) => setListFollowing(data)),
    ]).catch(() => {
      console.log("error during loading");
    });
  }
  useEffect(() => {
    fetchUsers();
    fetchMoments();
  }, []);

  return (
    <div>
      <myContext.Provider
        value={{
          listFollowers,
          setListFollowers,
          listFollowing,
          setListFollowing,
          fetchUsers,
          fetchMoments,
          listMoments,
        }}
      >
        <Header
          handleShowFollowers={handleShowFollowers}
          handleShowFollowing={handleShowFollowing}
          setShowDiscover={setShowDiscover}
          listMomentsSize={listMoments.length}
        />
        {(showFollowers || showFollowing) && (
          <FollowerModal
            setShowFollowers={setShowFollowers}
            setShowFollowing={setShowFollowing}
            showFollowers={showFollowers}
            showFollowing={showFollowing}
          />
        )}
        {showDiscover && <div className="mx-[1rem] md:mx-[3rem] mb-4 h-14 bg-red-900">Test</div>}
        <section>
          <ListCards />
        </section>
      </myContext.Provider>
    </div>
  );
}

Profile.propTypes = {
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
  setShowFollowers: PropTypes.func,
  setShowFollowing: PropTypes.func,
};
