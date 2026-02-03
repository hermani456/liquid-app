import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCompanies, fetchCreateCompany, fetchUpdateCompany, fetchDeleteCompany } from "@/utils/api";

export function useCompanies() {
  const queryClient = useQueryClient();

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: Infinity,
  });

  const createCompanyMutation = useMutation({
    mutationFn: fetchCreateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const updateCompanyMutation = useMutation({
    mutationFn: fetchUpdateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const deleteCompanyMutation = useMutation({
    mutationFn: fetchDeleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  return {
    companies: companiesQuery.data || [],
    isLoading: companiesQuery.isPending,
    isError: companiesQuery.isError,
    error: companiesQuery.error,
    createCompany: createCompanyMutation.mutate,
    createCompanyAsync: createCompanyMutation.mutateAsync,
    isCreating: createCompanyMutation.isPending,
    updateCompany: updateCompanyMutation.mutate,
    updateCompanyAsync: updateCompanyMutation.mutateAsync,
    isUpdating: updateCompanyMutation.isPending,
    deleteCompany: deleteCompanyMutation.mutate,
    deleteCompanyAsync: deleteCompanyMutation.mutateAsync,
    isDeleting: deleteCompanyMutation.isPending,
  };
}
