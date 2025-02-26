import { getUserById as getUserByIdApi } from "../../../services/apiUsers";
import { useQuery } from "@tanstack/react-query";
export function useGetUser(userId) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdApi(userId),
    enabled: !!userId,
  });
}
