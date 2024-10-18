import InputComponent from "@/components/InputComponent";

const page = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Agregar Empleado</h1>
      <div className="mt-5">
        <form className="space-y-10">
          <div className="flex flex-wrap gap-5">
            <InputComponent
              name="Nombre"
              description="Ingresa el nombre del empleado"
            />
            <InputComponent
              name="Apellido"
              description="Ingresa el apellido del empleado"
            />
            <InputComponent
              name="Rut"
              description="Ingresa el rut del empleado"
            />
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-2">
              <label>Sexo</label>
              <select className="px-5 py-3 rounded-lg border text-sm w-64">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <InputComponent
              name="Direccion"
              description="Ingresa la direccion de la empresa"
            />
            <InputComponent
              name="Telefono"
              description="Ingresa el telefono de la empresa"
            />
          </div>
          <div className="flex flex-wrap gap-5">
            <InputComponent
              name="Cargo"
              description="Ingresa el cargo del empleado"
            />
            <InputComponent
              name="Departamento"
              description="Ingresa el departamento del empleado"
            />
            <InputComponent
              name="Salario"
              description="Ingresa el salario del empleado"
              type="number"
            />
          </div>
          <div className="flex flex-wrap gap-5">
            <InputComponent
              name="Email"
              description="Ingresa el email del empleado"
              type="email"
            />
          </div>
          <button className="px-4 py-2 bg-blue-400 rounded text-white shadow hover:scale-110 transition-all ease-in-out">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
