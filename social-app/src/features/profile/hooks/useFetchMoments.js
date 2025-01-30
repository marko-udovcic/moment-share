import { useQuery } from "@tanstack/react-query";
import { getUserMoments as getUserMomentsApi } from "../../../services/apiMoments";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
export function useFetchMoments() {
  const { currentUser } = useProfileStore();

  const { data: myMoments, error } = useQuery({
    queryKey: ["myMoments", currentUser?.id],
    queryFn: () => getUserMomentsApi(currentUser?.id),
    staleTime: 1000 * 60 * 1,
    enabled: !!currentUser?.id,
  });

  if (error) {
    console.error("Error in useFetchMoments is: ", error);
  }

  return myMoments;
}
