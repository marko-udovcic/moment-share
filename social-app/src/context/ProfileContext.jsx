import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";
const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const [listFollowers, setListFollowers] = useState([]);
  const [listFollowing, setListFollowing] = useState([]);
  const [listMoments, setListMoments] = useState([]);

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
  const refreshData = useCallback(async () => {
    await fetchData("/posts", setListMoments);
    await fetchUsers();
  }, [fetchData, fetchUsers]);

  useEffect(() => {
    async function fetchInitialData() {
      await fetchData("/posts", setListMoments);
      await fetchUsers();
    }
    fetchInitialData();
  }, [fetchData, fetchUsers]);

  return (
    <ProfileContext.Provider
      value={{
        listFollowers,
        setListFollowers,
        listFollowing,
        setListFollowing,
        listMoments,
        setListMoments,
        fetchData,
        fetchUsers,
        refreshData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

export { ProfileProvider, useProfile };
ProfileProvider.propTypes = {
  children: PropTypes.any,
};
