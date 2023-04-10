import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reports");
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredEmails = reports.filter((report) =>
    report.Email.toLowerCase().includes(filter.toLowerCase())
  );

  const downloadPdf = () => {
    const doc = new jsPDF();
  
    const title = "L'Alveare Sales Full Report";
    const titleFontSize = 18;
    doc.setFontSize(titleFontSize);
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleX, 25);
  
    const tableColumnNames = [
      'Cart ID',
      'Quantity Sold',
      'Revenue',
      'Email',
    ];
  
    const tableRows = filteredEmails.map((report) => [
      report.CartID,
      report.QuantitySold,
      `$${report.TotalRevenue}`,
      report.Email,
    ]);
  
    doc.autoTable({
      head: [tableColumnNames],
      body: tableRows,
      theme: 'striped',
      startY: 35,
      styles: {
        font: 'helvetica',
        fontStyle: 'normal',
      },
    });
  
    const totalRevenue = filteredEmails.reduce((total, report) => total + parseFloat(report.TotalRevenue), 0);
    const totalRevenueText = `Total Revenue: $${totalRevenue.toFixed(2)}`;
    doc.setFont('helvetica', 'normal'); // Set the font and style to match the table
    doc.setFontSize(10); // Set the font size to match the table
    const totalRevenueWidth = doc.getTextWidth(totalRevenueText);
    const pageWidth = doc.internal.pageSize.getWidth();
    const totalRevenueX = pageWidth - totalRevenueWidth - 15; // Subtract the padding from the right
    const lastRowY = doc.autoTable.previous.finalY + 10; // Add some padding
    doc.text(totalRevenueText, totalRevenueX, lastRowY);
  
    doc.save('reports.pdf');
  };  

  return (
    <React.Fragment>
      <Title>Reports</Title>
      <TextField
        label="Filter by Email"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "1rem" }}
        sx={{
          borderRadius: 1,
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#D6A556",
            },
          },
        }}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", width: "25%", wordBreak: "break-all" }}>
              Report ID
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "25%", wordBreak: "break-all" }}>
              Cart ID
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "25%", wordBreak: "break-all" }}>
              Quantity Sold
            </TableCell>
            <TableCell style={{ fontWeight: "bold", width: "25%", wordBreak: "break-all" }}>
              Revenue
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", width: "25%" }}
              align="right"
            >
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmails.map((report, index) => (
            <TableRow key={`${report.ReportID}-${index}`}>
              <TableCell>{report.ReportID}</TableCell>
              <TableCell>{report.CartID}</TableCell>
              <TableCell>{report.QuantitySold}</TableCell>
              <TableCell>${report.TotalRevenue}</TableCell>
              <TableCell align="right">{report.Email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadPdf}
        style={{ marginTop: "1rem", color: "black", backgroundColor: "#D6A556" }}
      >
        Download PDF
      </Button>
    </React.Fragment>
  );
}
