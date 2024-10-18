import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashBoardTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs md:text-md">Rut</TableHead>
          <TableHead className="text-xs md:text-md">Nombre</TableHead>
          <TableHead className="text-xs md:text-md">Empleados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-xs md:text-md">77.456.775-5</TableCell>
          <TableCell className="font-medium text-xs md:text-md">Negocio de la esquina</TableCell>
          <TableCell className="font-medium text-xs md:text-md">456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-xs md:text-md">77.456.775-5</TableCell>
          <TableCell className="font-medium text-xs md:text-md">Negocio de la esquina</TableCell>
          <TableCell className="font-medium text-xs md:text-md">456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-xs md:text-md">77.456.775-5</TableCell>
          <TableCell className="font-medium text-xs md:text-md">Negocio de la esquina</TableCell>
          <TableCell className="font-medium text-xs md:text-md">456</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DashBoardTable;
