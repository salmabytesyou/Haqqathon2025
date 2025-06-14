
import { Bell, Pin } from 'lucide-react';
import { Contact, Reminder } from '@/pages/Index';

interface UrgentRemindersProps {
  contacts: Contact[];
  reminders: Reminder[];
}

export const UrgentReminders = ({ contacts, reminders }: UrgentRemindersProps) => {
  const pendingReminders = reminders.filter(r => !r.completed && new Date(r.dueDate) <= new Date());

  if (pendingReminders.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg border-l-4 border-red-600">
      <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Pin className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Urgent Reminders</h3>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
            <span className="text-sm font-medium">{pendingReminders.length} pending</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {pendingReminders.slice(0, 5).map((reminder) => {
            const contact = contacts.find(c => c.id === reminder.contactId);
            return (
              <div key={reminder.id} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bell className="w-4 h-4 text-yellow-200" />
                      <h4 className="font-medium text-white">{reminder.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-orange-100">
                      <div className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-xs font-medium">
                        {contact?.name.charAt(0)}
                      </div>
                      <span>{contact?.name}</span>
                      <span>•</span>
                      <span>{reminder.dueDate}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reminder.priority === 'high' ? 'bg-red-200 text-red-800' :
                    reminder.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {reminder.priority}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
