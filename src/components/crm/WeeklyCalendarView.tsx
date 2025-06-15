
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, Bell } from 'lucide-react';
import { format, startOfDay, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';

const WeeklyCalendarView = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // Start the week from the current day instead of Monday
  const today = startOfDay(new Date());
  const weekStart = startOfDay(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const sampleEvents = [
    {
      id: 1,
      title: 'Chai with Nour',
      date: new Date(),
      time: '2:00 PM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Follow up Mike',
      date: addDays(new Date(), 1),
      time: '10:00 AM',
      type: 'reminder'
    },
    {
      id: 3,
      title: 'Emily\'s Birthday',
      date: addDays(new Date(), 2),
      time: 'All day',
      type: 'birthday'
    }
  ];

  const getEventsForDay = (date: Date) => {
    return sampleEvents.filter(event => isSameDay(event.date, date));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-3 h-3 text-blue-600" />;
      case 'reminder':
        return <Bell className="w-3 h-3 text-orange-600" />;
      case 'birthday':
        return <span className="text-xs">🎂</span>;
      default:
        return <Clock className="w-3 h-3 text-gray-600" />;
    }
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  return (
    <Card className="bg-white mb-6">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Week of {format(weekStart, 'MMM d, yyyy')}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={goToCurrentWeek}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Today
            </button>
            
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const isToday = isSameDay(day, new Date());
            const dayEvents = getEventsForDay(day);
            
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-colors ${
                  isToday 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-center mb-2">
                  <div className="text-xs font-medium text-gray-600 uppercase">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-semibold ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="bg-white p-2 rounded border text-xs"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {getEventIcon(event.type)}
                        <span className="font-medium truncate">{event.title}</span>
                      </div>
                      <div className="text-gray-500">{event.time}</div>
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { WeeklyCalendarView };
