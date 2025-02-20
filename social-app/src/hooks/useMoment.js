import { useQuery } from "@tanstack/react-query";
import { getUserMoment as getUserMomentApi } from "../services/apiMoments";

export function useMoment(blogId) {
  return useQuery({
    queryKey: ["userMoment", blogId],
    queryFn: () => getUserMomentApi(blogId),
    enabled: !!blogId,
  });
}
