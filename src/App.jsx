import { useState } from 'react'
import './App.css'
import MoodBoard from './components/MoodBoard'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [mood, setMood] = useState(null)
  const [notes, setNotes] = useState('')
  const [moodData, setMoodData] = useState({})
  const [editing, setEditing] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : null
  const selectedEntry = dateString ? moodData[dateString] : null

  const handleMoodSelect = (level) => {
    setMood(level)
  }

  const handleCellClick = (date) => {
    setSelectedDate(date)
    setDrawerOpen(true)
    const dateString = date.toISOString().split('T')[0]
    const existingEntry = moodData[dateString]
    if (existingEntry) {
      setMood(existingEntry.level)
      setNotes(existingEntry.notes || '')
      setEditing(false)
    } else {
      setMood(null)
      setNotes('')
      setEditing(true)
    }
  }

  const handleSave = () => {
    if (mood === null) return
    setMoodData(prev => {
      const updated = {
        ...prev,
        [dateString]: {
          level: mood,
          notes: notes
        }
      }
      return updated
    })
    setEditing(false)
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setEditing(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mood Board</h1>
      </header>
      <main className="app-main">
        <div className="mood-board">
          <MoodBoard 
            moodData={moodData} 
            onCellClick={handleCellClick}
          />
        </div>
        {/* Side Drawer */}
        <div className={`mood-drawer${drawerOpen ? ' open' : ''}`}>
          <button className="drawer-close" onClick={handleCloseDrawer}>&times;</button>
          {selectedDate && (
            <div className="mood-entry">
              {/* Show summary if entry exists and not editing */}
              {selectedEntry && !editing ? (
                <div className="mood-summary">
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.5rem'}}>
                    <span style={{fontWeight:500}}>Mood:</span>
                    <span className={`mood-scale-button mood-${selectedEntry.level}`} style={{border:'none',boxShadow:'none',pointerEvents:'none'}}></span>
                    <span style={{fontWeight:400}}>{selectedEntry.level}/10</span>
                  </div>
                  {selectedEntry.notes && (
                    <div style={{fontSize:'0.95rem',color:'#636e72',marginBottom:'0.5rem'}}>
                      <span style={{fontWeight:500}}>Notes:</span> {selectedEntry.notes}
                    </div>
                  )}
                  <button className="save-button" style={{marginTop:0}} onClick={handleEdit}>Edit</button>
                </div>
              ) : (
                <>
                  <h2>How are you feeling on {selectedDate.toLocaleDateString()}?</h2>
                  <div className="mood-scale">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <button
                        key={level}
                        className={`mood-scale-button mood-${level} ${mood === level ? 'selected' : ''}`}
                        onClick={() => handleMoodSelect(level)}
                        style={{ backgroundColor: `var(--mood-${level})` }}
                        title={`Mood level ${level}`}
                      />
                    ))}
                  </div>
                  <textarea
                    className="mood-notes"
                    placeholder="Add some notes about your day..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <button 
                    className="save-button"
                    onClick={handleSave}
                    disabled={mood === null}
                  >
                    Save Entry
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {drawerOpen && <div className="drawer-backdrop" onClick={handleCloseDrawer}></div>}
      </main>
    </div>
  )
}

export default App
