import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable({ empresas }) {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableCaption>Lista de Empresas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>RUT</TableHead>
            <TableHead className="text-right">Empleados</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
          {empresas.map((empresa) => (
            <TableRow key={empresa.id}>
              <TableCell className="font-medium">{empresa.nombre}</TableCell>
              <TableCell>{empresa.rut}</TableCell>
              <TableCell className="text-right">{empresa.empleados}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
