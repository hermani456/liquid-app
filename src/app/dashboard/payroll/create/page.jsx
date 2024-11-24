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
import { SheetDescription } from "@/components/ui/sheet";
import { useCompanyStore } from "@/store/CompanyStore";
import { LoaderCircle } from "lucide-react";
import { FilePenLine } from "lucide-react";
import { Trash } from "lucide-react";
import { X } from "lucide-react";
import { afpOptions } from "@/utils/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePayRoll() {
  const { companyId } = useCompanyStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [payrollData, setPayrollData] = useState({
    daysWorked: "",
    daysAbsent: "",
    afp: "",
    overtimeHours: "",
    baseSalary: "",
    overtimePay: "",
    totalSalary: "",
  });

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
    console.log(employee);
  };

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error loading employees</div>;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">
        Gestión de Liquidaciones
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
                <TableCell className="min-w-10 break-all">
                  {employee?.name}
                </TableCell>
                <TableCell className="min-w-10 break-all">
                  {employee?.last_name}
                </TableCell>
                <TableCell className="min-w-10 break-all">
                  {employee?.rut}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee?.position}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => handleSelectEmployee(employee)}>
                      <FilePenLine className="mr-2 h-4 w-4" />
                      Generar
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Información Salarial</DialogTitle>
          </DialogHeader>
          <form onSubmit={""} className="space-y-4">
            <div>
              <Label htmlFor="daysWorked">Días Trabajados</Label>
              <Input
                id="daysWorked"
                name="daysWorked"
                type="number"
                value={payrollData.daysWorked}
                onChange={(e) => setPayrollData(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="daysAbsent">Días Ausentes</Label>
              <Input
                id="daysAbsent"
                name="daysAbsent"
                type="number"
                value={""}
                onChange={""}
                required
              />
            </div>
            {/* select from afpOptions */}
            <div>
              <Label htmlFor="afp">AFP</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue>{""}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {afpOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      onClick={() => ""}
                      selected={""}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="overtimeHours">Horas Extras</Label>
              <Input
                id="overtimeHours"
                name="overtimeHours"
                type="number"
                value={""}
                onChange={""}
                required
              />
            </div>
            <div>
              <Label htmlFor="baseSalary">Salario Base</Label>
              <Input
                id="baseSalary"
                name="baseSalary"
                type="number"
                value={""}
                onChange={""}
                required
              />
            </div>
            <div>
              <Label htmlFor="overtimePay">Pago por Horas Extras</Label>
              <Input
                id="overtimePay"
                name="overtimePay"
                type="number"
                value={""}
                onChange={""}
                required
              />
            </div>
            <div>
              <Label htmlFor="totalSalary">Sueldo base</Label>
              <Input
                id="totalSalary"
                name="totalSalary"
                type="number"
                value={selectedEmployee?.base_salary}
                disabled
                readOnly
              />
            </div>
            <Button type="submit" className="w-full">
              Actualizar Información Salarial
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
