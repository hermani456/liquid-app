import InputComponent from "@/components/InputComponent";

const page = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Agregar Empresa</h1>
      <div className="mt-5">
        <form className="space-y-10">
          <div className="flex flex-wrap gap-5">
            <InputComponent name="Nombre" description="Ingresa el nombre de la empresa" />
            <InputComponent name="Rut" description="Ingresa el rut de la empresa" />
          </div>
          <div className="flex flex-wrap gap-5">
            <InputComponent name="Direccion" description="Ingresa la direccion de la empresa" />
            <InputComponent name="Telefono" description="Ingresa el telefono de la empresa" />
          </div>
          <button className="px-4 py-2 bg-blue-400 rounded text-white shadow hover:scale-110 transition-all ease-in-out">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default page;
