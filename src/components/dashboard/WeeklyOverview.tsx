
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, MessageCircle, Bell, Calendar, TrendingUp } from 'lucide-react';
import { Contact, Reminder } from '@/pages/Index';

interface WeeklyOverviewProps {
  contacts: Contact[];
  reminders: Reminder[];
}

export const WeeklyOverview = ({ contacts, reminders }: WeeklyOverviewProps) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const weeklyReminders = reminders.filter(r => {
    const dueDate = new Date(r.dueDate);
    return !r.completed && dueDate >= today && dueDate <= nextWeek;
  });

  const recentContactsThisWeek = contacts.filter(c => {
    if (!c.lastInteraction) return false;
    const lastInteraction = new Date(c.lastInteraction);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return lastInteraction >= weekAgo;
  });

  const staleContacts = contacts.filter(c => {
    if (!c.lastInteraction) return true;
    const lastInteraction = new Date(c.lastInteraction);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);
    return lastInteraction < twoWeeksAgo;
  }).slice(0, 3);

  return (
    <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <Calendar className="w-5 h-5" />
      <AlertDescription>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">This Week's Overview</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{recentContactsThisWeek.length} contacts engaged</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-900">
                  {weeklyReminders.length} Reminders Due
                </span>
              </div>
              {weeklyReminders.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Next: {weeklyReminders[0].title}
                </p>
              )}
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-900">
                  {recentContactsThisWeek.length} Recent Engagements
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Stay consistent with your network
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-red-500" />
                <span className="font-medium text-gray-900">
                  {staleContacts.length} Need Attention
                </span>
              </div>
              {staleContacts.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Consider reaching out to {staleContacts[0].name}
                </p>
              )}
            </div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
