
import React from 'react';
import { Reminder } from './reminder-types';

interface ReminderItemProps {
  reminder: Reminder;
  compact?: boolean;
}

export const ReminderItem = ({ reminder, compact = false }: ReminderItemProps) => {
  const ReminderIcon = reminder.icon;
  
  return (
    <div className={`p-3 rounded-lg border ${reminder.urgent ? 'border-pink-200 bg-pink-50' : 'border-gray-200'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${reminder.color}`}>
          <ReminderIcon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium text-gray-900 ${compact ? 'text-sm' : 'text-sm'}`}>
              {reminder.title}
            </h4>
            {reminder.urgent && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                Urgent
              </span>
            )}
          </div>
          <p className={`text-gray-600 ${compact ? 'text-sm' : 'text-xs'}`}>
            {reminder.contact}
          </p>
          <p className="text-xs text-gray-500">
            {reminder.date} {reminder.time && `at ${reminder.time}`}
          </p>
        </div>
        
        <button className={`text-blue-600 hover:text-blue-800 font-medium ${compact ? 'text-sm' : 'text-xs'} px-2 py-1 rounded hover:bg-blue-50 transition-colors`}>
          {compact ? 'Mark Done' : 'Done'}
        </button>
      </div>
    </div>
  );
};
