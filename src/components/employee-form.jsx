"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EmployeeForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    sexo: "",
    direccion: "",
    telefono: "",
    cargo: "",
    salario: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">
        Agregar Empleado
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="rut">RUT</Label>
          <Input
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Sexo</Label>
          <RadioGroup
            name="sexo"
            value={formData.sexo}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, sexo: value }))
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
        <div className="md:col-span-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
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
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="salario">Salario</Label>
          <Input
            id="salario"
            name="salario"
            type="number"
            value={formData.salario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="mt-6 min-w-[10%] hover:scale-105 transition-all ease-in-out">
          Crear
        </Button>
      </div>
    </form>
  );
}
