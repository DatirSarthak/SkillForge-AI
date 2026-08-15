import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/dashboardService";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};