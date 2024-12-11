"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import {
  fetchCompanies,
  fetchUpdateCompany,
  fetchDeleteCompany,
} from "@/utils/fetchFuntions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SheetDescription } from "./ui/sheet";
import { Trash, Loader2 } from "lucide-react";
import { FilePenLine } from "lucide-react";
import { capitalizeAll, formatRut, checkRut } from "@/utils";

export function CompaniesManagement() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [rutValidation, setRutValidation] = useState({
    isValid: true,
    message: "",
    companyId: null,
  });

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
    if (companies) {
      setFilteredCompanies(companies);
    }
  }, [companies]);

  const updateCompanyMutation = useMutation({
    mutationFn: fetchUpdateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating company:", error);
    },
  });

  const deleteCompanyMutation = useMutation({
    mutationFn: fetchDeleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
    onError: (error) => {
      console.error("Error deleting company:", error);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = companies.filter(
      (company) =>
        company?.name?.toLowerCase().includes(term) ||
        company?.rut?.includes(term) ||
        company?.address?.toLowerCase().includes(term) ||
        company?.phone?.includes(term)
    );
    setFilteredCompanies(filtered);
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
    setRutValidation({
      isValid: true,
      message: "",
      companyId: company.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyMutation.mutate(selectedCompany);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rut") {
      const valid = checkRut(value);
      setRutValidation({
        isValid: valid,
        message: valid ? "" : "RUT inválido",
        companyId: selectedCompany.id,
      });
    }
    setSelectedCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  if (isPending) return <p>Cargando empresas...</p>;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">
        Gestión de Empresa
      </h2>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, RUT, dirección o teléfono"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-8"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead className="hidden md:table-cell">Dirección</TableHead>
              <TableHead className="hidden md:table-cell">Telefono</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{formatRut(company.rut)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {company.address}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {company.phone}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => handleSelectCompany(company)}>
                      <FilePenLine className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteClick(company)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {companies?.length === 0 && (
        <p className="text-center mt-4 text-muted-foreground">
          No se encontraron empresas.
        </p>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la empresa{" "}
              <span className="font-semibold">{companyToDelete?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteCompanyMutation.mutate(companyToDelete.id, {
                  onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setCompanyToDelete(null);
                  },
                });
              }}
              disabled={deleteCompanyMutation.isPending}
            >
              {deleteCompanyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
            <SheetDescription className="sr-only">
              modal edicion empresa
            </SheetDescription>
          </DialogHeader>
          {selectedCompany && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={capitalizeAll(selectedCompany?.name)}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  name="rut"
                  value={selectedCompany?.rut}
                  onChange={handleChange}
                  required
                  className={
                    rutValidation.companyId === selectedCompany?.id &&
                    !rutValidation.isValid
                      ? "border-red-500"
                      : ""
                  }
                />
                {rutValidation.companyId === selectedCompany?.id &&
                  !rutValidation.isValid && (
                    <span className="text-red-500 text-sm">
                      {rutValidation.message}
                    </span>
                  )}
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={capitalizeAll(selectedCompany?.address)}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={selectedCompany?.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {updateCompanyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Editando...
                  </>
                ) : (
                  "Editar"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
