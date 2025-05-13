import { useState, useEffect } from 'react'
import Drawer from './Drawer'

function InvoiceCard({ invoice }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-primary-600 bg-primary-50'
      case 'Pending':
        return 'text-orange-600 bg-orange-50'
      case 'Overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-secondary-600 bg-secondary-50'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">{invoice.clientName}</h3>
          <p className="text-sm text-secondary-600 mt-1">{invoice.description}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary-600">${invoice.amount}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
            {invoice.status}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-secondary-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary-600">Invoice Date</p>
            <p className="text-secondary-900 font-medium">{invoice.date}</p>
          </div>
          <div>
            <p className="text-secondary-600">Due Date</p>
            <p className="text-secondary-900 font-medium">{invoice.dueDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InvoiceForm({ invoice, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    description: '',
    dueDate: '',
    status: 'pending'
  })

  useEffect(() => {
    if (invoice) {
      setFormData(invoice)
    }
  }, [invoice])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Client</label>
        <select
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        >
          <option value="">Select a client</option>
          <option value="1">John Smith</option>
          <option value="2">Sarah Johnson</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-2 text-secondary-500">$</span>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full pl-8 pr-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows="3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Due Date</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-secondary-700 hover:text-secondary-900 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          {invoice ? 'Update Invoice' : 'Create Invoice'}
        </button>
      </div>
    </form>
  )
}

function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')

  // This would normally fetch from your backend
  useEffect(() => {
    // Mock data for now
    setInvoices([
      {
        id: 1,
        clientId: 1,
        clientName: 'John Smith',
        amount: 150,
        description: 'Monthly maintenance fee',
        dueDate: '2024-03-15',
        status: 'pending'
      },
      {
        id: 2,
        clientId: 2,
        clientName: 'Sarah Johnson',
        amount: 200,
        description: 'Monthly maintenance fee',
        dueDate: '2024-03-20',
        status: 'paid'
      }
    ])
  }, [])

  const handleAddInvoice = (invoiceData) => {
    if (editingInvoice) {
      setInvoices(invoices.map(invoice => 
        invoice.id === editingInvoice.id ? { ...invoiceData, id: invoice.id } : invoice
      ))
    } else {
      setInvoices([...invoices, { ...invoiceData, id: Date.now() }])
    }
    setShowForm(false)
    setEditingInvoice(null)
  }

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice)
    setShowForm(true)
  }

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceId))
    }
  }

  const handleMonthChange = (months) => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + months)
    setSelectedMonth(newDate)
  }

  const filteredInvoices = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.dueDate)
    const isInSelectedMonth = 
      invoiceDate.getMonth() === selectedMonth.getMonth() &&
      invoiceDate.getFullYear() === selectedMonth.getFullYear()
    
    const matchesSearch = 
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())

    return isInSelectedMonth && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary-900">Invoices</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-medium text-secondary-900">
              {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-secondary-900">{invoice.clientName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-secondary-900">${invoice.amount}</span>
                  </td>
                  <td className="py-4 px-4 text-secondary-600">{invoice.description}</td>
                  <td className="py-4 px-4 text-secondary-600">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditInvoice(invoice)}
                        className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        className="p-2 text-secondary-600 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        isOpen={showForm}
        onClose={() => {
          setShowForm(false)
          setEditingInvoice(null)
        }}
        title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
      >
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={handleAddInvoice}
          onCancel={() => {
            setShowForm(false)
            setEditingInvoice(null)
          }}
        />
      </Drawer>
    </div>
  )
}

export default Invoices 