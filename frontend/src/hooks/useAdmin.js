import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import adminService from "../services/adminService";

export const useAdminDashboard = () =>
  useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: adminService.getDashboard,
    staleTime: 60 * 1000,
  });

export const useAdminUsers = (params) =>
  useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminService.getUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

export const useAdminUser = (userId) =>
  useQuery({
    queryKey: ["admin", "user", userId],
    queryFn: () => adminService.getUserDetails(userId),
    enabled: Boolean(userId),
  });

export const useUpdateAdminUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, accountStatus }) =>
      adminService.updateUserStatus(
        userId,
        accountStatus
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin", "users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin", "user", variables.userId],
      });
    },
  });
};