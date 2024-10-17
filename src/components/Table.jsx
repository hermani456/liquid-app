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
          <TableHead>Rut</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Empleados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">77.456.775-5</TableCell>
          <TableCell>Negocio de la esquina</TableCell>
          <TableCell>456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">77.456.775-5</TableCell>
          <TableCell>Negocio de la esquina</TableCell>
          <TableCell>456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">77.456.775-5</TableCell>
          <TableCell>Negocio de la esquina</TableCell>
          <TableCell>456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">77.456.775-5</TableCell>
          <TableCell>Negocio de la esquina</TableCell>
          <TableCell>456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">77.456.775-5</TableCell>
          <TableCell>Negocio de la esquina</TableCell>
          <TableCell>456</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DashBoardTable;
