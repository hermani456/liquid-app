"use client";
import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

// Mock data - in a real application, this would come from your API or database
const mockEmployees = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    rut: "12345678-9",
    cargo: "Desarrollador",
    sexo: "masculino",
    direccion: "Calle 123",
    telefono: "123456789",
    departamento: "it",
    salario: "1000000",
    email: "juan@example.com",
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    rut: "98765432-1",
    cargo: "Diseñadora",
    sexo: "femenino",
    direccion: "Avenida 456",
    telefono: "987654321",
    departamento: "marketing",
    salario: "1100000",
    email: "maria@example.com",
  },
];

export function EmployeeSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = mockEmployees.filter(
      (employee) =>
        employee.nombre.toLowerCase().includes(term) ||
        employee.apellido.toLowerCase().includes(term) ||
        employee.rut.includes(term) ||
        employee.cargo.toLowerCase().includes(term)
    );
    setEmployees(filtered);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to a server
    console.log(selectedEmployee);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
              <TableHead className="hidden md:block">Cargo</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.nombre}</TableCell>
                <TableCell>{employee.apellido}</TableCell>
                <TableCell>{employee.rut}</TableCell>
                <TableCell className="hidden md:block">
                  {employee.cargo}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleSelectEmployee(employee)}>
                    Editar
                  </Button>
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
        <DialogContent className="max-w-[300px] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={selectedEmployee.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={selectedEmployee.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rut">RUT</Label>
                <Input
                  id="rut"
                  name="rut"
                  value={selectedEmployee.rut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Sexo</Label>
                <RadioGroup
                  name="sexo"
                  value={selectedEmployee.sexo}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "sexo", value } })
                  }
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femenino" id="femenino" />
                    <Label htmlFor="femenino">Femenino</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={selectedEmployee.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={selectedEmployee.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  name="cargo"
                  value={selectedEmployee.cargo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  name="departamento"
                  value={selectedEmployee.departamento}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "departamento", value } })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salario">Salario</Label>
                <Input
                  id="salario"
                  name="salario"
                  type="number"
                  value={selectedEmployee.salario}
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
