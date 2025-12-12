import React from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Paper } from "@mui/material";

function InvoiceTable({ invoices, loading, error, onEdit, onDelete }) {
  return (
    <Card sx={{ width: "100%", mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Invoices</Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
        )}

        {loading ? (
          <Typography sx={{ textAlign: 'center', py: 2 }}>Loading invoices...</Typography>
        ) : invoices.length === 0 ? (
          <Typography sx={{ textAlign: 'center', py: 2, fontStyle: 'italic' }}>No invoices found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Invoice #</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>FY</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell><strong>{invoice.invoiceNumber}</strong></TableCell>
                    <TableCell>{invoice.date ? new Date(invoice.date).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(invoice.amount || 0)}</TableCell>
                    <TableCell>{invoice.financialYear || 'N/A'}</TableCell>
                      <TableCell style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <Button variant="contained" size="small" style={{ marginRight: 6 }} onClick={() => onEdit(invoice.invoiceNumber)}>Edit</Button>
                        <Button variant="contained" size="small" color="error" onClick={() => onDelete(invoice.invoiceNumber)}>Delete</Button>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default InvoiceTable;
