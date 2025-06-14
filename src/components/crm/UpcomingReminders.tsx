
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Settings } from 'lucide-react';
import { ReminderCategory } from './reminder-types';
import { ReminderColumn } from './ReminderColumn';
import { ReminderItem } from './ReminderItem';
import { sampleReminders, categoryConfig } from './reminder-data';

interface UpcomingRemindersProps {
  showAsMainTab?: boolean;
}

const UpcomingReminders = ({ showAsMainTab = false }: UpcomingRemindersProps) => {
  const [tier1Category, setTier1Category] = useState<ReminderCategory>('family');
  const [tier2Category, setTier2Category] = useState<ReminderCategory>('friends');
  const [tier3Category, setTier3Category] = useState<ReminderCategory>('colleagues');

  if (showAsMainTab) {
    return (
      <div className="w-full max-w-full">
        <Card className="bg-white w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Reminders
              </div>
              <Settings className="w-4 h-4 text-gray-400" />
            </CardTitle>
            <CardDescription>
              Organize your reminders by priority tiers
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-6 w-full">
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
              <ReminderColumn
                tierNumber={3}
                category={tier3Category}
                setCategory={setTier3Category}
                reminders={sampleReminders}
                categoryConfig={categoryConfig}
              />
            </div>
            
            <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
              View All Reminders
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sidebar version - compact layout
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
          {sampleReminders.slice(0, 4).map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} compact={true} />
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Reminders
        </button>
      </CardContent>
    </Card>
  );
};

export { UpcomingReminders };
