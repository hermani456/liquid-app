"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCreateCompany } from "@/utils/fetchFuntions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { checkRut } from "@/utils";

export function CrearEmpresa() {
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();
  const [isRutValid, setIsRutValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    rut: "",
    address: "",
    phone: "",
    icon: "",
  });

  const updateCompanyMutation = useMutation({
    mutationFn: fetchCreateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    },
    onError: (error) => {
      console.error("Error creating company:", error);
    },
  });

  const iconOptions = [
    { name: "Home", component: Home },
    { name: "Briefcase", component: Briefcase },
    { name: "Building", component: Building },
    { name: "Globe", component: Globe },
    { name: "Star", component: Star },
    { name: "Users", component: Users },
    { name: "Settings", component: Settings },
    { name: "ShoppingCart", component: ShoppingCart },
    { name: "DollarSign", component: DollarSign },
    { name: "Shield", component: Shield },
  ];

  const IconComponent = ({ iconName }) => {
    const IconFound = iconOptions.find(
      (icon) => icon.name === iconName
    )?.component;
    return IconFound ? <IconFound className="h-4 w-4 mr-2" /> : null;
  };

  const handleIconSelect = (iconName) => {
    setFormData((prevData) => ({
      ...prevData,
      icon: iconName,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rut") {
      const valid = checkRut(value);
      setIsRutValid(checkRut(value));
      if (!valid) {
        setErrorMessage("Rut inválido");
      } else {
        setErrorMessage("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRutValid) {
      setErrorMessage(
        "RUT inválido. Por favor, corrige el RUT antes de enviar."
      );
      return;
    }
    updateCompanyMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          rut: "",
          address: "",
          phone: "",
          icon: "",
        });
      },
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
            className={!isRutValid ? "border-red-500" : ""}
          />
          {!isRutValid && <span className="text-red-500">{errorMessage}</span>}
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
        <div className="md:col-span-2">
          <Label htmlFor="icon">Icono</Label>
          <Select
            name="icon"
            value={formData.icon}
            onValueChange={handleIconSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un icono">
                {iconOptions.name && (
                  <div className="flex items-center">
                    <IconComponent iconName={selectedEmployee.component} />
                    {selectedEmployee.component}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.name} value={icon.name}>
                  <div className="flex items-center">
                    <icon.component className="h-4 w-4 mr-2" />
                    {icon.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={updateCompanyMutation.isPending}
          type="submit"
          className="mt-6 min-w-[10%] hover:scale-105 transition-all ease-in-out"
        >
          {updateCompanyMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando
            </>
          ) : (
            "Crear Empresa"
          )}
        </Button>
      </div>
      <div className="h-10 text-emerald-600 dark:text-green-400 text-center mt-5 font-semibold transition-all">
        {isSuccess && <p>Empresa creada con éxito</p>}
      </div>
    </form>
  );
}
