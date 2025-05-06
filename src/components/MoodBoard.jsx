import { useState, useEffect, Fragment } from 'react';

function MoodBoard({ moodData, onCellClick }) {
  // Generate the last 52 weeks (364 days) ending today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get today's day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const todayDayOfWeek = today.getDay();
    
    // Find the most recent Monday (or today if it's Monday)
    const mostRecentMonday = new Date(today);
    const daysToSubtract = todayDayOfWeek === 1 ? 0 : (todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1);
    mostRecentMonday.setDate(today.getDate() - daysToSubtract);
    
    // Start from 52 weeks ago from the most recent Monday
    const startDate = new Date(mostRecentMonday);
    startDate.setDate(mostRecentMonday.getDate() - (7 * 51));
    
    // Generate all dates up to today
    const endDate = new Date(today);
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      dates.push(new Date(currentDate));
    }
    
    return dates;
  };

  const dates = generateDates();
  
  // Get date range for display
  const startDateDisplay = dates.length > 0 ? dates[0] : new Date();
  const endDateDisplay = dates.length > 0 ? dates[dates.length - 1] : new Date();
  const dateRangeDisplay = `${startDateDisplay.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - ${endDateDisplay.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`;

  // Arrange dates into weeks (columns)
  const weeks = [];
  let currentWeek = [];
  
  // Find the first Monday in our date range
  const firstDate = new Date(dates[0]);
  const firstDayOfWeek = firstDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // If the first date isn't a Monday, we need to adjust
  if (firstDayOfWeek !== 1) {
    // Add placeholder nulls for days before the first Monday
    const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    for (let i = 0; i < daysToAdd; i++) {
      currentWeek.push(null);
    }
  }
  
  // Add all dates to their respective weeks
  dates.forEach((date, i) => {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Rearrange to Monday first (1, 2, 3, 4, 5, 6, 0)
    const adjustedDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    // If we're starting a new week
    if (adjustedDayIndex === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    // Add date to current week
    currentWeek[adjustedDayIndex] = date;
    
    // If this is the last date, add the final partial week
    if (i === dates.length - 1) {
      weeks.push([...currentWeek]);
    }
  });

  // Month labels: find the first week where a new month starts
  const monthLabels = [];
  let lastMonth = null;
  for (let w = 0; w < weeks.length; w++) {
    // Find the first non-null date in this week
    const firstValidDate = weeks[w].find(date => date !== null);
    if (firstValidDate) {
      const month = firstValidDate.toLocaleString('default', { month: 'short' });
      if (month !== lastMonth) {
        monthLabels.push({ month, week: w });
        lastMonth = month;
      }
    }
  }

  // Weekday labels (Mon-Sun)
  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="mood-board-container">
      <div className="mood-date-range">
        <span>{dateRangeDisplay}</span>
      </div>
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
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <div
                    key={dateString}
                    className={`mood-cell mood-${moodLevel}${isToday ? ' today' : ''}`}
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