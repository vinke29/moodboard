import { useState, useEffect } from 'react'

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color.replace('text', 'bg')} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full ${color.replace('text', 'bg')} bg-opacity-20`}></div>
    </div>
  )
}

function ActivityCard({ client, service, amount, status, date }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-primary-600 bg-primary-50'
      case 'Pending':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-secondary-600 bg-secondary-50'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-soft hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
          <span className="text-primary-700 font-medium">{client[0]}</span>
        </div>
        <div>
          <p className="font-medium text-secondary-900">{client}</p>
          <p className="text-sm text-secondary-600">{service}</p>
          <p className="text-xs text-secondary-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-secondary-900 font-medium">${amount}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  )
}

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [summary, setSummary] = useState({
    expectedThisMonth: 0,
    receivedThisMonth: 0,
    pendingPayments: 0,
    totalClients: 0
  })

  const [recentActivity, setRecentActivity] = useState([])

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const handleMonthChange = (months) => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + months)
    setSelectedMonth(newDate)
  }

  // This would normally fetch from your backend
  useEffect(() => {
    // Mock data for now
    setSummary({
      expectedThisMonth: 2500,
      receivedThisMonth: 1800,
      pendingPayments: 700,
      totalClients: 15
    })

    setRecentActivity([
      {
        client: 'John Smith',
        service: 'Monthly maintenance',
        amount: 150,
        status: 'Paid',
        date: '2024-03-15'
      },
      {
        client: 'Sarah Johnson',
        service: 'Lawn mowing',
        amount: 75,
        status: 'Pending',
        date: '2024-03-14'
      }
    ])
  }, [selectedMonth])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Welcome back!</h2>
          <p className="text-secondary-600 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-soft p-2">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-secondary-900 font-medium">{formatMonthYear(selectedMonth)}</span>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Invoice</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Expected This Month"
          value={`$${summary.expectedThisMonth}`}
          icon={<svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          color="text-primary-600"
        />
        
        <StatCard
          title="Received This Month"
          value={`$${summary.receivedThisMonth}`}
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          color="text-blue-600"
        />
        
        <StatCard
          title="Pending Payments"
          value={`$${summary.pendingPayments}`}
          icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          color="text-orange-600"
        />
        
        <StatCard
          title="Total Clients"
          value={summary.totalClients}
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>}
          color="text-purple-600"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Recent Activity</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <ActivityCard
              key={index}
              client={activity.client}
              service={activity.service}
              amount={activity.amount}
              status={activity.status}
              date={activity.date}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 