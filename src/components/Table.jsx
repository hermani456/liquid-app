import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashBoardTable = ({ empresas }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs md:text-md">Nombre</TableHead>
          <TableHead className="text-xs md:text-md">Rut</TableHead>
          <TableHead className="text-xs md:text-md">Empleados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {empresas?.map((empresa) => (
          <TableRow key={empresa.id}>
            <TableCell className="font-medium text-xs md:text-md">
              {empresa.company_name}
            </TableCell>
            <TableCell className="font-medium text-xs md:text-md">
              {empresa.company_rut}
            </TableCell>
            <TableCell className="font-medium text-xs md:text-md">
              {empresa.employee_count}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashBoardTable;
