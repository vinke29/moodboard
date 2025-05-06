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

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' });
  };

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
          {selectedDate && (
            <div className="mood-entry">
              <h2>How are you feeling on {formatDate(selectedDate)}?</h2>
              <button className="drawer-close" onClick={handleCloseDrawer}>&times;</button>
              {/* Show summary if entry exists and not editing */}
              {selectedEntry && !editing ? (
                <div className="mood-summary">
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1rem'}}>
                    <span style={{fontWeight:500}}>Mood:</span>
                    <span className={`mood-scale-button mood-${selectedEntry.level}`} style={{border:'none',boxShadow:'none',pointerEvents:'none'}}></span>
                    <span style={{fontWeight:400,fontSize:'1.1rem'}}>{selectedEntry.level}/10</span>
                  </div>
                  {selectedEntry.notes && (
                    <div style={{fontSize:'1rem',color:'#636e72',marginBottom:'1rem',lineHeight:1.4}}>
                      <span style={{fontWeight:500,display:'block',marginBottom:'0.5rem'}}>Notes:</span> 
                      <div style={{background:'rgba(255,255,255,0.5)',padding:'0.75rem',borderRadius:'6px'}}>{selectedEntry.notes}</div>
                    </div>
                  )}
                  <button className="save-button" style={{marginTop:0}} onClick={handleEdit}>Edit</button>
                </div>
              ) : (
                <>
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
