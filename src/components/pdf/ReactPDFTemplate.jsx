import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatRut, formatToClp } from "@/utils/index";

// Register fonts if needed
// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/fonts/Roboto-Regular.ttf" },
//     { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" }
//   ]
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 30,
    fontSize: 11,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
  },
  employeeContainer: {
    border: "1px solid #ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  sectionHeader: {
    backgroundColor: "#eee",
    padding: 5,
    fontWeight: "bold",
  },
  employeeData: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  employeeColumn: {
    flexDirection: "column",
    flexGrow: 1,
  },
  employeeRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    display: "flex",
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 3,
  },
  tableHeaderRow: {
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
  tableCol1: {
    flex: 3,
  },
  tableCol2: {
    flex: 1,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signature: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginTop: 50,
    paddingTop: 5,
    width: 150,
    textAlign: "center",
  },
});

const ReactPDFTemplate = ({
  name,
  valorDiaPresente,
  last_name,
  rut,
  position,
  email,
  diasAusentes,
  afp,
  sueldoBase,
  dias,
  pagoHoraExtra,
  gratificacion,
  totalImponible,
  movilizacion,
  colacion,
  viatico,
  asignacionFamiliar,
  prevision,
  seguroCesantia,
  fonasa,
  descuentosPrevisionales,
  liquido,
  mes,
  descuento,
  totalLiquido
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  
  const totalNoImponible =
    Number(movilizacion) +
    Number(colacion) +
    Number(viatico) +
    Number(asignacionFamiliar);
    
  const totalHaberes = totalImponible + totalNoImponible;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {/* If you have a logo, you can add it here */}
          {/* <Image style={styles.logo} src="/path-to-logo.png" /> */}
          <View style={styles.divider} />
          <View style={styles.headerText}>
            <Text>Lota Schwager</Text>
            <Text>77.456.321-5</Text>
            <Text>San Martin 2019</Text>
          </View>
        </View>
        
        {/* Title */}
        <Text style={styles.title}>Remuneración</Text>
        <Text style={styles.subtitle}>Liquidación de sueldo</Text>
        <Text style={styles.date}>{`${mes} ${year}`}</Text>
        
        {/* Employee Info */}
        <View style={styles.employeeContainer}>
          <View style={styles.sectionHeader}>
            <Text>Información del trabajador</Text>
          </View>
          
          <View style={styles.employeeData}>
            <View style={styles.employeeColumn}>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{`${name} ${last_name}`}</Text>
              </View>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Rut:</Text>
                <Text style={styles.value}>{formatRut(rut)}</Text>
              </View>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Cargo:</Text>
                <Text style={styles.value}>{position}</Text>
              </View>
            </View>
            
            <View style={styles.employeeColumn}>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Trabaja desde:</Text>
                <Text style={styles.value}>01/01/2020</Text>
              </View>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Contrato:</Text>
                <Text style={styles.value}>Indefinido</Text>
              </View>
              <View style={styles.employeeRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{email}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Haberes Section */}
        <View style={styles.employeeContainer}>
          <View style={styles.sectionHeader}>
            <Text>Haberes</Text>
          </View>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableCol1}>Concepto</Text>
              <Text style={styles.tableCol2}>Valor</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Sueldo Base ({dias} días)</Text>
              <Text style={styles.tableCol2}>{formatToClp(valorDiaPresente)}</Text>
            </View>
            
            {pagoHoraExtra > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Horas Extras</Text>
                <Text style={styles.tableCol2}>{formatToClp(pagoHoraExtra)}</Text>
              </View>
            )}
            
            {gratificacion > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Gratificación</Text>
                <Text style={styles.tableCol2}>{formatToClp(gratificacion)}</Text>
              </View>
            )}
            
            {Number(movilizacion) > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Movilización</Text>
                <Text style={styles.tableCol2}>{formatToClp(Number(movilizacion))}</Text>
              </View>
            )}
            
            {Number(colacion) > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Colación</Text>
                <Text style={styles.tableCol2}>{formatToClp(Number(colacion))}</Text>
              </View>
            )}
            
            {Number(viatico) > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Viático</Text>
                <Text style={styles.tableCol2}>{formatToClp(Number(viatico))}</Text>
              </View>
            )}
            
            {Number(asignacionFamiliar) > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Asignación Familiar</Text>
                <Text style={styles.tableCol2}>{formatToClp(Number(asignacionFamiliar))}</Text>
              </View>
            )}
            
            <View style={styles.totalRow}>
              <Text style={styles.tableCol1}>Total Haberes</Text>
              <Text style={styles.tableCol2}>{formatToClp(totalHaberes)}</Text>
            </View>
          </View>
        </View>
        
        {/* Descuentos Section */}
        <View style={styles.employeeContainer}>
          <View style={styles.sectionHeader}>
            <Text>Descuentos</Text>
          </View>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableCol1}>Concepto</Text>
              <Text style={styles.tableCol2}>Valor</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>AFP {afp?.label} ({(afp?.value * 100).toFixed(2)}%)</Text>
              <Text style={styles.tableCol2}>{formatToClp(prevision)}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Seguro Cesantía (0.6%)</Text>
              <Text style={styles.tableCol2}>{formatToClp(seguroCesantia)}</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Fonasa (7%)</Text>
              <Text style={styles.tableCol2}>{formatToClp(fonasa)}</Text>
            </View>
            
            {Number(descuento) > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>Otros Descuentos</Text>
                <Text style={styles.tableCol2}>{formatToClp(Number(descuento))}</Text>
              </View>
            )}
            
            <View style={styles.totalRow}>
              <Text style={styles.tableCol1}>Total Descuentos</Text>
              <Text style={styles.tableCol2}>{formatToClp(Number(descuentosPrevisionales) + Number(descuento))}</Text>
            </View>
          </View>
        </View>
        
        {/* Total Líquido */}
        <View style={[styles.tableRow, styles.totalRow, { marginTop: 15 }]}>
          <Text style={styles.tableCol1}>TOTAL LÍQUIDO</Text>
          <Text style={styles.tableCol2}>{formatToClp(totalLiquido)}</Text>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signature}>
            <Text>Firma Empleador</Text>
          </View>
          <View style={styles.signature}>
            <Text>Firma Trabajador</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReactPDFTemplate;
