import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";

function InvoiceForm({
  invoiceNumber,
  onInvoiceNumberChange,
  invoiceDate,
  onInvoiceDateChange,
  invoiceAmount,
  onInvoiceAmountChange,
  customerName,
  onCustomerNameChange,
  onSubmit,
}) {
  return (
    <Card style={{ maxWidth: 800, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: 8 }}>Create New Invoice</Typography>

        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <TextField label="Invoice Number" placeholder="e.g. INV-001" size="small" value={invoiceNumber} onChange={(e) => onInvoiceNumberChange(e.target.value)} required />
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} size="small" value={invoiceDate} onChange={(e) => onInvoiceDateChange(e.target.value)} required />

          <TextField label="Amount" type="number" placeholder="0.00" size="small" value={invoiceAmount} onChange={(e) => onInvoiceAmountChange(e.target.value)} step="0.01" required />
          <TextField label="Customer (Optional)" placeholder="Customer name" size="small" value={customerName} onChange={(e) => onCustomerNameChange(e.target.value)} />

          <div>
            <Button type="submit" variant="contained">Create Invoice</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default InvoiceForm;
