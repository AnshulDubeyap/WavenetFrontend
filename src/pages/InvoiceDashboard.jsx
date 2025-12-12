import { useEffect, useState } from 'react'
import api from '../api/client'
import InvoiceFilters from '../components/InvoiceFilters'
import InvoiceForm from '../components/InvoiceForm'
import InvoiceTable from '../components/InvoiceTable'
import { Box, Typography } from '@mui/material'

function InvoiceDashboard() {
  const [invoices, setInvoices] = useState([])
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [financialYear, setFinancialYear] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadInvoices() }, [])

  async function loadInvoices() {
    try {
      setLoading(true)
      setError('')

      const params = { page: 1, limit: 50 }
      if (searchNumber) params.search = searchNumber
      if (financialYear) params.fy = financialYear
      if (fromDate) params.startDate = fromDate
      if (toDate) params.endDate = toDate

      const { data } = await api.get('/invoices', { params })
      setInvoices(data.invoices || [])
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load invoices'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      setError('')
      await api.post('/invoices', {
        invoiceNumber: Number(invoiceNumber),
        date: invoiceDate,
        amount: Number(invoiceAmount),
        customerName,
      })

      setInvoiceNumber('')
      setInvoiceDate('')
      setInvoiceAmount('')
      setCustomerName('')

      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to create invoice'
      setError(message)
    }
  }

  const handleDelete = async (invoiceNum) => {
    try {
      setError('')
      await api.delete('/invoices', { data: { invoiceNumbers: [invoiceNum] } })
      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete invoice'
      setError(message)
    }
  }

  const handleUpdate = async (invoiceNum) => {
    const updatedAmount = prompt('Enter new invoice amount')
    if (!updatedAmount) return
    try {
      setError('')
      await api.patch(`/invoices/${invoiceNum}`, { amount: Number(updatedAmount) })
      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update invoice'
      setError(message)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
      <Box sx={{ maxWidth: 1200, width: '100%', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Invoice Dashboard</Typography>
        {error && <Box sx={{ color: '#d32f2f', backgroundColor: '#fde7e9', p: 1, borderRadius: 1, mb: 2 }}>{error}</Box>}

      <InvoiceFilters
        searchNumber={searchNumber}
        onSearchNumberChange={setSearchNumber}
        financialYear={financialYear}
        onFinancialYearChange={setFinancialYear}
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
        onApply={loadInvoices}
      />

      <InvoiceForm
        invoiceNumber={invoiceNumber}
        onInvoiceNumberChange={setInvoiceNumber}
        invoiceDate={invoiceDate}
        onInvoiceDateChange={setInvoiceDate}
        customerName={customerName}
        onCustomerNameChange={setCustomerName}
        invoiceAmount={invoiceAmount}
        onInvoiceAmountChange={setInvoiceAmount}
        onSubmit={handleCreate}
      />

        <InvoiceTable invoices={invoices} loading={loading} error={error} onEdit={handleUpdate} onDelete={handleDelete} />
      </Box>
    </Box>
  )
}

export default InvoiceDashboard
