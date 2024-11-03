"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCreateCompany } from "@/utils/fetchFuntions";

export function CrearEmpresa() {
  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await fetchCreateCompany(formData);
    setFormData({
      name: "",
      rut: "",
      address: "",
      phone: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 lg:p-10">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">Crear Empresa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Nombre de la Empresa</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
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
        <div className="md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
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
