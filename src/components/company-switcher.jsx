"use client";

import { useEffect } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCompanies } from "@/utils/fetchFuntions";
import { useCompanyStore } from "@/store/CompanyStore";
import {
  Home,
  Briefcase,
  Building,
  Globe,
  Star,
  Users,
  Settings,
  ShoppingCart,
  DollarSign,
  Shield,
} from "lucide-react";

export function CompanySwitcher() {
  const { companyId, setCompanyId } = useCompanyStore();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    data: companies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isPending && companies && !companyId) {
      setCompanyId(companies[0]?.id);
    }
  }, [companies, isPending, companyId, setCompanyId]);

  const handleCompanyChange = (company) => {
    setCompanyId(company.id);
    queryClient.invalidateQueries(["workers"]);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;

  const Icons = {
    Home,
    Briefcase,
    Building,
    Globe,
    Star,
    Users,
    Settings,
    ShoppingCart,
    DollarSign,
    Shield,
  };

  const iconName = companies.find((i) => i.id === companyId)?.icon || "Home";
  const Icon = Icons[iconName] || Icons["Home"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Icon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="line-clamp-1 flex-1 pr-2 font-medium">
            {companies.find((c) => c.id === companyId)?.name}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        align="start"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Empresas
        </DropdownMenuLabel>
        {companies.map((company, index) => {
          const iconName = company.icon || "Home";
          const Icon = Icons[iconName] || Icons["Home"];
          return (
            <DropdownMenuItem
              key={company.name}
              onClick={() => handleCompanyChange(company)}
              className="items-start gap-2 px-1.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Icon className="h-5 w-5 shrink-0" />
              </div>
              <div className="grid flex-1 leading-tight">
                <div className="line-clamp-1 font-medium">{company.name}</div>
                <div className="overflow-hidden text-xs text-muted-foreground">
                  {/* <div className="line-clamp-1">{team.plan}</div> */}
                </div>
              </div>
              <DropdownMenuShortcut className="self-center">
                ⌘{index + 1}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Plus className="h-5 w-5" />
          </div>
          <div className="font-medium text-muted-foreground">
            {/* TODO: REDIRECCIONAR A AGREGAR EMPRESAS */}
            Agregar Empresa
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
