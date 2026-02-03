import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWorkers, fetchCreateWorker, fetchUpdateWorker, fetchDeleteWorker } from "@/utils/api";

export function useEmployees(companyId) {
  const queryClient = useQueryClient();

  const employeesQuery = useQuery({
    queryKey: ["workers", companyId],
    queryFn: () => fetchWorkers(companyId),
    enabled: !!companyId,
    staleTime: Infinity,
  });

  const createEmployeeMutation = useMutation({
    mutationFn: fetchCreateWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: fetchUpdateWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: fetchDeleteWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });

  return {
    employees: employeesQuery.data || [],
    isLoading: employeesQuery.isPending,
    isError: employeesQuery.isError,
    error: employeesQuery.error,
    createEmployee: createEmployeeMutation.mutate,
    createEmployeeAsync: createEmployeeMutation.mutateAsync,
    isCreating: createEmployeeMutation.isPending,
    updateEmployee: updateEmployeeMutation.mutate,
    updateEmployeeAsync: updateEmployeeMutation.mutateAsync,
    isUpdating: updateEmployeeMutation.isPending,
    deleteEmployee: deleteEmployeeMutation.mutate,
    deleteEmployeeAsync: deleteEmployeeMutation.mutateAsync,
    isDeleting: deleteEmployeeMutation.isPending,
  };
}
