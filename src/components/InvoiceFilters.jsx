import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";

function InvoiceFilters({
  searchNumber,
  onSearchNumberChange,
  financialYear,
  onFinancialYearChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onApply,
}) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: 8 }}>Invoice Filters</Typography>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField label="Invoice Number" size="small" value={searchNumber} onChange={(e) => onSearchNumberChange(e.target.value)} />

          <TextField label="Financial Year" size="small" value={financialYear} onChange={(e) => onFinancialYearChange(e.target.value)} />

          <TextField label="From" type="date" InputLabelProps={{ shrink: true }} value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} size="small" />

          <TextField label="To" type="date" InputLabelProps={{ shrink: true }} value={toDate} onChange={(e) => onToDateChange(e.target.value)} size="small" />

          <Button variant="contained" onClick={onApply}>Apply</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default InvoiceFilters;
