import { useQuery } from "@tanstack/react-query";
import { getCommentsByMomentId as getCommentsByMomentIdApi } from "../../../services/apiComments";
export function useGetComments(momentId) {
  return useQuery({
    queryKey: ["comments", momentId],
    queryFn: () => getCommentsByMomentIdApi(momentId),
  });
}
