import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";

interface Event {
  id: number;
  title: string;
  time: string;
  attendees: number;
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  // Dummy events based on selected date
  const getEventsForDate = (day: number): Event[] => {
    const eventMap: Record<number, Event[]> = {
      [new Date().getDate()]: [
        { id: 1, title: "Team Standup", time: "9:00 AM", attendees: 8 },
        { id: 2, title: "Sprint Review", time: "2:00 PM", attendees: 12 },
      ],
      [new Date().getDate() + 1]: [
        { id: 3, title: "Client Meeting", time: "10:30 AM", attendees: 4 },
      ],
      [new Date().getDate() + 3]: [
        { id: 4, title: "Workshop", time: "1:00 PM", attendees: 20 },
        { id: 5, title: "1:1 with Manager", time: "4:00 PM", attendees: 2 },
      ],
    };
    return eventMap[day] || [];
  };

  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && 
                         currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="section-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="panel-header mb-0">Calendar</h3>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h4 className="text-lg font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isSelected = selectedDate === day;
          const isToday = isCurrentMonth && day === today;
          const hasEvents = getEventsForDate(day).length > 0;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`calendar-day relative ${
                isSelected
                  ? "calendar-day-selected"
                  : isToday
                  ? "calendar-day-today"
                  : ""
              }`}
            >
              {day}
              {hasEvents && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Events for Selected Date */}
      {selectedDate && (
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Events for {monthNames[currentDate.getMonth()]} {selectedDate}
          </p>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="bg-accent/50 rounded-lg p-3 flex items-center justify-between animate-fade-in"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No events scheduled
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
