import { useQuery } from "@tanstack/react-query";
import { getUserMoments as getUserMomentsApi } from "../../../services/apiMoments";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
export function useFetchMoments() {
  const { currentUser, userProfile } = useProfileStore();

  const activeUser = userProfile ? userProfile : currentUser;
  const { data: myMoments, error } = useQuery({
    queryKey: ["myMoments", activeUser?.id],
    queryFn: () => getUserMomentsApi(activeUser?.id),
    staleTime: 1000 * 60 * 1,
    enabled: !!activeUser?.id,
  });

  if (error) {
    console.error("Error in useFetchMoments is: ", error);
  }

  return myMoments;
}
