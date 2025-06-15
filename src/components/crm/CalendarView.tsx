import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, Users, Bell, Video, CheckSquare, Mail } from 'lucide-react';
import { ReminderCategory } from './reminder-types';
import { ReminderColumn } from './ReminderColumn';
import { sampleReminders, categoryConfig } from './reminder-data';

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tier1Category, setTier1Category] = useState<ReminderCategory>('family');
  const [tier2Category, setTier2Category] = useState<ReminderCategory>('friends');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Coffee with Nour Abdulaziz',
      date: 'Today, 2:00 PM',
      type: 'meeting',
      contact: 'Nour Abdulaziz',
      source: 'manual',
      sortDate: new Date(new Date().setHours(14, 0, 0, 0)) // Today 2:00 PM
    },
    {
      id: 2,
      title: 'Team Standup - Google Meet',
      date: 'Today, 9:00 AM',
      type: 'google-meet',
      contact: 'Development Team',
      source: 'google',
      sortDate: new Date(new Date().setHours(9, 0, 0, 0)) // Today 9:00 AM
    },
    {
      id: 3,
      title: 'Complete project proposal',
      date: 'Tomorrow, 3:00 PM',
      type: 'google-todo',
      contact: 'Personal Task',
      source: 'google',
      sortDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000) // Tomorrow 3:00 PM
    },
    {
      id: 4,
      title: 'Client Review - Teams',
      date: 'Tomorrow, 10:00 AM',
      type: 'teams-meeting',
      contact: 'ABC Corp',
      source: 'microsoft',
      sortDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000) // Tomorrow 10:00 AM
    },
    {
      id: 5,
      title: 'Follow up with Mike Chen',
      date: 'Tomorrow, 2:00 PM',
      type: 'outlook-reminder',
      contact: 'Mike Chen',
      source: 'microsoft',
      sortDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000) // Tomorrow 2:00 PM
    },
    {
      id: 6,
      title: 'Emily\'s Birthday',
      date: 'Dec 18, 2024',
      type: 'birthday',
      contact: 'Emily Rodriguez',
      source: 'manual',
      sortDate: new Date('2024-12-18')
    },
    {
      id: 7,
      title: 'Quarterly Planning Meeting',
      date: 'Dec 20, 2024',
      type: 'outlook-calendar',
      contact: 'Executive Team',
      source: 'microsoft',
      sortDate: new Date('2024-12-20')
    }
  ]
  .filter(event => event.sortDate >= new Date()) // Filter out past events
  .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()); // Sort chronologically

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'google-meet':
        return <Video className="w-4 h-4 text-green-600" />;
      case 'google-todo':
        return <CheckSquare className="w-4 h-4 text-green-600" />;
      case 'teams-meeting':
        return <Video className="w-4 h-4 text-blue-700" />;
      case 'outlook-reminder':
        return <Bell className="w-4 h-4 text-blue-700" />;
      case 'outlook-calendar':
        return <CalendarIcon className="w-4 h-4 text-blue-700" />;
      case 'reminder':
        return <Bell className="w-4 h-4 text-orange-600" />;
      case 'birthday':
        return <span className="text-sm">🎂</span>;
      case 'event':
        return <CalendarIcon className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'google':
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Google</span>;
      case 'microsoft':
        return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Microsoft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Unified Calendar
          </CardTitle>
          <CardDescription>
            View events from Google Calendar, Outlook, and manual entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          
          {/* Integration Status */}
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Connected Services</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Manual Events</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Google Calendar</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Google Meet</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Google Tasks</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Outlook Calendar</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Teams Meetings</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">MS Reminders</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">WhatsApp</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unified Events */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Unified Events & Tasks
          </CardTitle>
          <CardDescription>
            All your events, meetings, and tasks in chronological order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="mt-1">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    {getSourceBadge(event.source)}
                  </div>
                  <p className="text-sm text-gray-600">{event.contact}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-2">
            <button className="w-full p-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              Add New Event
            </button>
            <button className="w-full p-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              Sync All Calendars
            </button>
            <button className="w-full p-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              View All Events
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Reminders Column */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Reminders
          </CardTitle>
          <CardDescription>
            Organize your reminders by priority tiers
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <ReminderColumn
              tierNumber={1}
              category={tier1Category}
              setCategory={setTier1Category}
              reminders={sampleReminders}
              categoryConfig={categoryConfig}
            />
            <ReminderColumn
              tierNumber={2}
              category={tier2Category}
              setCategory={setTier2Category}
              reminders={sampleReminders}
              categoryConfig={categoryConfig}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { CalendarView };
