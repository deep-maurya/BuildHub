import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';

const Calendar = ({ sessions }) => {
  // Define colors for each subject
  const subjectColors = {
    Math: '#FF5733',
    Science: '#33FF57',
    History: '#3357FF',
    English: '#F1C40F',
    // Add more subjects and their colors here
  };

  // Convert sessions into FullCalendar-compatible events
  const events = sessions.map((session) => {
    const start = moment(session.startTime).format();
    const end = moment(session.endTime).format();
    
    // Check if the event spans across days
    const isMultiDay = moment(end).diff(moment(start), 'days') > 0;

    // Get color based on subject
    const color = subjectColors[session.subject] || '#4A90E2'; // Default color if subject not found

    return {
      title: session.title,
      start: start,
      end: end,
      allDay: isMultiDay,
      color: "teal", // Assign color here
    };
  });

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-full mx-auto overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        timeZone="Asia/Kolkata"
        headerToolbar={{
          left: 'title',
          //center: 'title',
          right: 'today,timeGridWeek,timeGridDay,listWeek',
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