"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchCreateWorker } from "@/utils/fetchFuntions";
import { useCompanyStore } from "@/store/CompanyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function EmployeeForm() {
  const { companyId } = useCompanyStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newWorker) => fetchCreateWorker(newWorker),
    onSuccess: () => {
      // Invalidate and refetch the "workers" query
      queryClient.invalidateQueries(['workers', companyId]);
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    rut: "",
    sex: "",
    home_address: "",
    phone: "",
    position: "",
    base_salary: "",
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
    const data = {
      company_id: companyId,
      ...formData,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        setFormData({
          name: "",
          last_name: "",
          rut: "",
          sex: "",
          home_address: "",
          phone: "",
          position: "",
          base_salary: "",
          email: "",
        });
      },
      onError: (error) => {
        console.error("Error creating worker:", error);
        alert("Error creating worker: " + error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">Agregar Empleado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Apellido</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
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
            name="sex"
            value={formData.sex}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, sex: value }))
            }
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="masculino" />
              <Label htmlFor="masculino">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="femenino" />
              <Label htmlFor="femenino">Femenino</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="home_address">Dirección</Label>
          <Input
            id="home_address"
            name="home_address"
            value={formData.home_address}
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
            value={formData.phone}
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
            value={formData.base_salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="position">Cargo</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
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
        <Button
          type="submit"
          className="mt-6 min-w-[10%] hover:scale-105 transition-all ease-in-out"
        >
          Crear
        </Button>
      </div>
    </form>
  );
}
