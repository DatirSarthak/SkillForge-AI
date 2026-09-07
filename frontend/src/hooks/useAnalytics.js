import { useQuery } from "@tanstack/react-query";
import analyticsService from "../services/analyticsService";

const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: analyticsService.getAnalytics,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAnalytics;