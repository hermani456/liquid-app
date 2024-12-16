"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchCreateWorker } from "@/utils/fetchFuntions";
import { useCompanyStore } from "@/store/CompanyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { capitalizeAll, checkRut, inputCleaner } from "@/utils";
import { NumericFormat } from "react-number-format";


export function EmployeeForm() {
  const { companyId } = useCompanyStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRutValid, setIsRutValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newWorker) => fetchCreateWorker(newWorker),
    onSuccess: () => {
      // Invalidate and refetch the "workers" query
      queryClient.invalidateQueries(["workers", companyId]);
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
    let { name, value } = e.target;

    if (name === "rut") {
      const valid = checkRut(value);
      setIsRutValid(checkRut(value));
      if (!valid) {
        setErrorMessage("Rut inválido");
      } else {
        setErrorMessage("");
      }
    }

    if (name === "base_salary") {
      value = inputCleaner(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRutValid) {
      setErrorMessage("RUT inválido. Por favor, corrige el RUT antes de enviar.");
      return;
    }
    const data = {
      company_id: companyId,
      ...formData,
    };
    console.log(data);
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
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
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
            value={capitalizeAll(formData.name)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Apellido</Label>
          <Input
            id="last_name"
            name="last_name"
            value={capitalizeAll(formData.last_name)}
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
              <RadioGroupItem
                value="M"
                id="masculino"
                className="border-emerald-500 dark:text-white text-black"
              />
              <Label htmlFor="masculino">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="F"
                id="femenino"
                className="border-emerald-500 dark:text-white text-black"
              />
              <Label htmlFor="femenino">Femenino</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="home_address">Dirección</Label>
          <Input
            id="home_address"
            name="home_address"
            value={capitalizeAll(formData.home_address)}
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
          <NumericFormat
            id="base_salary"
            name="base_salary"
            value={formData.base_salary}
            onChange={handleChange}
            thousandSeparator="."
            decimalSeparator=","
            prefix="$"
            allowNegative={false}
            customInput={Input}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="position">Cargo</Label>
          <Input
            id="position"
            name="position"
            value={capitalizeAll(formData.position)}
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
          disabled={mutation.isPending}
          type="submit"
          className="mt-6 min-w-[10%] hover:scale-105 transition-all ease-in-out"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando
            </>
          ) : (
            "Crear Empleado"
          )}
        </Button>
      </div>
      <div className="h-10 text-emerald-600 dark:text-green-400 text-center mt-5 font-semibold transition-all">
        {isSuccess && <p>Empleado creado con éxito</p>}
      </div>
    </form>
  );
}
