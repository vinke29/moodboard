import { useState, useEffect, Fragment } from 'react';

function MoodBoard({ moodData, onCellClick }) {
  // Generate the last 52 weeks (364 days) ending today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 364; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (363 - i));
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Arrange dates into columns (weeks), with Monday as the first row and Sunday as the last
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const week = dates.slice(i * 7, (i + 1) * 7);
    // Reorder so Monday is first, Sunday is last
    const reordered = [1, 2, 3, 4, 5, 6, 0].map(idx => week[idx]);
    weeks.push(reordered);
  }

  // Month labels: find the first week where a new month starts
  const monthLabels = [];
  let lastMonth = null;
  for (let w = 0; w < weeks.length; w++) {
    for (let d = 0; d < 7; d++) {
      const date = weeks[w][d];
      if (date) {
        const month = date.toLocaleString('default', { month: 'short' });
        if (month !== lastMonth) {
          monthLabels.push({ month, week: w });
          lastMonth = month;
        }
        break;
      }
    }
  }

  // Weekday labels (Mon at top, Sun at bottom)
  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="mood-board-container">
      <div className="mood-board-outer">
        <div className="mood-board-grid">
          {/* Month labels row */}
          <div className="empty-label" />
          {weeks.map((_, weekIdx) => {
            const label = monthLabels.find((m) => m.week === weekIdx);
            return (
              <div key={weekIdx} className="month-label-cell">
                {label ? label.month : ''}
              </div>
            );
          })}
          {/* Weekday labels and mood cells */}
          {Array.from({ length: 7 }).map((_, dayIdx) => (
            <Fragment key={dayIdx}>
              <div className="weekday-label">{weekdayLabels[dayIdx]}</div>
              {weeks.map((week, weekIdx) => {
                const date = week[dayIdx];
                if (!date) return <div key={weekIdx + '-' + dayIdx} className="mood-cell empty" />;
                const dateString = date.toISOString().split('T')[0];
                const moodEntry = moodData[dateString];
                const moodLevel = moodEntry ? moodEntry.level : 0;
                return (
                  <div
                    key={dateString}
                    className={`mood-cell mood-${moodLevel}`}
                    onClick={() => onCellClick(date)}
                    title={`${date.toLocaleDateString()}${moodEntry ? ` - Mood: ${moodLevel}${moodEntry.notes ? `\nNotes: ${moodEntry.notes}` : ''}` : ''}`}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoodBoard; 