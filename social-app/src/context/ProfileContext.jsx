import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useFetchMoments } from "../features/profile/hooks/useFetchMoments";
const ProfileContext = createContext();

function ProfileProvider({ children }) {
  const myMoments = useFetchMoments();

  return (
    <ProfileContext.Provider
      value={{
        myMoments,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

export { ProfileProvider };
ProfileProvider.propTypes = {
  children: PropTypes.any,
};
