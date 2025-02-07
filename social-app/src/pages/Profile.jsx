import { useState, useEffect } from "react";
import Header from "../features/profile/components/Header";
import { FollowerModal } from "../features/profile/components/FollowerModal";
import PropTypes from "prop-types";
import ListCards from "../components/ListCards";
import ListDiscoverUser from "../features/profile/components/ListDiscoverUser";
import Nav from "../components/Nav";

export default function Profile() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [listDiscoverUsers, setListDiscoverUsers] = useState([]);
  const [showDiscover, setShowDiscover] = useState(false);
  const handleShowFollowers = () => {
    setShowFollowers((show) => !show);
  };

  const handleShowFollowing = () => {
    setShowFollowing((prev) => !prev);
  };

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        setShowFollowers(false);
        setShowDiscover(false);
        setShowFollowing(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setShowFollowers, setShowFollowing]);
  return (
    <>
      <Nav />
      <Header
        handleShowFollowers={handleShowFollowers}
        handleShowFollowing={handleShowFollowing}
        setShowDiscover={setShowDiscover}
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
          setShowDiscover={setShowDiscover}
        />
      )}
      <section>
        <ListCards />
      </section>
    </>
  );
}

Profile.propTypes = {
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
  setShowFollowers: PropTypes.func,
  setShowFollowing: PropTypes.func,
};
