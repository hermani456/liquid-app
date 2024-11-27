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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchWorkers,
  fetchUpdateWorker,
  fetchDeleteWorker,
} from "@/utils/fetchFuntions";
import { SheetDescription } from "./ui/sheet";
import { useCompanyStore } from "@/store/CompanyStore";
import { LoaderCircle } from "lucide-react";
import { FilePenLine } from "lucide-react";
import { Trash } from "lucide-react";

export function EmployeeSelection() {
  const { companyId } = useCompanyStore();


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    data: employees,
  } = useQuery({
    queryKey: ["workers", companyId],
    queryFn: () => fetchWorkers(companyId),
    staleTime: Infinity,
    enabled: !!companyId,
  });

  useEffect(() => {
    if (!isPending && employees) {
      setFilteredEmployees(employees);
    }
  }, [isPending, employees]);

  const updateWorkerMutation = useMutation({
    mutationFn: fetchUpdateWorker,
    onSuccess: () => {
      queryClient.invalidateQueries(["workers"]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating worker:", error);
    },
  });

  const deleteWorkerMutation = useMutation({
    mutationFn: fetchDeleteWorker,
    onSuccess: () => {
      queryClient.invalidateQueries(["workers"]);
      // setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting worker:", error);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter(
      (employee) =>
        employee?.name?.toLowerCase().includes(term) ||
        employee?.last_name?.toLowerCase().includes(term) ||
        employee?.position?.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorkerMutation.mutate(selectedEmployee);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSexChange = (value) => {
    setSelectedEmployee((prevData) => ({
      ...prevData,
      sex: value === "masculino" ? "M" : "F",
    }));
  };

  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error loading employees</div>;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">
        Gestión de Empleados
      </h2>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, apellido, RUT o cargo"
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
              <TableHead>Apellido</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead className="hidden md:table-cell">Cargo</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="min-w-10 break-all">{employee?.name}</TableCell>
                <TableCell className="min-w-10 break-all">{employee?.last_name}</TableCell>
                <TableCell className="min-w-10 break-all">{employee?.rut}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee?.position}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => handleSelectEmployee(employee)}>
                      <FilePenLine className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEmployee(employee)}
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
      {employees.length === 0 && (
        <p className="text-center mt-4 text-muted-foreground">
          No se encontraron empleados.
        </p>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a {employeeToDelete?.name}{" "}
              {employeeToDelete?.last_name}?
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
                deleteWorkerMutation.mutate(employeeToDelete.id, {
                  onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setEmployeeToDelete(null);
                  },
                });
              }}
              disabled={deleteWorkerMutation.isPending}
            >
              {deleteWorkerMutation.isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
        <DialogContent className="max-w-[300px] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
            <SheetDescription className="sr-only">
              Modal edicion empleado
            </SheetDescription>
          </DialogHeader>
          {selectedEmployee && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={selectedEmployee?.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Apellido</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={selectedEmployee?.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  name="rut"
                  value={selectedEmployee?.rut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Sexo</Label>
                <RadioGroup
                  name="sex"
                  value={
                    selectedEmployee?.sex === "M" ? "masculino" : "femenino"
                  }
                  onValueChange={handleSexChange}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" className="border-emerald-500 text-white"/>
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femenino" id="femenino" className="border-emerald-500 text-white"/>
                    <Label htmlFor="femenino">Femenino</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="home_address">Dirección</Label>
                <Input
                  id="home_address"
                  name="home_address"
                  value={selectedEmployee.home_address}
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
                  value={selectedEmployee.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  name="position"
                  value={selectedEmployee.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="base_salary">Salario</Label>
                <Input
                  id="base_salary"
                  name="base_salary"
                  type="number"
                  value={selectedEmployee.base_salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={selectedEmployee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Actualizar Empleado
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
