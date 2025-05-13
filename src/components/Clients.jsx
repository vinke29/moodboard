import { useState, useEffect } from 'react'
import Drawer from './Drawer'

function ClientCard({ client }) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
            <span className="text-primary-700 text-lg font-medium">{client.name[0]}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-secondary-900">{client.name}</h3>
            <p className="text-sm text-secondary-600">{client.address}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary-600">${client.monthlyFee}</p>
          <p className="text-sm text-secondary-600">Monthly Fee</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-secondary-100">
        <div className="flex items-center space-x-4 text-sm text-secondary-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{client.email}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{client.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientForm({ client, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    monthlyFee: ''
  })

  useEffect(() => {
    if (client) {
      setFormData(client)
    }
  }, [client])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows="3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Monthly Fee</label>
        <div className="relative">
          <span className="absolute left-4 top-2 text-secondary-500">$</span>
          <input
            type="number"
            value={formData.monthlyFee}
            onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
            className="w-full pl-8 pr-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
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
          {client ? 'Update Client' : 'Add Client'}
        </button>
      </div>
    </form>
  )
}

function Clients() {
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // This would normally fetch from your backend
  useEffect(() => {
    // Mock data for now
    setClients([
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '555-0123',
        address: '123 Main St, City, State',
        monthlyFee: 150
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-0124',
        address: '456 Oak Ave, City, State',
        monthlyFee: 200
      }
    ])
  }, [])

  const handleAddClient = (clientData) => {
    if (editingClient) {
      setClients(clients.map(client => 
        client.id === editingClient.id ? { ...clientData, id: client.id } : client
      ))
    } else {
      setClients([...clients, { ...clientData, id: Date.now() }])
    }
    setShowForm(false)
    setEditingClient(null)
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId))
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary-900">Clients</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Client</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Address</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-secondary-600">Monthly Fee</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-secondary-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-secondary-900">{client.name}</p>
                      <p className="text-sm text-secondary-600">{client.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-secondary-600">{client.phone}</td>
                  <td className="py-4 px-4 text-secondary-600">{client.address}</td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-secondary-900">${client.monthlyFee}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
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
          setEditingClient(null)
        }}
        title={editingClient ? 'Edit Client' : 'Add New Client'}
      >
        <ClientForm
          client={editingClient}
          onSubmit={handleAddClient}
          onCancel={() => {
            setShowForm(false)
            setEditingClient(null)
          }}
        />
      </Drawer>
    </div>
  )
}

export default Clients 