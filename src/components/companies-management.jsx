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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { fetchCompanies, fetchUpdateCompany } from "@/utils/fetchFuntions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SheetDescription } from "./ui/sheet";

export function CompaniesManagement() {
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
    if (!isPending && companies) {
      setFilteredCompanies(companies);
    }
  }, [isPending, companies]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyMutation.mutate(selectedCompany);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isPending) return <p>Cargando empresas...</p>;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Gestión de Empresas
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
              <TableHead>Dirección</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.rut}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSelectCompany(company)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {companies.length === 0 && (
        <p className="text-center mt-4 text-muted-foreground">
          No se encontraron empresas.
        </p>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
            <SheetDescription className="sr-only">modal edicion empresa</SheetDescription>
          </DialogHeader>
          {selectedCompany && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={selectedCompany?.name}
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
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={selectedCompany?.address}
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
                Actualizar Empresa
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
