import { useState, useEffect } from 'react'

function ReminderConfig({ config, onUpdate }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Initial Reminder (days before due date)
          </label>
          <input
            type="number"
            value={config.initialReminderDays}
            onChange={(e) => onUpdate({ ...config, initialReminderDays: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Follow-up Interval (days)
          </label>
          <input
            type="number"
            value={config.followUpIntervalDays}
            onChange={(e) => onUpdate({ ...config, followUpIntervalDays: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Maximum Follow-ups
          </label>
          <input
            type="number"
            value={config.maxFollowUps}
            onChange={(e) => onUpdate({ ...config, maxFollowUps: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Escalation Threshold (days overdue)
          </label>
          <input
            type="number"
            value={config.escalationThresholdDays}
            onChange={(e) => onUpdate({ ...config, escalationThresholdDays: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-secondary-700">Communication Channels</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.useEmail}
              onChange={(e) => onUpdate({ ...config, useEmail: e.target.checked })}
              className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-secondary-900">Email</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.useSMS}
              onChange={(e) => onUpdate({ ...config, useSMS: e.target.checked })}
              className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-secondary-900">SMS</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-secondary-700">Message Templates</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Initial Reminder
            </label>
            <textarea
              value={config.templates.initial}
              onChange={(e) => onUpdate({
                ...config,
                templates: { ...config.templates, initial: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows="3"
              placeholder="Available variables: {clientName}, {amount}, {dueDate}, {invoiceNumber}"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Follow-up Reminder
            </label>
            <textarea
              value={config.templates.followUp}
              onChange={(e) => onUpdate({
                ...config,
                templates: { ...config.templates, followUp: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows="3"
              placeholder="Available variables: {clientName}, {amount}, {dueDate}, {invoiceNumber}, {daysOverdue}"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Escalation Message
            </label>
            <textarea
              value={config.templates.escalation}
              onChange={(e) => onUpdate({
                ...config,
                templates: { ...config.templates, escalation: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows="3"
              placeholder="Available variables: {clientName}, {amount}, {dueDate}, {invoiceNumber}, {daysOverdue}"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function AIAgent() {
  const [config, setConfig] = useState({
    initialReminderDays: 3,
    followUpIntervalDays: 2,
    maxFollowUps: 3,
    escalationThresholdDays: 7,
    useEmail: true,
    useSMS: true,
    templates: {
      initial: "Dear {clientName}, this is a friendly reminder that your invoice #{invoiceNumber} for ${amount} is due on {dueDate}. Please ensure timely payment to avoid any late fees.",
      followUp: "Dear {clientName}, your invoice #{invoiceNumber} for ${amount} is now {daysOverdue} days overdue. Please process the payment as soon as possible.",
      escalation: "Dear {clientName}, your invoice #{invoiceNumber} for ${amount} is now {daysOverdue} days overdue. This is our final notice before we take further action. Please contact us immediately to resolve this matter."
    }
  })

  const [isActive, setIsActive] = useState(false)
  const [stats, setStats] = useState({
    activeReminders: 0,
    pendingFollowUps: 0,
    escalatedCases: 0,
    successfulReminders: 0
  })

  // This would be replaced with actual API calls to your backend
  const handleSaveConfig = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configuration saved:', config)
      // Show success message
    } catch (error) {
      console.error('Failed to save configuration:', error)
      // Show error message
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">AI Agent</h2>
          <p className="text-secondary-600 mt-1">Configure automated invoice reminders and follow-ups.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
              isActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <span>{isActive ? 'Stop Agent' : 'Start Agent'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="text-sm font-medium text-secondary-600">Active Reminders</div>
          <div className="text-3xl font-bold text-primary-600 mt-2">{stats.activeReminders}</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="text-sm font-medium text-secondary-600">Pending Follow-ups</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingFollowUps}</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="text-sm font-medium text-secondary-600">Escalated Cases</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{stats.escalatedCases}</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="text-sm font-medium text-secondary-600">Successful Reminders</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.successfulReminders}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Agent Configuration</h3>
          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Save Configuration
          </button>
        </div>
        <ReminderConfig config={config} onUpdate={setConfig} />
      </div>
    </div>
  )
}

export default AIAgent 