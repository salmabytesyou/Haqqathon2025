
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, Gift, Briefcase, Coffee } from 'lucide-react';

const UpcomingReminders = () => {
  const reminders = [
    {
      id: 1,
      type: 'birthday',
      contact: 'Sarah Johnson',
      title: 'Birthday',
      date: 'Today',
      time: '',
      icon: Gift,
      color: 'text-pink-600 bg-pink-50',
      urgent: true
    },
    {
      id: 2,
      type: 'meeting',
      contact: 'Mike Chen',
      title: 'Coffee Chat',
      date: 'Tomorrow',
      time: '2:00 PM',
      icon: Coffee,
      color: 'text-amber-600 bg-amber-50',
      urgent: false
    },
    {
      id: 3,
      type: 'follow_up',
      contact: 'Emily Rodriguez',
      title: 'Project Follow-up',
      date: 'Friday',
      time: '10:00 AM',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50',
      urgent: false
    },
    {
      id: 4,
      type: 'anniversary',
      contact: 'David Kim',
      title: 'Work Anniversary',
      date: 'Next Monday',
      time: '',
      icon: Calendar,
      color: 'text-green-600 bg-green-50',
      urgent: false
    }
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Upcoming Reminders
        </CardTitle>
        <CardDescription>
          Don't miss important dates and follow-ups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => {
            const Icon = reminder.icon;
            return (
              <div key={reminder.id} className={`p-3 rounded-lg border ${reminder.urgent ? 'border-pink-200 bg-pink-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${reminder.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                      {reminder.urgent && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{reminder.contact}</p>
                    <p className="text-xs text-gray-500">
                      {reminder.date} {reminder.time && `at ${reminder.time}`}
                    </p>
                  </div>
                  
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark Done
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Reminders
        </button>
      </CardContent>
    </Card>
  );
};

export { UpcomingReminders };
