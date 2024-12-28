import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { FollowerModal } from "../components/FollowerModal";
import PropTypes from "prop-types";
import { myContext } from "../context/Context";
import ListCards from "../components/ListCards";
import ListDiscoverUser from "../components/ListDiscoverUser";

export default function Profile({ showFollowers, showFollowing, setShowFollowers, setShowFollowing }) {
  const [listFollowers, setListFollowers] = useState([]);
  const [listFollowing, setListFollowing] = useState([]);
  const [listMoments, setListMoments] = useState([]);
  const [listDiscoverUsers, setListDiscoverUsers] = useState([]);
  const [showDiscover, setShowDiscover] = useState(false);

  const handleShowFollowers = () => {
    setShowFollowers((show) => !show);
  };

  const handleShowFollowing = () => {
    setShowFollowing((prev) => !prev);
  };

  const fetchData = useCallback(async (url, setList) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  const fetchUsers = useCallback(() => {
    Promise.all([
      fetch("/followme")
        .then((response) => response.json())
        .then((data) => setListFollowers(data)),
      fetch("/following")
        .then((response) => response.json())
        .then((data) => setListFollowing(data)),
    ]).catch(() => {
      console.log("Error during loading");
    });
  }, []);

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        setShowFollowers(false);
        setShowDiscover(false);
        setShowFollowing(false);
      }
    }

    async function fetchInitialData() {
      await fetchData("/posts", setListMoments);
      await fetchUsers();
    }

    fetchInitialData();
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setShowDiscover, setShowFollowers, setShowFollowing, fetchUsers, fetchData]);
  return (
    <div>
      <myContext.Provider
        value={{
          listFollowers,
          setListFollowers,
          listFollowing,
          setListFollowing,
          fetchUsers,
          fetchData,
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
        {showDiscover && (
          <ListDiscoverUser
            listDiscoverUsers={listDiscoverUsers}
            setListDiscoverUsers={setListDiscoverUsers}
            fetchData={fetchData}
          />
        )}
        <section>
          <ListCards setListMoments={setListMoments} />
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
