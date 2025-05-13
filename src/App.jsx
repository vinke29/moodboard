import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Clients from './components/Clients'
import Invoices from './components/Invoices'
import AIAgent from './components/AIAgent'

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-700 font-medium'
          : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
      }`}
    >
      {children}
    </Link>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-50">
        <nav className="bg-white border-b border-secondary-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  GardenCare AI
                </h1>
                <div className="hidden md:flex space-x-1">
                  <NavLink to="/">Dashboard</NavLink>
                  <NavLink to="/clients">Clients</NavLink>
                  <NavLink to="/invoices">Invoices</NavLink>
                  <NavLink to="/ai-agent">AI Agent</NavLink>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
                  Get Support
                </button>
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-medium">AI</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/ai-agent" element={<AIAgent />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
