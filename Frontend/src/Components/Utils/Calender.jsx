import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const Calendar = ({ sessions }) => {
  //console.log(sessions)
  const events = sessions.map((session) => {
    return {
      title: session.title,
      start: session.startTime,
      end: session.endTime,
      color: session.color || '#8163c3',
    };
  });
//console.log(events)
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-full mx-auto overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        // timeZone="Asia/Kolkata"
        headerToolbar={{
          left: 'prev,next today',
          //center: 'title',
          right: 'timeGridWeek,timeGridDay,listWeek',
        }}
        events={events}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventColor="#4A90E2" // Default color if not set per event
        themeSystem="united"
        height="auto" // Allow the calendar to adjust height automatically
        contentHeight="auto" // Ensure content adjusts based on screen size
      />
      <style>
        {`
          .fc-header-toolbar {
            font-size: 0.75rem; /* Small font size for header toolbar */
            border-radius: 8px 8px 0 0;
            margin-bottom: 1rem;
          }
          .fc-toolbar-title {
            font-size: 1rem; /* Smaller title size */
            font-weight: 500;
          }
          .fc-button {
            font-size: 0.75rem; /* Smaller button size */
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            color: #333;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            transition: background-color 0.2s, border-color 0.2s;
          }
          .fc-button-primary {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff;
          }
          .fc-button:hover {
            background-color: #e0e0e0;
            border-color: #ccc;
          }
          .fc-dayGridMonth-button,
          .fc-timeGridWeek-button,
          .fc-timeGridDay-button,
          .fc-listWeek-button {
            font-size: 0.75rem; /* Smaller view buttons */
          }
          .fc-dayGridMonth-button .fc-button-content,
          .fc-timeGridWeek-button .fc-button-content,
          .fc-timeGridDay-button .fc-button-content,
          .fc-listWeek-button .fc-button-content {
            font-size: 0.75rem; /* Smaller button content */
          }
          .fc-daygrid-day-top {
            font-size: 0.75rem; /* Smaller day header */
          }
          .fc-daygrid-day-number {
            font-size: 0.875rem; /* Smaller day number */
          }
          .fc-daygrid-day-events {
            font-size: 0.75rem; /* Smaller event text */
          }
          .full-calendar-container {
            max-height: 80vh;
            overflow: auto;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Calendar;
